/** @jsxRuntime classic */
/** @jsx jsx */
import { ReactNode } from 'react';
export declare const Inline: <Comp extends import("react").ElementType = "div">(props: {
    as?: Comp | undefined;
    ref?: import("react").Ref<Comp extends "symbol" | "text" | "svg" | "animate" | "animateMotion" | "animateTransform" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feDropShadow" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "mpath" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "stop" | "switch" | "textPath" | "tspan" | "use" | "view" | "set" | keyof HTMLElementTagNameMap ? (HTMLElementTagNameMap & Pick<SVGElementTagNameMap, "symbol" | "text" | "svg" | "animate" | "animateMotion" | "animateTransform" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feDropShadow" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "mpath" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "stop" | "switch" | "textPath" | "tspan" | "use" | "view" | "set">)[Comp] : Comp extends new (...args: any) => any ? InstanceType<Comp> : undefined> | undefined;
} & Omit<import("react").PropsWithoutRef<import("react").ComponentProps<Comp>>, "children" | "as" | "align" | "gap" | keyof import("./Box").ColorProps | keyof import("./Box").RadiiProps | keyof import("./Box").MarginProps | keyof import("./Box").PaddingProps | keyof {
    textAlign?: (("center" | "end" | "justify" | "left" | "right" | "start") | readonly (("center" | "end" | "justify" | "left" | "right" | "start") | null)[]) | undefined;
    height?: import("../types").ResponsiveProp<string | number> | undefined;
    width?: import("../types").ResponsiveProp<string | number> | undefined;
}> & {
    /** The value of the "align-items" property. */
    align?: "center" | "end" | "start" | "stretch" | undefined;
    /** Each item in the container. */
    children: ReactNode;
    /** The size of the gap between each item. */
    gap?: "small" | "none" | "large" | "medium" | "xxsmall" | "xsmall" | "xlarge" | "xxlarge" | undefined;
} & import("./Box").ColorProps & import("./Box").RadiiProps & import("./Box").MarginProps & import("./Box").PaddingProps & {
    textAlign?: (("center" | "end" | "justify" | "left" | "right" | "start") | readonly (("center" | "end" | "justify" | "left" | "right" | "start") | null)[]) | undefined;
    height?: import("../types").ResponsiveProp<string | number> | undefined;
    width?: import("../types").ResponsiveProp<string | number> | undefined;
}) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
//# sourceMappingURL=Inline.d.ts.map