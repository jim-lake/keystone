/** @jsxRuntime classic */
/** @jsx jsx */
/// <reference types="react" />
import { ResponsiveProp, Theme } from '../types';
type DimensionType = number | string;
type TextAlign = 'left' | 'right' | 'center' | 'justify' | 'start' | 'end';
type TextAlignment = ResponsiveProp<TextAlign>;
type ColorType = ResponsiveProp<keyof Theme['palette']>;
export type ColorProps = {
    /** background-color */
    background?: ColorType;
    /** color */
    foreground?: ColorType;
};
type RadiiType = ResponsiveProp<keyof Theme['radii']>;
export type RadiiProps = {
    /** border-radius */
    rounding?: RadiiType;
    /** border-bottom-left-radius and border-bottom-right-radius */
    roundingBottom?: RadiiType;
    /** border-bottom-left-radius and border-top-left-radius */
    roundingLeft?: RadiiType;
    /** border-bottom-right-radius and border-top-right-radius */
    roundingRight?: RadiiType;
    /** border-bottom-left-radius and border-bottom-right-radius */
    roundingTop?: RadiiType;
};
type SpacingType = ResponsiveProp<keyof Theme['spacing']>;
export type MarginProps = {
    /** margin */
    margin?: SpacingType;
    /** margin-top */
    marginTop?: SpacingType;
    /** margin-right */
    marginRight?: SpacingType;
    /** margin-bottom */
    marginBottom?: SpacingType;
    /** margin-left */
    marginLeft?: SpacingType;
    /** margin-top and margin-bottom */
    marginY?: SpacingType;
    /** margin-left and margin-right */
    marginX?: SpacingType;
};
export type PaddingProps = {
    /** padding */
    padding?: SpacingType;
    /** padding-top */
    paddingTop?: SpacingType;
    /** padding-right */
    paddingRight?: SpacingType;
    /** padding-bottom */
    paddingBottom?: SpacingType;
    /** padding-left */
    paddingLeft?: SpacingType;
    /** padding-top and padding-bottom */
    paddingY?: SpacingType;
    /** padding-left and padding-right */
    paddingX?: SpacingType;
};
type BaseBoxProps = {
    /** text-align */
    textAlign?: TextAlignment;
    /** height */
    height?: ResponsiveProp<DimensionType>;
    /** width */
    width?: ResponsiveProp<DimensionType>;
};
export type BoxProps = ColorProps & RadiiProps & MarginProps & PaddingProps & BaseBoxProps;
export declare const useBoxStyles: ({ background, foreground, height, margin, marginTop, marginRight, marginBottom, marginLeft, marginY, marginX, padding, paddingTop, paddingRight, paddingBottom, paddingLeft, paddingY, paddingX, rounding, roundingBottom, roundingLeft, roundingRight, roundingTop, textAlign, width, }: BoxProps) => import("facepaint").DynamicStyle[];
export declare const Box: <Comp extends import("react").ElementType = "div">(props: {
    as?: Comp | undefined;
    ref?: import("react").Ref<Comp extends "symbol" | "text" | "svg" | "animate" | "animateMotion" | "animateTransform" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feDropShadow" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "mpath" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "stop" | "switch" | "textPath" | "tspan" | "use" | "view" | "set" | keyof HTMLElementTagNameMap ? (HTMLElementTagNameMap & Pick<SVGElementTagNameMap, "symbol" | "text" | "svg" | "animate" | "animateMotion" | "animateTransform" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feDropShadow" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "mpath" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "stop" | "switch" | "textPath" | "tspan" | "use" | "view" | "set">)[Comp] : Comp extends new (...args: any) => any ? InstanceType<Comp> : undefined> | undefined;
} & Omit<import("react").PropsWithoutRef<import("react").ComponentProps<Comp>>, "as" | keyof ColorProps | keyof RadiiProps | keyof MarginProps | keyof PaddingProps | keyof BaseBoxProps> & ColorProps & RadiiProps & MarginProps & PaddingProps & BaseBoxProps) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export {};
//# sourceMappingURL=Box.d.ts.map