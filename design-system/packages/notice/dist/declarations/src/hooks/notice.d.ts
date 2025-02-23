export declare const noticeToneValues: readonly ["active", "passive", "positive", "warning", "negative", "help"];
export type ToneKey = typeof noticeToneValues[number];
type NoticeTokensProps = {
    tone: ToneKey;
};
export type NoticeTokens = {
    background?: string;
    borderColor?: string;
    borderRadius?: number;
    borderWidth?: number;
    fontSize?: number | string;
    fontWeight?: number;
    foreground?: string;
    gap: number;
    iconColor: string;
    paddingX?: number;
    paddingY?: number;
    shadow?: string;
    title: {
        foreground: string;
        fontSize?: number | string;
        fontWeight?: number;
    };
};
export declare function useNoticeTokens({ tone: toneKey }: NoticeTokensProps): NoticeTokens;
type NoticeStylesProps = {
    tokens: NoticeTokens;
};
export declare function useNoticeStyles({ tokens }: NoticeStylesProps): {
    actions: {
        marginTop: number;
    };
    box: {
        backgroundColor: string | undefined;
        borderColor: string;
        borderRadius: number | undefined;
        borderWidth: number | undefined;
        color: string | undefined;
        fontSize: string | number | undefined;
        fontWeight: number | undefined;
        paddingLeft: number | undefined;
        paddingRight: number | undefined;
        paddingTop: number | undefined;
        paddingBottom: number | undefined;
    };
    title: {
        color: string;
        fontSize: string | number | undefined;
        fontWeight: number | undefined;
        marginBottom: number;
    };
    symbol: {
        color: string;
        marginRight: number;
    };
};
export {};
//# sourceMappingURL=notice.d.ts.map