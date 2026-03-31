/**
 * DGJ 业务组件（多项目复用），基于 dgj-design 与 Ant Design 5。
 */

export { DGJ_BIZ_VERSION } from './version';

export { default as OperationBar } from './OperationBar';
export type { OperationBarProps } from './OperationBar';

export { default as FilterGroup } from './FilterGroup';
export type { FilterFieldConfig, FilterFieldType, FilterGroupProps } from './FilterGroup';

export { default as OverflowActions } from './operation/OverflowActions';
export type { OverflowActionItem, OverflowActionsProps } from './operation/OverflowActions';

export { default as SwitchTabs } from './switch-tabs/SwitchTabs';
export type { SwitchTabItemData, SwitchTabsProps } from './switch-tabs/SwitchTabs';

export { default as BizMenu } from './menu/BizMenu';
export { default as BizMenuGroup } from './menu/BizMenuGroup';
export { default as BizMenuItem } from './menu/BizMenuItem';
export type { BizMenuGroupItem, BizMenuGroupProps } from './menu/BizMenuGroup';
export type { BizMenuItemAlign, BizMenuItemProps, BizMenuItemState } from './menu/BizMenuItem';

export {
  DISPATCH_SIDEBAR_MENU_GROUPS,
  type DispatchSidebarMenuGroup,
} from './menu/dispatchSidebarMenuData';

export { default as DispatchSiderMenu } from './DispatchSiderMenu';

export {
  useTableAreaDemoState,
  TableAreaConfigPanel,
  TableAreaTableInstance,
  type TableAreaDemoModel,
} from './TableArea';

export { BizTableCell } from './table/BizTableCell';
export type { BizTableCellProps, BizTableCellVariant } from './table/BizTableCell';

/** 与 Icon Demo 对齐；图标集变更时请同步 demo 与 dgj-design 资源 */
export { iconTypes } from './internal/dgjIconTypeNames';
