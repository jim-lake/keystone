/** @jsxRuntime classic */
/** @jsx jsx */
import { ReactNode } from 'react';
import { Theme } from '../types';
import { BoxProps } from './Box';
declare const alignment: {
    center: string;
    end: string;
    start: string;
    stretch: string;
};
export type StackProps = {
    /** The value of the "align-items" property. */
    align?: keyof typeof alignment;
    /** Each element in the stack. */
    children: ReactNode;
    /** Causes items in the stack to be oriented horizontally, instead of vertically */
    across?: boolean;
    /** The placement, if any, of the dividing elements. */
    dividers?: 'none' | 'around' | 'between' | 'start' | 'end';
    /** The size of the gap between each element in the stack. */
    gap?: keyof Theme['spacing'];
} & BoxProps;
export declare const Stack: <Comp extends import("react").ElementType = "div">(props: {
    as?: Comp | undefined;
    ref?: import("react").Ref<Comp extends "symbol" | "text" | "svg" | "animate" | "animateMotion" | "animateTransform" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feDropShadow" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "mpath" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "stop" | "switch" | "textPath" | "tspan" | "use" | "view" | "set" | keyof HTMLElementTagNameMap ? (HTMLElementTagNameMap & Pick<SVGElementTagNameMap, "symbol" | "text" | "svg" | "animate" | "animateMotion" | "animateTransform" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feDropShadow" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "mpath" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "stop" | "switch" | "textPath" | "tspan" | "use" | "view" | "set">)[Comp] : Comp extends new (...args: any) => any ? InstanceType<Comp> : undefined> | undefined;
} & Omit<import("react").PropsWithoutRef<import("react").ComponentProps<Comp>>, "children" | "as" | "align" | "gap" | "across" | "dividers" | keyof import("./Box").ColorProps | keyof import("./Box").RadiiProps | keyof import("./Box").MarginProps | keyof import("./Box").PaddingProps | keyof {
    textAlign?: (("center" | "end" | "justify" | "left" | "right" | "start") | readonly (("center" | "end" | "justify" | "left" | "right" | "start") | null)[]) | undefined;
    height?: import("../types").ResponsiveProp<string | number> | undefined;
    width?: import("../types").ResponsiveProp<string | number> | undefined;
}> & {
    /** The value of the "align-items" property. */
    align?: "center" | "end" | "start" | "stretch" | undefined;
    /** Each element in the stack. */
    children: ReactNode;
    /** Causes items in the stack to be oriented horizontally, instead of vertically */
    across?: boolean | undefined;
    /** The placement, if any, of the dividing elements. */
    dividers?: "end" | "start" | "none" | "around" | "between" | undefined;
    /** The size of the gap between each element in the stack. */
    gap?: "small" | "none" | "medium" | "large" | "xxsmall" | "xsmall" | "xlarge" | "xxlarge" | undefined;
} & import("./Box").ColorProps & import("./Box").RadiiProps & import("./Box").MarginProps & import("./Box").PaddingProps & {
    textAlign?: (("center" | "end" | "justify" | "left" | "right" | "start") | readonly (("center" | "end" | "justify" | "left" | "right" | "start") | null)[]) | undefined;
    height?: import("../types").ResponsiveProp<string | number> | undefined;
    width?: import("../types").ResponsiveProp<string | number> | undefined;
}) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export {};
//# sourceMappingURL=Stack.d.ts.map