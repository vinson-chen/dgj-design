import React from 'react';
import { dgjTokens } from 'dgj-design';

export type BizMenuItemAlign = 'left' | 'center';
export type BizMenuItemState = 'default' | 'hover' | 'active';

export interface BizMenuItemProps {
  label: string;
  displayLabel?: string;
  align?: BizMenuItemAlign;
  state?: BizMenuItemState | undefined;
  dark?: boolean;
  onClick?: () => void;
}

export default function BizMenuItem({
  label,
  displayLabel,
  align = 'left',
  state,
  dark = true,
  onClick,
}: BizMenuItemProps) {
  const [isHovering, setIsHovering] = React.useState(false);
  const finalState: BizMenuItemState =
    state ?? (isHovering ? 'hover' : 'default');
  const isActive = finalState === 'active';
  const isHover = finalState === 'hover';

  const background = isActive
    ? dgjTokens.color.primary.default
    : isHover
      ? dark
        ? dgjTokens.color.menu.itemHoverOverlayOnNav
        : dgjTokens.color.neutral.fill.secondary
      : 'transparent';

  const color = isActive
    ? dgjTokens.color.neutral.text.solid
    : dark
      ? isHover
        ? dgjTokens.color.neutral.text.solid
        : dgjTokens.color.menu.textSecondaryOnNav
      : isHover
        ? dgjTokens.color.neutral.text.default
        : dgjTokens.color.neutral.text.label;

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        width: align === 'left' ? 84 : 40,
        height: 28,
        border: 'none',
        borderRadius: dgjTokens.style.borderRadius.sm,
        background,
        color,
        textAlign: align === 'left' ? 'left' : 'center',
        fontSize: 12,
        lineHeight: '20px',
        padding: align === 'left' ? '4px 8px' : '4px 0',
        cursor: 'pointer',
        fontFamily: 'inherit',
      }}
    >
      {displayLabel ?? label}
    </button>
  );
}
