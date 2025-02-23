/** @jsxRuntime classic */
/** @jsx jsx */
import { ReactElement, ReactNode, Ref, CSSProperties } from 'react';
import { Options, Placement } from '@popperjs/core';
import { jsx } from '@keystone-ui/core';
type PopoverOptions = {
    handleClose: 'both' | 'mouse' | 'keyboard' | 'none';
};
export declare const useControlledPopover: ({ isOpen, onClose }: {
    isOpen: boolean;
    onClose: () => void;
}, popperOptions?: Partial<Options>, popoverOptions?: PopoverOptions) => {
    trigger: {
        ref: (element: HTMLElement | null) => void;
        props: {
            'aria-haspopup': boolean;
            'aria-expanded': boolean;
        };
    };
    dialog: {
        ref: (element: HTMLElement | null) => void;
        props: {
            style: CSSProperties;
        };
    };
    arrow: {
        ref: (element: HTMLElement | null) => void;
        props: {
            style: CSSProperties;
        };
    };
};
export declare const usePopover: (popperOptions?: Partial<Options>, popoverOptions?: PopoverOptions) => {
    trigger: {
        ref: (element: HTMLElement | null) => void;
        props: {
            'aria-haspopup': boolean;
            'aria-expanded': boolean;
        };
    };
    dialog: {
        ref: (element: HTMLElement | null) => void;
        props: {
            style: CSSProperties;
        };
    };
    arrow: {
        ref: (element: HTMLElement | null) => void;
        props: {
            style: CSSProperties;
        };
    };
    isOpen: boolean;
    setOpen: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
export type TriggerRendererOptions = {
    isOpen: boolean;
    triggerProps: {
        onClick: () => void;
        ref: Ref<any>;
    };
};
type Props = {
    /** The content of the dialog. */
    children: ReactNode;
    /** Where, in relation to the trigger, to place the dialog. */
    placement?: Placement;
    /** The trigger element, which the dialog is bound to. */
    triggerRenderer: (options: TriggerRendererOptions) => ReactElement;
};
export declare const Popover: ({ placement, triggerRenderer, ...props }: Props) => jsx.JSX.Element;
type DialogProps = {
    /** The content of the dialog. */
    children: ReactNode;
    /** When true, the popover will be visible. */
    isVisible: boolean;
    arrow: {
        ref: (element: HTMLDivElement) => void;
        props: {
            style: CSSProperties;
        };
    };
};
export declare const PopoverDialog: import("react").ForwardRefExoticComponent<DialogProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=Popover.d.ts.map