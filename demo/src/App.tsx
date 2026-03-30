import React, { useState, useCallback, useEffect } from 'react';
import { DgjConfigProvider, dgjTokens } from 'dgj-design';
import { navGroups } from './navConfig';
import { DemoContent } from './demos';

const SIDEBAR_WIDTH = 220;

const allNavKeys = new Set(navGroups.flatMap((g) => g.items.map((i) => i.key)));

function getKeyFromHash(): string {
  const hash = window.location.hash.slice(1).replace(/^\/+/, '').trim();
  return hash && allNavKeys.has(hash) ? hash : 'overview';
}

export default function App() {
  const [selectedKey, setSelectedKey] = useState(getKeyFromHash);
  const resolvedSelectedKey = allNavKeys.has(selectedKey) ? selectedKey : 'overview';

  const syncFromHash = useCallback(() => {
    setSelectedKey(getKeyFromHash());
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [syncFromHash]);

  useEffect(() => {
    if (allNavKeys.has(selectedKey)) {
      return;
    }
    setSelectedKey('overview');
    window.location.hash = 'overview';
  }, [selectedKey]);

  const handleSelect = useCallback((key: string) => {
    setSelectedKey(key);
    window.location.hash = key;
  }, []);

  return (
    <DgjConfigProvider>
      <div
        style={{
          display: 'flex',
          height: '100vh',
          overflow: 'hidden',
          background: dgjTokens.color.neutral.background.layout,
        }}
      >
        {/* 左侧导航：固定高度内独立滚动 */}
        <aside
          style={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            minHeight: 0,
            background: dgjTokens.color.neutral.background.container,
            borderRight: `1px solid ${dgjTokens.color.neutral.border.secondary}`,
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              padding: '16px 16px 12px',
              borderBottom: `1px solid ${dgjTokens.color.neutral.border.secondary}`,
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            dgj-design
          </div>
          <nav style={{ padding: '8px 0' }}>
            {navGroups.map((group) => (
              <div key={group.category || 'overview'}>
                {group.category ? (
                  <div
                    style={{
                      padding: '8px 16px 4px',
                      fontSize: 12,
                      color: dgjTokens.color.neutral.text.description,
                      fontWeight: 500,
                    }}
                  >
                    {group.category}
                  </div>
                ) : null}
                {group.items.map((item) => {
                  const isSelected = resolvedSelectedKey === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleSelect(item.key)}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '8px 16px',
                        border: 'none',
                        background: isSelected ? dgjTokens.color.primary.bg : 'transparent',
                        color: isSelected ? dgjTokens.color.primary.text : dgjTokens.color.neutral.text.default,
                        fontSize: 14,
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background = dgjTokens.color.neutral.fill.secondary;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </aside>

        {/* 主内容区：固定高度内独立滚动 */}
        <main
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            background: dgjTokens.color.neutral.background.layout,
          }}
        >
          <div
            style={{
              padding: 24,
              maxWidth:
                resolvedSelectedKey === 'dispatch-filter-area' ||
                resolvedSelectedKey === 'switch-area'
                  ? 1440
                  : undefined,
            }}
          >
            <DemoContent selectedKey={resolvedSelectedKey} />
          </div>
        </main>
      </div>
    </DgjConfigProvider>
  );
}
