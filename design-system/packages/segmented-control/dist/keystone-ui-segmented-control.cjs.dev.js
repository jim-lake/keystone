'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var react = require('react');
var core = require('@keystone-ui/core');

// TODO: Move to theme.
const widthMap = {
  small: 128,
  medium: 256,
  large: 512,
  full: '100%'
};
const useControlTokens = _ref => {
  let {
    size: sizeKey,
    width: widthKey
  } = _ref;
  const {
    controlSizes
  } = core.useTheme();
  const size = controlSizes[sizeKey];
  const width = widthMap[widthKey];
  return {
    borderRadius: size.borderRadius,
    paddingX: size.gutter,
    paddingY: size.gutter,
    width
  };
};

// SegmentedControl
// ------------------------------
const SegmentedControl = _ref => {
  let {
    animate = false,
    fill = false,
    onChange,
    segments,
    isDisabled = false,
    isReadOnly = false,
    size = 'medium',
    width = 'large',
    selectedIndex,
    ...props
  } = _ref;
  const rootRef = react.useRef(null);
  const [selectedRect, setSelectedRect] = react.useState({});

  // Because we use radio buttons for the segments, they should share a unique `name`
  const name = String(core.useId());

  // Animate the selected segment indicator
  react.useEffect(() => {
    if (animate && rootRef.current instanceof HTMLElement) {
      let nodes = Array.from(rootRef.current.children);
      let selected = selectedIndex !== undefined && nodes[selectedIndex];
      let rootRect;
      let nodeRect = {
        height: 0,
        width: 0,
        left: 0,
        top: 0
      };
      let offsetLeft;
      let offsetTop;
      if (selected) {
        rootRect = rootRef.current.getBoundingClientRect();
        nodeRect = selected.getBoundingClientRect();
        offsetLeft = nodeRect.left - rootRect.left;
        offsetTop = nodeRect.top - rootRect.top;
      }
      setSelectedRect({
        height: nodeRect.height,
        width: nodeRect.width,
        left: 0,
        top: 0,
        transform: `translateX(${offsetLeft}px) translateY(${offsetTop}px)`
      });
    }
  }, [animate, selectedIndex]);
  const nothingIsSelected = selectedIndex === undefined;
  // do we want to mark the radio item as disabled?
  const actuallyDisabled = isDisabled || isReadOnly && !nothingIsSelected;
  return core.jsx(core.Box, _extends({
    css: {
      outline: 0,
      boxSizing: 'border-box'
    }
  }, props), core.jsx(Root, {
    css: {
      border: `1px solid ${isDisabled ? 'transparent' : '#e1e5e9'}`
    },
    fill: fill,
    size: size,
    ref: rootRef,
    width: width
  }, segments.map((label, idx) => {
    const isSelected = selectedIndex === idx;
    return core.jsx(Item, {
      fill: fill,
      isAnimated: animate,
      isSelected: isSelected,
      disabled: isDisabled,
      readOnly: isReadOnly,
      key: label,
      name: name,
      onChange: event => {
        onChange(idx, event);
      },
      size: size,
      value: idx
    }, label);
  }), core.jsx(core.VisuallyHidden, {
    as: "label"
  }, "None Selected", core.jsx(core.VisuallyHidden, {
    as: "input",
    type: "radio",
    onChange: () => {},
    checked: nothingIsSelected,
    disabled: actuallyDisabled,
    value: "none"
  })), animate && selectedIndex > -1 ? core.jsx(SelectedIndicator, {
    size: size,
    style: selectedRect
  }) : null));
};

// Styled Components
// ------------------------------
const Root = /*#__PURE__*/react.forwardRef((_ref2, ref) => {
  let {
    fill,
    size,
    width,
    ...props
  } = _ref2;
  const {
    colors
  } = core.useTheme();
  const tokens = useControlTokens({
    size,
    width
  });
  return core.jsx("div", _extends({
    ref: ref,
    css: {
      borderRadius: tokens.borderRadius,
      paddingLeft: tokens.paddingX,
      paddingRight: tokens.paddingX,
      paddingTop: tokens.paddingY,
      paddingBottom: tokens.paddingY,
      userSelect: 'none',
      // -- TODO
      background: colors.backgroundDim,
      display: fill ? 'flex' : 'inline-flex',
      flexWrap: 'wrap',
      maxWidth: tokens.width,
      justifyContent: 'space-between',
      lineHeight: 1,
      position: 'relative'
    }
  }, props));
});
const Item = props => {
  const {
    children,
    fill,
    isAnimated,
    isSelected,
    onChange,
    size,
    value,
    disabled,
    readOnly,
    ...attrs
  } = props;
  const {
    colors,
    fields,
    typography
  } = core.useTheme();
  const sizeStyles = useItemSize();
  const selectedStyles = useSelectedStyles();
  const inputRef = react.useRef(null);

  // do we want to mark the radio item as disabled?
  const isDisabled = disabled || readOnly && !isSelected;
  return core.jsx("label", {
    css: {
      ...sizeStyles[size],
      ...(!isAnimated && isSelected && selectedStyles),
      boxSizing: 'border-box',
      cursor: props.disabled ? undefined : 'pointer',
      flex: fill ? 1 : undefined,
      fontWeight: typography.fontWeight.medium,
      textAlign: 'center',
      position: 'relative',
      zIndex: 2,
      border: '1px solid transparent',
      ':focus-within': {
        boxShadow: '0 0 0 2px #bfdbfe;',
        border: '1px solid #166bff;'
      },
      ...(readOnly && {
        ':focus-within': {
          boxShadow: '0 0 0 2px #e1e5e9',
          border: '1px solid #b1b5b9'
        }
      }),
      ...(props.disabled || readOnly ? {} : {
        ':hover': {
          color: !isSelected ? colors.linkHoverColor : undefined,
          backgroundColor: 'rgba(255, 255, 255, 0.5)'
        }
      }),
      ':active': {
        backgroundColor: !isSelected ? fields.hover.inputBackground : undefined
      }
    }
  }, core.jsx(core.VisuallyHidden, _extends({
    ref: inputRef,
    as: "input",
    type: "radio",
    onChange: onChange,
    value: value,
    checked: isSelected,
    disabled: isDisabled
  }, attrs)), children);
};
const SelectedIndicator = _ref3 => {
  let {
    size,
    ...props
  } = _ref3;
  const sizeStyles = useItemSize();
  const selectedStyles = useSelectedStyles();
  return core.jsx("div", _extends({
    css: {
      ...sizeStyles[size],
      ...selectedStyles,
      boxSizing: 'border-box',
      position: 'absolute',
      transitionProperty: 'height,transform,width',
      transitionDuration: '200ms',
      transitionTimingFunction: 'cubic-bezier(.4,1,.75,.9)',
      zIndex: 1
    }
  }, props));
};

// Utils
// ------------------------------

const useItemSize = () => {
  const {
    spacing,
    typography,
    radii
  } = core.useTheme();
  return {
    small: {
      borderRadius: radii.xsmall,
      fontSize: typography.fontSize.small,
      paddingLeft: spacing.medium,
      paddingRight: spacing.medium,
      paddingBottom: spacing.small,
      paddingTop: spacing.small
    },
    medium: {
      borderRadius: radii.xsmall,
      fontSize: typography.fontSize.small,
      paddingLeft: spacing.medium,
      paddingRight: spacing.medium,
      paddingBottom: spacing.small,
      paddingTop: spacing.small
    },
    large: {
      borderRadius: radii.small,
      fontSize: typography.fontSize.medium,
      paddingLeft: spacing.large,
      paddingRight: spacing.large,
      paddingBottom: spacing.medium,
      paddingTop: spacing.medium
    }
  };
};
const useSelectedStyles = () => {
  const {
    colors
  } = core.useTheme();
  return {
    background: colors.background,
    boxShadow: '0px 1px 4px rgba(45, 55, 72, 0.07);' // used to be shadow.s100
  };
};

exports.SegmentedControl = SegmentedControl;
