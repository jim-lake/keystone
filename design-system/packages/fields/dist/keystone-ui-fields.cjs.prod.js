'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var react = require('react');
var core = require('@keystone-ui/core');
var ReactSelect = require('react-select');
var FocusLock = require('react-focus-lock');
var popover = require('@keystone-ui/popover');
var dateFns = require('date-fns');
var reactDayPicker = require('react-day-picker');
var XIcon = require('@keystone-ui/icons/icons/XIcon');
var CalendarIcon = require('@keystone-ui/icons/icons/CalendarIcon');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var ReactSelect__default = /*#__PURE__*/_interopDefault(ReactSelect);
var FocusLock__default = /*#__PURE__*/_interopDefault(FocusLock);

/** @jsxRuntime classic */

/**
 * TODO
 *
 * - Separate out tokens and style function
 */

const ControlLabel = _ref => {
  let {
    children,
    className,
    control,
    size: sizeKey = 'medium'
  } = _ref;
  const {
    controlSizes,
    spacing,
    typography
  } = core.useTheme();
  const size = controlSizes[sizeKey];
  return core.jsx("label", {
    className: className,
    css: {
      alignItems: 'flex-start',
      display: 'inline-flex'
    }
  }, control, children && core.jsx("div", {
    css: {
      fontSize: size.fontSize,
      lineHeight: typography.leading.tight,
      marginLeft: spacing.small,
      userSelect: 'none'
    }
  }, children));
};

/** @jsxRuntime classic */
const Svg = _ref => {
  let {
    children,
    size,
    stroke = 'none',
    fill = 'none'
  } = _ref;
  return core.jsx("svg", {
    "aria-hidden": "true",
    focusable: "false",
    css: {
      verticalAlign: 'text-bottom',
      // removes whitespace inside buttons
      fill,
      stroke,
      strokeLinejoin: 'round',
      strokeLinecap: 'round',
      strokeWidth: 3
    },
    height: `${size}px`,
    width: `${size}px`,
    role: "img",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, children);
};
const checkSizeMap = {
  small: 14,
  medium: 18,
  large: 24
};
const CheckIcon = _ref2 => {
  let {
    size = 'medium'
  } = _ref2;
  return core.jsx(Svg, {
    size: checkSizeMap[size],
    stroke: "currentColor"
  }, core.jsx("polyline", {
    points: "20 6 10 18 4 12"
  }));
};
const dotSizeMap = {
  small: 12,
  medium: 16,
  large: 20
};
const DotIcon = _ref3 => {
  let {
    size = 'medium'
  } = _ref3;
  return core.jsx(Svg, {
    size: dotSizeMap[size],
    fill: "currentColor"
  }, core.jsx("circle", {
    cx: "12",
    cy: "12",
    r: "8"
  }));
};

const useIndicatorTokens = _ref => {
  let {
    size: sizeKey,
    type
  } = _ref;
  const {
    controlSizes,
    fields
  } = core.useTheme();
  const size = controlSizes[sizeKey];
  return {
    background: fields.controlBackground,
    borderColor: fields.controlBorderColor,
    borderRadius: type === 'checkbox' ? fields.controlBorderRadius : '50%',
    borderWidth: fields.controlBorderWidth,
    boxSize: size.indicatorBoxSize,
    foreground: fields.controlBackground,
    // visually hide the icon unless the control is checked
    hover: {
      background: fields.hover.controlBackground,
      borderColor: fields.hover.controlBorderColor,
      shadow: fields.hover.shadow,
      foreground: fields.hover.controlForeground
    },
    focus: {
      background: fields.focus.controlBackground,
      borderColor: fields.focus.controlBorderColor,
      shadow: fields.focus.shadow,
      foreground: fields.focus.controlForeground
    },
    selected: {
      background: type === 'checkbox' ? fields.selected.controlBackground : fields.selected.controlForeground,
      borderColor: fields.selected.controlBorderColor,
      shadow: fields.selected.shadow,
      foreground: type === 'checkbox' ? fields.selected.controlForeground : fields.selected.controlBackground
    },
    disabled: {
      background: fields.disabled.controlBackground,
      borderColor: fields.disabled.controlBorderColor,
      shadow: fields.disabled.shadow,
      foreground: fields.disabled.controlForeground
    }
  };
};
const useIndicatorStyles = _ref2 => {
  let {
    tokens
  } = _ref2;
  return {
    alignItems: 'center',
    backgroundColor: tokens.background,
    borderColor: tokens.borderColor,
    borderRadius: tokens.borderRadius,
    borderStyle: 'solid',
    borderWidth: tokens.borderWidth,
    boxSizing: 'border-box',
    color: tokens.foreground,
    cursor: 'pointer',
    display: 'flex',
    flexShrink: 0,
    height: tokens.boxSize,
    justifyContent: 'center',
    transition: tokens.transition,
    width: tokens.boxSize,
    'input:hover + &': {
      backgroundColor: tokens.hover.background,
      borderColor: tokens.hover.borderColor,
      boxShadow: tokens.hover.shadow,
      color: tokens.hover.foreground
    },
    'input:focus + &': {
      backgroundColor: tokens.focus.background,
      borderColor: tokens.focus.borderColor,
      boxShadow: tokens.focus.shadow,
      color: tokens.focus.foreground
    },
    'input:checked + &': {
      backgroundColor: tokens.selected.background,
      borderColor: tokens.selected.borderColor,
      boxShadow: tokens.selected.shadow,
      color: tokens.selected.foreground
    },
    'input:disabled + &': {
      backgroundColor: tokens.disabled.background,
      borderColor: tokens.disabled.borderColor,
      boxShadow: tokens.disabled.shadow,
      color: tokens.disabled.background,
      cursor: 'default'
    },
    'input:checked:disabled + &': {
      color: tokens.disabled.foreground
    }
  };
};

const Checkbox = /*#__PURE__*/react.forwardRef((_ref, ref) => {
  let {
    children,
    className,
    size,
    ...props
  } = _ref;
  return core.jsx(ControlLabel, {
    className: className,
    size: size,
    control: core.jsx(CheckboxControl, _extends({
      ref: ref,
      size: size
    }, props))
  }, children);
});
const CheckboxControl = /*#__PURE__*/react.forwardRef((_ref2, ref) => {
  let {
    className,
    size,
    ...props
  } = _ref2;
  return core.jsx(react.Fragment, null, core.jsx(core.VisuallyHidden, _extends({
    ref: ref,
    as: "input",
    type: "checkbox"
  }, props)), core.jsx(Indicator$1, {
    className: className,
    size: size
  }, core.jsx(CheckIcon, {
    size: size
  })));
});
const Indicator$1 = _ref3 => {
  let {
    className,
    size,
    ...props
  } = _ref3;
  const tokens = useIndicatorTokens({
    type: 'checkbox',
    size: size || 'medium'
  });
  const styles = useIndicatorStyles({
    tokens
  });
  return core.jsx("div", _extends({
    className: className,
    css: styles
  }, props));
};

const FieldContainer = core.forwardRefWithAs((_ref, ref) => {
  let {
    as: Tag = 'div',
    ...props
  } = _ref;
  return core.jsx(Tag, _extends({
    ref: ref
  }, props));
});

const FieldLabel = core.forwardRefWithAs((_ref, ref) => {
  let {
    as: Tag = 'label',
    children,
    ...props
  } = _ref;
  const {
    typography,
    fields,
    spacing
  } = core.useTheme();
  return core.jsx(Tag, _extends({
    ref: ref,
    css: {
      color: fields.labelColor,
      display: 'block',
      fontWeight: typography.fontWeight.semibold,
      marginBottom: spacing.xsmall,
      minWidth: 120
    }
  }, props), children);
});

const FieldLegend = props => {
  const {
    typography,
    fields,
    spacing
  } = core.useTheme();
  return core.jsx("legend", _extends({
    css: {
      color: fields.legendColor,
      display: 'block',
      fontSize: typography.fontSize.small,
      fontWeight: typography.fontWeight.bold,
      marginBottom: spacing.xsmall,
      minWidth: 120,
      textTransform: 'uppercase'
    }
  }, props));
};

const FieldDescription = props => {
  const {
    spacing,
    palette
  } = core.useTheme();
  if (props.children === null) {
    return null;
  }
  return core.jsx("div", _extends({
    css: {
      color: palette.neutral700,
      marginBottom: spacing.small,
      minWidth: 120,
      whiteSpace: 'pre-wrap'
    }
  }, props));
};

const Radio = /*#__PURE__*/react.forwardRef((_ref, ref) => {
  let {
    children,
    className,
    size,
    ...props
  } = _ref;
  return core.jsx(ControlLabel, {
    className: className,
    size: size,
    control: core.jsx(RadioControl, _extends({
      ref: ref,
      size: size
    }, props))
  }, children);
});
const RadioControl = /*#__PURE__*/react.forwardRef((_ref2, ref) => {
  let {
    size,
    ...props
  } = _ref2;
  return core.jsx(react.Fragment, null, core.jsx(core.VisuallyHidden, _extends({
    ref: ref,
    as: "input",
    type: "radio"
  }, props)), core.jsx(Indicator, {
    size: size
  }, core.jsx(DotIcon, {
    size: size
  })));
});
const Indicator = _ref3 => {
  let {
    size,
    ...props
  } = _ref3;
  const tokens = useIndicatorTokens({
    type: 'radio',
    size: size || 'medium'
  });
  const styles = useIndicatorStyles({
    tokens
  });
  return core.jsx("div", _extends({
    css: styles
  }, props));
};

const Switch = /*#__PURE__*/react.forwardRef((_ref, ref) => {
  let {
    children,
    className,
    ...props
  } = _ref;
  return core.jsx(ControlLabel, {
    className: className,
    control: core.jsx(SwitchControl, _extends({
      ref: ref
    }, props))
  }, children);
});
const SwitchControl = /*#__PURE__*/react.forwardRef((_ref2, ref) => {
  let {
    a11yLabels = {
      on: 'On',
      off: 'Off'
    },
    checked = false,
    onChange,
    ...props
  } = _ref2;
  let onClick = () => {
    if (onChange) {
      onChange(!checked);
    }
  };
  return core.jsx(Button, _extends({
    "aria-checked": checked,
    role: "switch",
    onClick: onClick,
    ref: ref
  }, props), core.jsx(core.VisuallyHidden, null, checked ? a11yLabels.on : a11yLabels.off));
});
const Button = /*#__PURE__*/react.forwardRef((props, ref) => {
  const {
    animation,
    fields,
    sizing
  } = core.useTheme();
  let gutter = 3;
  let trackHeight = sizing.xsmall + gutter;
  let trackWidth = trackHeight * 2 - 2 * gutter;
  let handleSize = trackHeight - gutter * 2;
  return core.jsx("button", _extends({
    ref: ref,
    css: {
      backgroundColor: fields.controlBorderColor,
      borderRadius: 9999,
      padding: gutter,
      border: 0,
      boxSizing: 'border-box',
      display: 'block',
      outline: 0,
      overflow: 'hidden',
      position: 'relative',
      whiteSpace: 'nowrap',
      // height: trackHeight,
      width: trackWidth,
      cursor: 'pointer',
      '&[aria-checked="true"]': {
        backgroundColor: fields.selected.controlBorderColor,
        '::before': {
          transform: 'translateX(100%)'
        }
      },
      '::before': {
        height: handleSize,
        width: handleSize,
        marginTop: -1,
        backgroundColor: fields.switchForeground,
        borderRadius: '50%',
        content: '" "',
        display: 'block',
        position: 'relative',
        transition: `transform ${animation.duration400} ${animation.easeOut}`
      }
    }
  }, props));
});

const useInputTokens = _ref => {
  let {
    size: sizeKey = 'medium',
    // width: widthKey = 'large',
    isMultiline = false,
    shape = 'square'
  } = _ref;
  const {
    animation,
    controlSizes,
    fields,
    radii,
    spacing,
    typography
  } = core.useTheme();

  // const width = widthMap[widthKey];
  const size = controlSizes[sizeKey];
  return {
    background: fields.inputBackground,
    borderColor: fields.inputBorderColor,
    borderRadius: shape === 'round' ? radii.full : fields.inputBorderRadius,
    borderWidth: fields.inputBorderWidth,
    fontSize: size.fontSize,
    foreground: fields.inputForeground,
    height: isMultiline ? undefined : size.height,
    lineHeight: isMultiline ? typography.leading.base : `${size.height}px`,
    paddingX: spacing.medium,
    paddingY: isMultiline ? spacing.small : 0,
    placeholder: fields.inputPlaceholder,
    shadow: fields.shadow,
    transition: `
      background-color ${animation.duration100},
      box-shadow ${animation.duration100},
      border-color ${animation.duration100}
    `,
    // width,
    hover: {
      background: fields.hover.inputBackground,
      borderColor: fields.hover.inputBorderColor,
      shadow: fields.hover.shadow,
      foreground: fields.hover.inputForeground
    },
    focus: {
      background: fields.focus.inputBackground,
      borderColor: fields.focus.inputBorderColor,
      shadow: fields.focus.shadow,
      foreground: fields.focus.inputForeground
    },
    invalid: {
      background: fields.invalid.inputBackground,
      borderColor: fields.invalid.inputBorderColor,
      shadow: fields.invalid.shadow,
      foreground: fields.invalid.inputForeground
    },
    disabled: {
      background: fields.disabled.inputBackground,
      borderColor: fields.disabled.inputBorderColor,
      shadow: fields.disabled.shadow,
      foreground: fields.disabled.inputForeground
    }
  };
};
function useInputStyles(_ref2) {
  let {
    invalid,
    tokens
  } = _ref2;
  const styles = {
    appearance: 'none',
    backgroundColor: invalid ? tokens.invalid.background : tokens.background,
    borderColor: invalid ? tokens.invalid.borderColor : tokens.borderColor,
    borderRadius: tokens.borderRadius,
    borderStyle: 'solid',
    borderWidth: tokens.borderWidth,
    boxShadow: invalid ? tokens.invalid.shadow : tokens.shadow,
    boxSizing: 'border-box',
    color: invalid ? tokens.invalid.foreground : tokens.foreground,
    fontSize: tokens.fontSize,
    height: tokens.height,
    lineHeight: tokens.lineHeight,
    // maxWidth: tokens.width,
    outline: 0,
    paddingBottom: tokens.paddingY,
    paddingLeft: tokens.paddingX,
    paddingRight: tokens.paddingX,
    paddingTop: tokens.paddingY,
    resize: 'vertical',
    // applies to textarea
    transition: tokens.transition,
    width: '100%',
    ':hover': {
      backgroundColor: tokens.hover.background,
      borderColor: tokens.hover.borderColor,
      boxShadow: tokens.hover.shadow,
      color: tokens.hover.foreground
    },
    ':focus': {
      backgroundColor: tokens.focus.background,
      borderColor: tokens.focus.borderColor,
      boxShadow: tokens.focus.shadow,
      color: tokens.focus.foreground
    },
    ':disabled': {
      backgroundColor: tokens.disabled.background,
      borderColor: tokens.disabled.borderColor,
      boxShadow: tokens.disabled.shadow,
      color: tokens.disabled.foreground
    },
    '&::placeholder': {
      color: tokens.placeholder
    }
  };
  return styles;
}

const TextArea = /*#__PURE__*/react.forwardRef((_ref, ref) => {
  let {
    invalid = false,
    size = 'medium',
    width = 'large',
    ...props
  } = _ref;
  const tokens = useInputTokens({
    size,
    width,
    shape: 'square',
    isMultiline: true
  });
  const styles = useInputStyles({
    invalid,
    tokens
  });
  return core.jsx("textarea", _extends({
    rows: 4,
    ref: ref,
    css: styles
  }, props));
});

const TextInput = /*#__PURE__*/react.forwardRef((_ref, ref) => {
  let {
    invalid = false,
    shape = 'square',
    size = 'medium',
    type = 'text',
    width = 'large',
    ...props
  } = _ref;
  const tokens = useInputTokens({
    size,
    width,
    shape
  });
  const styles = useInputStyles({
    invalid,
    tokens
  });
  return core.jsx("input", _extends({
    ref: ref,
    type: type,
    css: styles
  }, props));
});

const useStyles = _ref => {
  let {
    tokens,
    multi = false
  } = _ref;
  const {
    palette
  } = core.useTheme();
  const indicatorStyles = (provided, state) => ({
    ...provided,
    color: state.isFocused ? palette.neutral600 : palette.neutral500,
    ':hover': {
      color: state.isFocused ? palette.neutral800 : palette.neutral700
    }
  });
  return {
    control: (provided, state) => {
      const base = {
        ...provided,
        backgroundColor: tokens.background,
        borderColor: tokens.borderColor,
        borderRadius: tokens.borderRadius,
        borderWidth: tokens.borderWidth,
        fontSize: tokens.fontSize,
        boxShadow: tokens.shadow,
        transition: tokens.transition
      };
      const variant = state.isDisabled ? {
        backgroundColor: tokens.disabled.background || tokens.background,
        borderColor: tokens.disabled.borderColor || tokens.borderColor,
        boxShadow: tokens.disabled.shadow || tokens.shadow,
        color: tokens.disabled.foreground || tokens.foreground
      } : state.isFocused ? {
        backgroundColor: tokens.focus.background || tokens.background,
        borderColor: tokens.focus.borderColor || tokens.borderColor,
        boxShadow: tokens.focus.shadow || tokens.shadow,
        color: tokens.focus.foreground || tokens.foreground
      } : {
        ':hover': {
          backgroundColor: tokens.hover.background,
          borderColor: tokens.hover.borderColor,
          boxShadow: tokens.hover.shadow,
          color: tokens.hover.foreground
        }
      };
      return {
        ...provided,
        ...base,
        ...variant
      };
    },
    clearIndicator: indicatorStyles,
    dropdownIndicator: indicatorStyles,
    menu: provided => ({
      ...provided,
      border: `1px solid ${palette.neutral400}`,
      boxShadow: '0 4px 11px hsla(0, 0%, 0%, 0.1)',
      borderRadius: tokens.borderRadius,
      zIndex: 9999
    }),
    menuPortal: provided => ({
      ...provided,
      zIndex: 9999
    }),
    multiValue: provided => ({
      ...provided,
      backgroundColor: palette.neutral300,
      borderRadius: tokens.borderRadius
    }),
    multiValueLabel: provided => ({
      ...provided,
      // fontSize: typography.fontSize.medium,
      fontSize: '90%'
    }),
    multiValueRemove: provided => ({
      ...provided,
      borderRadius: tokens.borderRadius
    }),
    placeholder: provided => ({
      ...provided,
      color: tokens.placeholder
    }),
    valueContainer: provided => ({
      ...provided,
      padding: multi ? `0 4px` : `0 6px`
    })
  };
};
const portalTarget = typeof document !== 'undefined' ? document.body : undefined;
function Select(_ref2) {
  let {
    id,
    onChange,
    value,
    width: widthKey = 'large',
    portalMenu,
    styles,
    ...props
  } = _ref2;
  const tokens = useInputTokens({
    width: widthKey
  });
  const defaultStyles = useStyles({
    tokens
  });
  const composedStyles = styles ? ReactSelect.mergeStyles(defaultStyles, styles) : defaultStyles;
  return core.jsx(ReactSelect__default["default"], _extends({
    inputId: id,
    value: value
    // css={{ width: tokens.width }}
    ,
    styles: composedStyles,
    onChange: value => {
      if (!value) {
        onChange(null);
      } else {
        onChange(value);
      }
    }
  }, props, {
    isMulti: false,
    menuPortalTarget: portalMenu && portalTarget
  }));
}
function MultiSelect(_ref3) {
  let {
    id,
    onChange,
    value,
    width: widthKey = 'large',
    portalMenu,
    styles,
    ...props
  } = _ref3;
  const tokens = useInputTokens({
    width: widthKey
  });
  const defaultStyles = useStyles({
    tokens,
    multi: true
  });
  const composedStyles = styles ? ReactSelect.mergeStyles(defaultStyles, styles) : defaultStyles;
  return core.jsx(ReactSelect__default["default"]
  // css={{ width: tokens.width }}
  , _extends({
    inputId: id,
    styles: composedStyles,
    value: value,
    onChange: value => {
      if (!value) {
        onChange([]);
      } else if (Array.isArray(value)) {
        onChange(value);
      } else {
        onChange([value]);
      }
    }
  }, props, {
    isMulti: true,
    menuPortalTarget: portalMenu && portalTarget
  }));
}

/**
 * Un-formatted date for server side storage (ISO8601), like '2019-09-18'
 */
const formatDateType = date => {
  return dateFns.formatISO(date, {
    representation: 'date'
  });
};
const deserializeDate = date => {
  return dateFns.parse(date, 'yyyy-MM-dd', new Date());
};

// undefined means we'll use the user's locale
const formatter = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});
const formatDate = date => formatter.format(date);
const dateFormatPlaceholder = formatter.formatToParts(new Date()).map(x => {
  if (x.type === 'day') {
    return 'dd';
  }
  if (x.type === 'month') {
    return 'mm';
  }
  if (x.type === 'year') {
    return 'yyyy';
  }
  return x.value;
}).join('');

function parseHex(hex) {
  let result = hex;

  // remove hash symbol
  if (result.startsWith('#')) {
    result = result.slice(1);
  }

  // resolve hex shortcuts
  if (result.length === 3) {
    result = result[0].repeat(2) + result[1].repeat(2) + result[2].repeat(2);
  }
  return result;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function hexToTriplet(dirtyHex, alpha) {
  const cleanHex = parseHex(dirtyHex);
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  return [r, g, b];
}

// values taken from contrast algorithms from w3
// https://www.w3.org/TR/AERT/#color-contrast
function hexToRgb(dirtyHex, alpha) {
  const [r, g, b] = hexToTriplet(dirtyHex);
  const value = `${r}, ${g}, ${b}`;
  if (alpha) {
    return `rgba(${value}, ${alpha})`;
  }
  return `rgb(${value})`;
}

function getContrastText(color) {
  const [r, g, b] = hexToTriplet(color);

  // calculate contrast against grayscale
  var contrast = (Math.round(r * 299) + Math.round(g * 587) + Math.round(b * 114)) / 1000;
  return contrast >= 128 ? 'black' : 'white';
}

const Calendar = _ref => {
  let {
    modifiers,
    ...props
  } = _ref;
  const styles = useCalendarStyles();
  const indexOfMonday = 1;
  return core.jsx("div", {
    css: styles
  }, core.jsx(reactDayPicker.DayPicker, _extends({
    weekStartsOn: indexOfMonday
  }, props)));
};

// Styles
// ------------------------------

const useCalendarStyles = () => {
  const {
    colors,
    palette
  } = core.useTheme();
  const cellSize = 40; // theme.sizing.base;
  const navButtonSize = 24; // theme.sizing.xsmall;
  const interactionColor = '#007AFF'; //theme.palette.actions.active;
  const rangeBetweenColor = hexToRgb('#007AFF', 0.2); //hexToRgb(interactionColor, 0.2);

  return {
    padding: 8,
    //theme.spacing.small,

    // resets and wrapper stuff
    '.rdp': {
      display: 'inline-block',
      fontSize: '1rem'
    },
    '.rdp-vhidden': {
      boxSizing: 'border-box',
      padding: 0,
      margin: 0,
      background: 'transparent',
      border: 0,
      MozAppearance: 'none',
      WebkitAppearance: 'none',
      appearance: 'none',
      top: 0,
      width: '1px !important',
      height: '1px !important',
      overflow: 'hidden !important',
      clip: 'rect(1px, 1px, 1px, 1px) !important',
      display: 'block !important'
    },
    '.rdp-wrapper': {
      position: 'relative',
      flexDirection: 'row',
      userSelect: 'none',
      outline: 0
    },
    '.rdp-months': {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    '.rdp-month': {
      display: 'table',
      // separate weeks for easier parsing of range selection
      borderSpacing: '0 2px',
      borderCollapse: 'separate',
      // separate months for easier parsing of range selection
      margin: 8,
      // theme.spacing.small,

      // NOTE: resolve weird safari bug:
      // https://bugs.webkit.org/show_bug.cgi?id=187903
      position: 'relative',
      '.rdp-caption_label': {
        position: 'absolute'
      }
    },
    // the caption is the day/month title e.g. "July 2020"
    '.rdp-caption': {
      display: 'flex',
      height: navButtonSize,
      marginBottom: '0.5em',
      padding: '0 0.5em',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    '.rdp-caption_label': {
      fontWeight: 500,
      //theme.typography.fontWeight.medium,
      fontSize: '1rem' //theme.typography.fontSize.medium,
    },

    // weekdays
    '.rdp-head': {
      display: 'table-header-group',
      marginTop: '1em'
    },
    '.rdp-head_row': {
      display: 'table-row'
    },
    '.rdp-head_cell': {
      color: colors.foregroundDim,
      //theme.palette.text.dim,
      display: 'table-cell',
      fontSize: '0.875rem',
      //theme.typography.fontSize.small,
      fontWeight: 500,
      //theme.typography.fontWeight.medium,
      padding: '0.5em',
      textAlign: 'center'
    },
    '.rdp-head_cell abbr[title]': {
      borderBottom: 'none',
      textDecoration: 'none'
    },
    '.rdp-body': {
      display: 'table-row-group',
      fontSize: '0.875rem',
      //theme.typography.fontSize.small,
      fontWeight: 500 // theme.typography.fontWeight.medium,
    },

    '.rdp-week': {
      display: 'table-row'
    },
    '.rdp-weeknumber': {
      display: 'table-cell',
      padding: '0.5em',
      minWidth: '1em',
      borderRight: '1px solid #EAECEC',
      color: colors.foregroundDim,
      //theme.palette.text.dim,
      verticalAlign: 'middle',
      textAlign: 'right',
      fontSize: '0.75em',
      cursor: 'pointer'
    },
    '.rdp_interactionDisabled .rdp-day': {
      cursor: 'default'
    },
    // nav buttons
    '.rdp-nav': {
      position: 'absolute',
      right: 4,
      //theme.spacing.xsmall,
      zIndex: 1
    },
    '.rdp-nav_button': {
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'transparent',
      // backgroundSize: '66.667%',
      borderRadius: 4,
      //theme.radii.xsmall,
      color: colors.foreground,
      // theme.palette.listItem.text,
      cursor: 'pointer',
      display: 'inline-block',
      height: 32,
      //theme.sizing.small,
      left: 'auto',
      width: 32,
      //theme.sizing.small,

      ':hover, &.focus-visible': {
        backgroundColor: 'grey',
        // theme.palette.listItem.backgroundFocused,
        color: colors.foreground,
        // theme.palette.listItem.textFocused,
        outline: 0
      },
      ':active': {
        backgroundColor: 'grey',
        //theme.palette.listItem.backgroundPressed,
        color: colors.foreground //theme.palette.listItem.textPressed,
      }
    },

    // "day" or grid cell
    '.rdp-day_outside': {
      color: colors.foregroundDim,
      // theme.palette.text.dim,
      cursor: 'default'
    },
    '.rdp-day_disabled': {
      color: colors.foregroundDim,
      // theme.palette.text.dim,
      cursor: 'default'
    },
    '.rdp-day': {
      borderRadius: '50%',
      display: 'table-cell',
      height: cellSize,
      outline: 0,
      // we handle focus below, with box-shadow
      padding: 0,
      position: 'relative',
      textAlign: 'center',
      verticalAlign: 'middle',
      width: cellSize,
      backgroundColor: 'transparent'
    },
    '.rdp-day_weekend': {
      color: colors.foregroundMuted // theme.palette.text.muted,
    },

    '.rdp-day:not(.rdp-day_disabled):not(.rdp-day_outside)': {
      cursor: 'pointer',
      '&:hover, &.focus-visible': {
        // backgroundColor: 'transparent',
        outline: 0,
        '&::after': {
          borderRadius: '50%',
          boxShadow: `inset 0 0 0 2px ${interactionColor}`,
          content: '" "',
          height: cellSize,
          left: 0,
          position: 'absolute',
          top: 0,
          width: cellSize
        }
      }
    },
    '.rdp-day_today': {
      color: palette.red400,
      // theme.palette.text.critical,
      fontWeight: 700 // theme.typography.fontWeight.bold,
    },

    '.rdp-day_selected:not(.rdp-day_outside)': {
      color: getContrastText(interactionColor),
      '&, &:hover, &.focus-visible': {
        backgroundColor: interactionColor
      }
    },
    // range-specific day styles
    '.rdp-day_range_start:not(.rdp-day_outside), .rdp-day_range_end:not(.rdp-day_outside)': {
      '&::before': {
        backgroundColor: rangeBetweenColor,
        position: 'absolute',
        content: '" "',
        width: cellSize / 2,
        height: cellSize,
        top: 0,
        zIndex: -1
      }
    },
    '.rdp-day_range_start': {
      '&::before': {
        right: 0
      }
    },
    '.rdp-day_range_end': {
      '&::before': {
        left: 0
      }
    },
    '.rdp-day_range_between.rdp-day_selected:not(.rdp-day_outside)': {
      '&, &:hover, &.focus-visible': {
        backgroundColor: rangeBetweenColor,
        borderRadius: 0,
        color: colors.foreground // theme.palette.text.base,
      }
    },

    '.rdp-day_rangeBetween.rdp-day_firstOfMonth:not(.rdp-day_outside)': {
      '&, &:hover, &.focus-visible': {
        // background: `linear-gradient(to left, ${rangeBetweenColor}, ${theme.palette.background.dialog})`,
        background: `linear-gradient(to left, ${rangeBetweenColor}, ${colors.overlayBackground})`
      }
    },
    '.rdp-day_rangeBetween.rdp-day_lastOfMonth:not(.rdp-day_outside)': {
      '&, &:hover, &.focus-visible': {
        // background: `linear-gradient(to right, ${rangeBetweenColor}, ${theme.palette.background.dialog})`,
        background: `linear-gradient(to right, ${rangeBetweenColor}, ${colors.overlayBackground})`
      }
    }
  };
};

// todo - these also exist at ../../types

/**
 * What is this thing?
 * ------------------------------
 * We expose primitive components for adorning inputs with icons and buttons.
 * There's some awkard requirements surrounding size and shape that's best to
 * consolidate in one place.
 */

const AdornmentContext = /*#__PURE__*/react.createContext({
  shape: 'square',
  size: 'medium'
});
const useAdornmentContext = () => react.useContext(AdornmentContext);

// Adornment Wrapper
// ------------------------------
const AdornmentWrapper = _ref => {
  let {
    children,
    shape,
    size
  } = _ref;
  return core.jsx(AdornmentContext.Provider, {
    value: {
      shape,
      size
    }
  }, core.jsx("div", {
    css: {
      alignItems: 'center',
      display: 'flex',
      position: 'relative',
      width: '100%'
    }
  }, children));
};

// Adornment Element
// ------------------------------

const alignmentPaddingMap = {
  left: 'marginLeft',
  right: 'marginRight'
};
const Adornment = core.forwardRefWithAs((_ref2, ref) => {
  let {
    align,
    as: Tag = 'div',
    ...props
  } = _ref2;
  const {
    shape,
    size
  } = useAdornmentContext();
  const {
    controlSizes
  } = core.useTheme();
  const {
    indicatorBoxSize,
    paddingX
  } = controlSizes[size];

  // optical alignment shifts towards the middle of the container with the large
  // border radius on "round" inputs. use padding rather than margin to optimise
  // the hit-area of interactive elements
  const offsetStyles = shape === 'round' ? {
    [alignmentPaddingMap[align]]: paddingX / 4
  } : null;
  return core.jsx(Tag, _extends({
    ref: ref,
    css: {
      [align]: 0,
      alignItems: 'center',
      display: 'flex',
      height: indicatorBoxSize,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: indicatorBoxSize,
      ...offsetStyles
    }
  }, props));
});

const InputButton = /*#__PURE__*/react.forwardRef((_ref, ref) => {
  let {
    invalid = false,
    isSelected,
    onClear,
    ...props
  } = _ref;
  const {
    spacing
  } = core.useTheme();
  const inputTokens = useInputTokens({
    size: 'medium'
  });
  const inputStyles = useInputStyles({
    invalid,
    tokens: inputTokens
  });
  const focusStyles = isSelected ? {
    ...inputStyles[':focus'],
    ':hover': inputStyles[':focus'],
    ':focus': inputStyles[':focus']
  } : null;
  const buttonStyles = {
    ...inputStyles,
    ...focusStyles,
    cursor: 'pointer',
    lineHeight: 'initial',
    // let the button vertically align its text; the have different native behaviour to inputs
    textAlign: 'left'
  };
  return core.jsx(AdornmentWrapper, {
    shape: "square",
    size: "medium"
  }, core.jsx("button", _extends({
    "aria-invalid": invalid,
    ref: ref,
    css: buttonStyles,
    type: "button"
  }, props)), onClear && core.jsx(ClearButton, {
    onClick: onClear
  }), core.jsx(Adornment, {
    align: "right",
    css: {
      paddingRight: spacing.small,
      pointerEvents: 'none'
    }
  }, core.jsx(CalendarIcon.CalendarIcon, {
    color: "dim"
  })));
});
const ClearButton = props => {
  const {
    colors
  } = core.useTheme();
  return core.jsx(Adornment, _extends({
    as: "button",
    align: "right",
    type: "button",
    tabIndex: -1,
    css: {
      alignItems: 'center',
      background: 0,
      border: 0,
      borderRadius: '50%',
      color: colors.foregroundDim,
      display: 'flex',
      justifyContent: 'center',
      outline: 0,
      padding: 0,
      right: '6px',
      // TODO ? sizes.medium.boxSize,
      top: '6px',
      // TODO - magic number

      // No focus styles because this button is not focusable
      ':focus': {
        color: 'hotpink'
      },
      ':hover': {
        color: colors.foregroundMuted
      }
    }
  }, props), core.jsx(core.VisuallyHidden, {
    as: "span"
  }, "clear date value"), core.jsx(XIcon.XIcon, {
    size: "small"
  }));
};

function useEventCallback(callback) {
  const callbackRef = react.useRef(callback);
  const cb = react.useCallback(function () {
    return callbackRef.current(...arguments);
  }, []);
  react.useEffect(() => {
    callbackRef.current = callback;
  });
  return cb;
}
const DatePicker = _ref => {
  let {
    value,
    onUpdate,
    onClear,
    onBlur: _onBlur,
    ...props
  } = _ref;
  const [isOpen, _setOpen] = react.useState(false);
  const onBlur = useEventCallback(() => {
    _onBlur === null || _onBlur === void 0 ? void 0 : _onBlur();
  });
  const setOpen = react.useCallback(val => {
    _setOpen(val);
    if (!val) {
      onBlur === null || onBlur === void 0 ? void 0 : onBlur();
    }
  }, [onBlur]);
  const {
    dialog,
    trigger,
    arrow
  } = popover.useControlledPopover({
    isOpen,
    onClose: react.useCallback(() => {
      setOpen(false);
    }, [setOpen])
  }, {
    placement: 'bottom-start',
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    }]
  });
  const handleDayClick = react.useCallback(day => {
    onUpdate(formatDateType(day));
    // wait a moment so the user has time to see the day become selected
    setTimeout(() => {
      setOpen(false);
    }, 300);
  }, [onUpdate, setOpen]);

  // We **can** memoize this, but its a trivial operation
  // and in the opinion of the author not really something to do
  // before other more important performance optimisations
  const selectedDay = deserializeDate(value);
  const formattedDate = value ? formatDate(selectedDay) : undefined;
  return core.jsx(react.Fragment, null, core.jsx(InputButton, _extends({
    "aria-label": 'Choose date' + (formattedDate ? `, selected date is ${formattedDate}` : ''),
    onClick: () => setOpen(true),
    onClear: value ? () => {
      onClear();
      onBlur === null || onBlur === void 0 ? void 0 : onBlur();
    } : undefined,
    isSelected: isOpen,
    ref: trigger.ref
  }, props, trigger.props, {
    // todo - magic number - align instead to parent Field ?
    style: {
      minWidth: 200
    }
  }), formattedDate || dateFormatPlaceholder), isOpen && core.jsx(popover.PopoverDialog, _extends({
    arrow: arrow,
    isVisible: true,
    ref: dialog.ref
  }, dialog.props), core.jsx(FocusLock__default["default"], {
    autoFocus: true,
    returnFocus: true,
    disabled: !isOpen
  }, core.jsx(Calendar, {
    onDayClick: handleDayClick,
    selected: selectedDay
  }))));
};

Object.defineProperty(exports, 'selectComponents', {
  enumerable: true,
  get: function () { return ReactSelect.components; }
});
exports.Checkbox = Checkbox;
exports.CheckboxControl = CheckboxControl;
exports.DatePicker = DatePicker;
exports.FieldContainer = FieldContainer;
exports.FieldDescription = FieldDescription;
exports.FieldLabel = FieldLabel;
exports.FieldLegend = FieldLegend;
exports.MultiSelect = MultiSelect;
exports.Radio = Radio;
exports.Select = Select;
exports.Switch = Switch;
exports.TextArea = TextArea;
exports.TextInput = TextInput;
exports.useIndicatorStyles = useIndicatorStyles;
exports.useIndicatorTokens = useIndicatorTokens;
exports.useInputStyles = useInputStyles;
exports.useInputTokens = useInputTokens;
