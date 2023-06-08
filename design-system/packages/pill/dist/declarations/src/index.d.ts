import { HTMLAttributes, ReactNode } from 'react';
type Tone = 'active' | 'passive' | 'positive' | 'warning' | 'negative' | 'help';
type Weight = 'bold' | 'light';
export declare const Pill: import("react").ForwardRefExoticComponent<{
    children: ReactNode;
    onClick?: (() => void) | undefined;
    onRemove?: (() => void) | undefined;
    tone?: Tone | undefined;
    containerProps?: HTMLAttributes<HTMLDivElement> | undefined;
    weight?: Weight | undefined;
} & HTMLAttributes<HTMLButtonElement> & import("react").RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=index.d.ts.map