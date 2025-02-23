import type { SizeType } from '../types';
export type IndicatorTokensProps = {
    /** The size of the indicator */
    size: SizeType;
    /** Controls whether the indicator looks like a checkbox or radio button */
    type: 'checkbox' | 'radio';
};
type IndicatorStateTokens = {
    background?: string;
    borderColor?: string;
    shadow?: string;
    foreground?: string;
};
export type IndicatorTokens = {
    borderRadius?: string | number;
    borderWidth?: string | number;
    boxSize: string | number;
    transition?: string;
    hover: IndicatorStateTokens;
    focus: IndicatorStateTokens;
    selected: IndicatorStateTokens;
    disabled: IndicatorStateTokens;
} & IndicatorStateTokens;
export declare const useIndicatorTokens: ({ size: sizeKey, type, }: IndicatorTokensProps) => IndicatorTokens;
export type IndicatorStylesProps = {
    tokens: IndicatorTokens;
};
export declare const useIndicatorStyles: ({ tokens }: IndicatorStylesProps) => {
    readonly alignItems: "center";
    readonly backgroundColor: string | undefined;
    readonly borderColor: string | undefined;
    readonly borderRadius: string | number | undefined;
    readonly borderStyle: "solid";
    readonly borderWidth: string | number | undefined;
    readonly boxSizing: "border-box";
    readonly color: string | undefined;
    readonly cursor: "pointer";
    readonly display: "flex";
    readonly flexShrink: 0;
    readonly height: string | number;
    readonly justifyContent: "center";
    readonly transition: string | undefined;
    readonly width: string | number;
    readonly 'input:hover + &': {
        readonly backgroundColor: string | undefined;
        readonly borderColor: string | undefined;
        readonly boxShadow: string | undefined;
        readonly color: string | undefined;
    };
    readonly 'input:focus + &': {
        readonly backgroundColor: string | undefined;
        readonly borderColor: string | undefined;
        readonly boxShadow: string | undefined;
        readonly color: string | undefined;
    };
    readonly 'input:checked + &': {
        readonly backgroundColor: string | undefined;
        readonly borderColor: string | undefined;
        readonly boxShadow: string | undefined;
        readonly color: string | undefined;
    };
    readonly 'input:disabled + &': {
        readonly backgroundColor: string | undefined;
        readonly borderColor: string | undefined;
        readonly boxShadow: string | undefined;
        readonly color: string | undefined;
        readonly cursor: "default";
    };
    readonly 'input:checked:disabled + &': {
        readonly color: string | undefined;
    };
};
export {};
//# sourceMappingURL=indicators.d.ts.map