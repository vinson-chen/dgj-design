import React, { createContext, useContext } from 'react';
import type { TableRowsProps } from './tableGridTypes';

const TableGridConfigContext = createContext<TableRowsProps | null>(null);

export function useTableGridConfigContext(): TableRowsProps {
  const v = useContext(TableGridConfigContext);
  if (v == null) {
    throw new Error('useTableGridConfigContext must be used within TableRows');
  }
  return v;
}

export const TableGridConfigContextProvider = TableGridConfigContext.Provider;
