import { CSSObject } from '@emotion/react';
/**
 * Alias Tokens
 */
type HeadingStyle = {
    color: string;
    family: string;
    size: string;
    transform: Extract<CSSObject['textTransform'], string>;
    weight: number;
};
type ControlSize = {
    borderRadius: number;
    borderWidth: number;
    gutter: number;
    paddingX: number;
    paddingY: number;
    height: number;
    gap: number;
    fontSize: number | string;
    indicatorBoxSize: number | string;
    indicatorFontSize: number | string;
};
type SharedFieldStateTokens = {
    labelColor?: string;
    legendColor?: string;
    shadow?: string;
};
type ControlFieldStateTokens = {
    controlBackground?: string;
    controlBorderColor?: string;
    controlBorderRadius?: number | string;
    controlForeground?: string;
};
type InputFieldStateTokens = {
    inputBackground?: string;
    inputBorderColor?: string;
    inputBorderRadius?: number | string;
    inputForeground?: string;
    iconColor?: string;
};
type FieldStateTokens = SharedFieldStateTokens & ControlFieldStateTokens & InputFieldStateTokens;
type FieldTokens = FieldStateTokens & {
    controlBorderWidth?: number | string;
    inputBorderWidth?: number | string;
    inputPlaceholder?: string;
    switchForeground?: string;
    disabled: FieldStateTokens;
    focus: FieldStateTokens;
    hover: FieldStateTokens;
    invalid: FieldStateTokens;
    selected: SharedFieldStateTokens & ControlFieldStateTokens;
};
/**
 * Export
 */
export declare const theme: {
    name: string;
    typography: {
        fontFamily: {
            monospace: string;
            body: string;
            heading: string;
        };
        fontSize: {
            xxxsmall: string;
            xxsmall: string;
            xsmall: string;
            small: string;
            medium: string;
            large: string;
            xlarge: string;
            xxlarge: string;
            xxxlarge: string;
            xxxxlarge: string;
            xxxxxlarge: string;
            xxxxxxlarge: string;
        };
        fontWeight: {
            light: number;
            regular: number;
            medium: number;
            semibold: number;
            bold: number;
            heavy: number;
        };
        leading: {
            tighter: number;
            tight: number;
            base: number;
            loose: number;
            looser: number;
        };
        tracking: {
            tighter: string;
            tight: string;
            base: string;
            loose: string;
            looser: string;
        };
    };
    palette: {
        pink50: "#fdf2f8";
        pink100: "#fce7f3";
        pink200: "#fbcfe8";
        pink300: "#f9a8d4";
        pink400: "#f472b6";
        pink500: "#ec4899";
        pink600: "#db2777";
        pink700: "#be185d";
        pink800: "#9d174d";
        pink900: "#831843";
        purple50: "#f5f3ff";
        purple100: "#ede9fe";
        purple200: "#ddd6fe";
        purple300: "#c4b5fd";
        purple400: "#a78bfa";
        purple500: "#8b5cf6";
        purple600: "#7c3aed";
        purple700: "#6d28d9";
        purple800: "#5b21b6";
        purple900: "#4c1d95";
        blue50: "#eff6ff";
        blue100: "#dbeafe";
        blue200: "#bfdbfe";
        blue300: "#93c5fd";
        blue400: "#60a5fa";
        blue500: "#3b82f6";
        blue600: "#2563eb";
        blue700: "#1d4ed8";
        blue800: "#1e40af";
        blue900: "#1e3a8a";
        cyan50: "#ecfeff";
        cyan100: "#cffafe";
        cyan200: "#a5f3fc";
        cyan300: "#67e8f9";
        cyan400: "#22d3ee";
        cyan500: "#06b6d4";
        cyan600: "#0891b2";
        cyan700: "#0e7490";
        cyan800: "#155e75";
        cyan900: "#164e63";
        teal50: "#f0fdfa";
        teal100: "#ccfbf1";
        teal200: "#99f6e4";
        teal300: "#5eead4";
        teal400: "#2dd4bf";
        teal500: "#14b8a6";
        teal600: "#0d9488";
        teal700: "#0f766e";
        teal800: "#115e59";
        teal900: "#134e4a";
        green50: "#f0fdf4";
        green100: "#dcfce7";
        green200: "#bbf7d0";
        green300: "#86efac";
        green400: "#4ade80";
        green500: "#22c55e";
        green600: "#16a34a";
        green700: "#15803d";
        green800: "#166534";
        green900: "#14532d";
        yellow50: "#fefce8";
        yellow100: "#fef9c3";
        yellow200: "#fef08a";
        yellow300: "#fde047";
        yellow400: "#facc15";
        yellow500: "#eab308";
        yellow600: "#ca8a04";
        yellow700: "#a16207";
        yellow800: "#854d0e";
        yellow900: "#713f12";
        orange50: "#fff7ed";
        orange100: "#ffedd5";
        orange200: "#fed7aa";
        orange300: "#fdba74";
        orange400: "#fb923c";
        orange500: "#f97316";
        orange600: "#ea580c";
        orange700: "#c2410c";
        orange800: "#9a3412";
        orange900: "#7c2d12";
        red50: "#fef2f2";
        red100: "#fee2e2";
        red200: "#fecaca";
        red300: "#fca5a5";
        red400: "#f87171";
        red500: "#ef4444";
        red600: "#dc2626";
        red700: "#b91c1c";
        red800: "#991b1b";
        red900: "#7f1d1d";
        black: string;
        white: string;
        current: string;
        transparent: string;
        neutral100: string;
        neutral200: string;
        neutral300: string;
        neutral400: string;
        neutral500: string;
        neutral600: string;
        neutral700: string;
        neutral800: string;
        neutral900: string;
    };
    breakpoints: {
        small: number;
        medium: number;
        large: number;
        xlarge: number;
    };
    elevation: {
        e100: number;
        e200: number;
        e300: number;
        e400: number;
        e500: number;
    };
    radii: {
        none: number;
        xsmall: number;
        small: number;
        medium: number;
        large: number;
        full: number;
    };
    sizing: {
        xxsmall: number;
        xsmall: number;
        small: number;
        medium: number;
        large: number;
        xlarge: number;
        xxlarge: number;
    };
    spacing: {
        none: number;
        xxsmall: number;
        xsmall: number;
        small: number;
        medium: number;
        large: number;
        xlarge: number;
        xxlarge: number;
    };
    shadow: {
        s100: string;
        s200: string;
        s300: string;
        s400: string;
        s500: string;
    };
    animation: {
        duration0: string;
        duration50: string;
        duration100: string;
        duration200: string;
        duration300: string;
        duration400: string;
        duration500: string;
        duration600: string;
        duration700: string;
        duration800: string;
        duration900: string;
        duration1000: string;
        spring: string;
        easeInOut: string;
        easeIn: string;
        easeOut: string;
        linear: string;
    };
    opacity: {
        full: number;
        none: number;
        disabled: number;
    };
    headingStyles: {
        [key: string]: HeadingStyle;
    };
    controlSizes: {
        [key: string]: ControlSize;
    };
    colors: {
        background: string;
        backgroundMuted: string;
        backgroundDim: string;
        backgroundHover: "#eff6ff";
        border: string;
        borderCritical: "#f87171";
        borderFocus: "#60a5fa";
        focusRing: "#bfdbfe";
        foreground: string;
        foregroundMuted: string;
        foregroundDim: string;
        foregroundDisabled: string;
        linkColor: "#3b82f6";
        linkHoverColor: "#2563eb";
        overlayBackground: string;
        loaderDark: string;
        loaderLight: string;
    };
    tones: {
        active: {
            focusRing: "#bfdbfe";
            border: ["#93c5fd", "#60a5fa", "#3b82f6"];
            fill: ["#2563eb", "#1d4ed8", "#1e40af"];
            tint: ["#eff6ff", "#dbeafe", "#bfdbfe"];
            foreground: ["#2563eb", "#1d4ed8", "#1e40af"];
            fillForeground: [string, string, string];
        };
        passive: {
            focusRing: string;
            border: [string, string, string];
            fill: [string, string, string];
            tint: [string, string, string];
            foreground: [string, string, string];
            fillForeground: [string, string, string];
        };
        positive: {
            focusRing: "#bbf7d0";
            border: ["#86efac", "#4ade80", "#22c55e"];
            fill: ["#16a34a", "#15803d", "#166534"];
            tint: ["#f0fdf4", "#dcfce7", "#bbf7d0"];
            foreground: ["#16a34a", "#15803d", "#166534"];
            fillForeground: [string, string, string];
        };
        warning: {
            focusRing: "#fef08a";
            border: ["#fde047", "#facc15", "#eab308"];
            fill: ["#facc15", "#eab308", "#ca8a04"];
            tint: ["#fefce8", "#fef9c3", "#fef08a"];
            foreground: ["#ca8a04", "#a16207", "#713f12"];
            fillForeground: [string, string, string];
        };
        negative: {
            focusRing: "#fecaca";
            border: ["#fca5a5", "#f87171", "#ef4444"];
            fill: ["#ef4444", "#dc2626", "#b91c1c"];
            tint: ["#fef2f2", "#fee2e2", "#fecaca"];
            foreground: ["#dc2626", "#b91c1c", "#991b1b"];
            fillForeground: [string, string, string];
        };
        help: {
            focusRing: "#ddd6fe";
            border: ["#c4b5fd", "#a78bfa", "#8b5cf6"];
            fill: ["#8b5cf6", "#7c3aed", "#6d28d9"];
            tint: ["#f5f3ff", "#ede9fe", "#ddd6fe"];
            foreground: ["#7c3aed", "#6d28d9", "#5b21b6"];
            fillForeground: [string, string, string];
        };
    };
    selectableColors: {
        silver: {
            border: string;
            fill: string;
            fillForeground: string;
            foreground: string;
            tint: string;
        };
        grey: {
            border: string;
            fill: string;
            fillForeground: string;
            foreground: string;
            tint: string;
        };
        blue: {
            border: "#60a5fa";
            fill: "#3b82f6";
            fillForeground: string;
            foreground: "#2563eb";
            tint: "#bfdbfe";
        };
        pink: {
            border: "#f472b6";
            fill: "#ec4899";
            fillForeground: string;
            foreground: "#db2777";
            tint: "#fbcfe8";
        };
        green: {
            border: "#4ade80";
            fill: "#22c55e";
            fillForeground: string;
            foreground: "#16a34a";
            tint: "#bbf7d0";
        };
        purple: {
            border: "#a78bfa";
            fill: "#8b5cf6";
            fillForeground: string;
            foreground: "#7c3aed";
            tint: "#ddd6fe";
        };
    };
    fields: FieldTokens;
};
export {};
//# sourceMappingURL=default.d.ts.map