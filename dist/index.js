import { forwardRef, useEffect } from 'react';
import { ConfigProvider } from 'antd';
export { Affix, Alert, Anchor, AutoComplete, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Cascader, Checkbox, Col, Collapse, ColorPicker, DatePicker, Descriptions, Divider, Drawer, Dropdown, Empty, Flex, FloatButton, Form, Grid, Image, Input, InputNumber, Layout, List, Mentions, Menu, Modal, Pagination, Popconfirm, Popover, Progress, QRCode, Radio, Rate, Result, Row, Segmented, Select, Skeleton, Slider, Space, Spin, Splitter, Statistic, Steps, Switch, Table, Tabs, Tag, TimePicker, Timeline, Tooltip, Tour, Transfer, Tree, TreeSelect, Typography, Upload, message, notification } from 'antd';
import { jsx } from 'react/jsx-runtime';

// src/theme/dgjTokens.ts
var dgjTokens = {
  color: {
    primary: {
      bg: "#ECF6FF",
      bgHover: "#D7ECFF",
      border: "#D7ECFF",
      borderHover: "#B4DBFF",
      hover: "#39A0FF",
      default: "#0888FF",
      active: "#077AE5",
      textHover: "#39A0FF",
      text: "#0888FF",
      textActive: "#077AE5"
    },
    neutral: {
      background: {
        container: "#FFFFFF",
        elevated: "#FFFFFF",
        layout: "#F0F1F2",
        spotlight: "rgba(0,0,0,0.7)",
        mask: "rgba(0,0,0,0.5)",
        containerDisabled: "rgba(0,0,0,0.05)",
        controlItemBgHover: "rgba(0,0,0,0.05)",
        controlItemBgActive: "#ECF6FF",
        controlItemBgActiveHover: "#D7ECFF",
        controlItemBgActiveDisabled: "rgba(0,0,0,0.1)"
      },
      fill: {
        default: "rgba(0,0,0,0.1)",
        secondary: "rgba(0,0,0,0.05)"
      },
      text: {
        default: "rgba(0,0,0,0.9)",
        label: "rgba(0,0,0,0.7)",
        description: "rgba(0,0,0,0.5)",
        placeholder: "rgba(0,0,0,0.3)",
        disabled: "rgba(0,0,0,0.3)",
        icon: "rgba(0,0,0,0.5)",
        iconHover: "rgba(0,0,0,0.7)",
        solid: "#FFFFFF"
      },
      border: {
        default: "#E1E2E4",
        secondary: "#F0F1F2",
        split: "rgba(0,0,0,0.05)"
      }
    },
    success: {
      bg: "#F4F9ED",
      bgHover: "#E8F2DB",
      border: "#E8F2DB",
      borderHover: "#D5E6BC",
      hover: "#8FBD4C",
      default: "#73AC1F",
      active: "#679A1C",
      textHover: "#8FBD4C",
      text: "#73AC1F",
      textActive: "#679A1C"
    },
    warning: {
      bg: "#FEF6EB",
      bgHover: "#FDECD6",
      border: "#FDECD6",
      borderHover: "#FADCB3",
      hover: "#F4A335",
      default: "#F18C03",
      active: "#D87E03",
      textHover: "#F4A335",
      text: "#F18C03",
      textActive: "#D87E03"
    },
    error: {
      bg: "#FEF2EF",
      bgHover: "#FBE4DD",
      border: "#FBE4DD",
      borderHover: "#F8CCC0",
      hover: "#EE7958",
      default: "#EA572E",
      active: "#D24E29",
      textHover: "#EE7958",
      text: "#EA572E",
      textActive: "#D24E29"
    },
    info: {
      bg: "#ECF6FF",
      bgHover: "#D7ECFF",
      border: "#D7ECFF",
      borderHover: "#B4DBFF",
      hover: "#39A0FF",
      default: "#0888FF",
      active: "#077AE5",
      textHover: "#39A0FF",
      text: "#0888FF",
      textActive: "#077AE5"
    }
  },
  size: {
    padding: {
      xxxs: 2,
      xxs: 4,
      xs: 8,
      sm: 12,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 28,
      xxxl: 32
    },
    controlHeight: {
      lg: 40,
      md: 32,
      sm: 24,
      xs: 16
    }
  },
  style: {
    borderRadius: {
      xl: 16,
      lg: 8,
      md: 6,
      sm: 4,
      xs: 2
    },
    font: {
      family: {
        primary: "PingFang SC",
        number: "Barlow"
      },
      weight: {
        regular: "Regular",
        medium: "Medium",
        semibold: "SemiBold"
      },
      size: {
        sm: 12,
        base: 14,
        md: 16,
        lg: 20,
        xl: 24,
        xxl: 32
      },
      lineHeight: {
        sm: 20,
        base: 22,
        md: 24,
        lg: 28,
        xl: 32,
        xxl: 40
      }
    }
  }
};

// src/theme/buildAntdTheme.ts
var baseDgjTheme = dgjTokens;
function buildAntdTheme(tokens = dgjTokens) {
  const { color, size, style } = tokens;
  const theme = {
    token: {
      // brand & primary
      colorPrimary: color.primary.default,
      colorPrimaryBg: color.primary.bg,
      colorPrimaryBgHover: color.primary.bgHover,
      colorPrimaryHover: color.primary.hover,
      colorPrimaryActive: color.primary.active,
      colorPrimaryBorder: color.primary.border,
      colorPrimaryBorderHover: color.primary.borderHover,
      colorPrimaryText: color.primary.text,
      colorPrimaryTextHover: color.primary.textHover,
      colorPrimaryTextActive: color.primary.textActive,
      // neutral background
      colorBgContainer: color.neutral.background.container,
      colorBgElevated: color.neutral.background.elevated,
      colorBgLayout: color.neutral.background.layout,
      colorBgMask: color.neutral.background.mask,
      // neutral text
      colorText: color.neutral.text.default,
      colorTextSecondary: color.neutral.text.label,
      colorTextTertiary: color.neutral.text.description,
      colorTextQuaternary: color.neutral.text.placeholder,
      // borders & split line
      colorBorder: color.neutral.border.default,
      colorBorderSecondary: color.neutral.border.secondary,
      colorSplit: color.neutral.border.split,
      // semantic colors
      colorSuccess: color.success.default,
      colorSuccessBg: color.success.bg,
      colorSuccessBorder: color.success.border,
      colorWarning: color.warning.default,
      colorWarningBg: color.warning.bg,
      colorWarningBorder: color.warning.border,
      colorError: color.error.default,
      colorErrorBg: color.error.bg,
      colorErrorBorder: color.error.border,
      colorInfo: color.info.default,
      colorInfoBg: color.info.bg,
      colorInfoBorder: color.info.border,
      // font
      fontFamily: style.font.family.primary,
      fontSize: style.font.size.base,
      fontSizeSM: style.font.size.sm,
      fontSizeLG: style.font.size.md,
      // radius
      borderRadius: style.borderRadius.md,
      borderRadiusSM: style.borderRadius.sm,
      borderRadiusLG: style.borderRadius.lg,
      // control sizes
      controlHeight: size.controlHeight.md,
      controlHeightLG: size.controlHeight.lg,
      controlHeightSM: size.controlHeight.sm,
      paddingXS: size.padding.xs,
      paddingSM: size.padding.sm,
      padding: size.padding.md,
      paddingLG: size.padding.lg,
      paddingXL: size.padding.xl
    },
    components: {
      Input: {
        controlHeight: size.controlHeight.md,
        controlHeightLG: size.controlHeight.md,
        controlHeightSM: size.controlHeight.sm,
        fontSize: style.font.size.base,
        fontSizeLG: style.font.size.base,
        fontSizeSM: style.font.size.sm
      },
      Select: {
        controlHeight: size.controlHeight.md,
        controlHeightLG: size.controlHeight.md,
        controlHeightSM: size.controlHeight.sm,
        fontSize: style.font.size.base,
        fontSizeLG: style.font.size.base,
        fontSizeSM: style.font.size.sm
      }
    }
  };
  return theme;
}
var DgjConfigProvider = ({
  children,
  applyGlobalFont = true,
  ...rest
}) => {
  useEffect(() => {
    if (!applyGlobalFont || typeof document === "undefined") return;
    const previous = document.body.style.fontFamily;
    document.body.style.fontFamily = `'PingFang SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`;
    return () => {
      document.body.style.fontFamily = previous;
    };
  }, [applyGlobalFont]);
  const theme = buildAntdTheme();
  return /* @__PURE__ */ jsx(
    ConfigProvider,
    {
      theme,
      ...rest,
      children
    }
  );
};
var DgjIcon = forwardRef(function DgjIcon2({ type, className = "", style, fontSize, ...rest }, ref) {
  const iconClassName = `iconfont icon-${type} ${className}`.trim();
  const combinedStyle = { ...style, ...fontSize != null ? { fontSize } : {} };
  return /* @__PURE__ */ jsx(
    "i",
    {
      ref,
      className: iconClassName,
      style: combinedStyle,
      "aria-hidden": true,
      ...rest
    }
  );
});

export { DgjConfigProvider, DgjIcon, baseDgjTheme, buildAntdTheme, dgjTokens };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map