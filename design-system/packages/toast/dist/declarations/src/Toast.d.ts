/** @jsxRuntime classic */
/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx } from '@keystone-ui/core';
import { ToastPropsExact } from './types';
export declare const ToastProvider: ({ children }: {
    children: ReactNode;
}) => jsx.JSX.Element;
export declare const ToastElement: import("react").ForwardRefExoticComponent<{
    onDismiss: () => void;
} & Omit<ToastPropsExact, "id"> & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Toast.d.ts.map