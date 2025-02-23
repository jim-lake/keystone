import _extends from '@babel/runtime/helpers/esm/extends';
import { useState, useEffect, useCallback, useMemo, Fragment, forwardRef, useRef } from 'react';
import * as focusTrapModule from 'focus-trap';
import { usePopper } from 'react-popper';
import { jsx, useTheme, Portal } from '@keystone-ui/core';

// Hooks
// ------------------------------
// Generic Hook
const useControlledPopover = function (_ref) {
  let {
    isOpen,
    onClose
  } = _ref;
  let popperOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let popoverOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    handleClose: 'both'
  };
  const [anchorElement, setAnchorElement] = useState(null);
  const [popoverElement, setPopoverElement] = useState();
  const [arrowElement, setArrowElement] = useState();
  const {
    styles,
    attributes,
    update
  } = usePopper(anchorElement, popoverElement, {
    ...popperOptions,
    modifiers: [...(popperOptions.modifiers || []), {
      name: 'arrow',
      options: {
        element: arrowElement
      }
    }, {
      name: 'eventListeners',
      options: {
        scroll: isOpen,
        resize: isOpen
      }
    }]
  });

  // update popper when it opens to get the latest placement
  // useful for prerendered popovers in modals etc.
  useEffect(() => {
    if (update && isOpen) {
      update();
    }
  }, [isOpen, update]);

  // close on click outside
  useClickOutside({
    handler: () => onClose(),
    elements: [anchorElement, popoverElement],
    listenWhen: ['both', 'mouse'].includes(popoverOptions.handleClose) && isOpen
  });

  // close on esc press
  useKeyPress({
    targetKey: 'Escape',
    downHandler: useCallback(event => {
      event.preventDefault(); // Avoid potential close of modal
      onClose();
    }, [onClose]),
    listenWhen: ['both', 'keyboard'].includes(popoverOptions.handleClose) && isOpen
  });
  return {
    trigger: useMemo(() => ({
      ref: setAnchorElement,
      props: {
        'aria-haspopup': true,
        'aria-expanded': isOpen
      }
    }), [isOpen]),
    dialog: useMemo(() => ({
      ref: setPopoverElement,
      props: {
        style: styles.popper,
        ...attributes.popper
      }
    }), [styles.popper, attributes.popper]),
    arrow: useMemo(() => ({
      ref: setArrowElement,
      props: {
        style: styles.arrow
      }
    }), [styles.arrow])
  };
};
const usePopover = function () {
  let popperOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let popoverOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    handleClose: 'both'
  };
  const [isOpen, setOpen] = useState(false);
  return {
    isOpen,
    setOpen,
    ...useControlledPopover({
      isOpen,
      onClose: useCallback(() => setOpen(false), [])
    }, popperOptions, popoverOptions)
  };
};

// Component
// ------------------------------
const Popover = _ref2 => {
  let {
    placement = 'bottom',
    triggerRenderer,
    ...props
  } = _ref2;
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
        offset: [0, 8]
      }
    }]
  });
  return jsx(Fragment, null, triggerRenderer({
    isOpen,
    triggerProps: {
      ref: trigger.ref,
      ...trigger.props,
      onClick: () => setOpen(!isOpen)
    }
  }), jsx(PopoverDialog, _extends({
    isVisible: isOpen,
    arrow: arrow,
    ref: dialog.ref
  }, dialog.props, props)));
};

// Dialog
// ------------------------------
const PopoverDialog = /*#__PURE__*/forwardRef((_ref3, consumerRef) => {
  let {
    isVisible,
    children,
    arrow,
    ...props
  } = _ref3;
  const {
    elevation,
    radii,
    shadow,
    colors
  } = useTheme();
  const focusTrapRef = useRef(null);
  const focusTrap = useRef(null);
  useEffect(() => {
    if (focusTrapRef.current) {
      focusTrap.current = focusTrapModule.createFocusTrap(focusTrapRef.current, {
        allowOutsideClick: true
      });
    }
  }, [focusTrapRef]);
  useEffect(() => {
    const focusTrapInstance = focusTrap.current;
    if (focusTrapInstance) {
      if (isVisible) {
        focusTrapInstance.activate();
        return () => {
          focusTrapInstance.deactivate();
        };
      } else {
        focusTrapInstance.deactivate();
      }
    }
  }, [isVisible, focusTrap]);
  return jsx(Portal, null, jsx("div", _extends({
    role: "dialog",
    "aria-hidden": isVisible ? 'false' : 'true',
    "aria-modal": "true",
    ref: consumerRef,
    css: {
      background: colors.background,
      borderRadius: radii.medium,
      boxShadow: shadow.s300,
      opacity: isVisible ? 1 : 0,
      pointerEvents: isVisible ? undefined : 'none',
      zIndex: elevation.e500,
      // on top of drawers
      ...useArrowStyles()
    }
  }, props), jsx("div", _extends({
    "data-popper-arrow": true,
    ref: arrow.ref,
    className: "tooltipArrow"
  }, arrow.props)), jsx("div", {
    ref: focusTrapRef
  }, isVisible ? children : null)));
});

// TODO: maybe we should add an invisible blanket and have a regular react event listener on that instead of this?

// NOTE: mouse event handler defined here rather than imported from react becase
// the event listener will return a native event, not a synthetic event
const useClickOutside = _ref4 => {
  let {
    handler,
    elements,
    listenWhen
  } = _ref4;
  useEffect(() => {
    if (listenWhen) {
      let handleMouseDown = event => {
        // bail on mouse down "inside" any of the provided elements
        if (elements.some(el => el && el.contains(event.target))) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', handleMouseDown);
      return () => {
        document.removeEventListener('mousedown', handleMouseDown);
      };
    }
  }, [handler, elements, listenWhen]);
};
const useKeyPress = _ref5 => {
  let {
    targetKey,
    targetElement,
    downHandler,
    upHandler,
    listenWhen
  } = _ref5;
  // Keep track of whether the target key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // add event listeners
  useEffect(() => {
    let target = targetElement || document.body;
    let onDown = event => {
      if (event.key === targetKey) {
        setKeyPressed(true);
        if (typeof downHandler === 'function') {
          downHandler(event);
        }
      }
    };
    let onUp = event => {
      if (event.key === targetKey) {
        setKeyPressed(false);
        if (typeof upHandler === 'function') {
          upHandler(event);
        }
      }
    };
    if (listenWhen) {
      target.addEventListener('keydown', onDown);
      target.addEventListener('keyup', onUp);

      // Remove event listeners on cleanup
      return () => {
        target.removeEventListener('keydown', onDown);
        target.removeEventListener('keyup', onUp);
      };
    }
  }, [listenWhen, targetKey, downHandler, upHandler, targetElement]);
  return keyPressed;
};
const useArrowStyles = () => {
  const theme = useTheme();
  const size = 16;
  return {
    '& [data-popper-arrow]': {
      position: 'absolute',
      overflow: 'hidden',
      pointerEvents: 'none',
      height: size * 2,
      width: size * 2,
      '&::after': {
        content: '""',
        position: 'absolute',
        background: theme.colors.background,
        width: size,
        height: size,
        transform: 'translateX(-50%) translateY(-50%) rotate(45deg)',
        boxShadow: theme.shadow.s200
      }
    },
    "&[data-popper-placement^='left'] > [data-popper-arrow]": {
      left: '100%',
      '&::after': {
        top: '50%',
        left: '0'
      }
    },
    "&[data-popper-placement^='right'] > [data-popper-arrow]": {
      right: '100%',
      '&::after': {
        top: '50%',
        left: '100%'
      }
    },
    "&[data-popper-placement^='top'] > [data-popper-arrow]": {
      top: '100%',
      '&::after': {
        top: 0,
        bottom: '-50%',
        left: '50%'
      }
    },
    "&[data-popper-placement^='bottom'] > [data-popper-arrow]": {
      bottom: '100%',
      right: 'unset',
      '&::after': {
        bottom: '-50%',
        left: '50%'
      }
    }
  };
};

export { Popover, PopoverDialog, useControlledPopover, usePopover };
