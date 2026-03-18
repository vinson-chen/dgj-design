import React from 'react';
import { Carousel, Space, dgjTokens } from 'dgj-design';

const contentStyle: React.CSSProperties = {
  height: 160,
  color: dgjTokens.color.neutral.text.solid,
  lineHeight: '160px',
  textAlign: 'center',
  background: dgjTokens.color.primary.default,
  borderRadius: dgjTokens.style.borderRadius.md,
};

export default function CarouselDemo() {
  return (
    <>
      <h1 style={{ marginBottom: 8, fontWeight: 600 }}>Carousel 走马灯</h1>
      <p style={{ color: dgjTokens.color.neutral.text.description, marginBottom: 24 }}>
        一组轮播区域，支持自动切换、箭头、指示点位置与渐显效果。规范见 docs/carousel-spec.md。
      </p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, marginBottom: 12, color: dgjTokens.color.neutral.text.label }}>
          基本
        </h2>
        <div
          style={{
            background: dgjTokens.color.neutral.background.layout,
            borderRadius: dgjTokens.style.borderRadius.lg,
            padding: 24,
          }}
        >
          <Carousel>
            <div><div style={contentStyle}>1</div></div>
            <div><div style={contentStyle}>2</div></div>
            <div><div style={contentStyle}>3</div></div>
            <div><div style={contentStyle}>4</div></div>
          </Carousel>
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, marginBottom: 12, color: dgjTokens.color.neutral.text.label }}>
          自动切换与箭头
        </h2>
        <div
          style={{
            background: dgjTokens.color.neutral.background.layout,
            borderRadius: dgjTokens.style.borderRadius.lg,
            padding: 24,
          }}
        >
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Carousel autoplay>
              <div><div style={contentStyle}>1</div></div>
              <div><div style={contentStyle}>2</div></div>
              <div><div style={contentStyle}>3</div></div>
              <div><div style={contentStyle}>4</div></div>
            </Carousel>
            <Carousel arrows>
              <div><div style={contentStyle}>1</div></div>
              <div><div style={contentStyle}>2</div></div>
              <div><div style={contentStyle}>3</div></div>
              <div><div style={contentStyle}>4</div></div>
            </Carousel>
          </Space>
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, marginBottom: 12, color: dgjTokens.color.neutral.text.label }}>
          指示点位置与渐显
        </h2>
        <div
          style={{
            background: dgjTokens.color.neutral.background.layout,
            borderRadius: dgjTokens.style.borderRadius.lg,
            padding: 24,
          }}
        >
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Carousel dotPlacement="top">
              <div><div style={contentStyle}>top</div></div>
              <div><div style={contentStyle}>2</div></div>
              <div><div style={contentStyle}>3</div></div>
            </Carousel>
            <Carousel effect="fade">
              <div><div style={contentStyle}>fade 1</div></div>
              <div><div style={contentStyle}>fade 2</div></div>
              <div><div style={contentStyle}>fade 3</div></div>
            </Carousel>
          </Space>
        </div>
      </section>
    </>
  );
}
