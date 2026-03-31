import React from 'react';
import { dgjTokens } from 'dgj-design';
import { DispatchSiderMenu } from 'dgj-biz';

export default function DispatchSiderMenuDemo() {
  return (
    <>
      <h1 style={{ marginBottom: 8, fontWeight: 600 }}>导航区</h1>
      <p style={{ color: dgjTokens.color.neutral.text.description, marginBottom: 16 }}>
        基于 Figma 节点 465:15486，实现暗色主题 menu/group/item 层级与内部交互（分组展开收起、子项选中）。
      </p>
      <div
        style={{
          background: dgjTokens.color.neutral.background.layout,
          border: `1px solid ${dgjTokens.color.neutral.border.default}`,
          borderRadius: dgjTokens.style.borderRadius.lg,
          padding: 16,
          minHeight: 840,
        }}
      >
        <DispatchSiderMenu />
      </div>
    </>
  );
}
