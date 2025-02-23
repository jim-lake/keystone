/** @jsxRuntime classic */
/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx } from '@keystone-ui/core';
type DialogBaseProps = {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    width: number;
};
export declare const DialogBase: ({ children, isOpen, onClose, width, ...props }: DialogBaseProps) => jsx.JSX.Element | null;
export {};
//# sourceMappingURL=DialogBase.d.ts.map