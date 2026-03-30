import React from 'react';
import { dgjTokens } from 'dgj-design';
import BizMenu from '../biz-components/menu/BizMenu';

export default function BizMenuCaseDemo() {
  return (
    <>
      <h1 style={{ marginBottom: 8, fontWeight: 600 }}>DispatchSiderNav 导航区</h1>
      <p style={{ color: dgjTokens.color.neutral.text.description, marginBottom: 24 }}>
        本例为侧栏导航；后续可在此区补充顶部导航等案例。结构与样式对齐 Figma Menu 实例。
      </p>
      <section style={{ marginBottom: 32 }}>
        <div
          style={{
            display: 'inline-block',
            background: dgjTokens.color.neutral.background.layout,
            border: `1px solid ${dgjTokens.color.neutral.border.default}`,
            borderRadius: dgjTokens.style.borderRadius.lg,
            padding: 24,
            minHeight: 840,
          }}
        >
          <BizMenu />
        </div>
      </section>
    </>
  );
}
