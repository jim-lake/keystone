/** @jsxRuntime classic */
/** @jsx jsx */
import { InputHTMLAttributes } from 'react';
import type { SizeType, WidthType } from './types';
type InputProps = InputHTMLAttributes<HTMLTextAreaElement>;
export type TextAreaProps = {
    invalid?: boolean;
    size?: SizeType;
    width?: WidthType;
    onChange?: NonNullable<InputProps['onChange']>;
    value?: NonNullable<InputProps['value']>;
} & Omit<InputProps, 'onChange' | 'size' | 'value'>;
export declare const TextArea: import("react").ForwardRefExoticComponent<{
    invalid?: boolean | undefined;
    size?: SizeType | undefined;
    width?: WidthType | undefined;
    onChange?: import("react").ChangeEventHandler<HTMLTextAreaElement> | undefined;
    value?: NonNullable<string | number | readonly string[] | undefined> | undefined;
} & Omit<InputProps, "onChange" | "value" | "size"> & import("react").RefAttributes<HTMLTextAreaElement>>;
export {};
//# sourceMappingURL=TextArea.d.ts.map