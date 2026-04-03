import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Checkbox, DgjIcon, Input, Typography, dgjTokens } from 'dgj-design';
import { BizTableCell } from './BizTableCell';

export type TableRowsProps = Readonly<{
  rowCount: number;
  colCount: number;
  enableInsertRowCol: boolean;
  enableEditMode: boolean;
  rowMinWidth: number;
  narrowWidth: number;
  minTextColWidth: number;
  enableColumnResize: boolean;
  enableVerticalCenter: boolean;
  enableFreezeFirstCol: boolean;
  enableFreezeLastCol: boolean;
  enableBodyCellRightBorder: boolean;
  enableShowRowIndex: boolean;
  hoveredRowIndex: number | null;
  setHoveredRowIndex: (value: number | null) => void;
  checkedByBodyRow: Record<number, boolean>;
  setCheckedByBodyRow: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  headerAllChecked: boolean;
  headerIndeterminate: boolean;
  toggleAllHeader: (checked: boolean) => void;
  colWidths: Array<number | null>;
  onColumnResizeStart: (colIndex: number) => (e: React.MouseEvent) => void;
  onInsertRow: () => void;
  onInsertColumn: () => void;
  /** 插入行列开启时：文本列固定默认宽；null 为等分模式 */
  insertLayoutTextColPx: number | null;
}>;

const tableTextStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: '20px',
  height: 20,
  display: 'inline-flex',
  alignItems: 'center',
};

function cellKey(r: number, c: number) {
  return `${r}-${c}`;
}

/** 展示态：最多 N 行，超出省略（与编辑态 maxRows 一致） */
function tableTextClampNStyle(lines: number): React.CSSProperties {
  return {
    fontSize: 12,
    lineHeight: '20px',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: lines,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word',
    whiteSpace: 'normal',
  };
}

/** 编辑态 TextArea 最大行数（与 line-clamp 行数一致） */
const EDIT_TEXTAREA_MAX_ROWS = 6;
/** 与编辑态输入框 lineHeight 一致，用于估算最大像素高度 */
const EDIT_TEXTAREA_LINE_HEIGHT_PX = 20;
/** 展示/编辑共用：6 行文本区域高度（与 line-clamp 可视高度一致） */
const DISPLAY_TEXT_MAX_HEIGHT_PX = EDIT_TEXTAREA_MAX_ROWS * EDIT_TEXTAREA_LINE_HEIGHT_PX;
/** 表体展示态：内容与单元格边距 */
const BODY_CELL_PADDING_Y = 8;
const BODY_CELL_PADDING_X = 12;
/** 编辑态：输入框与单元格四周边距（上下左右，与 contentPadding 一致） */
const EDIT_CELL_EDGE_PADDING = 3;
/** 展示态单元格最大高度 */
const DISPLAY_CELL_MAX_HEIGHT_PX = BODY_CELL_PADDING_Y * 2 + DISPLAY_TEXT_MAX_HEIGHT_PX + 2;
/** 编辑态单元格最大高度（边距×2 + 6 行区域 + 输入框 chrome） */
const EDIT_CELL_MAX_HEIGHT_PX = EDIT_CELL_EDGE_PADDING * 2 + DISPLAY_TEXT_MAX_HEIGHT_PX + 18;

function getNativeTextareaFromAntdRef(
  ref: React.RefObject<{
    resizableTextArea?: { textArea?: HTMLTextAreaElement | null };
  } | null>
): HTMLTextAreaElement | null {
  return ref.current?.resizableTextArea?.textArea ?? null;
}

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
  freezeLast: boolean,
  freezeLastStickyRightInset: number
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
    right:
      freezeLast && colIndex === colCount - 1 ? freezeLastStickyRightInset : undefined,
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
  enableInsertRowCol,
  enableEditMode,
  rowMinWidth,
  narrowWidth,
  minTextColWidth,
  enableColumnResize,
  enableVerticalCenter,
  enableFreezeFirstCol,
  enableFreezeLastCol,
  enableBodyCellRightBorder,
  enableShowRowIndex,
  hoveredRowIndex,
  setHoveredRowIndex,
  checkedByBodyRow,
  setCheckedByBodyRow,
  headerAllChecked,
  headerIndeterminate,
  toggleAllHeader,
  colWidths,
  onColumnResizeStart,
  onInsertRow,
  onInsertColumn,
  insertLayoutTextColPx,
}: TableRowsProps) {
  const displayRowCount = rowCount + (enableInsertRowCol ? 1 : 0);
  const displayColCount = colCount + (enableInsertRowCol ? 1 : 0);
  const insertColWidth = narrowWidth;
  const isInsertRowPlaceholderIndex = (rowIndex: number) => enableInsertRowCol && rowIndex === rowCount;
  const isInsertColPlaceholderIndex = (colIndex: number) => enableInsertRowCol && colIndex === colCount;

  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [hoverLockedCell, setHoverLockedCell] = useState<{ r: number; c: number } | null>(null);
  const [editingCell, setEditingCell] = useState<{ r: number; c: number } | null>(null);
  const editingCellRef = useRef(editingCell);
  editingCellRef.current = editingCell;
  const [editingDraft, setEditingDraft] = useState('');
  const [valueByCell, setValueByCell] = useState<Record<string, string>>({});
  const editTextAreaRef = useRef<{
    resizableTextArea?: { textArea?: HTMLTextAreaElement | null };
    focus?: (options?: { preventScroll?: boolean }) => void;
  } | null>(null);
  const pendingFocusAfterKeyboardOpenRef = useRef(false);
  const editingDraftRef = useRef('');
  const valueByCellRef = useRef(valueByCell);
  editingDraftRef.current = editingDraft;
  valueByCellRef.current = valueByCell;

  const getEditingValueForSave = useCallback(() => {
    const ta = getNativeTextareaFromAntdRef(editTextAreaRef);
    return ta?.value ?? editingDraftRef.current;
  }, []);

  const exitEditingLikeEscape = useCallback(() => {
    const ec = editingCellRef.current;
    if (!ec) return;
    const k = cellKey(ec.r, ec.c);
    setValueByCell((prev) => ({ ...prev, [k]: getEditingValueForSave() }));
    setSelectedCell({ r: ec.r, c: ec.c });
    setEditingCell(null);
    editingDraftRef.current = '';
    setEditingDraft('');
  }, [getEditingValueForSave]);

  useEffect(() => {
    if (!enableEditMode) {
      setSelectedCell(null);
      setEditingCell(null);
      setHoverLockedCell(null);
      editingDraftRef.current = '';
      setEditingDraft('');
    }
  }, [enableEditMode]);

  useEffect(() => {
    if (!hoverLockedCell) return;
    const locked = hoverLockedCell;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target;
      if (!(target instanceof Node)) return;
      const el = target instanceof Element ? target : target.parentElement;
      if (!el) return;
      const cell = el.closest('[data-hover-lock-cell]');
      if (cell) {
        const r = Number(cell.getAttribute('data-body-row'));
        const c = Number(cell.getAttribute('data-col'));
        if (!Number.isNaN(r) && !Number.isNaN(c) && r === locked.r && c === locked.c) return;
      }
      setHoverLockedCell(null);
      exitEditingLikeEscape();
    };
    document.addEventListener('pointerdown', onPointerDown, true);
    return () => document.removeEventListener('pointerdown', onPointerDown, true);
  }, [hoverLockedCell, exitEditingLikeEscape]);

  useEffect(() => {
    if (!editingCell || !pendingFocusAfterKeyboardOpenRef.current) return;
    pendingFocusAfterKeyboardOpenRef.current = false;
    const id = requestAnimationFrame(() => {
      editTextAreaRef.current?.focus?.({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  }, [editingCell]);

  useEffect(() => {
    if (!enableEditMode) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const native = getNativeTextareaFromAntdRef(editTextAreaRef);

      if (native && document.activeElement === native) {
        return;
      }

      const isOtherFieldFocused = () => {
        const el = document.activeElement;
        if (!el || el === document.body) return false;
        const tag = el.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
        return el.hasAttribute('contenteditable');
      };

      if (isOtherFieldFocused()) {
        return;
      }

      if (e.key === 'Escape' && editingCell) {
        e.preventDefault();
        const k = cellKey(editingCell.r, editingCell.c);
        setValueByCell((prev) => ({ ...prev, [k]: getEditingValueForSave() }));
        setSelectedCell({ r: editingCell.r, c: editingCell.c });
        setEditingCell(null);
        editingDraftRef.current = '';
        setEditingDraft('');
        return;
      }

      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.isComposing) return;

      if (editingCell) {
        if (e.key.length === 1) {
          e.preventDefault();
          setEditingDraft((prev) => {
            const next = prev + e.key;
            editingDraftRef.current = next;
            return next;
          });
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const ta = getNativeTextareaFromAntdRef(editTextAreaRef);
              const len = ta?.value.length ?? 0;
              ta?.focus({ preventScroll: true });
              ta?.setSelectionRange(len, len);
            });
          });
        }
        return;
      }

      if (selectedCell && e.key.length === 1) {
        e.preventDefault();
        const k = cellKey(selectedCell.r, selectedCell.c);
        const displayText =
          valueByCellRef.current[k] ?? `R${selectedCell.r + 1} C${selectedCell.c + 1}`;
        pendingFocusAfterKeyboardOpenRef.current = true;
        setEditingCell({ r: selectedCell.r, c: selectedCell.c });
        {
          const next = displayText + e.key;
          editingDraftRef.current = next;
          setEditingDraft(next);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [enableEditMode, selectedCell, editingCell, getEditingValueForSave]);

  return (
    <>
      {Array.from({ length: displayRowCount }).map((_, rowIndex) => {
        const isHeader = rowIndex === 0;
        const isLastRow = rowIndex === displayRowCount - 1;
        const hovered = hoveredRowIndex === rowIndex;
        const bodyRowIndex = rowIndex - 1;
        const isInsertRowPlaceholder = isInsertRowPlaceholderIndex(rowIndex);
        const active = !isHeader && !isInsertRowPlaceholder && !!checkedByBodyRow[bodyRowIndex];

        return (
          <div
            key={`row-${rowIndex}`}
            role="row"
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement | null;
              const enteredInsertCol =
                enableInsertRowCol &&
                rowIndex > 0 &&
                !!target?.closest('[data-insert-col-placeholder="true"]');
              if (enteredInsertCol) {
                setHoveredRowIndex(null);
                return;
              }
              setHoveredRowIndex(rowIndex);
            }}
            onMouseLeave={() => setHoveredRowIndex(null)}
            onClick={() => {
              if (enableEditMode) return;
              if (!isHeader && !isInsertRowPlaceholder) {
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
              cursor: isHeader || isInsertRowPlaceholder ? 'default' : 'pointer',
            }}
          >
            <div
              onClick={(e) => {
                if (!enableEditMode) return;
                if (isHeader || isInsertRowPlaceholder) return;
                e.stopPropagation();
                setCheckedByBodyRow((prev) => ({
                  ...prev,
                  [bodyRowIndex]: !prev[bodyRowIndex],
                }));
              }}
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
                showRightBorder={
                  !isHeader && enableBodyCellRightBorder && !enableFreezeFirstCol && !isInsertRowPlaceholder
                }
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
                ) : isInsertRowPlaceholder ? (
                  <div
                    role="button"
                    tabIndex={0}
                    style={{ display: 'flex', justifyContent: 'center', width: '100%', cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onInsertRow();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        onInsertRow();
                      }
                    }}
                  >
                    <DgjIcon type="add" fontSize={16} style={{ color: dgjTokens.color.neutral.text.icon }} />
                  </div>
                ) : enableShowRowIndex && !hovered && !active ? (
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

            {Array.from({ length: displayColCount }).map((__, colIndex) => {
              const storedW = enableColumnResize ? colWidths[colIndex] ?? null : null;
              const layoutW: number | null =
                insertLayoutTextColPx != null
                  ? storedW != null
                    ? storedW
                    : insertLayoutTextColPx
                  : storedW;
              const isInsertColPlaceholder = isInsertColPlaceholderIndex(colIndex);
              const isInsertRowTextClickable =
                isInsertRowPlaceholder && !isInsertColPlaceholder && !isHeader && colIndex < colCount;

              const isLastTextColBeforeInsert =
                enableInsertRowCol && !isHeader && colIndex === colCount - 1;

              const shouldHideRightBorderForFrozenLastCol =
                enableFreezeLastCol && !enableInsertRowCol && colIndex === colCount - 1;

              const shouldHideRightBorderForLastUnfrozenBeforeFrozenLast =
                enableFreezeLastCol &&
                enableBodyCellRightBorder &&
                colCount >= 2 &&
                colIndex === colCount - 2;

              const canResizeHeaderTextCol = isHeader && enableColumnResize && colIndex < colCount;

              const isBody = rowIndex > 0;
              const isEditableBodyCell =
                enableEditMode &&
                isBody &&
                !isInsertRowPlaceholder &&
                colIndex < colCount &&
                !isInsertColPlaceholder;
              const isEditing =
                isEditableBodyCell &&
                !!editingCell &&
                editingCell.r === bodyRowIndex &&
                editingCell.c === colIndex;
              const key = cellKey(bodyRowIndex, colIndex);
              const displayText = valueByCell[key] ?? `R${bodyRowIndex + 1} C${colIndex + 1}`;
              const cellActive = isInsertColPlaceholder ? false : active;
              const isEditableBodyDisplayCell =
                isBody && !isInsertRowPlaceholder && !isInsertColPlaceholder && colIndex < colCount;
              const isHoverLocked =
                enableEditMode &&
                isBody &&
                !isInsertRowPlaceholder &&
                !isInsertColPlaceholder &&
                colIndex < colCount &&
                hoverLockedCell?.r === bodyRowIndex &&
                hoverLockedCell?.c === colIndex;

              return (
                <div
                  key={`r-${rowIndex}-c-${colIndex}`}
                  data-insert-col-placeholder={isInsertColPlaceholder && !isHeader ? 'true' : undefined}
                  data-hover-lock-cell={isEditableBodyDisplayCell && enableEditMode ? '' : undefined}
                  data-body-row={isEditableBodyDisplayCell ? bodyRowIndex : undefined}
                  data-col={isEditableBodyDisplayCell ? colIndex : undefined}
                  onClick={(e) => {
                    if (!isHeader && isInsertColPlaceholder) {
                      e.stopPropagation();
                      return;
                    }
                    if (isHeader && isInsertColPlaceholder) {
                      e.stopPropagation();
                      onInsertColumn();
                      return;
                    }
                    if (
                      enableEditMode &&
                      isBody &&
                      !isInsertRowPlaceholder &&
                      !isInsertColPlaceholder &&
                      colIndex < colCount
                    ) {
                      setHoverLockedCell({ r: bodyRowIndex, c: colIndex });
                    }
                    if (isEditableBodyCell) {
                      e.stopPropagation();
                      setSelectedCell(null);
                      if (editingCell?.r === bodyRowIndex && editingCell?.c === colIndex) {
                        return;
                      }
                      if (
                        editingCell &&
                        (editingCell.r !== bodyRowIndex || editingCell.c !== colIndex)
                      ) {
                        const prevKey = cellKey(editingCell.r, editingCell.c);
                        setValueByCell((v) => ({ ...v, [prevKey]: getEditingValueForSave() }));
                      }
                      setEditingCell({ r: bodyRowIndex, c: colIndex });
                      editingDraftRef.current = displayText;
                      setEditingDraft(displayText);
                      return;
                    }
                    if (!isInsertRowTextClickable) return;
                    e.stopPropagation();
                    onInsertRow();
                  }}
                  style={
                    isInsertColPlaceholder
                      ? {
                          flex: `0 0 ${insertColWidth}px`,
                          minWidth: insertColWidth,
                          display: 'flex',
                          position:
                            enableFreezeLastCol && enableInsertRowCol
                              ? 'sticky'
                              : enableFreezeFirstCol && colIndex === 0
                                ? 'sticky'
                                : undefined,
                          left:
                            enableFreezeFirstCol && colIndex === 0 ? narrowWidth : undefined,
                          right: enableFreezeLastCol && enableInsertRowCol ? 0 : undefined,
                          zIndex: enableFreezeLastCol && enableInsertRowCol ? 5 : undefined,
                          cursor: isHeader ? 'pointer' : 'default',
                        }
                      : {
                          ...getTextColWrapStyle(
                            layoutW,
                            minTextColWidth,
                            narrowWidth,
                            colIndex,
                            colCount,
                            enableFreezeFirstCol,
                            enableFreezeLastCol,
                            enableInsertRowCol && enableFreezeLastCol ? narrowWidth : 0
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
                  {enableFreezeFirstCol && colIndex === 0 ? (
                    <span aria-hidden="true" style={getFreezeDividerStyle('right')} />
                  ) : null}
                  {enableFreezeLastCol && colIndex === colCount - 1 ? (
                    <span aria-hidden="true" style={getFreezeDividerStyle('left')} />
                  ) : null}
                  <BizTableCell
                    variant={isHeader ? 'thead' : 'tbody'}
                    hovered={isInsertColPlaceholder && !isHeader ? false : hovered || isHoverLocked}
                    hoverByCell={isHeader}
                    active={cellActive}
                    zoom={canResizeHeaderTextCol}
                    onColumnResizeStart={canResizeHeaderTextCol ? onColumnResizeStart(colIndex) : undefined}
                    isLastRow={isHeader || !isInsertColPlaceholder ? isLastRow : true}
                    isFrozen={
                      (enableFreezeFirstCol && colIndex === 0) ||
                      (enableFreezeLastCol && colIndex === colCount - 1) ||
                      (enableFreezeLastCol && enableInsertRowCol && isInsertColPlaceholder)
                    }
                    showRightBorder={
                      !isHeader &&
                      !isInsertColPlaceholder &&
                      !(enableFreezeFirstCol && colIndex === 0) &&
                      (isLastTextColBeforeInsert
                        ? true
                        : enableBodyCellRightBorder &&
                          !isInsertRowPlaceholder &&
                          !shouldHideRightBorderForFrozenLastCol &&
                          !shouldHideRightBorderForLastUnfrozenBeforeFrozenLast)
                    }
                    contentPaddingY={
                      isHeader ? 8 : isEditing ? EDIT_CELL_EDGE_PADDING : BODY_CELL_PADDING_Y
                    }
                    contentPaddingX={
                      isHeader ? 12 : isEditing ? EDIT_CELL_EDGE_PADDING : BODY_CELL_PADDING_X
                    }
                    contentAlignY={!isHeader && !enableVerticalCenter ? 'flex-start' : 'center'}
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
                    ) : isInsertColPlaceholder ? (
                      null
                    ) : isInsertRowPlaceholder ? (
                      null
                    ) : isEditing ? (
                      <Input.TextArea
                        ref={editTextAreaRef}
                        autoFocus={false}
                        autoSize={{ minRows: 1, maxRows: EDIT_TEXTAREA_MAX_ROWS }}
                        value={editingDraft}
                        onChange={(ev) => {
                          const v = ev.target.value;
                          editingDraftRef.current = v;
                          setEditingDraft(v);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        onBlur={() => {
                          setValueByCell((prev) => ({ ...prev, [key]: getEditingValueForSave() }));
                        }}
                        onKeyDown={(e) => {
                          const exit =
                            e.key === 'Escape' || (e.key === 'Enter' && (e.metaKey || e.ctrlKey));
                          if (!exit) return;
                          e.preventDefault();
                          setValueByCell((prev) => ({ ...prev, [key]: getEditingValueForSave() }));
                          setSelectedCell({ r: bodyRowIndex, c: colIndex });
                          setEditingCell(null);
                          editingDraftRef.current = '';
                          setEditingDraft('');
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
                          justifyContent: enableVerticalCenter ? 'center' : 'flex-start',
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
            })}
          </div>
        );
      })}
    </>
  );
}
