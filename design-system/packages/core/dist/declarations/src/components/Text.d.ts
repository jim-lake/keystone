/** @jsxRuntime classic */
/** @jsx jsx */
/// <reference types="react" />
export declare const Text: <Comp extends import("react").ElementType = "div">(props: {
    as?: Comp | undefined;
    ref?: import("react").Ref<Comp extends "symbol" | "text" | "svg" | "animate" | "animateMotion" | "animateTransform" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feDropShadow" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "mpath" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "stop" | "switch" | "textPath" | "tspan" | "use" | "view" | "set" | keyof HTMLElementTagNameMap ? (HTMLElementTagNameMap & Pick<SVGElementTagNameMap, "symbol" | "text" | "svg" | "animate" | "animateMotion" | "animateTransform" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feDropShadow" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "mpath" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "stop" | "switch" | "textPath" | "tspan" | "use" | "view" | "set">)[Comp] : Comp extends new (...args: any) => any ? InstanceType<Comp> : undefined> | undefined;
} & Omit<import("react").PropsWithoutRef<import("react").ComponentProps<Comp>>, "color" | "as" | "size" | "weight" | keyof import("./Box").ColorProps | keyof import("./Box").RadiiProps | keyof import("./Box").MarginProps | keyof import("./Box").PaddingProps | keyof {
    textAlign?: (("center" | "end" | "justify" | "left" | "right" | "start") | readonly (("center" | "end" | "justify" | "left" | "right" | "start") | null)[]) | undefined;
    height?: import("../types").ResponsiveProp<string | number> | undefined;
    width?: import("../types").ResponsiveProp<string | number> | undefined;
} | "leading" | "tracking"> & {
    /** The leading of the text. */
    leading?: "base" | "loose" | "tighter" | "tight" | "looser" | undefined;
    /** The size of the text. */
    size?: "small" | "medium" | "large" | "xsmall" | "xlarge" | undefined;
    /** The tracking of the text. */
    tracking?: "base" | "loose" | "tighter" | "tight" | "looser" | undefined;
    /** The color of the text. */
    color?: "current" | "transparent" | "white" | "black" | "pink50" | "pink100" | "pink200" | "pink300" | "pink400" | "pink500" | "pink600" | "pink700" | "pink800" | "pink900" | "purple50" | "purple100" | "purple200" | "purple300" | "purple400" | "purple500" | "purple600" | "purple700" | "purple800" | "purple900" | "blue50" | "blue100" | "blue200" | "blue300" | "blue400" | "blue500" | "blue600" | "blue700" | "blue800" | "blue900" | "cyan50" | "cyan100" | "cyan200" | "cyan300" | "cyan400" | "cyan500" | "cyan600" | "cyan700" | "cyan800" | "cyan900" | "teal50" | "teal100" | "teal200" | "teal300" | "teal400" | "teal500" | "teal600" | "teal700" | "teal800" | "teal900" | "green50" | "green100" | "green200" | "green300" | "green400" | "green500" | "green600" | "green700" | "green800" | "green900" | "yellow50" | "yellow100" | "yellow200" | "yellow300" | "yellow400" | "yellow500" | "yellow600" | "yellow700" | "yellow800" | "yellow900" | "orange50" | "orange100" | "orange200" | "orange300" | "orange400" | "orange500" | "orange600" | "orange700" | "orange800" | "orange900" | "red50" | "red100" | "red200" | "red300" | "red400" | "red500" | "red600" | "red700" | "red800" | "red900" | "neutral100" | "neutral200" | "neutral300" | "neutral400" | "neutral500" | "neutral600" | "neutral700" | "neutral800" | "neutral900" | undefined;
    /** The font-weight of the text. */
    weight?: "bold" | "medium" | "light" | "regular" | "semibold" | "heavy" | undefined;
} & import("./Box").ColorProps & import("./Box").RadiiProps & import("./Box").MarginProps & import("./Box").PaddingProps & {
    textAlign?: (("center" | "end" | "justify" | "left" | "right" | "start") | readonly (("center" | "end" | "justify" | "left" | "right" | "start") | null)[]) | undefined;
    height?: import("../types").ResponsiveProp<string | number> | undefined;
    width?: import("../types").ResponsiveProp<string | number> | undefined;
}) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
//# sourceMappingURL=Text.d.ts.map