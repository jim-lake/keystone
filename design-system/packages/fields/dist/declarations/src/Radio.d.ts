/** @jsxRuntime classic */
/** @jsx jsx */
import { InputHTMLAttributes, ReactNode } from 'react';
import type { SizeType } from './types';
export declare const Radio: import("react").ForwardRefExoticComponent<{
    /** The radio label content. */
    children: ReactNode;
} & {
    /** When true, the radio will be checked. */
    checked?: boolean | undefined;
    /** When true, the radio will be disabled. */
    disabled?: boolean | undefined;
    /** The size of the Radio */
    size?: SizeType | undefined;
    /** The value of the Radio. */
    value?: string | undefined;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & import("react").RefAttributes<HTMLInputElement>>;
export declare const RadioControl: import("react").ForwardRefExoticComponent<{
    /** When true, the radio will be checked. */
    checked?: boolean | undefined;
    /** When true, the radio will be disabled. */
    disabled?: boolean | undefined;
    /** The size of the Radio */
    size?: SizeType | undefined;
    /** The value of the Radio. */
    value?: string | undefined;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Radio.d.ts.map