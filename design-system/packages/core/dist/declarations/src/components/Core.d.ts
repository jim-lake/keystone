/** @jsxRuntime classic */
/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx } from '../emotion';
type CoreProps = {
    /** The app content. */
    children: ReactNode;
    /** Include styles to normalize element styles among browsers. */
    includeNormalize?: boolean;
    /** Optimize text rendering with CSS. */
    optimizeLegibility?: boolean;
};
export declare const Core: ({ children, includeNormalize, optimizeLegibility, }: CoreProps) => jsx.JSX.Element;
export {};
//# sourceMappingURL=Core.d.ts.map