import React from 'react';
import { TableGridContextProvider, type TableGridContextValue } from './TableGridContext';
import TableGridRow from './TableGridRow';
import type { TableRowsProps } from './tableGridTypes';
import { useTableGridEditing } from './useTableGridEditing';

export type { TableRowsProps } from './tableGridTypes';

export default function TableRows(props: TableRowsProps) {
  const editing = useTableGridEditing(props.enableEditMode);
  const displayRowCount = props.rowCount + (props.enableInsertRowCol ? 1 : 0);
  const value = { ...props, ...editing } satisfies TableGridContextValue;

  return (
    <TableGridContextProvider value={value}>
      {Array.from({ length: displayRowCount }).map((_, rowIndex) => (
        <TableGridRow key={`row-${rowIndex}`} rowIndex={rowIndex} />
      ))}
    </TableGridContextProvider>
  );
}
