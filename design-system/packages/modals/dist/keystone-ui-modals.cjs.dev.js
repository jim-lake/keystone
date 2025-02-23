'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var button = require('@keystone-ui/button');
var core = require('@keystone-ui/core');
var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');
var FocusLock = require('react-focus-lock');
var reactRemoveScroll = require('react-remove-scroll');
var reactTransitionGroup = require('react-transition-group');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var FocusLock__default = /*#__PURE__*/_interopDefault(FocusLock);

const fadeInAnim = core.keyframes({
  from: {
    opacity: 0
  }
});
const easing$2 = 'cubic-bezier(0.2, 0, 0, 1)';
const Blanket = /*#__PURE__*/React.forwardRef((props, ref) => {
  return core.jsx("div", _extends({
    ref: ref,
    css: {
      animation: `${fadeInAnim} 320ms ${easing$2}`,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      // TODO get this from the theme
      bottom: 0,
      left: 0,
      position: 'fixed',
      right: 0,
      top: 0
    }
  }, props));
});

const ModalContext = /*#__PURE__*/React__default["default"].createContext(null);
const DrawerProvider = _ref => {
  let {
    children
  } = _ref;
  let [drawerStack, setDrawerStack] = React.useState([]);
  const pushToDrawerStack = React.useCallback(key => {
    setDrawerStack(stack => [...stack, key]);
  }, []);
  const popFromDrawerStack = React.useCallback(() => {
    setDrawerStack(stack => {
      let less = stack.slice(0, -1);
      return less;
    });
  }, []);
  const context = {
    drawerStack,
    pushToDrawerStack,
    popFromDrawerStack
  };
  return /*#__PURE__*/React__default["default"].createElement(ModalContext.Provider, {
    value: context
  }, children);
};

// Utils
// ------------------------------
const useDrawerManager = uniqueKey => {
  const modalState = React__default["default"].useContext(ModalContext);
  if (modalState === null) {
    throw new Error('This component must have a <DrawerProvider/> ancestor in the same React tree.');
  }

  // keep the stack in sync on mount/unmount
  React.useEffect(() => {
    modalState.pushToDrawerStack(uniqueKey);
    return () => {
      modalState.popFromDrawerStack();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // the last key in the array is the "top" modal visually, so the depth is the inverse index
  // be careful not to mutate the stack
  let depth = modalState.drawerStack.slice().reverse().indexOf(uniqueKey);
  // if it's not in the stack already,
  // we know that it should be the last drawer in the stack but the effect hasn't happened yet
  // so we need to make the depth 0 so the depth is correct even though the effect hasn't happened yet
  return depth === -1 ? 0 : depth;
};

const DrawerControllerContext = /*#__PURE__*/React__default["default"].createContext(null);
const DrawerControllerContextProvider = DrawerControllerContext.Provider;
const useDrawerControllerContext = () => {
  let context = React.useContext(DrawerControllerContext);
  if (!context) {
    throw new Error('Drawers must be wrapped in a <DrawerController>. You should generally do this outside of the component that renders the <Drawer> or <TabbedDrawer>.');
  }
  return context;
};
const DrawerController = _ref => {
  let {
    isOpen,
    children
  } = _ref;
  return /*#__PURE__*/React__default["default"].createElement(reactTransitionGroup.Transition, {
    appear: true,
    mountOnEnter: true,
    unmountOnExit: true,
    in: isOpen,
    timeout: 150
  }, transitionState => /*#__PURE__*/React__default["default"].createElement(DrawerControllerContextProvider, {
    value: transitionState
  }, children));
};

const DRAWER_WIDTHS = {
  narrow: 580,
  wide: 740
};
const easing$1 = 'cubic-bezier(0.2, 0, 0, 1)';
const blanketTransition = {
  entering: {
    opacity: 0
  },
  entered: {
    opacity: 1
  },
  exiting: {
    opacity: 0
  },
  exited: {
    opacity: 0
  },
  unmounted: {
    opacity: 0
  }
};
const DrawerBase = _ref => {
  let {
    children,
    initialFocusRef,
    onClose,
    onSubmit,
    width = 'narrow',
    transitionState,
    ...props
  } = _ref;
  const theme = core.useTheme();
  const containerRef = React.useRef(null);
  const id = core.useId();
  const uniqueKey = core.makeId('drawer', id);

  // sync drawer state
  let drawerDepth = useDrawerManager(uniqueKey);
  const onKeyDown = event => {
    if (event.key === 'Escape' && !event.defaultPrevented) {
      event.preventDefault();
      onClose();
    }
  };
  const activateFocusLock = React.useCallback(() => {
    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
  }, [initialFocusRef]);
  const dialogTransition = getDialogTransition(drawerDepth);
  let Tag = 'div';
  if (onSubmit) {
    Tag = 'form';
    let oldOnSubmit = onSubmit;
    // @ts-ignore
    onSubmit = event => {
      if (!event.defaultPrevented) {
        event.preventDefault();
        event.stopPropagation();
        oldOnSubmit();
      }
    };
  }
  return core.jsx(core.Portal, null, core.jsx(React.Fragment, null, core.jsx(Blanket, {
    onClick: onClose,
    style: {
      transition: `opacity 150ms linear`,
      ...blanketTransition[transitionState]
    }
  }), core.jsx(FocusLock__default["default"], {
    autoFocus: true,
    returnFocus: true,
    onActivation: activateFocusLock
  }, core.jsx(reactRemoveScroll.RemoveScroll, {
    enabled: true
  }, core.jsx(Tag, _extends({
    onSubmit: onSubmit,
    "aria-modal": "true",
    role: "dialog",
    ref: containerRef,
    tabIndex: -1,
    onKeyDown: onKeyDown,
    style: dialogTransition[transitionState],
    css: {
      backgroundColor: theme.colors.background,
      bottom: 0,
      boxShadow: theme.shadow.s400,
      outline: 0,
      position: 'fixed',
      right: 0,
      top: 0,
      transition: `transform 150ms ${easing$1}`,
      width: DRAWER_WIDTHS[width],
      // flex layout must be applied here so content will grow/shrink properly
      display: 'flex',
      flexDirection: 'column'
    }
  }, props), core.jsx(DrawerControllerContextProvider, {
    value: null
  }, children))))));
};

// Utils
// ------------------------------

function getDialogTransition(depth) {
  let scaleInc = 0.05;
  let transformValue = `scale(${1 - scaleInc * depth}) translateX(-${depth * 40}px)`;
  return {
    entering: {
      transform: 'translateX(100%)'
    },
    entered: {
      transform: transformValue
    },
    exiting: {
      transform: 'translateX(100%)'
    },
    exited: {
      transform: 'translateX(100%)'
    },
    unmounted: {
      transform: 'none'
    }
  };
}

/** @jsxRuntime classic */
const Drawer = _ref => {
  let {
    actions,
    children,
    title,
    id,
    initialFocusRef,
    width = 'narrow'
  } = _ref;
  const transitionState = useDrawerControllerContext();
  const {
    cancel,
    confirm
  } = actions;
  const {
    colors,
    spacing
  } = core.useTheme();
  const safeClose = actions.confirm.loading ? () => {} : actions.cancel.action;
  const instanceId = core.useId(id);
  const headingId = core.makeId(instanceId, 'heading');
  return core.jsx(DrawerBase, {
    transitionState: transitionState,
    "aria-labelledby": headingId,
    initialFocusRef: initialFocusRef,
    onSubmit: actions.confirm.action,
    onClose: safeClose,
    width: width
  }, core.jsx("div", {
    css: {
      alignItems: 'center',
      borderBottom: `1px solid ${colors.border}`,
      boxSizing: 'border-box',
      display: 'flex',
      flexShrink: 0,
      height: 80,
      padding: `${spacing.large}px ${spacing.xlarge}px`
    }
  }, core.jsx(core.Heading, {
    id: headingId,
    type: "h3"
  }, title)), core.jsx("div", {
    css: {
      overflowY: 'auto',
      padding: `0 ${spacing.xlarge}px`
    }
  }, children), core.jsx(core.Divider, {
    marginX: "xlarge"
  }), core.jsx(core.Stack, {
    padding: "xlarge",
    across: true,
    gap: "small"
  }, core.jsx(button.Button, {
    tone: "active",
    weight: "bold",
    type: "submit",
    isLoading: confirm.loading
  }, confirm.label), core.jsx(button.Button, {
    onClick: safeClose,
    disabled: confirm.loading,
    weight: "none",
    tone: "passive"
  }, cancel.label)));
};

const slideInAnim = core.keyframes({
  from: {
    transform: 'translateY(20%)',
    opacity: 0
  }
});
const easing = 'cubic-bezier(0.2, 0, 0, 1)';
const DialogBase = _ref => {
  let {
    children,
    isOpen,
    onClose,
    width,
    ...props
  } = _ref;
  const theme = core.useTheme();
  const onKeyDown = event => {
    if (event.key === 'Escape' && !event.defaultPrevented) {
      event.preventDefault(); // Avoid potential drawer close
      onClose();
    }
  };
  return isOpen ? core.jsx(core.Portal, null, core.jsx(React.Fragment, null, core.jsx(Blanket, {
    onClick: onClose
  }), core.jsx(FocusLock__default["default"], {
    autoFocus: true,
    returnFocus: true
  }, core.jsx(reactRemoveScroll.RemoveScroll, {
    enabled: true
  }, core.jsx("div", {
    css: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, core.jsx("div", _extends({
    "aria-modal": "true",
    role: "dialog",
    tabIndex: -1,
    onKeyDown: onKeyDown,
    css: {
      animation: `${slideInAnim} 320ms ${easing}`,
      backgroundColor: theme.colors.background,
      borderRadius: theme.radii.large,
      boxShadow: theme.shadow.s400,
      transition: `transform 150ms ${easing}`,
      width,
      zIndex: theme.elevation.e400
    }
  }, props), children)))))) : null;
};

/** @jsxRuntime classic */
const AlertDialog = _ref => {
  let {
    actions,
    isOpen,
    children,
    title,
    id,
    tone = 'active'
  } = _ref;
  const {
    cancel,
    confirm
  } = actions;
  const theme = core.useTheme();
  const instanceId = core.useId(id);
  const headingId = core.makeId('heading', instanceId);
  const onClose = () => {
    if (actions.cancel) {
      actions.cancel.action();
    } else {
      actions.confirm.action();
    }
  };
  return core.jsx(DialogBase, {
    isOpen: isOpen,
    onClose: onClose,
    width: 440,
    "aria-labelledby": headingId
  }, core.jsx("div", {
    css: {
      padding: theme.spacing.xlarge
    }
  }, core.jsx(core.Heading, {
    id: headingId,
    type: "h4"
  }, title), core.jsx(core.Box, {
    marginY: "large"
  }, children), core.jsx("div", {
    css: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, cancel && core.jsx(button.Button, {
    disabled: confirm.loading,
    key: cancel.label,
    onClick: cancel.action,
    weight: "none",
    tone: "passive"
  }, cancel.label), core.jsx(button.Button, {
    css: {
      marginLeft: theme.spacing.medium
    },
    key: confirm.label,
    isLoading: confirm.loading,
    onClick: confirm.action,
    tone: tone
  }, confirm.label))));
};

exports.AlertDialog = AlertDialog;
exports.DRAWER_WIDTHS = DRAWER_WIDTHS;
exports.Drawer = Drawer;
exports.DrawerController = DrawerController;
exports.DrawerProvider = DrawerProvider;
