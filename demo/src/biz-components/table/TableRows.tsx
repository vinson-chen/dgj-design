import React from 'react';
import { Checkbox, Typography, dgjTokens } from 'dgj-design';
import { BizTableCell } from './BizTableCell';

type TableRowsCoreProps = {
  rowCount: number;
  colCount: number;
  rowMinWidth: number;
  narrowWidth: number;
  minTextColWidth: number;
  enableColumnResize: boolean;
  enableVerticalCenter: boolean;
  enableFreezeFirstCol: boolean;
  enableFreezeLastCol: boolean;
  hoveredRowIndex: number | null;
  setHoveredRowIndex: (value: number | null) => void;
  checkedByBodyRow: Record<number, boolean>;
  setCheckedByBodyRow: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  headerAllChecked: boolean;
  headerIndeterminate: boolean;
  toggleAllHeader: (checked: boolean) => void;
  colWidths: Array<number | null>;
  onColumnResizeStart: (colIndex: number) => (e: React.MouseEvent) => void;
};

type TableRowsProps = Readonly<TableRowsCoreProps>;

const tableTextStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: '20px',
  height: 20,
  display: 'inline-flex',
  alignItems: 'center',
};

const tableTextMultiLineStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: '20px',
  display: 'block',
  whiteSpace: 'normal',
  wordBreak: 'break-word',
};

function getFreezeDividerStyle(position: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    top: 0,
    bottom: 0,
    [position]: position === 'left' ? 0 : -1,
    width: 1,
    background: dgjTokens.color.neutral.border.default,
    zIndex: 10,
    pointerEvents: 'none',
  };
}

function getTextColWrapStyle(
  w: number | null,
  minTextColWidth: number,
  narrowWidth: number,
  colIndex: number,
  colCount: number,
  freezeFirst: boolean,
  freezeLast: boolean
): React.CSSProperties {
  const flexValue = w != null ? `0 0 ${w}px` : `1 0 ${minTextColWidth}px`;
  const minW = w != null ? w : minTextColWidth;

  return {
    flex: flexValue,
    minWidth: minW,
    display: 'flex',
    position:
      freezeFirst && colIndex === 0
        ? 'sticky'
        : freezeLast && colIndex === colCount - 1
          ? 'sticky'
          : undefined,
    left: freezeFirst && colIndex === 0 ? narrowWidth : undefined,
    right: freezeLast && colIndex === colCount - 1 ? 0 : undefined,
    zIndex:
      freezeFirst && colIndex === 0
        ? 4
        : freezeLast && colIndex === colCount - 1
          ? 3
          : undefined,
  };
}

export default function TableRows({
  rowCount,
  colCount,
  rowMinWidth,
  narrowWidth,
  minTextColWidth,
  enableColumnResize,
  enableVerticalCenter,
  enableFreezeFirstCol,
  enableFreezeLastCol,
  hoveredRowIndex,
  setHoveredRowIndex,
  checkedByBodyRow,
  setCheckedByBodyRow,
  headerAllChecked,
  headerIndeterminate,
  toggleAllHeader,
  colWidths,
  onColumnResizeStart,
}: TableRowsProps) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => {
        const isHeader = rowIndex === 0;
        const isLastRow = rowIndex === rowCount - 1;
        const hovered = hoveredRowIndex === rowIndex;
        const bodyRowIndex = rowIndex - 1;
        const active = !isHeader && !!checkedByBodyRow[bodyRowIndex];

        return (
          <div
            key={`row-${rowIndex}`}
            role="row"
            onMouseEnter={() => setHoveredRowIndex(rowIndex)}
            onMouseLeave={() => setHoveredRowIndex(null)}
            onClick={() => {
              if (!isHeader) {
                setCheckedByBodyRow((prev) => ({
                  ...prev,
                  [bodyRowIndex]: !prev[bodyRowIndex],
                }));
              }
            }}
            style={{
              display: 'flex',
              width: '100%',
              minWidth: rowMinWidth,
              alignItems: 'stretch',
              cursor: isHeader ? 'default' : 'pointer',
            }}
          >
            <div
              style={{
                flex: `0 0 ${narrowWidth}px`,
                minWidth: narrowWidth,
                display: 'flex',
                alignItems: 'stretch',
                position: enableFreezeFirstCol ? 'sticky' : undefined,
                left: enableFreezeFirstCol ? 0 : undefined,
                zIndex: enableFreezeFirstCol ? 4 : undefined,
              }}
            >
              <BizTableCell
                variant={isHeader ? 'thead' : 'tbody'}
                hovered={hovered}
                hoverByCell={isHeader}
                active={active}
                isLastRow={isLastRow}
                isFrozen={enableFreezeFirstCol}
                contentPaddingY={8}
                contentAlignY={!isHeader && !enableVerticalCenter ? 'flex-start' : 'center'}
              >
                {isHeader ? (
                  <Checkbox
                    checked={headerAllChecked}
                    indeterminate={headerIndeterminate}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleAllHeader(e.target.checked);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    style={{ margin: 0, padding: 0, height: 20, lineHeight: '20px' }}
                  />
                ) : (
                  <Checkbox
                    checked={!!checkedByBodyRow[bodyRowIndex]}
                    onChange={(e) => {
                      e.stopPropagation();
                      setCheckedByBodyRow((prev) => ({ ...prev, [bodyRowIndex]: e.target.checked }));
                    }}
                    onClick={(e) => e.stopPropagation()}
                    style={{ margin: 0, padding: 0, height: 20, lineHeight: '20px' }}
                  />
                )}
              </BizTableCell>
            </div>

            {Array.from({ length: colCount }).map((__, colIndex) => {
              const w = enableColumnResize ? colWidths[colIndex] : null;

              return (
                <div
                  key={`r-${rowIndex}-c-${colIndex}`}
                  style={getTextColWrapStyle(
                    w,
                    minTextColWidth,
                    narrowWidth,
                    colIndex,
                    colCount,
                    enableFreezeFirstCol,
                    enableFreezeLastCol
                  )}
                >
                  {enableFreezeFirstCol && colIndex === 0 ? (
                    <span aria-hidden="true" style={getFreezeDividerStyle('right')} />
                  ) : null}
                  {enableFreezeLastCol && colIndex === colCount - 1 ? (
                    <span aria-hidden="true" style={getFreezeDividerStyle('left')} />
                  ) : null}
                  <BizTableCell
                    variant={isHeader ? 'thead' : 'tbody'}
                    hovered={hovered}
                    hoverByCell={isHeader}
                    active={active}
                    zoom={isHeader && enableColumnResize}
                    onColumnResizeStart={isHeader && enableColumnResize ? onColumnResizeStart(colIndex) : undefined}
                    isLastRow={isLastRow}
                    isFrozen={
                      (enableFreezeFirstCol && colIndex === 0) ||
                      (enableFreezeLastCol && colIndex === colCount - 1)
                    }
                    contentPaddingY={8}
                    contentAlignY={!isHeader && !enableVerticalCenter ? 'flex-start' : 'center'}
                  >
                    {isHeader ? (
                      <Typography.Text style={{ ...tableTextStyle, fontWeight: 500 }}>
                        列 {colIndex + 1}
                      </Typography.Text>
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 4,
                          width: '100%',
                          height: '100%',
                          justifyContent: enableVerticalCenter ? 'center' : 'flex-start',
                        }}
                      >
                        <Typography.Text style={tableTextStyle}>
                          R{bodyRowIndex + 1} C{colIndex + 1}
                        </Typography.Text>
                        {rowCount >= 4 && rowIndex === 2 && colIndex === 1 ? (
                          <Typography.Text
                            style={{ ...tableTextMultiLineStyle, color: dgjTokens.color.neutral.text.description }}
                          >
                            多行内容（用于撑高）：同行以最高 cell 对齐
                          </Typography.Text>
                        ) : null}
                      </div>
                    )}
                  </BizTableCell>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
