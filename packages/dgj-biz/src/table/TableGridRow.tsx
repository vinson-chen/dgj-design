import React from 'react';
import { Checkbox, DgjIcon, Typography, dgjTokens } from 'dgj-design';
import { BizTableCell } from './BizTableCell';
import TableGridTextCell from './TableGridTextCell';
import { useTableGridContext } from './TableGridContext';
import { tableTextStyle } from './tableGridConstants';

export type TableGridRowProps = Readonly<{ rowIndex: number }>;

export default function TableGridRow({ rowIndex }: TableGridRowProps) {
  const p = useTableGridContext();

  const displayRowCount = p.rowCount + (p.enableInsertRowCol ? 1 : 0);
  const displayColCount = p.colCount + (p.enableInsertRowCol ? 1 : 0);
  const isInsertRowPlaceholderIndex = (r: number) => p.enableInsertRowCol && r === p.rowCount;

  const isHeader = rowIndex === 0;
  const isLastRow = rowIndex === displayRowCount - 1;
  const hovered = p.hoveredRowIndex === rowIndex;
  const bodyRowIndex = rowIndex - 1;
  const isInsertRowPlaceholder = isInsertRowPlaceholderIndex(rowIndex);
  const active = !isHeader && !isInsertRowPlaceholder && !!p.checkedByBodyRow[bodyRowIndex];

  return (
    <div
      role="row"
      onMouseEnter={(e) => {
        const target = e.target as HTMLElement | null;
        const enteredInsertCol =
          p.enableInsertRowCol &&
          rowIndex > 0 &&
          !!target?.closest('[data-insert-col-placeholder="true"]');
        if (enteredInsertCol) {
          p.setHoveredRowIndex(null);
          return;
        }
        p.setHoveredRowIndex(rowIndex);
      }}
      onMouseLeave={() => p.setHoveredRowIndex(null)}
      onClick={() => {
        if (p.enableEditMode) return;
        if (!isHeader && !isInsertRowPlaceholder) {
          p.setCheckedByBodyRow((prev) => ({
            ...prev,
            [bodyRowIndex]: !prev[bodyRowIndex],
          }));
        }
      }}
      style={{
        display: 'flex',
        width: '100%',
        minWidth: p.rowMinWidth,
        alignItems: 'stretch',
        cursor: isHeader || isInsertRowPlaceholder ? 'default' : 'pointer',
      }}
    >
      <div
        onClick={(e) => {
          if (!p.enableEditMode) return;
          if (isHeader || isInsertRowPlaceholder) return;
          e.stopPropagation();
          p.setCheckedByBodyRow((prev) => ({
            ...prev,
            [bodyRowIndex]: !prev[bodyRowIndex],
          }));
        }}
        style={{
          flex: `0 0 ${p.narrowWidth}px`,
          minWidth: p.narrowWidth,
          display: 'flex',
          alignItems: 'stretch',
          position: p.enableFreezeFirstCol ? 'sticky' : undefined,
          left: p.enableFreezeFirstCol ? 0 : undefined,
          zIndex: p.enableFreezeFirstCol ? 4 : undefined,
        }}
      >
        <BizTableCell
          variant={isHeader ? 'thead' : 'tbody'}
          hovered={hovered}
          hoverByCell={isHeader}
          active={active}
          isLastRow={isLastRow}
          isFrozen={p.enableFreezeFirstCol}
          showRightBorder={
            !isHeader &&
            p.enableBodyCellRightBorder &&
            !p.enableFreezeFirstCol &&
            !isInsertRowPlaceholder
          }
          contentPaddingY={8}
          contentAlignY={!isHeader && !p.enableVerticalCenter ? 'flex-start' : 'center'}
        >
          {isHeader ? (
            <Checkbox
              checked={p.headerAllChecked}
              indeterminate={p.headerIndeterminate}
              onChange={(e) => {
                e.stopPropagation();
                p.toggleAllHeader(e.target.checked);
              }}
              onClick={(e) => e.stopPropagation()}
              style={{ margin: 0, padding: 0, height: 20, lineHeight: '20px' }}
            />
          ) : isInsertRowPlaceholder ? (
            <div
              role="button"
              tabIndex={0}
              style={{ display: 'flex', justifyContent: 'center', width: '100%', cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                p.onInsertRow();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  p.onInsertRow();
                }
              }}
            >
              <DgjIcon type="add" fontSize={16} style={{ color: dgjTokens.color.neutral.text.icon }} />
            </div>
          ) : p.enableShowRowIndex && !hovered && !active ? (
            <Typography.Text
              type="secondary"
              style={{
                ...tableTextStyle,
                width: '100%',
                justifyContent: 'center',
                userSelect: 'none',
              }}
            >
              {bodyRowIndex + 1}
            </Typography.Text>
          ) : (
            <Checkbox
              checked={!!p.checkedByBodyRow[bodyRowIndex]}
              onChange={(e) => {
                e.stopPropagation();
                p.setCheckedByBodyRow((prev) => ({ ...prev, [bodyRowIndex]: e.target.checked }));
              }}
              onClick={(e) => e.stopPropagation()}
              style={{ margin: 0, padding: 0, height: 20, lineHeight: '20px' }}
            />
          )}
        </BizTableCell>
      </div>

      {Array.from({ length: displayColCount }).map((__, colIndex) => (
        <TableGridTextCell
          key={`r-${rowIndex}-c-${colIndex}`}
          rowIndex={rowIndex}
          colIndex={colIndex}
          bodyRowIndex={bodyRowIndex}
          isHeader={isHeader}
          isLastRow={isLastRow}
          hovered={hovered}
          active={active}
          isInsertRowPlaceholder={isInsertRowPlaceholder}
        />
      ))}
    </div>
  );
}
