/** @jsxRuntime classic */
/** @jsx jsx */
import { MutableRefObject, ReactNode } from 'react';
import { jsx } from '@keystone-ui/core';
import { TransitionState } from './types';
export declare const DRAWER_WIDTHS: {
    narrow: number;
    wide: number;
};
export type WidthType = keyof typeof DRAWER_WIDTHS;
export type DrawerBaseProps = {
    children: ReactNode;
    initialFocusRef?: MutableRefObject<any>;
    onClose: () => void;
    transitionState: TransitionState;
    onSubmit?: () => void;
    width?: WidthType;
};
export declare const DrawerBase: ({ children, initialFocusRef, onClose, onSubmit, width, transitionState, ...props }: DrawerBaseProps) => jsx.JSX.Element;
//# sourceMappingURL=DrawerBase.d.ts.map