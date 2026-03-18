import { ThemeConfig, ConfigProviderProps } from 'antd';
export { Affix, Alert, Anchor, AutoComplete, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Cascader, Checkbox, Col, Collapse, ColorPicker, DatePicker, Descriptions, Divider, Drawer, Dropdown, Empty, Flex, FloatButton, Form, Grid, Image, Input, InputNumber, Layout, List, Mentions, Menu, Modal, Pagination, Popconfirm, Popover, Progress, QRCode, Radio, Rate, Result, Row, Segmented, Select, Skeleton, Slider, Space, Spin, Splitter, Statistic, Steps, Switch, Table, Tabs, Tag, TimePicker, Timeline, Tooltip, Tour, Transfer, Tree, TreeSelect, Typography, Upload, message, notification } from 'antd';
import React, { PropsWithChildren } from 'react';

declare const dgjTokens: {
    readonly color: {
        readonly primary: {
            readonly bg: "#ECF6FF";
            readonly bgHover: "#D7ECFF";
            readonly border: "#D7ECFF";
            readonly borderHover: "#B4DBFF";
            readonly hover: "#39A0FF";
            readonly default: "#0888FF";
            readonly active: "#077AE5";
            readonly textHover: "#39A0FF";
            readonly text: "#0888FF";
            readonly textActive: "#077AE5";
        };
        readonly neutral: {
            readonly background: {
                readonly container: "#FFFFFF";
                readonly elevated: "#FFFFFF";
                readonly layout: "#F0F1F2";
                readonly spotlight: "rgba(0,0,0,0.7)";
                readonly mask: "rgba(0,0,0,0.5)";
                readonly containerDisabled: "rgba(0,0,0,0.05)";
                readonly controlItemBgHover: "rgba(0,0,0,0.05)";
                readonly controlItemBgActive: "#ECF6FF";
                readonly controlItemBgActiveHover: "#D7ECFF";
                readonly controlItemBgActiveDisabled: "rgba(0,0,0,0.1)";
            };
            readonly fill: {
                readonly default: "rgba(0,0,0,0.1)";
                readonly secondary: "rgba(0,0,0,0.05)";
            };
            readonly text: {
                readonly default: "rgba(0,0,0,0.9)";
                readonly label: "rgba(0,0,0,0.7)";
                readonly description: "rgba(0,0,0,0.5)";
                readonly placeholder: "rgba(0,0,0,0.3)";
                readonly disabled: "rgba(0,0,0,0.3)";
                readonly icon: "rgba(0,0,0,0.5)";
                readonly iconHover: "rgba(0,0,0,0.7)";
                readonly solid: "#FFFFFF";
            };
            readonly border: {
                readonly default: "#E1E2E4";
                readonly secondary: "#F0F1F2";
                readonly split: "rgba(0,0,0,0.05)";
            };
        };
        readonly success: {
            readonly bg: "#F4F9ED";
            readonly bgHover: "#E8F2DB";
            readonly border: "#E8F2DB";
            readonly borderHover: "#D5E6BC";
            readonly hover: "#8FBD4C";
            readonly default: "#73AC1F";
            readonly active: "#679A1C";
            readonly textHover: "#8FBD4C";
            readonly text: "#73AC1F";
            readonly textActive: "#679A1C";
        };
        readonly warning: {
            readonly bg: "#FEF6EB";
            readonly bgHover: "#FDECD6";
            readonly border: "#FDECD6";
            readonly borderHover: "#FADCB3";
            readonly hover: "#F4A335";
            readonly default: "#F18C03";
            readonly active: "#D87E03";
            readonly textHover: "#F4A335";
            readonly text: "#F18C03";
            readonly textActive: "#D87E03";
        };
        readonly error: {
            readonly bg: "#FEF2EF";
            readonly bgHover: "#FBE4DD";
            readonly border: "#FBE4DD";
            readonly borderHover: "#F8CCC0";
            readonly hover: "#EE7958";
            readonly default: "#EA572E";
            readonly active: "#D24E29";
            readonly textHover: "#EE7958";
            readonly text: "#EA572E";
            readonly textActive: "#D24E29";
        };
        readonly info: {
            readonly bg: "#ECF6FF";
            readonly bgHover: "#D7ECFF";
            readonly border: "#D7ECFF";
            readonly borderHover: "#B4DBFF";
            readonly hover: "#39A0FF";
            readonly default: "#0888FF";
            readonly active: "#077AE5";
            readonly textHover: "#39A0FF";
            readonly text: "#0888FF";
            readonly textActive: "#077AE5";
        };
    };
    readonly size: {
        readonly padding: {
            readonly xxxs: 2;
            readonly xxs: 4;
            readonly xs: 8;
            readonly sm: 12;
            readonly md: 16;
            readonly lg: 20;
            readonly xl: 24;
            readonly xxl: 28;
            readonly xxxl: 32;
        };
        readonly controlHeight: {
            readonly lg: 40;
            readonly md: 32;
            readonly sm: 24;
            readonly xs: 16;
        };
    };
    readonly style: {
        readonly borderRadius: {
            readonly xl: 16;
            readonly lg: 8;
            readonly md: 6;
            readonly sm: 4;
            readonly xs: 2;
        };
        readonly font: {
            readonly family: {
                readonly primary: "PingFang SC";
                readonly number: "Barlow";
            };
            readonly weight: {
                readonly regular: "Regular";
                readonly medium: "Medium";
                readonly semibold: "SemiBold";
            };
            readonly size: {
                readonly sm: 12;
                readonly base: 14;
                readonly md: 16;
                readonly lg: 20;
                readonly xl: 24;
                readonly xxl: 32;
            };
            readonly lineHeight: {
                readonly sm: 20;
                readonly base: 22;
                readonly md: 24;
                readonly lg: 28;
                readonly xl: 32;
                readonly xxl: 40;
            };
        };
    };
};
type DgjTokens = typeof dgjTokens;

declare const baseDgjTheme: DgjTokens;
declare function buildAntdTheme(tokens?: DgjTokens): ThemeConfig;

interface DgjConfigProviderProps extends Omit<ConfigProviderProps, 'theme'> {
    /**
     * 是否自动为 body 设置字体（使用 DGJ 的主字体并带常见 fallback）
     * 默认开启
     */
    applyGlobalFont?: boolean;
}
declare const DgjConfigProvider: React.FC<PropsWithChildren<DgjConfigProviderProps>>;

interface DgjIconProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
    /**
     * 图标类型，对应 iconfont 的 class 后缀，最终渲染为 className="iconfont icon-{type}"
     * 例如 type="search" → icon-search。同一图标若有 search / search-filled 两种，默认使用无 -filled 后缀的。
     */
    type: string;
    /** 图标字号，便于与文案对齐 */
    fontSize?: number | string;
}
declare const DgjIcon: React.ForwardRefExoticComponent<DgjIconProps & React.RefAttributes<HTMLElement>>;

export { DgjConfigProvider, type DgjConfigProviderProps, DgjIcon, type DgjIconProps, type DgjTokens, baseDgjTheme, buildAntdTheme, dgjTokens };
