/** @jsxRuntime classic */
/** @jsx jsx */
export declare const buttonSizeValues: readonly ["large", "medium", "small"];
export declare const buttonToneValues: readonly ["active", "passive", "positive", "warning", "negative", "help"];
export declare const buttonWeightValues: readonly ["bold", "light", "none", "link"];
export type SizeKey = typeof buttonSizeValues[number];
export type ToneKey = typeof buttonToneValues[number];
export type WeightKey = typeof buttonWeightValues[number];
export type ButtonPropDefaults = {
    size: SizeKey;
    tone: ToneKey;
    weight: WeightKey;
};
export declare const buttonPropDefaults: {
    readonly size: "medium";
    readonly tone: "passive";
    readonly weight: "light";
};
type ButtonTokensProps = {
    size: SizeKey;
    tone: ToneKey;
    weight: WeightKey;
};
type ButtonStateTokens = {
    background?: string;
    borderColor?: string;
    foreground?: string;
    shadow?: string;
    textDecoration?: string;
};
export type ButtonTokens = {
    borderRadius?: number;
    borderWidth?: number;
    disabledOpacity: number;
    fontSize?: number | string;
    fontWeight?: number;
    height?: number;
    paddingX?: number;
    transition?: string;
    focus: ButtonStateTokens;
    hover: ButtonStateTokens;
    pressed: ButtonStateTokens;
} & ButtonStateTokens;
export declare function useButtonTokens({ tone: toneKey, size: sizeKey, weight: weightKey, }: ButtonTokensProps): ButtonTokens;
type ButtonStylesProps = {
    isDisabled?: boolean;
    isBlock?: boolean;
    tokens: ButtonTokens;
};
export declare function useButtonStyles({ isDisabled, isBlock, tokens }: ButtonStylesProps): {
    backgroundColor: string;
    borderColor: string;
    borderRadius: number | undefined;
    borderWidth: number | undefined;
    color: string | undefined;
    fontSize: string | number | undefined;
    fontWeight: number | undefined;
    height: number | undefined;
    paddingLeft: number | undefined;
    paddingRight: number | undefined;
    textDecoration: string | undefined;
    transition: string | undefined;
    ':focus': {
        background: string | undefined;
        borderColor: string | undefined;
        boxShadow: string | undefined;
        color: string | undefined;
        textDecoration: string | undefined;
    };
    ':hover': {
        background: string | undefined;
        borderColor: string | undefined;
        boxShadow: string | undefined;
        color: string | undefined;
        textDecoration: string | undefined;
    };
    ':active': {
        background: string | undefined;
        borderColor: string | undefined;
        boxShadow: string | undefined;
        color: string | undefined;
        textDecoration: string | undefined;
    };
    alignItems: "center";
    borderStyle: "solid";
    boxSizing: "border-box";
    cursor: "default" | "pointer";
    display: "flex" | "inline-flex";
    flexShrink: 0;
    justifyContent: "center";
    opacity: number | undefined;
    outline: 0;
    pointerEvents: "none" | undefined;
    position: "relative";
    userSelect: "none";
    whiteSpace: "nowrap";
    width: "100%" | undefined;
};
export {};
//# sourceMappingURL=button.d.ts.map