/** @jsxRuntime classic */
/** @jsx jsx */
import { CSSProperties, ReactElement, Ref, ReactNode } from 'react';
import { jsx } from '@keystone-ui/core';
type Weights = 'bold' | 'subtle';
type RenderProps = {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
    'aria-describedby': string | undefined;
    ref: Ref<any>;
};
type Props = {
    /** The target element. */
    children: (props: RenderProps) => ReactElement;
    /** The content of the tooltip. */
    content: ReactNode;
    /** Turn off, to maintain the tooltip when the user clicks the trigger element. */
    hideOnClick?: boolean;
    /** Where, in relation to the target, to place the tooltip. */
    placement?: 'top' | 'right' | 'bottom' | 'left';
    /** The visual weight of the tooltip. */
    weight?: Weights;
};
export declare const Tooltip: ({ children, content, hideOnClick, placement, weight, }: Props) => jsx.JSX.Element;
type ElementProps = {
    /** The content of the tooltip. */
    children: ReactNode;
    /** ID used to describe the invoking element. */
    id?: string;
    /** When true, the tooltip will be visible. */
    isVisible: boolean;
    /** The visual weight of the tooltip. */
    weight: Weights;
    /** Popper's arrow config. */
    arrow?: {
        ref: (element: HTMLDivElement) => void;
        props: {
            style: CSSProperties;
        };
    };
};
export declare const TooltipElement: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<ElementProps & import("react").RefAttributes<HTMLDivElement>>>;
export {};
//# sourceMappingURL=Tooltip.d.ts.map