/** @jsxRuntime classic */
/** @jsx jsx */
import { MutableRefObject, ReactNode } from 'react';
import { jsx } from '@keystone-ui/core';
import { WidthType } from './DrawerBase';
import { ActionsType } from './types';
type DrawerProps = {
    actions: ActionsType;
    children: ReactNode;
    id?: string;
    initialFocusRef?: MutableRefObject<any>;
    title: string;
    width?: WidthType;
};
export declare const Drawer: ({ actions, children, title, id, initialFocusRef, width, }: DrawerProps) => jsx.JSX.Element;
export {};
//# sourceMappingURL=Drawer.d.ts.map