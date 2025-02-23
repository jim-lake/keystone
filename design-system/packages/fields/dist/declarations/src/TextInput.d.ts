/** @jsxRuntime classic */
/** @jsx jsx */
/**
 * TODO
 *
 * - Support icons in the input (search, etc)
 */
import { InputHTMLAttributes } from 'react';
import type { ShapeType, SizeType, WidthType } from './types';
declare const validTypes: {
    email: string;
    number: string;
    password: string;
    search: string;
    tel: string;
    text: string;
    url: string;
};
type InputProps = InputHTMLAttributes<HTMLInputElement>;
export type TextInputProps = {
    invalid?: boolean;
    shape?: ShapeType;
    size?: SizeType;
    width?: WidthType;
    type?: keyof typeof validTypes;
    onChange?: NonNullable<InputProps['onChange']>;
    value?: NonNullable<InputProps['value']>;
} & Omit<InputProps, 'onChange' | 'type' | 'size' | 'value'>;
export declare const TextInput: import("react").ForwardRefExoticComponent<{
    invalid?: boolean | undefined;
    shape?: ShapeType | undefined;
    size?: SizeType | undefined;
    width?: WidthType | undefined;
    type?: "number" | "text" | "search" | "tel" | "url" | "email" | "password" | undefined;
    onChange?: import("react").ChangeEventHandler<HTMLInputElement> | undefined;
    value?: NonNullable<string | number | readonly string[] | undefined> | undefined;
} & Omit<InputProps, "type" | "onChange" | "value" | "size"> & import("react").RefAttributes<HTMLInputElement>>;
export {};
//# sourceMappingURL=TextInput.d.ts.map