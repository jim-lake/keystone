import React, { ReactNode } from 'react';
import type { Theme } from './types';
export declare const ThemeContext: React.Context<{
    theme: Theme;
}>;
export declare const ThemeProvider: ({ theme, children }: {
    theme: Theme;
    children: ReactNode;
}) => JSX.Element;
export declare const useTheme: () => Theme;
//# sourceMappingURL=theme.d.ts.map