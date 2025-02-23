/** @jsxRuntime classic */
/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx, MarginProps } from '@keystone-ui/core';
import { ToneKey } from './hooks/notice';
type Action = {
    onPress: () => void;
    label: string;
};
type NoticeProps = {
    actions?: {
        primary: Action;
        secondary?: Action;
    };
    children: ReactNode;
    tone?: ToneKey;
    title?: string;
    className?: string;
} & MarginProps;
export declare const Notice: ({ actions, children, tone, title, ...otherProps }: NoticeProps) => jsx.JSX.Element;
export {};
//# sourceMappingURL=Notice.d.ts.map