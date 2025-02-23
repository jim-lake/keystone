'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var react = require('react');
var core = require('@keystone-ui/core');
var AlertOctagonIcon = require('@keystone-ui/icons/icons/AlertOctagonIcon');
var AlertCircleIcon = require('@keystone-ui/icons/icons/AlertCircleIcon');
var AlertTriangleIcon = require('@keystone-ui/icons/icons/AlertTriangleIcon');
var CheckCircleIcon = require('@keystone-ui/icons/icons/CheckCircleIcon');
var InfoIcon = require('@keystone-ui/icons/icons/InfoIcon');
var HelpCircleIcon = require('@keystone-ui/icons/icons/HelpCircleIcon');
var button = require('@keystone-ui/button');

const noticeToneValues = ['active', 'passive', 'positive', 'warning', 'negative', 'help'];
function useNoticeTokens(_ref) {
  let {
    tone: toneKey
  } = _ref;
  const {
    colors,
    radii,
    tones,
    typography,
    spacing
  } = core.useTheme();
  const tone = tones[toneKey];
  const tokens = {
    background: tone.tint[0],
    borderColor: tone.border[0],
    borderRadius: radii.medium,
    borderWidth: 1,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.medium,
    foreground: colors.foregroundDim,
    gap: spacing.medium,
    iconColor: tone.foreground[0],
    paddingX: spacing.large,
    paddingY: spacing.large,
    title: {
      foreground: colors.foreground,
      fontSize: typography.fontSize.medium,
      fontWeight: typography.fontWeight.medium
    }
  };
  return tokens;
}
function useNoticeStyles(_ref2) {
  let {
    tokens
  } = _ref2;
  const actions = {
    marginTop: tokens.gap
  };
  const box = {
    backgroundColor: tokens.background,
    borderColor: tokens.borderColor || 'transparent',
    borderRadius: tokens.borderRadius,
    borderWidth: tokens.borderWidth,
    color: tokens.foreground,
    fontSize: tokens.fontSize,
    fontWeight: tokens.fontWeight,
    paddingLeft: tokens.paddingX,
    paddingRight: tokens.paddingX,
    paddingTop: tokens.paddingY,
    paddingBottom: tokens.paddingY
  };
  const title = {
    color: tokens.title.foreground,
    fontSize: tokens.title.fontSize,
    fontWeight: tokens.title.fontWeight,
    marginBottom: tokens.gap / 2
  };
  const symbol = {
    color: tokens.iconColor,
    marginRight: tokens.gap
  };
  return {
    actions,
    box,
    title,
    symbol
  };
}

/** @jsxRuntime classic */
function useButtonTokens(_ref) {
  let {
    tone: toneKey,
    size: sizeKey,
    weight: weightKey
  } = _ref;
  const {
    animation,
    colors,
    tones,
    typography,
    controlSizes,
    opacity
  } = core.useTheme();
  const tone = tones[toneKey];
  const size = controlSizes[sizeKey];
  const weights = {
    bold: {
      background: 'white',
      borderColor: tone.border[0],
      foreground: colors.foreground,
      focus: {
        shadow: `0 0 0 2px ${tone.focusRing}`
      },
      hover: {
        foreground: tone.foreground[1],
        background: tone.tint[1]
      },
      pressed: {
        foreground: tone.foreground[2],
        background: tone.tint[2]
      }
    },
    light: {
      background: tone.tint[0],
      foreground: colors.foreground,
      focus: {
        shadow: `0 0 0 2px ${tone.focusRing}`
      },
      hover: {
        foreground: tone.foreground[1],
        background: tone.tint[1]
      },
      pressed: {
        foreground: tone.foreground[2],
        background: tone.tint[2]
      }
    },
    none: {
      foreground: colors.foreground,
      focus: {
        shadow: `0 0 0 2px ${tone.focusRing}`
      },
      hover: {
        foreground: tone.foreground[0],
        background: tone.tint[0]
      },
      pressed: {
        foreground: tone.foreground[1],
        background: tone.tint[1]
      }
    },
    link: {
      foreground: colors.foreground,
      focus: {
        textDecoration: 'underline'
      },
      hover: {
        foreground: tone.foreground[0],
        textDecoration: 'underline'
      },
      pressed: {
        foreground: tone.foreground[1],
        textDecoration: 'underline'
      }
    }
  };
  const weight = weights[weightKey];
  const tokens = {
    borderRadius: size.borderRadius,
    borderWidth: size.borderWidth,
    disabledOpacity: opacity.disabled,
    fontSize: size.fontSize,
    fontWeight: typography.fontWeight.semibold,
    height: size.height,
    paddingX: size.paddingX,
    transition: `
      background-color ${animation.duration100},
      box-shadow ${animation.duration100},
      border-color ${animation.duration100},
      opacity ${animation.duration100},
    `,
    ...weight
  };
  return tokens;
}

const symbols = {
  active: core.jsx(InfoIcon.InfoIcon, null),
  passive: core.jsx(AlertCircleIcon.AlertCircleIcon, null),
  positive: core.jsx(CheckCircleIcon.CheckCircleIcon, null),
  warning: core.jsx(AlertTriangleIcon.AlertTriangleIcon, null),
  negative: core.jsx(AlertOctagonIcon.AlertOctagonIcon, null),
  help: core.jsx(HelpCircleIcon.HelpCircleIcon, null)
};
const Notice = _ref => {
  let {
    actions,
    children,
    tone = 'passive',
    title,
    ...otherProps
  } = _ref;
  const id = core.useId();
  const titleId = core.makeId('notice-title', id);
  const contentId = core.makeId('notice-content', id);
  const tokens = useNoticeTokens({
    tone
  });
  const styles = useNoticeStyles({
    tokens
  });
  const buttonContext = react.useMemo(() => ({
    hooks: {
      useButtonTokens
    },
    defaults: {
      tone,
      size: 'small'
    }
  }), [tone]);
  return core.jsx(button.ButtonProvider, buttonContext, core.jsx(core.Box, _extends({
    css: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      outline: 0,
      whiteSpace: 'pre-wrap',
      ...styles.box
    },
    tabIndex: 0,
    role: "alert",
    "aria-live": "polite",
    "aria-labelledby": titleId,
    "aria-describedby": contentId
  }, otherProps), core.jsx("div", {
    css: styles.symbol
  }, symbols[tone]), core.jsx("div", {
    css: {
      flex: 1
    }
  }, title && core.jsx("div", {
    id: titleId,
    css: {
      marginTop: 1,
      ...styles.title
    }
  }, title), core.jsx("div", {
    id: contentId,
    css: {
      marginTop: 2
    }
  }, children), actions && core.jsx(core.Stack, {
    across: true,
    gap: "small",
    css: styles.actions
  }, actions.primary && core.jsx(button.Button, {
    weight: "bold"
  }, actions.primary.label), actions.secondary && core.jsx(button.Button, {
    weight: "light"
  }, actions.secondary.label)))));
};

exports.Notice = Notice;
exports.noticeToneValues = noticeToneValues;
exports.useNoticeStyles = useNoticeStyles;
exports.useNoticeTokens = useNoticeTokens;
