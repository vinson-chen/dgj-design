import { useCallback, useMemo, useRef, useState } from 'react';

export function useRowSelection(bodyRowCount: number) {
  const [checkedByBodyRow, setCheckedByBodyRow] = useState<Record<number, boolean>>({});

  const checkedCount = useMemo(() => {
    let acc = 0;
    for (let i = 0; i < bodyRowCount; i += 1) {
      if (checkedByBodyRow[i]) acc += 1;
    }
    return acc;
  }, [bodyRowCount, checkedByBodyRow]);

  const headerAllChecked = bodyRowCount > 0 && checkedCount === bodyRowCount;
  const headerIndeterminate = bodyRowCount > 0 && checkedCount > 0 && checkedCount < bodyRowCount;

  const toggleAllHeader = useCallback(
    (checked: boolean) => {
      setCheckedByBodyRow((prev) => {
        const next: Record<number, boolean> = { ...prev };
        for (let i = 0; i < bodyRowCount; i += 1) next[i] = checked;
        return next;
      });
    },
    [bodyRowCount]
  );

  return {
    checkedByBodyRow,
    setCheckedByBodyRow,
    checkedCount,
    headerAllChecked,
    headerIndeterminate,
    toggleAllHeader,
  };
}

export function useColumnResize(gridMax: number, minTextColW: number) {
  const [colWidths, setColWidths] = useState<Array<number | null>>(
    () => Array.from({ length: gridMax }, () => null)
  );
  const isResizingRef = useRef(false);

  const onColumnResizeStart = useCallback(
    (colIndex: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      isResizingRef.current = true;
      const startX = e.clientX;
      const startW = colWidths[colIndex] ?? 160;

      const onMove = (ev: MouseEvent) => {
        const nextW = Math.max(minTextColW, Math.round(startW + (ev.clientX - startX)));
        setColWidths((prev) => {
          const copy = [...prev];
          copy[colIndex] = nextW;
          return copy;
        });
      };

      const onUp = () => {
        isResizingRef.current = false;
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    },
    [colWidths, minTextColW]
  );

  return { colWidths, setColWidths, isResizingRef, onColumnResizeStart };
}
