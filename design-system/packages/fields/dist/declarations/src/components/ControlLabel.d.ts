/** @jsxRuntime classic */
/** @jsx jsx */
import { ReactNode, ReactElement } from 'react';
import { jsx } from '@keystone-ui/core';
import type { SizeType } from '../types';
/**
 * TODO
 *
 * - Separate out tokens and style function
 */
type ControlLabelProps = {
    className?: string;
    control: ReactElement;
    children?: ReactNode;
    size?: SizeType;
};
export declare const ControlLabel: ({ children, className, control, size: sizeKey, }: ControlLabelProps) => jsx.JSX.Element;
export {};
//# sourceMappingURL=ControlLabel.d.ts.map