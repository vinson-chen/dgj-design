import React from 'react';
import { dgjTokens } from 'dgj-design';
import BizMenu from '../biz-components/menu/BizMenu';

export default function BizMenuLayoutDemo() {
  return (
    <>
      <h1 style={{ marginBottom: 8, fontWeight: 600 }}>导航区 · 第三步 menu 布局结构</h1>
      <p style={{ color: dgjTokens.color.neutral.text.description, marginBottom: 16 }}>
        点击右上角图标触发展开收起（small:false / small:true）。
      </p>
      <div
        style={{
          background: dgjTokens.color.neutral.background.layout,
          borderRadius: 8,
          border: `1px solid ${dgjTokens.color.neutral.border.default}`,
          padding: 16,
          minHeight: 840,
        }}
      >
        <BizMenu />
      </div>
    </>
  );
}
