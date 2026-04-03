import React, { useMemo } from 'react';
import { TableGridConfigContextProvider } from './tableGridConfigContext';
import { TableGridEditingContextProvider } from './tableGridEditingContext';
import TableGridRow from './TableGridRow';
import type { TableRowsProps } from './tableGridTypes';
import { useTableGridEditing } from './useTableGridEditing';

export type { TableRowsProps } from './tableGridTypes';

export default function TableRows(props: TableRowsProps) {
  const editing = useTableGridEditing(props.enableEditMode);
  const displayRowCount = props.rowCount + (props.enableInsertRowCol ? 1 : 0);

  const configValue = useMemo(
    () => props,
    [
      props.rowCount,
      props.colCount,
      props.enableInsertRowCol,
      props.enableEditMode,
      props.rowMinWidth,
      props.narrowWidth,
      props.minTextColWidth,
      props.enableColumnResize,
      props.enableVerticalCenter,
      props.enableFreezeFirstCol,
      props.enableFreezeLastCol,
      props.enableBodyCellRightBorder,
      props.enableShowRowIndex,
      props.hoveredRowIndex,
      props.setHoveredRowIndex,
      props.checkedByBodyRow,
      props.setCheckedByBodyRow,
      props.headerAllChecked,
      props.headerIndeterminate,
      props.toggleAllHeader,
      props.colWidths,
      props.onColumnResizeStart,
      props.onInsertRow,
      props.onInsertColumn,
      props.insertLayoutTextColPx,
    ]
  );

  return (
    <TableGridConfigContextProvider value={configValue}>
      <TableGridEditingContextProvider value={editing}>
        {Array.from({ length: displayRowCount }).map((_, rowIndex) => (
          <TableGridRow key={`row-${rowIndex}`} rowIndex={rowIndex} />
        ))}
      </TableGridEditingContextProvider>
    </TableGridConfigContextProvider>
  );
}
