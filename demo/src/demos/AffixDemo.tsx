import React from 'react';
import { Affix, Button, dgjTokens } from 'dgj-design';

export default function AffixDemo() {
  const sectionStyle = {
    background: dgjTokens.color.neutral.background.layout,
    borderRadius: dgjTokens.style.borderRadius.lg,
    padding: 24,
  };
  const h2Style = {
    fontSize: 16,
    marginBottom: 12,
    color: dgjTokens.color.neutral.text.label,
  };

  return (
    <>
      <h1 style={{ marginBottom: 8, fontWeight: 600 }}>Affix 固钉</h1>
      <p style={{ color: dgjTokens.color.neutral.text.description, marginBottom: 24 }}>
        将元素固定在可视区域指定位置，常用于固定操作区或导航。规范见 docs/affix-spec.md。
      </p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={h2Style}>基本（固定在顶部）</h2>
        <div style={sectionStyle}>
          <Affix offsetTop={80}>
            <Button type="primary">固定操作按钮</Button>
          </Affix>
          <div style={{ height: 300, marginTop: 24, color: dgjTokens.color.neutral.text.description }}>
            向下滚动页面时，按钮会在距离顶部 80px 处固定。
          </div>
        </div>
      </section>
    </>
  );
}

