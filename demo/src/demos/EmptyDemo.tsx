import React from 'react';
import { dgjTokens } from 'dgj-design';

interface EmptyDemoProps {
  componentName: string;
}

export default function EmptyDemo({ componentName }: EmptyDemoProps) {
  return (
    <>
      <h1 style={{ marginBottom: 8, fontWeight: 600 }}>{componentName}</h1>
      <div
        style={{
          padding: 48,
          textAlign: 'center',
          background: dgjTokens.color.neutral.background.layout,
          borderRadius: dgjTokens.style.borderRadius.lg,
          color: dgjTokens.color.neutral.text.description,
        }}
      >
        暂无演示，后续补充。
      </div>
    </>
  );
}
