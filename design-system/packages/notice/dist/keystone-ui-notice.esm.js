import _extends from '@babel/runtime/helpers/esm/extends';
import { useMemo } from 'react';
import { useTheme, jsx, useId, makeId, Box, Stack } from '@keystone-ui/core';
import { AlertOctagonIcon } from '@keystone-ui/icons/icons/AlertOctagonIcon';
import { AlertCircleIcon } from '@keystone-ui/icons/icons/AlertCircleIcon';
import { AlertTriangleIcon } from '@keystone-ui/icons/icons/AlertTriangleIcon';
import { CheckCircleIcon } from '@keystone-ui/icons/icons/CheckCircleIcon';
import { InfoIcon } from '@keystone-ui/icons/icons/InfoIcon';
import { HelpCircleIcon } from '@keystone-ui/icons/icons/HelpCircleIcon';
import { ButtonProvider, Button } from '@keystone-ui/button';

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
  } = useTheme();
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
  } = useTheme();
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
  active: jsx(InfoIcon, null),
  passive: jsx(AlertCircleIcon, null),
  positive: jsx(CheckCircleIcon, null),
  warning: jsx(AlertTriangleIcon, null),
  negative: jsx(AlertOctagonIcon, null),
  help: jsx(HelpCircleIcon, null)
};
const Notice = _ref => {
  let {
    actions,
    children,
    tone = 'passive',
    title,
    ...otherProps
  } = _ref;
  const id = useId();
  const titleId = makeId('notice-title', id);
  const contentId = makeId('notice-content', id);
  const tokens = useNoticeTokens({
    tone
  });
  const styles = useNoticeStyles({
    tokens
  });
  const buttonContext = useMemo(() => ({
    hooks: {
      useButtonTokens
    },
    defaults: {
      tone,
      size: 'small'
    }
  }), [tone]);
  return jsx(ButtonProvider, buttonContext, jsx(Box, _extends({
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
  }, otherProps), jsx("div", {
    css: styles.symbol
  }, symbols[tone]), jsx("div", {
    css: {
      flex: 1
    }
  }, title && jsx("div", {
    id: titleId,
    css: {
      marginTop: 1,
      ...styles.title
    }
  }, title), jsx("div", {
    id: contentId,
    css: {
      marginTop: 2
    }
  }, children), actions && jsx(Stack, {
    across: true,
    gap: "small",
    css: styles.actions
  }, actions.primary && jsx(Button, {
    weight: "bold"
  }, actions.primary.label), actions.secondary && jsx(Button, {
    weight: "light"
  }, actions.secondary.label)))));
};

export { Notice, noticeToneValues, useNoticeStyles, useNoticeTokens };
