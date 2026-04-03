import React, { useCallback, useMemo, useState } from 'react';
import { Slider, Switch, Typography, dgjTokens } from 'dgj-design';
import { useColumnResize, useRowSelection } from './table/useTableGridState';
import TableRows from './table/TableRows';

const GRID_MIN = 2;
const GRID_MAX = 20;
const MIN_TEXT_COL_W = 100;
const NARROW_W = 40; // 左侧 checkbox 窄格
/** 开启「插入行列」时：文本列固定默认宽度（不等分总宽）；插入列/checkbox 列仍为 NARROW_W */
const INSERT_MODE_TEXT_COL_PX = 160;

export function useTableAreaDemoState() {
  const [rowCount, setRowCount] = useState(20);
  const [colCount, setColCount] = useState(10);
  const [enableColumnResize, setEnableColumnResize] = useState(true);
  const [enableVerticalCenter, setEnableVerticalCenter] = useState(true);
  const [enableFreezeFirstCol, setEnableFreezeFirstCol] = useState(false);
  const [enableFreezeLastCol, setEnableFreezeLastCol] = useState(false);
  const [enableBodyCellRightBorder, setEnableBodyCellRightBorder] = useState(false);
  const [enableShowRowIndex, setEnableShowRowIndex] = useState(false);
  const [enableInsertRowCol, setEnableInsertRowCol] = useState(false);
  const [enableEditMode, setEnableEditMode] = useState(false);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  const { colWidths, onColumnResizeStart } = useColumnResize(GRID_MAX, MIN_TEXT_COL_W);
  const bodyRowCount = Math.max(0, rowCount - 1);
  const {
    checkedByBodyRow,
    setCheckedByBodyRow,
    headerAllChecked,
    headerIndeterminate,
    toggleAllHeader,
  } = useRowSelection(bodyRowCount);

  const rowMinWidth = useMemo(
    () =>
      NARROW_W +
      colCount * (enableInsertRowCol ? INSERT_MODE_TEXT_COL_PX : MIN_TEXT_COL_W) +
      (enableInsertRowCol ? NARROW_W : 0),
    [colCount, enableInsertRowCol]
  );

  const insertRow = useCallback(() => {
    setRowCount((prev) => Math.min(GRID_MAX, prev + 1));
  }, []);

  const insertColumn = useCallback(() => {
    setColCount((prev) => Math.min(GRID_MAX, prev + 1));
  }, []);

  return {
    rowCount,
    setRowCount,
    colCount,
    setColCount,
    enableColumnResize,
    setEnableColumnResize,
    enableVerticalCenter,
    setEnableVerticalCenter,
    enableFreezeFirstCol,
    setEnableFreezeFirstCol,
    enableFreezeLastCol,
    setEnableFreezeLastCol,
    enableBodyCellRightBorder,
    setEnableBodyCellRightBorder,
    enableShowRowIndex,
    setEnableShowRowIndex,
    enableInsertRowCol,
    setEnableInsertRowCol,
    enableEditMode,
    setEnableEditMode,
    insertRow,
    insertColumn,
    hoveredRowIndex,
    setHoveredRowIndex,
    checkedByBodyRow,
    setCheckedByBodyRow,
    headerAllChecked,
    headerIndeterminate,
    toggleAllHeader,
    colWidths,
    onColumnResizeStart,
    rowMinWidth,
    narrowWidth: NARROW_W,
    minTextColWidth: MIN_TEXT_COL_W,
  };
}

export type TableAreaDemoModel = ReturnType<typeof useTableAreaDemoState>;

export function TableAreaConfigPanel(model: TableAreaDemoModel) {
  const {
    colCount,
    setColCount,
    rowCount,
    setRowCount,
    enableColumnResize,
    setEnableColumnResize,
    enableVerticalCenter,
    setEnableVerticalCenter,
    enableFreezeFirstCol,
    setEnableFreezeFirstCol,
    enableFreezeLastCol,
    setEnableFreezeLastCol,
    enableBodyCellRightBorder,
    setEnableBodyCellRightBorder,
    enableShowRowIndex,
    setEnableShowRowIndex,
    enableInsertRowCol,
    setEnableInsertRowCol,
    enableEditMode,
    setEnableEditMode,
  } = model;

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Typography.Text style={{ fontSize: 12, marginRight: 8 }}>列数（文本列） {colCount}</Typography.Text>
        <Slider
          min={GRID_MIN}
          max={GRID_MAX}
          step={1}
          marks={{ 2: '2', 5: '5', 10: '10', 15: '15', 20: '20' }}
          value={colCount}
          onChange={(v) => setColCount(v as number)}
          style={{ maxWidth: 360 }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <Typography.Text style={{ fontSize: 12, marginRight: 8 }}>行数（含表头） {rowCount}</Typography.Text>
        </div>
        <Slider
          min={GRID_MIN}
          max={GRID_MAX}
          step={1}
          marks={{ 2: '2', 5: '5', 10: '10', 15: '15', 20: '20' }}
          value={rowCount}
          onChange={(v) => setRowCount(v as number)}
          style={{ maxWidth: 360 }}
        />
      </div>

      <div style={{ marginBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Typography.Text style={{ fontSize: 12, marginRight: 8 }}>拖拽列宽</Typography.Text>
            <Switch size="small" checked={enableColumnResize} onChange={setEnableColumnResize} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Typography.Text style={{ fontSize: 12, marginRight: 8 }}>垂直居中</Typography.Text>
            <Switch size="small" checked={enableVerticalCenter} onChange={setEnableVerticalCenter} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Typography.Text style={{ fontSize: 12, marginRight: 8 }}>冻结首列</Typography.Text>
            <Switch size="small" checked={enableFreezeFirstCol} onChange={setEnableFreezeFirstCol} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Typography.Text style={{ fontSize: 12, marginRight: 8 }}>冻结末列</Typography.Text>
            <Switch size="small" checked={enableFreezeLastCol} onChange={setEnableFreezeLastCol} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Typography.Text style={{ fontSize: 12, marginRight: 8 }}>右侧描边</Typography.Text>
            <Switch size="small" checked={enableBodyCellRightBorder} onChange={setEnableBodyCellRightBorder} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Typography.Text style={{ fontSize: 12, marginRight: 8 }}>显示序号</Typography.Text>
            <Switch size="small" checked={enableShowRowIndex} onChange={setEnableShowRowIndex} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Typography.Text style={{ fontSize: 12, marginRight: 8 }}>插入行列</Typography.Text>
            <Switch size="small" checked={enableInsertRowCol} onChange={setEnableInsertRowCol} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Typography.Text style={{ fontSize: 12, marginRight: 8 }}>编辑模式</Typography.Text>
            <Switch size="small" checked={enableEditMode} onChange={setEnableEditMode} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TableAreaTableInstance(model: TableAreaDemoModel) {
  const {
    rowCount,
    colCount,
    rowMinWidth,
    narrowWidth,
    minTextColWidth,
    enableColumnResize,
    enableVerticalCenter,
    enableFreezeFirstCol,
    enableFreezeLastCol,
    enableBodyCellRightBorder,
    enableShowRowIndex,
    enableInsertRowCol,
    enableEditMode,
    hoveredRowIndex,
    setHoveredRowIndex,
    checkedByBodyRow,
    setCheckedByBodyRow,
    headerAllChecked,
    headerIndeterminate,
    toggleAllHeader,
    colWidths,
    onColumnResizeStart,
    insertRow,
    insertColumn,
  } = model;

  return (
    <div
      style={{
        width: '100%',
        border: `1px solid ${dgjTokens.color.neutral.border.default}`,
        borderRadius: dgjTokens.style.borderRadius.md,
        overflowX: 'auto',
        background: dgjTokens.color.neutral.background.container,
      }}
    >
      <TableRows
        rowCount={rowCount}
        colCount={colCount}
        rowMinWidth={rowMinWidth}
        narrowWidth={narrowWidth}
        minTextColWidth={minTextColWidth}
        enableColumnResize={enableColumnResize}
        enableVerticalCenter={enableVerticalCenter}
        enableFreezeFirstCol={enableFreezeFirstCol}
        enableFreezeLastCol={enableFreezeLastCol}
        enableBodyCellRightBorder={enableBodyCellRightBorder}
        enableShowRowIndex={enableShowRowIndex}
        enableInsertRowCol={enableInsertRowCol}
        enableEditMode={enableEditMode}
        hoveredRowIndex={hoveredRowIndex}
        setHoveredRowIndex={setHoveredRowIndex}
        checkedByBodyRow={checkedByBodyRow}
        setCheckedByBodyRow={setCheckedByBodyRow}
        headerAllChecked={headerAllChecked}
        headerIndeterminate={headerIndeterminate}
        toggleAllHeader={toggleAllHeader}
        colWidths={colWidths}
        onColumnResizeStart={onColumnResizeStart}
        onInsertRow={insertRow}
        onInsertColumn={insertColumn}
        insertLayoutTextColPx={enableInsertRowCol ? INSERT_MODE_TEXT_COL_PX : null}
      />
    </div>
  );
}
