import React, { ReactNode } from 'react';
import { useButtonStyles, useButtonTokens, SizeKey, ToneKey, WeightKey } from './hooks/button';
export declare const ButtonContext: React.Context<{
    defaults: {
        size: SizeKey;
        tone: ToneKey;
        weight: WeightKey;
    };
    useButtonStyles: typeof useButtonStyles;
    useButtonTokens: typeof useButtonTokens;
}>;
type ProviderHooksProp = {
    useButtonStyles?: typeof useButtonStyles;
    useButtonTokens?: typeof useButtonTokens;
};
type ProviderDefaultsProp = {
    size?: SizeKey;
    tone?: ToneKey;
    weight?: WeightKey;
};
export declare const ButtonProvider: ({ defaults, hooks, children, }: {
    defaults?: ProviderDefaultsProp | undefined;
    hooks?: ProviderHooksProp | undefined;
    children: ReactNode;
}) => JSX.Element;
export {};
//# sourceMappingURL=context.d.ts.map