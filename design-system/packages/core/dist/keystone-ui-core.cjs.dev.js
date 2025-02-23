'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('@emotion/react');
var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');
var reactDom = require('react-dom');
var facepaint = require('facepaint');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var facepaint__default = /*#__PURE__*/_interopDefault(facepaint);

/*
  Simple switch to return a child tag from a parent tag argument.
  Returns a div by default.
*/
const getChildTag = parentTag => {
  switch (parentTag) {
    case 'ul':
    case 'ol':
      return 'li';
    default:
      return 'div';
  }
};

/*
  @johannes' one weird trick for fixing TypeScript autocomplete
*/
function identityType() {
  function inner(u) {
    return u;
  }
  return inner;
}

/*
  Logs a warning to the console when the condition is true, only in dev
*/
const devWarning = (condition, message) => {
  if (process.env.NODE_ENV !== 'production') {
    if (condition) {
      console.error(message);
    }
  }
};

/*
  forwardRefWithAs lets us forward refs while keeping the correct component type,
  which can be specified by the `as` prop.
*/

const forwardRefWithAs = render => {
  // @ts-ignore
  return /*#__PURE__*/React.forwardRef(render);
};

/*
  A helper for making valid IDs from a set of inputs
*/
function makeId() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return args.filter(val => val != null).join('--');
}

/*
  A helper for handling string OR array values e.g.

  <Component size="small" />
  VS
  <Component size={['small', 'large']} />
*/
const mapResponsiveProp = (value, valueMap) => {
  if (Array.isArray(value)) {
    return value.map(k => k == null ? null : valueMap[k]);
  }
  // @ts-ignore
  return valueMap[value];
};

/**
 * Utils below are ported with thanks from @reach-ui
 * Copyright (c) 2018-present, React Training LLC
 */

// Autogenerate IDs to facilitate WAI-ARIA and server rendering. For reasoning, see
// https://github.com/reach/reach-ui/blob/develop/packages/auto-id/src/index.tsx
let serverHandoffComplete = false;
let id = 0;
const genId = () => ++id;
const useId = idFromProps => {
  const initialId = idFromProps || (serverHandoffComplete ? genId() : null);
  const [id, setId] = React.useState(initialId);
  useSafeLayoutEffect(() => {
    if (id === null) {
      setId(genId());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (serverHandoffComplete === false) {
      serverHandoffComplete = true;
    }
  }, []);
  return id != null ? String(id) : undefined;
};

// Works around useLayoutEffect throwing a warning when used in SSR
const useSafeLayoutEffect = typeof window === 'undefined' ? () => {} : React.useLayoutEffect;
const Portal = _ref => {
  let {
    children
  } = _ref;
  if (typeof document === 'undefined') {
    return null;
  }
  return /*#__PURE__*/reactDom.createPortal(children, document.body);
};

// Only display content to screen readers
// ------------------------------
// See: https://a11yproject.com/posts/how-to-hide-content/
const VisuallyHidden = forwardRefWithAs((_ref, ref) => {
  let {
    as: Tag = 'span',
    ...props
  } = _ref;
  return /*#__PURE__*/React__default["default"].createElement(Tag, _extends({
    ref: ref,
    style: visuallyHiddenStyles
  }, props));
});
const visuallyHiddenStyles = {
  border: 0,
  clip: 'rect(0, 0, 0, 0)',
  height: 1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1
};

/*
  Credit to TailwindCSS for this color palette, while we come up with our own
  https://github.com/tailwindlabs/tailwindcss
*/

const palette$1 = {
  // rose50: '#fff1f2',
  // rose100: '#ffe4e6',
  // rose200: '#fecdd3',
  // rose300: '#fda4af',
  // rose400: '#fb7185',
  // rose500: '#f43f5e',
  // rose600: '#e11d48',
  // rose700: '#be123c',
  // rose800: '#9f1239',
  // rose900: '#881337',
  pink50: '#fdf2f8',
  pink100: '#fce7f3',
  pink200: '#fbcfe8',
  pink300: '#f9a8d4',
  pink400: '#f472b6',
  pink500: '#ec4899',
  pink600: '#db2777',
  pink700: '#be185d',
  pink800: '#9d174d',
  pink900: '#831843',
  // fuchsia50: '#fdf4ff',
  // fuchsia100: '#fae8ff',
  // fuchsia200: '#f5d0fe',
  // fuchsia300: '#f0abfc',
  // fuchsia400: '#e879f9',
  // fuchsia500: '#d946ef',
  // fuchsia600: '#c026d3',
  // fuchsia700: '#a21caf',
  // fuchsia800: '#86198f',
  // fuchsia900: '#701a75',
  // _purple50: '#faf5ff',
  // _purple100: '#f3e8ff',
  // _purple200: '#e9d5ff',
  // _purple300: '#d8b4fe',
  // _purple400: '#c084fc',
  // _purple500: '#a855f7',
  // _purple600: '#9333ea',
  // _purple700: '#7e22ce',
  // _purple800: '#6b21a8',
  // _purple900: '#581c87',
  purple50: '#f5f3ff',
  // was violet
  purple100: '#ede9fe',
  // was violet
  purple200: '#ddd6fe',
  // was violet
  purple300: '#c4b5fd',
  // was violet
  purple400: '#a78bfa',
  // was violet
  purple500: '#8b5cf6',
  // was violet
  purple600: '#7c3aed',
  // was violet
  purple700: '#6d28d9',
  // was violet
  purple800: '#5b21b6',
  // was violet
  purple900: '#4c1d95',
  // was violet
  // indigo50: '#eef2ff',
  // indigo100: '#e0e7ff',
  // indigo200: '#c7d2fe',
  // indigo300: '#a5b4fc',
  // indigo400: '#818cf8',
  // indigo500: '#6366f1',
  // indigo600: '#4f46e5',
  // indigo700: '#4338ca',
  // indigo800: '#3730a3',
  // indigo900: '#312e81',
  blue50: '#eff6ff',
  blue100: '#dbeafe',
  blue200: '#bfdbfe',
  blue300: '#93c5fd',
  blue400: '#60a5fa',
  blue500: '#3b82f6',
  blue600: '#2563eb',
  blue700: '#1d4ed8',
  blue800: '#1e40af',
  blue900: '#1e3a8a',
  // lightBlue50: '#f0f9ff',
  // lightBlue100: '#e0f2fe',
  // lightBlue200: '#bae6fd',
  // lightBlue300: '#7dd3fc',
  // lightBlue400: '#38bdf8',
  // lightBlue500: '#0ea5e9',
  // lightBlue600: '#0284c7',
  // lightBlue700: '#0369a1',
  // lightBlue800: '#075985',
  // lightBlue900: '#0c4a6e',
  cyan50: '#ecfeff',
  cyan100: '#cffafe',
  cyan200: '#a5f3fc',
  cyan300: '#67e8f9',
  cyan400: '#22d3ee',
  cyan500: '#06b6d4',
  cyan600: '#0891b2',
  cyan700: '#0e7490',
  cyan800: '#155e75',
  cyan900: '#164e63',
  teal50: '#f0fdfa',
  teal100: '#ccfbf1',
  teal200: '#99f6e4',
  teal300: '#5eead4',
  teal400: '#2dd4bf',
  teal500: '#14b8a6',
  teal600: '#0d9488',
  teal700: '#0f766e',
  teal800: '#115e59',
  teal900: '#134e4a',
  // emerald50: '#ecfdf5',
  // emerald100: '#d1fae5',
  // emerald200: '#a7f3d0',
  // emerald300: '#6ee7b7',
  // emerald400: '#34d399',
  // emerald500: '#10b981',
  // emerald600: '#059669',
  // emerald700: '#047857',
  // emerald800: '#065f46',
  // emerald900: '#064e3b',
  green50: '#f0fdf4',
  green100: '#dcfce7',
  green200: '#bbf7d0',
  green300: '#86efac',
  green400: '#4ade80',
  green500: '#22c55e',
  green600: '#16a34a',
  green700: '#15803d',
  green800: '#166534',
  green900: '#14532d',
  // lime50: '#f7fee7',
  // lime100: '#ecfccb',
  // lime200: '#d9f99d',
  // lime300: '#bef264',
  // lime400: '#a3e635',
  // lime500: '#84cc16',
  // lime600: '#65a30d',
  // lime700: '#4d7c0f',
  // lime800: '#3f6212',
  // lime900: '#365314',
  yellow50: '#fefce8',
  yellow100: '#fef9c3',
  yellow200: '#fef08a',
  yellow300: '#fde047',
  yellow400: '#facc15',
  yellow500: '#eab308',
  yellow600: '#ca8a04',
  yellow700: '#a16207',
  yellow800: '#854d0e',
  yellow900: '#713f12',
  // amber50: '#fffbeb',
  // amber100: '#fef3c7',
  // amber200: '#fde68a',
  // amber300: '#fcd34d',
  // amber400: '#fbbf24',
  // amber500: '#f59e0b',
  // amber600: '#d97706',
  // amber700: '#b45309',
  // amber800: '#92400e',
  // amber900: '#78350f',
  orange50: '#fff7ed',
  orange100: '#ffedd5',
  orange200: '#fed7aa',
  orange300: '#fdba74',
  orange400: '#fb923c',
  orange500: '#f97316',
  orange600: '#ea580c',
  orange700: '#c2410c',
  orange800: '#9a3412',
  orange900: '#7c2d12',
  red50: '#fef2f2',
  red100: '#fee2e2',
  red200: '#fecaca',
  red300: '#fca5a5',
  red400: '#f87171',
  red500: '#ef4444',
  red600: '#dc2626',
  red700: '#b91c1c',
  red800: '#991b1b',
  red900: '#7f1d1d'
  // warmGray50: '#fafaf9',
  // warmGray100: '#f5f5f4',
  // warmGray200: '#e7e5e4',
  // warmGray300: '#d6d3d1',
  // warmGray400: '#a8a29e',
  // warmGray500: '#78716c',
  // warmGray600: '#57534e',
  // warmGray700: '#44403c',
  // warmGray800: '#292524',
  // warmGray900: '#1c1917',
  // trueGray50: '#fafafa',
  // trueGray100: '#f5f5f5',
  // trueGray200: '#e5e5e5',
  // trueGray300: '#d4d4d4',
  // trueGray400: '#a3a3a3',
  // trueGray500: '#737373',
  // trueGray600: '#525252',
  // trueGray700: '#404040',
  // trueGray800: '#262626',
  // trueGray900: '#171717',
  // gray50: '#fafafa',
  // gray100: '#f4f4f5',
  // gray200: '#e4e4e7',
  // gray300: '#d4d4d8',
  // gray400: '#a1a1aa',
  // gray500: '#71717a',
  // gray600: '#52525b',
  // gray700: '#3f3f46',
  // gray800: '#27272a',
  // gray900: '#18181b',
  // coolGray50: '#f9fafb',
  // coolGray100: '#f3f4f6',
  // coolGray200: '#e5e7eb',
  // coolGray300: '#d1d5db',
  // coolGray400: '#9ca3af',
  // coolGray500: '#6b7280',
  // coolGray600: '#4b5563',
  // coolGray700: '#374151',
  // coolGray800: '#1f2937',
  // coolGray900: '#111827',
  // blueGray50: '#f8fafc',
  // blueGray100: '#f1f5f9',
  // blueGray200: '#e2e8f0',
  // blueGray300: '#cbd5e1',
  // blueGray400: '#94a3b8',
  // blueGray500: '#64748b',
  // blueGray600: '#475569',
  // blueGray700: '#334155',
  // blueGray800: '#1e293b',
  // blueGray900: '#0f172a',
};

/**
 * Global Tokens
 */

const typography = {
  fontFamily: {
    monospace: 'Consolas, Menlo, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif'
  },
  fontSize: {
    xxxsmall: '0.5rem',
    xxsmall: '0.6rem',
    xsmall: '0.75rem',
    small: '0.875rem',
    medium: '1rem',
    large: '1.125rem',
    xlarge: '1.25rem',
    xxlarge: '1.5rem',
    xxxlarge: '1.875rem',
    xxxxlarge: '2.25rem',
    xxxxxlarge: '3rem',
    xxxxxxlarge: '4rem'
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    heavy: 800
  },
  leading: {
    tighter: 1,
    tight: 1.2,
    base: 1.4,
    loose: 1.6,
    looser: 1.8
  },
  tracking: {
    tighter: '-0.02em',
    tight: '-0.01em',
    base: '0em',
    loose: '0.01em',
    looser: '0.02em'
  }
};
const palette = {
  black: '#000000',
  white: '#ffffff',
  current: 'currentColor',
  transparent: 'transparent',
  neutral100: '#fafbfc',
  neutral200: '#eff3f6',
  neutral300: '#e1e5e9',
  neutral400: '#ccd1d5',
  neutral500: '#b1b5b9',
  neutral600: '#9ca3af',
  neutral700: '#6b7280',
  neutral800: '#374151',
  neutral900: '#111827',
  ...palette$1
};
const breakpoints = {
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200
};
const elevation = {
  e100: 100,
  // Cards
  e200: 200,
  // Inline dialogs (popover)
  e300: 300,
  // Tooltip
  e400: 400,
  // Modals
  e500: 500 // Toasts (notifications)
};

const radii = {
  none: 0,
  xsmall: 4,
  small: 6,
  medium: 8,
  large: 12,
  full: 9999
};
const sizing = {
  xxsmall: 16,
  xsmall: 20,
  small: 24,
  medium: 32,
  large: 38,
  xlarge: 42,
  xxlarge: 48
};
const spacing = {
  none: 0,
  xxsmall: 2,
  xsmall: 4,
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 24,
  xxlarge: 32
};
const shadow = {
  s100: `0px 1px 2px rgba(0, 0, 0, 0.2)`,
  // Cards
  s200: `0px 2px 4px rgba(0, 0, 0, 0.2)`,
  // Inline dialogs (popover)
  s300: `0px 2px 8px rgba(0, 0, 0, 0.2)`,
  // Tooltip
  s400: `0px 4px 16px rgba(0, 0, 0, 0.2)`,
  // Modals
  s500: `-8px 8px 32px rgba(0, 0, 0, 0.2)` // Toasts (notifications)
};

const animation = {
  duration0: '0ms',
  duration50: '40ms',
  duration100: '130ms',
  duration200: '160ms',
  duration300: '190ms',
  duration400: '220ms',
  duration500: '250ms',
  duration600: '300ms',
  duration700: '350ms',
  duration800: '400ms',
  duration900: '450ms',
  duration1000: '500ms',
  spring: `cubic-bezier(0.2, 0, 0, 1.6)`,
  easeInOut: 'cubic-bezier(.45, 0, .40, 1)',
  easeIn: `cubic-bezier(0.2, 0, 0, 1)`,
  easeOut: `cubic-bezier(0.165, 0.840, 0.440, 1)`,
  linear: 'cubic-bezier(0, 0, 1, 1)'
};
const opacity = {
  full: 1,
  none: 0,
  disabled: 0.65
};

/**
 * Alias Tokens
 */

const headingStyles = {
  h1: {
    color: palette.neutral900,
    family: typography.fontFamily.heading,
    size: typography.fontSize.xxxlarge,
    transform: 'none',
    weight: typography.fontWeight.heavy
  },
  h2: {
    color: palette.neutral900,
    family: typography.fontFamily.heading,
    size: typography.fontSize.xxlarge,
    transform: 'none',
    weight: typography.fontWeight.bold
  },
  h3: {
    color: palette.neutral900,
    family: typography.fontFamily.heading,
    size: typography.fontSize.xlarge,
    transform: 'none',
    weight: typography.fontWeight.bold
  },
  h4: {
    color: palette.neutral900,
    family: typography.fontFamily.heading,
    size: typography.fontSize.large,
    transform: 'none',
    weight: typography.fontWeight.bold
  },
  h5: {
    color: palette.neutral900,
    family: typography.fontFamily.heading,
    size: typography.fontSize.medium,
    transform: 'none',
    weight: typography.fontWeight.bold
  },
  h6: {
    color: palette.neutral900,
    family: typography.fontFamily.heading,
    size: typography.fontSize.small,
    transform: 'uppercase',
    weight: typography.fontWeight.bold
  }
};
const controlSizes = {
  small: {
    borderRadius: radii.xsmall,
    borderWidth: 1,
    gutter: spacing.xsmall,
    paddingX: spacing.medium,
    paddingY: spacing.xsmall,
    height: sizing.medium,
    gap: spacing.small,
    fontSize: typography.fontSize.small,
    indicatorBoxSize: sizing.xsmall,
    indicatorFontSize: typography.fontSize.xxxsmall
  },
  medium: {
    borderRadius: radii.small,
    borderWidth: 1,
    gutter: spacing.xsmall,
    paddingX: spacing.large,
    paddingY: spacing.xsmall,
    height: sizing.large,
    gap: spacing.medium,
    fontSize: typography.fontSize.medium,
    indicatorBoxSize: sizing.small,
    indicatorFontSize: typography.fontSize.xxsmall
  },
  large: {
    borderRadius: radii.medium,
    borderWidth: 1,
    gutter: spacing.small,
    paddingX: spacing.large,
    paddingY: spacing.small,
    height: sizing.xxlarge,
    gap: spacing.medium,
    fontSize: typography.fontSize.large,
    indicatorBoxSize: sizing.medium,
    indicatorFontSize: typography.fontSize.small
  }
};
const colors = {
  background: 'white',
  backgroundMuted: palette.neutral100,
  backgroundDim: palette.neutral200,
  backgroundHover: palette.blue50,
  border: palette.neutral300,
  borderCritical: palette.red400,
  borderFocus: palette.blue400,
  focusRing: palette.blue200,
  foreground: palette.neutral800,
  foregroundMuted: palette.neutral900,
  foregroundDim: palette.neutral700,
  foregroundDisabled: palette.neutral500,
  linkColor: palette.blue500,
  linkHoverColor: palette.blue600,
  overlayBackground: 'rgba(18,18,18, 0.3)',
  // blanket behind modal dialogs
  loaderDark: palette.neutral500,
  loaderLight: palette.neutral200
};

/**

Tones have 3 backgrounds:
- pass-through (colors.background or colors.backgroundMuted)
- tint (tone.tint)
- fill (tone.fill)

Tones have 2 foregrounds that should work on these backgrounds:
- foreground (should work on pass-through and tint)
- fillForeground (should work on fill)

*/

const tones = identityType()({
  active: {
    focusRing: palette.blue200,
    border: [palette.blue300, palette.blue400, palette.blue500],
    fill: [palette.blue600, palette.blue700, palette.blue800],
    tint: [palette.blue50, palette.blue100, palette.blue200],
    foreground: [palette.blue600, palette.blue700, palette.blue800],
    fillForeground: [palette.white, palette.white, palette.white]
  },
  passive: {
    focusRing: palette.neutral300,
    border: [palette.neutral300, palette.neutral400, palette.neutral500],
    fill: [palette.neutral600, palette.neutral700, palette.neutral800],
    tint: [palette.neutral200, palette.neutral300, palette.neutral400],
    foreground: [palette.neutral700, palette.neutral800, palette.neutral900],
    fillForeground: [palette.white, palette.white, palette.white]
  },
  positive: {
    focusRing: palette.green200,
    border: [palette.green300, palette.green400, palette.green500],
    fill: [palette.green600, palette.green700, palette.green800],
    tint: [palette.green50, palette.green100, palette.green200],
    foreground: [palette.green600, palette.green700, palette.green800],
    fillForeground: [palette.white, palette.white, palette.white]
  },
  warning: {
    focusRing: palette.yellow200,
    border: [palette.yellow300, palette.yellow400, palette.yellow500],
    fill: [palette.yellow400, palette.yellow500, palette.yellow600],
    tint: [palette.yellow50, palette.yellow100, palette.yellow200],
    foreground: [palette.yellow600, palette.yellow700, palette.yellow900],
    fillForeground: [palette.black, palette.black, palette.black]
  },
  negative: {
    focusRing: palette.red200,
    border: [palette.red300, palette.red400, palette.red500],
    fill: [palette.red500, palette.red600, palette.red700],
    tint: [palette.red50, palette.red100, palette.red200],
    foreground: [palette.red600, palette.red700, palette.red800],
    fillForeground: [palette.white, palette.white, palette.white]
  },
  help: {
    focusRing: palette.purple200,
    border: [palette.purple300, palette.purple400, palette.purple500],
    fill: [palette.purple500, palette.purple600, palette.purple700],
    tint: [palette.purple50, palette.purple100, palette.purple200],
    foreground: [palette.purple600, palette.purple700, palette.purple800],
    fillForeground: [palette.white, palette.white, palette.white]
  }
});
const selectableColors = identityType()({
  silver: {
    border: palette.neutral400,
    fill: palette.neutral500,
    fillForeground: 'white',
    foreground: palette.neutral600,
    tint: palette.neutral200
  },
  grey: {
    border: palette.neutral600,
    fill: palette.neutral700,
    fillForeground: 'white',
    foreground: palette.neutral700,
    tint: palette.neutral300
  },
  blue: {
    border: palette.blue400,
    fill: palette.blue500,
    fillForeground: 'white',
    foreground: palette.blue600,
    tint: palette.blue200
  },
  pink: {
    border: palette.pink400,
    fill: palette.pink500,
    fillForeground: 'white',
    foreground: palette.pink600,
    tint: palette.pink200
  },
  green: {
    border: palette.green400,
    fill: palette.green500,
    fillForeground: 'white',
    foreground: palette.green600,
    tint: palette.green200
  },
  purple: {
    border: palette.purple400,
    fill: palette.purple500,
    fillForeground: 'white',
    foreground: palette.purple600,
    tint: palette.purple200
  }
});
const fields = {
  controlBackground: 'white',
  controlBorderColor: palette.neutral300,
  controlBorderRadius: radii.small,
  controlBorderWidth: 2,
  controlForeground: palette.blue500,
  // iconColor: palette.neutral500, // TODO
  inputBackground: palette.neutral100,
  inputBorderColor: palette.neutral300,
  inputBorderRadius: radii.small,
  inputBorderWidth: 1,
  inputForeground: palette.neutral800,
  inputPlaceholder: palette.neutral500,
  labelColor: palette.neutral800,
  legendColor: palette.neutral600,
  switchForeground: 'white',
  hover: {
    inputBorderColor: palette.neutral400,
    controlBorderColor: palette.blue500
  },
  focus: {
    controlBorderColor: palette.blue500,
    inputBorderColor: palette.blue500,
    inputBackground: 'white',
    shadow: `0 0 0 2px ${colors.focusRing}`
  },
  disabled: {
    inputBackground: palette.neutral100,
    inputForeground: palette.neutral800,
    inputBorderColor: palette.transparent,
    controlBackground: palette.neutral100,
    controlBorderColor: palette.neutral200,
    controlForeground: palette.neutral500
  },
  invalid: {
    inputBackground: palette.red100,
    inputForeground: palette.neutral700,
    labelColor: palette.red600
  },
  selected: {
    controlBackground: palette.blue500,
    controlBorderColor: palette.blue500,
    controlForeground: 'white'
  }
};

/**
 * Export
 */

const theme = {
  name: 'Keystone: Light',
  // Global Tokens
  typography,
  palette,
  breakpoints,
  elevation,
  radii,
  sizing,
  spacing,
  shadow,
  animation,
  opacity,
  // Alias Tokens
  headingStyles,
  controlSizes,
  colors,
  tones,
  selectableColors,
  fields
};

const ThemeContext = /*#__PURE__*/React.createContext({
  theme
});
const ThemeProvider = _ref => {
  let {
    theme,
    children
  } = _ref;
  return /*#__PURE__*/React__default["default"].createElement(ThemeContext.Provider, {
    value: {
      theme
    }
  }, children);
};

// TODO: return type required by pnpm :(
const useTheme = () => {
  const {
    theme
  } = React.useContext(ThemeContext);
  return theme;
};

/*
  Facepaint lets you write properties as arrays e.g.

  <div css={{ width: [200, 400] }} />

  More here: https://github.com/emotion-js/facepaint
*/
const makeMq = breakpoints => facepaint__default["default"](Object.values(breakpoints).map(w => `@media (min-width: ${w}px)`));

// helper if array property declaration isn't appropriate
const makeMinBreak = breakpoints => key => {
  const width = breakpoints[key];
  return `@media (min-width: ${width}px)`;
};

// the breakpoints are designed to go up i.e. min-width
// if a max-width is necessary (hopefully rare) it's nice to provide a helper
const makeMaxBreak = breakpoints => key => {
  const width = breakpoints[key];
  return `@media (max-width: ${width - 1}px)`;
};

// FIXME:
// Should this even be a hook? I think we can just export these utilities...
const useMediaQuery = () => {
  const {
    breakpoints
  } = useTheme();
  return {
    mq: makeMq(breakpoints),
    maxBreak: makeMaxBreak(breakpoints),
    minBreak: makeMinBreak(breakpoints)
  };
};

// Types
// -----
// Style Functions
// ---------------
const useBoxStyles = _ref => {
  let {
    background,
    foreground,
    height,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginY,
    marginX,
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingY,
    paddingX,
    rounding,
    roundingBottom,
    roundingLeft,
    roundingRight,
    roundingTop,
    textAlign,
    width
  } = _ref;
  const theme = useTheme();
  const {
    mq
  } = useMediaQuery();
  const resolvedColors = useColors({
    background,
    foreground
  }, theme);
  const resolvedMargin = useMargin({
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginY,
    marginX
  }, theme);
  const resolvedPadding = usePadding({
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingY,
    paddingX
  }, theme);
  const resolvedRounding = useRadii({
    rounding,
    roundingTop,
    roundingRight,
    roundingBottom,
    roundingLeft
  }, theme);
  return mq({
    ...resolvedColors,
    ...resolvedMargin,
    ...resolvedPadding,
    ...resolvedRounding,
    boxSizing: 'border-box',
    height: height,
    textAlign: textAlign,
    width: width
  });
};

// Utils
// ------------------------------

function useColors(_ref2, _ref3) {
  let {
    background,
    foreground
  } = _ref2;
  let {
    palette
  } = _ref3;
  return {
    backgroundColor: background && mapResponsiveProp(background, palette),
    color: foreground && mapResponsiveProp(foreground, palette)
  };
}
function useRadii(_ref4, _ref5) {
  let {
    rounding,
    roundingTop,
    roundingRight,
    roundingBottom,
    roundingLeft
  } = _ref4;
  let {
    radii
  } = _ref5;
  let borderBottomLeftRadius = roundingBottom || roundingLeft || rounding;
  let borderBottomRightRadius = roundingBottom || roundingRight || rounding;
  let borderTopLeftRadius = roundingTop || roundingLeft || rounding;
  let borderTopRightRadius = roundingTop || roundingRight || rounding;
  return {
    borderBottomLeftRadius: borderBottomLeftRadius && mapResponsiveProp(borderBottomLeftRadius, radii),
    borderBottomRightRadius: borderBottomRightRadius && mapResponsiveProp(borderBottomRightRadius, radii),
    borderTopLeftRadius: borderTopLeftRadius && mapResponsiveProp(borderTopLeftRadius, radii),
    borderTopRightRadius: borderTopRightRadius && mapResponsiveProp(borderTopRightRadius, radii)
  };
}
function usePadding(_ref6, _ref7) {
  let {
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingY,
    paddingX
  } = _ref6;
  let {
    spacing
  } = _ref7;
  let pb = paddingBottom || paddingY || padding;
  let pt = paddingTop || paddingY || padding;
  let pl = paddingLeft || paddingX || padding;
  let pr = paddingRight || paddingX || padding;
  return {
    paddingBottom: pb && mapResponsiveProp(pb, spacing),
    paddingTop: pt && mapResponsiveProp(pt, spacing),
    paddingLeft: pl && mapResponsiveProp(pl, spacing),
    paddingRight: pr && mapResponsiveProp(pr, spacing)
  };
}
function useMargin(_ref8, _ref9) {
  let {
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginY,
    marginX
  } = _ref8;
  let {
    spacing
  } = _ref9;
  let mb = marginBottom || marginY || margin;
  let mt = marginTop || marginY || margin;
  let ml = marginLeft || marginX || margin;
  let mr = marginRight || marginX || margin;
  return {
    marginBottom: mb && mapResponsiveProp(mb, spacing),
    marginTop: mt && mapResponsiveProp(mt, spacing),
    marginLeft: ml && mapResponsiveProp(ml, spacing),
    marginRight: mr && mapResponsiveProp(mr, spacing)
  };
}

// Box Component
// -------------

const Box = forwardRefWithAs((_ref10, ref) => {
  let {
    as: Tag = 'div',
    ...props
  } = _ref10;
  const {
    background,
    foreground,
    height,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginY,
    marginX,
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingY,
    paddingX,
    rounding,
    roundingBottom,
    roundingLeft,
    roundingRight,
    roundingTop,
    textAlign,
    width,
    ...attrs
  } = props;
  const boxStyles = useBoxStyles({
    background,
    foreground,
    height,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginY,
    marginX,
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingY,
    paddingX,
    rounding,
    roundingBottom,
    roundingLeft,
    roundingRight,
    roundingTop,
    textAlign,
    width
  });
  return react.jsx(Tag, _extends({
    css: boxStyles,
    ref: ref
  }, attrs));
});

const normalize = react.css`
  /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */
  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }
  body {
    margin: 0;
  }
  main {
    display: block;
  }
  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }
  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }
  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  a {
    background-color: transparent;
  }
  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
  }
  b,
  strong {
    font-weight: bolder;
  }
  code,
  kbd,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  img {
    border-style: none;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }
  button:focus,
  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
  }
  button,
  input {
    overflow: visible;
  }
  button,
  select {
    text-transform: none;
  }
  [type='button'],
  [type='reset'],
  [type='submit'],
  button {
    -webkit-appearance: button;
  }
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner,
  button::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring,
  button:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
  fieldset {
    border: 0;
    margin: 0;
    padding: 0;
  }
  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }
  progress {
    vertical-align: baseline;
  }
  textarea {
    overflow: auto;
  }
  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  }
  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }
  [type='search'] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }
  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }
  details {
    display: block;
  }
  summary {
    display: list-item;
  }
  template {
    display: none;
  }
  [hidden] {
    display: none;
  }
`;

/** @jsxRuntime classic */
const Core = _ref => {
  let {
    children,
    includeNormalize = true,
    optimizeLegibility = true
  } = _ref;
  return react.jsx(React.Fragment, null, react.jsx(BaseCSS, {
    includeNormalize: includeNormalize,
    optimizeLegibility: optimizeLegibility
  }), children);
};

// Base CSS
// ------------------------------
const BaseCSS = _ref2 => {
  let {
    includeNormalize,
    optimizeLegibility
  } = _ref2;
  const {
    typography,
    colors
  } = useTheme();
  return react.jsx(React.Fragment, null, includeNormalize && react.jsx(react.Global, {
    styles: normalize
  }), react.jsx(react.Global, {
    styles: {
      html: {
        fontSize: 'initial !important' // ensure user's font-size settings are observed, for rems
      },

      body: {
        backgroundColor: colors.background,
        color: colors.foreground,
        fontSize: '1rem',
        fontWeight: typography.fontWeight.regular,
        lineHeight: typography.leading.base,
        fontFamily: typography.fontFamily.body,
        // optimize legibility
        ...(optimizeLegibility && {
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        })
      },
      // Set correct default colors for links from the theme
      a: {
        color: colors.linkColor,
        ':hover': {
          color: colors.linkHoverColor
        }
      },
      // [1] reset all box sizing to border-box
      // [2] default borders so you can add a border by specifying just the width
      '*, ::before, ::after': {
        boxSizing: 'border-box',
        borderWidth: 0,
        borderStyle: 'solid',
        borderColor: colors.border
      }
    }
  }));
};

const Center = forwardRefWithAs((_ref, ref) => {
  let {
    fillView = false,
    ...props
  } = _ref;
  return react.jsx(Box, _extends({
    ref: ref,
    css: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      height: fillView ? '100vh' : undefined,
      width: fillView ? '100vw' : undefined
    }
  }, props));
});

const orientationMap$1 = {
  horizontal: 'width',
  vertical: 'height'
};
const Divider = _ref => {
  let {
    orientation = 'vertical',
    color,
    ...props
  } = _ref;
  const {
    colors
  } = useTheme();
  const dimension = orientationMap$1[orientation];
  const styles = {
    // default the background color to the theme border color
    backgroundColor: color ? undefined : colors.border,
    flexShrink: 0,
    [dimension]: 1
  };

  // if the color prop is defined, pass it as the background to the box
  return react.jsx(Box, _extends({
    css: styles,
    background: color
  }, props));
};

const Heading = forwardRefWithAs((_ref, ref) => {
  let {
    as = 'h1',
    type = 'h1',
    ...props
  } = _ref;
  const {
    headingStyles
  } = useTheme();
  const headingStyle = headingStyles[type];
  const styles = {
    color: headingStyle.color,
    fontFamily: headingStyle.family,
    fontSize: headingStyle.size,
    fontWeight: headingStyle.weight,
    textTransform: headingStyle.transform,
    margin: 0
  };
  return react.jsx(Box, _extends({
    as: as,
    css: styles,
    ref: ref
  }, props));
});
const H1 = forwardRefWithAs((_ref2, ref) => {
  let {
    as = 'h1',
    ...props
  } = _ref2;
  return react.jsx(Heading, _extends({
    ref: ref,
    as: as,
    type: "h1"
  }, props));
});
const H2 = forwardRefWithAs((_ref3, ref) => {
  let {
    as = 'h2',
    ...props
  } = _ref3;
  return react.jsx(Heading, _extends({
    ref: ref,
    as: as,
    type: "h2"
  }, props));
});
const H3 = forwardRefWithAs((_ref4, ref) => {
  let {
    as = 'h3',
    ...props
  } = _ref4;
  return react.jsx(Heading, _extends({
    ref: ref,
    as: as,
    type: "h3"
  }, props));
});
const H4 = forwardRefWithAs((_ref5, ref) => {
  let {
    as = 'h4',
    ...props
  } = _ref5;
  return react.jsx(Heading, _extends({
    ref: ref,
    as: as,
    type: "h4"
  }, props));
});
const H5 = forwardRefWithAs((_ref6, ref) => {
  let {
    as = 'h5',
    ...props
  } = _ref6;
  return react.jsx(Heading, _extends({
    ref: ref,
    as: as,
    type: "h5"
  }, props));
});
const H6 = forwardRefWithAs((_ref7, ref) => {
  let {
    as = 'h6',
    ...props
  } = _ref7;
  return react.jsx(Heading, _extends({
    ref: ref,
    as: as,
    type: "h6"
  }, props));
});

const alignment$1 = {
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch'
};
const Inline = forwardRefWithAs((_ref, ref) => {
  let {
    align = 'start',
    children,
    gap = 'none',
    ...props
  } = _ref;
  const {
    spacing
  } = useTheme();
  const resolvedAlign = alignment$1[align];
  const resolvedGap = spacing[gap];
  const ChildWrapper = getChildTag(props.as);
  return react.jsx(Box, _extends({
    css: {
      alignItems: resolvedAlign,
      display: 'flex',
      flexWrap: 'wrap',
      marginLeft: -resolvedGap,
      marginTop: -resolvedGap
    },
    ref: ref
  }, props), React.Children.map(children, child => child !== null && child !== undefined ? react.jsx(ChildWrapper, {
    css: {
      display: 'flex',
      flexWrap: 'wrap',
      paddingLeft: resolvedGap,
      paddingTop: resolvedGap
    }
  }, child) : null));
});

const Link = forwardRefWithAs((_ref, ref) => {
  let {
    as: Tag = 'a',
    ...props
  } = _ref;
  const {
    typography,
    colors
  } = useTheme();
  const styles = {
    color: colors.linkColor,
    cursor: 'pointer',
    fontWeight: typography.fontWeight.medium,
    textDecoration: 'none',
    ':hover, :focus': {
      color: colors.linkHoverColor,
      textDecoration: 'underline'
    }
  };
  return react.jsx(Tag, _extends({
    css: styles,
    ref: ref
  }, props));
});

const alignment = {
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch'
};
const orientationMap = {
  horizontal: {
    flexDirection: 'row',
    marginProperty: 'marginLeft',
    dimension: 'width'
  },
  vertical: {
    flexDirection: 'column',
    marginProperty: 'marginTop',
    dimension: 'height'
  }
};
const Stack = forwardRefWithAs((_ref, ref) => {
  let {
    across,
    align = 'stretch',
    children,
    dividers = 'none',
    gap = 'none',
    ...props
  } = _ref;
  const {
    spacing
  } = useTheme();
  const {
    mq
  } = useMediaQuery();
  const orientation = across ? 'horizontal' : 'vertical';
  const {
    dimension,
    flexDirection,
    marginProperty
  } = orientationMap[orientation];
  const ChildWrapper = getChildTag(props.as);
  return react.jsx(Box, _extends({
    ref: ref,
    css: mq({
      alignItems: alignment[align],
      display: 'flex',
      flexDirection,
      [dimension]: 'fit-content',
      '& > * + *': {
        [marginProperty]: mapResponsiveProp(gap, spacing)
      }
    })
  }, props), ['around', 'start'].includes(dividers) && react.jsx(Divider, {
    orientation: orientation
  }), React.Children.toArray(children).filter(child => /*#__PURE__*/React.isValidElement(child)).map((child, index) => {
    return react.jsx(React.Fragment, {
      key: index
    }, dividers !== 'none' && index ? react.jsx(Divider, {
      orientation: orientation
    }) : null, react.jsx(ChildWrapper, {
      css: {
        ':empty': {
          display: 'none'
        }
      }
    }, child));
  }), ['around', 'end'].includes(dividers) && react.jsx(Divider, {
    orientation: orientation
  }));
});

const Text = forwardRefWithAs((_ref, ref) => {
  let {
    color,
    leading = 'base',
    size = 'medium',
    tracking = 'base',
    weight = 'regular',
    ...props
  } = _ref;
  const {
    palette,
    typography
  } = useTheme();
  const {
    mq
  } = useMediaQuery();
  const styles = mq({
    color: color ? palette[color] : undefined,
    fontSize: typography.fontSize[size],
    fontWeight: typography.fontWeight[weight],
    letterSpacing: typography.tracking[tracking],
    lineHeight: typography.leading[leading]
  });
  return react.jsx(Box, _extends({
    css: styles,
    ref: ref
  }, props));
});

function useManagedState(controlledValue, defaultValue, onChange) {
  const {
    current: isControlled
  } = React.useRef(controlledValue !== undefined);
  const [internalValue, setInternalValue] = React.useState(defaultValue);

  // warn consumers when their component is switching from controlled to uncontrolled and vice versa
  devWarning(isControlled && controlledValue === undefined, 'A component is changing from controlled to uncontrolled. Check the `value` prop being passed in.');
  devWarning(!isControlled && controlledValue !== undefined, 'A component is changing from uncontrolled to controlled. Check the `value` prop being passed in.');

  // handle value changes (both internal, and controlled)
  const setValue = (v, e) => {
    if (typeof onChange === 'function') {
      onChange(v, e);
    }
    setInternalValue(v);
  };

  // determine which value to pass on
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  return [value, setValue];
}

Object.defineProperty(exports, 'ClassNames', {
  enumerable: true,
  get: function () { return react.ClassNames; }
});
Object.defineProperty(exports, 'Global', {
  enumerable: true,
  get: function () { return react.Global; }
});
Object.defineProperty(exports, 'css', {
  enumerable: true,
  get: function () { return react.css; }
});
Object.defineProperty(exports, 'jsx', {
  enumerable: true,
  get: function () { return react.jsx; }
});
Object.defineProperty(exports, 'keyframes', {
  enumerable: true,
  get: function () { return react.keyframes; }
});
exports.Box = Box;
exports.Center = Center;
exports.Core = Core;
exports.Divider = Divider;
exports.H1 = H1;
exports.H2 = H2;
exports.H3 = H3;
exports.H4 = H4;
exports.H5 = H5;
exports.H6 = H6;
exports.Heading = Heading;
exports.Inline = Inline;
exports.Link = Link;
exports.Portal = Portal;
exports.Stack = Stack;
exports.Text = Text;
exports.ThemeContext = ThemeContext;
exports.ThemeProvider = ThemeProvider;
exports.VisuallyHidden = VisuallyHidden;
exports.devWarning = devWarning;
exports.forwardRefWithAs = forwardRefWithAs;
exports.getChildTag = getChildTag;
exports.identityType = identityType;
exports.makeId = makeId;
exports.mapResponsiveProp = mapResponsiveProp;
exports.useId = useId;
exports.useManagedState = useManagedState;
exports.useMediaQuery = useMediaQuery;
exports.useSafeLayoutEffect = useSafeLayoutEffect;
exports.useTheme = useTheme;
