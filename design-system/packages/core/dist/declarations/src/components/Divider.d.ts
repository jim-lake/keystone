/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '../emotion';
import { ResponsiveProp, Theme } from '../types';
import { MarginProps } from './Box';
type ColorType = ResponsiveProp<keyof Theme['palette']>;
declare const orientationMap: {
    horizontal: string;
    vertical: string;
};
type DividerProps = {
    children?: never;
    color?: ColorType;
    orientation?: keyof typeof orientationMap;
    className?: string;
} & MarginProps;
export declare const Divider: ({ orientation, color, ...props }: DividerProps) => jsx.JSX.Element;
export {};
//# sourceMappingURL=Divider.d.ts.map