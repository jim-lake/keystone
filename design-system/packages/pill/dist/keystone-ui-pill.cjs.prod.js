'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var core = require('@keystone-ui/core');
var react = require('react');
var XIcon = require('@keystone-ui/icons/icons/XIcon');

const PillButton = /*#__PURE__*/react.forwardRef((_ref, ref) => {
  let {
    tone: toneKey,
    weight,
    onClick,
    tabIndex,
    ...props
  } = _ref;
  const {
    radii,
    spacing,
    tones,
    typography
  } = core.useTheme();
  const isInteractive = !!onClick;
  const tone = tones[toneKey];
  const tokens = {
    bold: {
      background: tone.fill[0],
      foreground: tone.fillForeground[0],
      focus: {
        shadow: `0 0 0 2px ${tone.focusRing}`
      },
      hover: {
        background: tone.fill[1]
      },
      active: {
        background: tone.fill[2]
      }
    },
    light: {
      background: tone.tint[0],
      foreground: tone.foreground[0],
      focus: {
        shadow: `0 0 0 2px ${tone.focusRing}`
      },
      hover: {
        foreground: tone.foreground[1],
        background: tone.tint[1]
      },
      active: {
        foreground: tone.foreground[2],
        background: tone.tint[2]
      }
    }
  }[weight];
  const baseStyles = {
    alignItems: 'center',
    appearance: 'none',
    background: 'none',
    backgroundColor: tokens.background,
    border: 0,
    color: tokens.foreground,
    display: 'flex',
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.medium,
    justifyContent: 'center',
    maxWidth: '100%',
    minWidth: 1,
    outline: 0,
    padding: `${spacing.small}px ${spacing.medium}px`,
    ':first-of-type': {
      paddingRight: spacing.small,
      borderTopLeftRadius: radii.full,
      borderBottomLeftRadius: radii.full,
      marginRight: 1
    },
    ':last-of-type': {
      paddingLeft: spacing.small,
      borderTopRightRadius: radii.full,
      borderBottomRightRadius: radii.full
    },
    ':only-of-type': {
      paddingLeft: spacing.medium,
      paddingRight: spacing.medium
    }
  };
  const interactiveStyles = isInteractive ? {
    cursor: 'pointer',
    ':focus': {
      boxShadow: tokens.focus.shadow
    },
    ':hover,:focus': {
      backgroundColor: tokens.hover.background,
      color: tokens.hover.foreground
    },
    ':active': {
      backgroundColor: tokens.active.background,
      color: tokens.active.foreground
    }
  } : {};
  return core.jsx("button", _extends({
    ref: ref,
    css: {
      ...baseStyles,
      ...interactiveStyles
    },
    onClick: onClick,
    tabIndex: !isInteractive ? -1 : tabIndex
  }, props));
});
const Pill = /*#__PURE__*/react.forwardRef((_ref2, ref) => {
  let {
    weight = 'bold',
    tone = 'active',
    containerProps,
    children,
    onClick,
    onRemove,
    ...props
  } = _ref2;
  return core.jsx("div", _extends({
    css: {
      display: 'flex'
    }
  }, containerProps), core.jsx(PillButton, _extends({
    ref: ref,
    weight: weight,
    tone: tone,
    onClick: onClick
  }, props), children), onRemove ? core.jsx(PillButton, {
    "aria-label": "remove pill",
    weight: weight,
    tone: tone,
    onClick: onRemove
  }, core.jsx(XIcon.XIcon, {
    css: {
      height: 14,
      width: 14
    }
  })) : null);
});

exports.Pill = Pill;
