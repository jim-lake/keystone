/** @jsxRuntime classic */
/** @jsx jsx */
import { InputHTMLAttributes, ReactNode } from 'react';
import type { SizeType } from './types';
export declare const Checkbox: import("react").ForwardRefExoticComponent<{
    /** The checkbox label content. */
    children: ReactNode;
} & {
    /** When true, the checkbox will be checked. */
    checked?: boolean | undefined;
    /** When true, the checkbox will be disabled. */
    disabled?: boolean | undefined;
    /** The size of the Checkbox */
    size?: SizeType | undefined;
    /** The value of the Checkbox. */
    value?: string | undefined;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & import("react").RefAttributes<HTMLInputElement>>;
export declare const CheckboxControl: import("react").ForwardRefExoticComponent<{
    /** When true, the checkbox will be checked. */
    checked?: boolean | undefined;
    /** When true, the checkbox will be disabled. */
    disabled?: boolean | undefined;
    /** The size of the Checkbox */
    size?: SizeType | undefined;
    /** The value of the Checkbox. */
    value?: string | undefined;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Checkbox.d.ts.map