'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var react = require('react');
var core = require('@keystone-ui/core');
var AlertOctagonIcon = require('@keystone-ui/icons/icons/AlertOctagonIcon');
var AlertTriangleIcon = require('@keystone-ui/icons/icons/AlertTriangleIcon');
var CheckCircleIcon = require('@keystone-ui/icons/icons/CheckCircleIcon');
var InfoIcon = require('@keystone-ui/icons/icons/InfoIcon');
var XIcon = require('@keystone-ui/icons/icons/XIcon');

function notInContext() {
  throw new Error('This component must be used inside a <ToastProvider> component.');
}
const ToastContext = /*#__PURE__*/react.createContext({
  addToast: notInContext,
  removeToast: notInContext
});
const useToasts = () => react.useContext(ToastContext);

// Provider
// ------------------------------
const ToastProvider = _ref => {
  let {
    children
  } = _ref;
  const [toastStack, setToastStack] = react.useState([]);
  const context = react.useMemo(() => ({
    addToast: options => {
      setToastStack(currentStack => {
        // only allow unique IDs in the toast stack
        if (currentStack.some(toast => toast.id === options.id)) {
          console.error(`You cannot add more than one toast with the same id ("${options.id}").`);
          return currentStack;
        }

        // populate defaults and update state
        let toast = populateDefaults(options);
        return [...currentStack, toast];
      });
    },
    removeToast: id => {
      setToastStack(currentStack => currentStack.filter(t => t.id !== id));
    }
  }), []);
  return core.jsx(ToastContext.Provider, {
    value: context
  }, children, core.jsx(ToastContainer, null, toastStack.map(props => {
    const {
      id,
      message,
      preserve,
      title,
      tone
    } = props;
    const onDismiss = () => context.removeToast(id);
    return core.jsx(ToastElement, {
      key: id,
      message: message,
      preserve: preserve,
      onDismiss: onDismiss,
      title: title,
      tone: tone
    });
  })));
};

// Utils
// ------------------------------

let idCount = -1;
let genId = () => ++idCount;
function populateDefaults(props) {
  return {
    title: props.title,
    message: props.message,
    preserve: Boolean(props.preserve),
    id: props.id || String(genId()),
    tone: props.tone || 'help'
  };
}

// Styled Components
// ------------------------------

// Container

const ToastContainer = props => {
  const {
    elevation,
    spacing
  } = core.useTheme();
  return core.jsx(core.Portal, null, core.jsx("div", _extends({
    role: "alert",
    css: {
      position: 'fixed',
      right: spacing.medium,
      bottom: spacing.medium,
      zIndex: elevation.e500
    }
  }, props)));
};

// Element

const AUTO_DISMISS_DURATION = 6000;
const slideInFrames = core.keyframes({
  from: {
    transform: 'translateY(100%)'
  },
  to: {
    transform: 'translateY(0)'
  }
});
const ToastElement = /*#__PURE__*/react.forwardRef((props, ref) => {
  const {
    message,
    onDismiss,
    preserve,
    title,
    tone,
    ...rest
  } = props;
  const {
    radii,
    shadow,
    spacing,
    typography,
    sizing,
    tones
  } = core.useTheme();

  // auto-dismiss functionality
  react.useEffect(() => {
    if (!preserve) {
      const timer = setTimeout(onDismiss, AUTO_DISMISS_DURATION);
      return () => clearTimeout(timer);
    }
    // this is not like other components because the consumer cannot update the props once they `addToast()`
    // we intentionally only want this to be run when the toast element mounts/unmounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const iconElement = {
    positive: core.jsx(CheckCircleIcon.CheckCircleIcon, null),
    negative: core.jsx(AlertOctagonIcon.AlertOctagonIcon, null),
    warning: core.jsx(AlertTriangleIcon.AlertTriangleIcon, null),
    help: core.jsx(InfoIcon.InfoIcon, null)
  }[tone];
  const backgroundColor = {
    positive: tones.positive.fill[0],
    negative: tones.negative.fill[0],
    warning: tones.warning.fill[0],
    help: tones.help.fill[0]
  }[tone];
  const foregroundColor = {
    positive: tones.positive.fillForeground[0],
    negative: tones.negative.fillForeground[0],
    warning: tones.warning.fillForeground[0],
    help: tones.help.fillForeground[0]
  }[tone];
  return core.jsx("div", _extends({
    ref: ref,
    css: {
      alignItems: 'center',
      animation: `${slideInFrames} 150ms cubic-bezier(0.2, 0, 0, 1)`,
      background: backgroundColor,
      borderRadius: radii.medium,
      boxShadow: shadow.s300,
      color: foregroundColor,
      display: 'flex',
      fontSize: typography.fontSize.small,
      lineHeight: 1,
      margin: spacing.medium,
      width: 380,
      // less than desirable magic number, but not sure if this needs to be in theme...
      maxWidth: '100%',
      padding: spacing.large,
      whiteSpace: 'pre-wrap'
    }
  }, rest), iconElement, core.jsx("div", {
    css: {
      flex: 1,
      paddingLeft: spacing.large,
      paddingRight: spacing.large
    }
  }, core.jsx("h3", {
    css: {
      color: foregroundColor,
      fontSize: typography.fontSize.medium,
      fontWeight: typography.fontWeight.bold,
      margin: 0
    }
  }, title), message && core.jsx("div", {
    css: {
      color: foregroundColor,
      lineHeight: typography.leading.base,
      marginTop: spacing.small
    }
  }, message)), core.jsx("button", {
    onClick: onDismiss,
    css: {
      alignItems: 'center',
      background: 0,
      border: 0,
      borderRadius: '50%',
      color: foregroundColor,
      cursor: 'pointer',
      display: 'flex',
      height: sizing.medium,
      justifyContent: 'center',
      outline: 0,
      padding: 0,
      width: sizing.medium,
      ':hover, &.focus-visible': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
      },
      ':active': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
      }
    }
  }, core.jsx(XIcon.XIcon, {
    size: "small"
  })));
});

exports.ToastProvider = ToastProvider;
exports.useToasts = useToasts;
