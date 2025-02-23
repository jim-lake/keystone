/** @jsxRuntime classic */
/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx } from '@keystone-ui/core';
import { NavigationProps, ListMeta } from '../../types';
type NavItemProps = {
    href: string;
    children: ReactNode;
    isSelected?: boolean;
};
export declare const NavItem: ({ href, children, isSelected: _isSelected }: NavItemProps) => jsx.JSX.Element;
export type NavigationContainerProps = Partial<Pick<NavigationProps, 'authenticatedItem'>> & {
    children: ReactNode;
};
export declare const NavigationContainer: ({ authenticatedItem, children }: NavigationContainerProps) => jsx.JSX.Element;
export declare const ListNavItem: ({ list }: {
    list: ListMeta;
}) => jsx.JSX.Element;
type NavItemsProps = Pick<NavigationProps, 'lists'> & {
    include?: string[];
};
export declare const ListNavItems: ({ lists, include }: NavItemsProps) => jsx.JSX.Element;
export declare const Navigation: () => jsx.JSX.Element | null;
export {};
//# sourceMappingURL=Navigation.d.ts.map