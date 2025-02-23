import type { ShapeType, SizeType, WidthType } from '../types';
export declare const widthMap: {
    small: number;
    medium: number;
    large: number;
    full: string;
};
export type InputTokensProps = {
    isMultiline?: boolean;
    shape?: ShapeType;
    size?: SizeType;
    width?: WidthType;
};
type InputStateTokens = {
    background?: string;
    borderColor?: string;
    foreground?: string;
    shadow?: string;
};
export type InputTokens = {
    borderRadius?: number | string;
    borderWidth?: number | string;
    fontSize?: number | string;
    lineHeight?: number | string;
    height?: number | string;
    paddingX: number | string;
    paddingY: number | string;
    placeholder?: string;
    resize?: string;
    transition?: string;
    hover: InputStateTokens;
    focus: InputStateTokens;
    invalid: InputStateTokens;
    disabled: InputStateTokens;
} & InputStateTokens;
export declare const useInputTokens: ({ size: sizeKey, isMultiline, shape, }: InputTokensProps) => InputTokens;
export type InputStylesProps = {
    invalid: boolean;
    tokens: InputTokens;
};
export declare function useInputStyles({ invalid, tokens }: InputStylesProps): {
    readonly appearance: "none";
    readonly backgroundColor: string | undefined;
    readonly borderColor: string | undefined;
    readonly borderRadius: string | number | undefined;
    readonly borderStyle: "solid";
    readonly borderWidth: string | number | undefined;
    readonly boxShadow: string | undefined;
    readonly boxSizing: "border-box";
    readonly color: string | undefined;
    readonly fontSize: string | number | undefined;
    readonly height: string | number | undefined;
    readonly lineHeight: string | number | undefined;
    readonly outline: 0;
    readonly paddingBottom: string | number;
    readonly paddingLeft: string | number;
    readonly paddingRight: string | number;
    readonly paddingTop: string | number;
    readonly resize: "vertical";
    readonly transition: string | undefined;
    readonly width: "100%";
    readonly ':hover': {
        readonly backgroundColor: string | undefined;
        readonly borderColor: string | undefined;
        readonly boxShadow: string | undefined;
        readonly color: string | undefined;
    };
    readonly ':focus': {
        readonly backgroundColor: string | undefined;
        readonly borderColor: string | undefined;
        readonly boxShadow: string | undefined;
        readonly color: string | undefined;
    };
    readonly ':disabled': {
        readonly backgroundColor: string | undefined;
        readonly borderColor: string | undefined;
        readonly boxShadow: string | undefined;
        readonly color: string | undefined;
    };
    readonly '&::placeholder': {
        readonly color: string | undefined;
    };
};
export {};
//# sourceMappingURL=inputs.d.ts.map