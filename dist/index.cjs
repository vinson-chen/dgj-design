'use strict';

var react = require('react');
var antd = require('antd');
var jsxRuntime = require('react/jsx-runtime');

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
  react.useEffect(() => {
    if (!applyGlobalFont || typeof document === "undefined") return;
    const previous = document.body.style.fontFamily;
    document.body.style.fontFamily = `'PingFang SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`;
    return () => {
      document.body.style.fontFamily = previous;
    };
  }, [applyGlobalFont]);
  const theme = buildAntdTheme();
  return /* @__PURE__ */ jsxRuntime.jsx(
    antd.ConfigProvider,
    {
      theme,
      ...rest,
      children
    }
  );
};
var DgjIcon = react.forwardRef(function DgjIcon2({ type, className = "", style, fontSize, ...rest }, ref) {
  const iconClassName = `iconfont icon-${type} ${className}`.trim();
  const combinedStyle = { ...style, ...fontSize != null ? { fontSize } : {} };
  return /* @__PURE__ */ jsxRuntime.jsx(
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

Object.defineProperty(exports, "Affix", {
  enumerable: true,
  get: function () { return antd.Affix; }
});
Object.defineProperty(exports, "Alert", {
  enumerable: true,
  get: function () { return antd.Alert; }
});
Object.defineProperty(exports, "Anchor", {
  enumerable: true,
  get: function () { return antd.Anchor; }
});
Object.defineProperty(exports, "AutoComplete", {
  enumerable: true,
  get: function () { return antd.AutoComplete; }
});
Object.defineProperty(exports, "Avatar", {
  enumerable: true,
  get: function () { return antd.Avatar; }
});
Object.defineProperty(exports, "Badge", {
  enumerable: true,
  get: function () { return antd.Badge; }
});
Object.defineProperty(exports, "Breadcrumb", {
  enumerable: true,
  get: function () { return antd.Breadcrumb; }
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function () { return antd.Button; }
});
Object.defineProperty(exports, "Calendar", {
  enumerable: true,
  get: function () { return antd.Calendar; }
});
Object.defineProperty(exports, "Card", {
  enumerable: true,
  get: function () { return antd.Card; }
});
Object.defineProperty(exports, "Carousel", {
  enumerable: true,
  get: function () { return antd.Carousel; }
});
Object.defineProperty(exports, "Cascader", {
  enumerable: true,
  get: function () { return antd.Cascader; }
});
Object.defineProperty(exports, "Checkbox", {
  enumerable: true,
  get: function () { return antd.Checkbox; }
});
Object.defineProperty(exports, "Col", {
  enumerable: true,
  get: function () { return antd.Col; }
});
Object.defineProperty(exports, "Collapse", {
  enumerable: true,
  get: function () { return antd.Collapse; }
});
Object.defineProperty(exports, "ColorPicker", {
  enumerable: true,
  get: function () { return antd.ColorPicker; }
});
Object.defineProperty(exports, "DatePicker", {
  enumerable: true,
  get: function () { return antd.DatePicker; }
});
Object.defineProperty(exports, "Descriptions", {
  enumerable: true,
  get: function () { return antd.Descriptions; }
});
Object.defineProperty(exports, "Divider", {
  enumerable: true,
  get: function () { return antd.Divider; }
});
Object.defineProperty(exports, "Drawer", {
  enumerable: true,
  get: function () { return antd.Drawer; }
});
Object.defineProperty(exports, "Dropdown", {
  enumerable: true,
  get: function () { return antd.Dropdown; }
});
Object.defineProperty(exports, "Empty", {
  enumerable: true,
  get: function () { return antd.Empty; }
});
Object.defineProperty(exports, "Flex", {
  enumerable: true,
  get: function () { return antd.Flex; }
});
Object.defineProperty(exports, "FloatButton", {
  enumerable: true,
  get: function () { return antd.FloatButton; }
});
Object.defineProperty(exports, "Form", {
  enumerable: true,
  get: function () { return antd.Form; }
});
Object.defineProperty(exports, "Grid", {
  enumerable: true,
  get: function () { return antd.Grid; }
});
Object.defineProperty(exports, "Image", {
  enumerable: true,
  get: function () { return antd.Image; }
});
Object.defineProperty(exports, "Input", {
  enumerable: true,
  get: function () { return antd.Input; }
});
Object.defineProperty(exports, "InputNumber", {
  enumerable: true,
  get: function () { return antd.InputNumber; }
});
Object.defineProperty(exports, "Layout", {
  enumerable: true,
  get: function () { return antd.Layout; }
});
Object.defineProperty(exports, "List", {
  enumerable: true,
  get: function () { return antd.List; }
});
Object.defineProperty(exports, "Mentions", {
  enumerable: true,
  get: function () { return antd.Mentions; }
});
Object.defineProperty(exports, "Menu", {
  enumerable: true,
  get: function () { return antd.Menu; }
});
Object.defineProperty(exports, "Modal", {
  enumerable: true,
  get: function () { return antd.Modal; }
});
Object.defineProperty(exports, "Pagination", {
  enumerable: true,
  get: function () { return antd.Pagination; }
});
Object.defineProperty(exports, "Popconfirm", {
  enumerable: true,
  get: function () { return antd.Popconfirm; }
});
Object.defineProperty(exports, "Popover", {
  enumerable: true,
  get: function () { return antd.Popover; }
});
Object.defineProperty(exports, "Progress", {
  enumerable: true,
  get: function () { return antd.Progress; }
});
Object.defineProperty(exports, "QRCode", {
  enumerable: true,
  get: function () { return antd.QRCode; }
});
Object.defineProperty(exports, "Radio", {
  enumerable: true,
  get: function () { return antd.Radio; }
});
Object.defineProperty(exports, "Rate", {
  enumerable: true,
  get: function () { return antd.Rate; }
});
Object.defineProperty(exports, "Result", {
  enumerable: true,
  get: function () { return antd.Result; }
});
Object.defineProperty(exports, "Row", {
  enumerable: true,
  get: function () { return antd.Row; }
});
Object.defineProperty(exports, "Segmented", {
  enumerable: true,
  get: function () { return antd.Segmented; }
});
Object.defineProperty(exports, "Select", {
  enumerable: true,
  get: function () { return antd.Select; }
});
Object.defineProperty(exports, "Skeleton", {
  enumerable: true,
  get: function () { return antd.Skeleton; }
});
Object.defineProperty(exports, "Slider", {
  enumerable: true,
  get: function () { return antd.Slider; }
});
Object.defineProperty(exports, "Space", {
  enumerable: true,
  get: function () { return antd.Space; }
});
Object.defineProperty(exports, "Spin", {
  enumerable: true,
  get: function () { return antd.Spin; }
});
Object.defineProperty(exports, "Splitter", {
  enumerable: true,
  get: function () { return antd.Splitter; }
});
Object.defineProperty(exports, "Statistic", {
  enumerable: true,
  get: function () { return antd.Statistic; }
});
Object.defineProperty(exports, "Steps", {
  enumerable: true,
  get: function () { return antd.Steps; }
});
Object.defineProperty(exports, "Switch", {
  enumerable: true,
  get: function () { return antd.Switch; }
});
Object.defineProperty(exports, "Table", {
  enumerable: true,
  get: function () { return antd.Table; }
});
Object.defineProperty(exports, "Tabs", {
  enumerable: true,
  get: function () { return antd.Tabs; }
});
Object.defineProperty(exports, "Tag", {
  enumerable: true,
  get: function () { return antd.Tag; }
});
Object.defineProperty(exports, "TimePicker", {
  enumerable: true,
  get: function () { return antd.TimePicker; }
});
Object.defineProperty(exports, "Timeline", {
  enumerable: true,
  get: function () { return antd.Timeline; }
});
Object.defineProperty(exports, "Tooltip", {
  enumerable: true,
  get: function () { return antd.Tooltip; }
});
Object.defineProperty(exports, "Tour", {
  enumerable: true,
  get: function () { return antd.Tour; }
});
Object.defineProperty(exports, "Transfer", {
  enumerable: true,
  get: function () { return antd.Transfer; }
});
Object.defineProperty(exports, "Tree", {
  enumerable: true,
  get: function () { return antd.Tree; }
});
Object.defineProperty(exports, "TreeSelect", {
  enumerable: true,
  get: function () { return antd.TreeSelect; }
});
Object.defineProperty(exports, "Typography", {
  enumerable: true,
  get: function () { return antd.Typography; }
});
Object.defineProperty(exports, "Upload", {
  enumerable: true,
  get: function () { return antd.Upload; }
});
Object.defineProperty(exports, "message", {
  enumerable: true,
  get: function () { return antd.message; }
});
Object.defineProperty(exports, "notification", {
  enumerable: true,
  get: function () { return antd.notification; }
});
exports.DgjConfigProvider = DgjConfigProvider;
exports.DgjIcon = DgjIcon;
exports.baseDgjTheme = baseDgjTheme;
exports.buildAntdTheme = buildAntdTheme;
exports.dgjTokens = dgjTokens;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map