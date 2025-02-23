import _extends from '@babel/runtime/helpers/esm/extends';
import { useCallback, useRef, useEffect, Fragment, useMemo, memo, forwardRef } from 'react';
import { applyRefs } from 'apply-ref';
import { useTheme, useId, jsx, Portal } from '@keystone-ui/core';
import { usePopover } from '@keystone-ui/popover';

const Tooltip = _ref => {
  let {
    children,
    content,
    hideOnClick = true,
    placement = 'top',
    weight = 'bold'
  } = _ref;
  const {
    spacing
  } = useTheme();
  const isBold = weight === 'bold';
  const {
    isOpen,
    setOpen,
    trigger,
    dialog,
    arrow
  } = usePopover({
    placement,
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, isBold ? spacing.small : spacing.xsmall]
      }
    }]
  });
  const tooltipId = useId();
  const showTooltip = useCallback(() => setOpen(true), [setOpen]);
  const hideTooltip = useCallback(() => setOpen(false), [setOpen]);
  const internalRef = useRef(null);

  // avoid overriding the consumer's `onClick` handler
  useEffect(() => {
    const triggerEl = internalRef.current;
    if (hideOnClick && triggerEl) {
      triggerEl.addEventListener('click', hideTooltip);
      return () => triggerEl.removeEventListener('click', hideTooltip);
    }
  }, [isOpen, hideOnClick, hideTooltip]);
  return jsx(Fragment, null, useMemo(() => children({
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
    'aria-describedby': tooltipId,
    ref: applyRefs(trigger.ref, internalRef)
  }), [children, showTooltip, hideTooltip, tooltipId, trigger.ref, internalRef]), jsx(TooltipElement, _extends({
    id: tooltipId,
    isVisible: isOpen,
    weight: weight,
    ref: dialog.ref
  }, dialog.props, {
    arrow: weight === 'bold' ? arrow : undefined
  }), content));
};

// Styled Component
// ------------------------------
const TooltipElement = /*#__PURE__*/memo( /*#__PURE__*/forwardRef((_ref2, consumerRef) => {
  let {
    isVisible,
    children,
    arrow,
    weight,
    ...props
  } = _ref2;
  const isBold = weight === 'bold';
  const {
    elevation,
    radii,
    colors,
    spacing,
    typography
  } = useTheme();
  const arrowStyles = useArrowStyles();
  return jsx(Portal, null, jsx("div", _extends({
    role: "tooltip",
    "aria-hidden": !isVisible,
    ref: consumerRef,
    css: {
      backgroundColor: colors.foregroundMuted,
      borderRadius: radii.xsmall,
      color: colors.background,
      fontSize: isBold ? typography.fontSize.small : typography.fontSize.xsmall,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.leading.tight,
      maxWidth: 320,
      // less than desirable magic number, but not sure if this needs to be in theme...
      opacity: isVisible ? isBold ? 1 : 0.9 : 0,
      padding: isBold ? `${spacing.small}px ${spacing.medium}px` : `${spacing.xsmall}px ${spacing.small}px`,
      pointerEvents: isVisible ? undefined : 'none',
      zIndex: elevation.e500,
      ...arrowStyles
    }
  }, props), children, arrow && jsx("div", _extends({
    "data-popper-arrow": true,
    ref: arrow.ref,
    className: "tooltipArrow"
  }, arrow.props))));
}));
const useArrowStyles = () => {
  const {
    colors
  } = useTheme();
  return {
    '.tooltipArrow': {
      position: 'absolute',
      overflow: 'hidden',
      pointerEvents: 'none',
      height: '20px',
      width: '20px',
      '&::after': {
        content: 'close-quote',
        position: 'absolute',
        width: '10px',
        height: '10px',
        backgroundColor: colors.foregroundMuted,
        transform: 'translateX(-50%) translateY(-50%) rotate(45deg)'
      }
    },
    "&[data-popper-placement^='left'] > .tooltipArrow": {
      left: '100%',
      '&::after': {
        top: '50%',
        left: '0'
      }
    },
    "&[data-popper-placement^='right'] > .tooltipArrow": {
      right: '100%',
      '&::after': {
        top: '50%',
        left: '100%'
      }
    },
    "&[data-popper-placement^='top'] > .tooltipArrow": {
      top: '100%',
      '&::after': {
        top: 0,
        bottom: '-50%',
        left: '50%'
      }
    },
    "&[data-popper-placement^='bottom'] > .tooltipArrow": {
      bottom: '100%',
      right: 'unset',
      '&::after': {
        bottom: '-50%',
        left: '50%'
      }
    }
  };
};

export { Tooltip };
