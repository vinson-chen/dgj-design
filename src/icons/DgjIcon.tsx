import React, { forwardRef } from 'react';

export interface DgjIconProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * 图标类型，对应 iconfont 的 class 后缀，最终渲染为 className="iconfont icon-{type}"
   * 例如 type="search" → icon-search。同一图标若有 search / search-filled 两种，默认使用无 -filled 后缀的。
   */
  type: string;
  /** 图标字号，便于与文案对齐 */
  fontSize?: number | string;
}

const DgjIcon = forwardRef<HTMLElement, DgjIconProps>(function DgjIcon(
  { type, className = '', style, fontSize, ...rest },
  ref
) {
  const iconClassName = `iconfont icon-${type} ${className}`.trim();
  const combinedStyle = { ...style, ...(fontSize != null ? { fontSize } : {}) };
  return (
    <i
      ref={ref as React.Ref<HTMLSpanElement>}
      className={iconClassName}
      style={combinedStyle}
      aria-hidden
      {...rest}
    />
  );
});

export { DgjIcon };
