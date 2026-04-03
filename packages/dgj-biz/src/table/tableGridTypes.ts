import type React from 'react';

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
  insertLayoutTextColPx: number | null;
}>;
