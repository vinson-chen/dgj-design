import React from 'react';
import { DgjIcon, Input, Typography, dgjTokens } from 'dgj-design';
import { BizTableCell } from './BizTableCell';
import { useTableGridContext } from './TableGridContext';
import {
  BODY_CELL_PADDING_X,
  BODY_CELL_PADDING_Y,
  cellKey,
  DISPLAY_CELL_MAX_HEIGHT_PX,
  DISPLAY_TEXT_MAX_HEIGHT_PX,
  EDIT_CELL_EDGE_PADDING,
  EDIT_CELL_MAX_HEIGHT_PX,
  EDIT_TEXTAREA_MAX_ROWS,
  tableTextClampNStyle,
  tableTextStyle,
} from './tableGridConstants';
import { getFreezeDividerStyle, getTextColWrapStyle } from './tableGridLayout';

export type TableGridTextCellProps = Readonly<{
  rowIndex: number;
  colIndex: number;
  bodyRowIndex: number;
  isHeader: boolean;
  isLastRow: boolean;
  hovered: boolean;
  active: boolean;
  isInsertRowPlaceholder: boolean;
}>;

export default function TableGridTextCell({
  rowIndex,
  colIndex,
  bodyRowIndex,
  isHeader,
  isLastRow,
  hovered,
  active,
  isInsertRowPlaceholder,
}: TableGridTextCellProps) {
  const p = useTableGridContext();

  const insertColWidth = p.narrowWidth;
  const isInsertColPlaceholder = p.enableInsertRowCol && colIndex === p.colCount;
  const isInsertRowTextClickable =
    isInsertRowPlaceholder && !isInsertColPlaceholder && !isHeader && colIndex < p.colCount;

  const storedW = p.enableColumnResize ? p.colWidths[colIndex] ?? null : null;
  const layoutW: number | null =
    p.insertLayoutTextColPx != null
      ? storedW != null
        ? storedW
        : p.insertLayoutTextColPx
      : storedW;

  const isLastTextColBeforeInsert =
    p.enableInsertRowCol && !isHeader && colIndex === p.colCount - 1;

  const shouldHideRightBorderForFrozenLastCol =
    p.enableFreezeLastCol && !p.enableInsertRowCol && colIndex === p.colCount - 1;

  const shouldHideRightBorderForLastUnfrozenBeforeFrozenLast =
    p.enableFreezeLastCol &&
    p.enableBodyCellRightBorder &&
    p.colCount >= 2 &&
    colIndex === p.colCount - 2;

  const canResizeHeaderTextCol = isHeader && p.enableColumnResize && colIndex < p.colCount;

  const isBody = rowIndex > 0;
  const isEditableBodyCell =
    p.enableEditMode &&
    isBody &&
    !isInsertRowPlaceholder &&
    colIndex < p.colCount &&
    !isInsertColPlaceholder;
  const isEditing =
    isEditableBodyCell &&
    !!p.editingCell &&
    p.editingCell.r === bodyRowIndex &&
    p.editingCell.c === colIndex;
  const key = cellKey(bodyRowIndex, colIndex);
  const displayText = p.valueByCell[key] ?? `R${bodyRowIndex + 1} C${colIndex + 1}`;
  const cellActive = isInsertColPlaceholder ? false : active;
  const isEditableBodyDisplayCell =
    isBody && !isInsertRowPlaceholder && !isInsertColPlaceholder && colIndex < p.colCount;
  const isHoverLocked =
    p.enableEditMode &&
    isBody &&
    !isInsertRowPlaceholder &&
    !isInsertColPlaceholder &&
    colIndex < p.colCount &&
    p.hoverLockedCell?.r === bodyRowIndex &&
    p.hoverLockedCell?.c === colIndex;

  return (
    <div
      data-insert-col-placeholder={isInsertColPlaceholder && !isHeader ? 'true' : undefined}
      data-hover-lock-cell={isEditableBodyDisplayCell && p.enableEditMode ? '' : undefined}
      data-body-row={isEditableBodyDisplayCell ? bodyRowIndex : undefined}
      data-col={isEditableBodyDisplayCell ? colIndex : undefined}
      onClick={(e) => {
        if (!isHeader && isInsertColPlaceholder) {
          e.stopPropagation();
          return;
        }
        if (isHeader && isInsertColPlaceholder) {
          e.stopPropagation();
          p.onInsertColumn();
          return;
        }
        if (
          p.enableEditMode &&
          isBody &&
          !isInsertRowPlaceholder &&
          !isInsertColPlaceholder &&
          colIndex < p.colCount
        ) {
          p.setHoverLockedCell({ r: bodyRowIndex, c: colIndex });
        }
        if (isEditableBodyCell) {
          e.stopPropagation();
          p.setSelectedCell(null);
          if (p.editingCell?.r === bodyRowIndex && p.editingCell?.c === colIndex) {
            return;
          }
          if (p.editingCell && (p.editingCell.r !== bodyRowIndex || p.editingCell.c !== colIndex)) {
            const prevKey = cellKey(p.editingCell.r, p.editingCell.c);
            p.setValueByCell((v) => ({ ...v, [prevKey]: p.getEditingValueForSave() }));
          }
          p.setEditingCell({ r: bodyRowIndex, c: colIndex });
          p.editingDraftRef.current = displayText;
          p.setEditingDraft(displayText);
          return;
        }
        if (!isInsertRowTextClickable) return;
        e.stopPropagation();
        p.onInsertRow();
      }}
      style={
        isInsertColPlaceholder
          ? {
              flex: `0 0 ${insertColWidth}px`,
              minWidth: insertColWidth,
              display: 'flex',
              position:
                p.enableFreezeLastCol && p.enableInsertRowCol
                  ? 'sticky'
                  : p.enableFreezeFirstCol && colIndex === 0
                    ? 'sticky'
                    : undefined,
              left: p.enableFreezeFirstCol && colIndex === 0 ? p.narrowWidth : undefined,
              right: p.enableFreezeLastCol && p.enableInsertRowCol ? 0 : undefined,
              zIndex: p.enableFreezeLastCol && p.enableInsertRowCol ? 5 : undefined,
              cursor: isHeader ? 'pointer' : 'default',
            }
          : {
              ...getTextColWrapStyle(
                layoutW,
                p.minTextColWidth,
                p.narrowWidth,
                colIndex,
                p.colCount,
                p.enableFreezeFirstCol,
                p.enableFreezeLastCol,
                p.enableInsertRowCol && p.enableFreezeLastCol ? p.narrowWidth : 0
              ),
              cursor:
                isInsertRowTextClickable || (isHeader && isInsertColPlaceholder)
                  ? 'pointer'
                  : isEditableBodyCell
                    ? 'default'
                    : undefined,
            }
      }
    >
      {p.enableFreezeFirstCol && colIndex === 0 ? (
        <span aria-hidden="true" style={getFreezeDividerStyle('right')} />
      ) : null}
      {p.enableFreezeLastCol && colIndex === p.colCount - 1 ? (
        <span aria-hidden="true" style={getFreezeDividerStyle('left')} />
      ) : null}
      <BizTableCell
        variant={isHeader ? 'thead' : 'tbody'}
        hovered={isInsertColPlaceholder && !isHeader ? false : hovered || isHoverLocked}
        hoverByCell={isHeader}
        active={cellActive}
        zoom={canResizeHeaderTextCol}
        onColumnResizeStart={canResizeHeaderTextCol ? p.onColumnResizeStart(colIndex) : undefined}
        isLastRow={isHeader || !isInsertColPlaceholder ? isLastRow : true}
        isFrozen={
          (p.enableFreezeFirstCol && colIndex === 0) ||
          (p.enableFreezeLastCol && colIndex === p.colCount - 1) ||
          (p.enableFreezeLastCol && p.enableInsertRowCol && isInsertColPlaceholder)
        }
        showRightBorder={
          !isHeader &&
          !isInsertColPlaceholder &&
          !(p.enableFreezeFirstCol && colIndex === 0) &&
          (isLastTextColBeforeInsert
            ? true
            : p.enableBodyCellRightBorder &&
              !isInsertRowPlaceholder &&
              !shouldHideRightBorderForFrozenLastCol &&
              !shouldHideRightBorderForLastUnfrozenBeforeFrozenLast)
        }
        contentPaddingY={isHeader ? 8 : isEditing ? EDIT_CELL_EDGE_PADDING : BODY_CELL_PADDING_Y}
        contentPaddingX={isHeader ? 12 : isEditing ? EDIT_CELL_EDGE_PADDING : BODY_CELL_PADDING_X}
        contentAlignY={!isHeader && !p.enableVerticalCenter ? 'flex-start' : 'center'}
        style={
          isEditing
            ? {
                maxHeight: EDIT_CELL_MAX_HEIGHT_PX,
                overflow: 'hidden',
              }
            : isEditableBodyDisplayCell
              ? {
                  maxHeight: DISPLAY_CELL_MAX_HEIGHT_PX,
                  overflow: 'hidden',
                }
              : undefined
        }
      >
        {isHeader ? (
          isInsertColPlaceholder ? (
            <div
              style={{ display: 'flex', justifyContent: 'center', width: '100%', cursor: 'pointer' }}
            >
              <DgjIcon type="add" fontSize={16} style={{ color: dgjTokens.color.neutral.text.icon }} />
            </div>
          ) : (
            <Typography.Text style={{ ...tableTextStyle, fontWeight: 500 }}>
              列 {colIndex + 1}
            </Typography.Text>
          )
        ) : isInsertColPlaceholder ? null : isInsertRowPlaceholder ? null : isEditing ? (
          <Input.TextArea
            ref={p.editTextAreaRef}
            autoFocus={false}
            autoSize={{ minRows: 1, maxRows: EDIT_TEXTAREA_MAX_ROWS }}
            value={p.editingDraft}
            onChange={(ev) => {
              const v = ev.target.value;
              p.editingDraftRef.current = v;
              p.setEditingDraft(v);
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onBlur={() => {
              p.setValueByCell((prev) => ({ ...prev, [key]: p.getEditingValueForSave() }));
            }}
            onKeyDown={(e) => {
              const exit = e.key === 'Escape' || (e.key === 'Enter' && (e.metaKey || e.ctrlKey));
              if (!exit) return;
              e.preventDefault();
              p.setValueByCell((prev) => ({ ...prev, [key]: p.getEditingValueForSave() }));
              p.setSelectedCell({ r: bodyRowIndex, c: colIndex });
              p.setEditingCell(null);
              p.editingDraftRef.current = '';
              p.setEditingDraft('');
            }}
            style={{
              width: '100%',
              resize: 'none',
              transition: 'none',
              borderRadius: 0,
            }}
            styles={{
              affixWrapper: {
                transition: 'none',
                borderRadius: 0,
              },
              textarea: {
                fontSize: 12,
                lineHeight: '20px',
                paddingLeft: 8,
                paddingRight: 8,
                boxSizing: 'border-box',
                transition: 'none',
                borderRadius: 0,
              },
            }}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              minWidth: 0,
              height: '100%',
              justifyContent: p.enableVerticalCenter ? 'center' : 'flex-start',
            }}
          >
            <div
              style={{
                ...tableTextClampNStyle(EDIT_TEXTAREA_MAX_ROWS),
                maxHeight: DISPLAY_TEXT_MAX_HEIGHT_PX,
              }}
            >
              {displayText}
            </div>
          </div>
        )}
      </BizTableCell>
    </div>
  );
}
