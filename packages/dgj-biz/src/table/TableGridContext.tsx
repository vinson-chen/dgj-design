import React, { createContext, useContext } from 'react';
import type { TableRowsProps } from './tableGridTypes';
import type { TableGridEditingState } from './useTableGridEditing';

export type TableGridContextValue = TableRowsProps & TableGridEditingState;

const TableGridContext = createContext<TableGridContextValue | null>(null);

export function useTableGridContext(): TableGridContextValue {
  const v = useContext(TableGridContext);
  if (v == null) {
    throw new Error('useTableGridContext must be used within TableRows');
  }
  return v;
}

export const TableGridContextProvider = TableGridContext.Provider;
