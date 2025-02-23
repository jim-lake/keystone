/** @jsxRuntime classic */
/** @jsx jsx */
import { ElementType, ReactNode } from 'react';
import { jsx } from '@keystone-ui/core';
export type SizeType = 'small' | 'medium';
export type ShapeType = 'square' | 'round';
export type AdornmentWrapperProps = {
    children: ReactNode;
    shape: ShapeType;
    size: SizeType;
};
export declare const AdornmentWrapper: ({ children, shape, size }: AdornmentWrapperProps) => jsx.JSX.Element;
type AdornmentProps = {
    align: 'left' | 'right';
    as?: ElementType;
};
export declare const Adornment: <Comp extends ElementType = "div">(props: {
    as?: Comp | undefined;
    ref?: import("react").Ref<Comp extends "symbol" | "text" | "svg" | "animate" | "animateMotion" | "animateTransform" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feDropShadow" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "mpath" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "stop" | "switch" | "textPath" | "tspan" | "use" | "view" | "set" | keyof HTMLElementTagNameMap ? (HTMLElementTagNameMap & Pick<SVGElementTagNameMap, "symbol" | "text" | "svg" | "animate" | "animateMotion" | "animateTransform" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feDropShadow" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "mpath" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "stop" | "switch" | "textPath" | "tspan" | "use" | "view" | "set">)[Comp] : Comp extends new (...args: any) => any ? InstanceType<Comp> : undefined> | undefined;
} & Omit<import("react").PropsWithoutRef<import("react").ComponentProps<Comp>>, keyof AdornmentProps> & AdornmentProps) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export {};
//# sourceMappingURL=Adornments.d.ts.map