'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var core = require('@keystone-ui/core');
var fields = require('@keystone-ui/fields');
var CheckIcon = require('@keystone-ui/icons/icons/CheckIcon');
var react = require('react');
var ReactSelect = require('react-select');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var ReactSelect__default = /*#__PURE__*/_interopDefault(ReactSelect);

const CheckMark = _ref => {
  let {
    isDisabled,
    isFocused,
    isSelected
  } = _ref;
  const tokens = fields.useIndicatorTokens({
    size: 'medium',
    type: 'radio'
  });
  return core.jsx("div", {
    className: `${isDisabled ? 'disabled ' : ''}${isFocused ? 'focus ' : ''}${isSelected ? 'selected' : ''}`,
    css: {
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
      '&.focus': {
        backgroundColor: tokens.focus.background,
        borderColor: tokens.focus.borderColor,
        boxShadow: tokens.focus.shadow,
        color: tokens.focus.foreground
      },
      '&.selected': {
        backgroundColor: tokens.selected.background,
        borderColor: tokens.selected.borderColor,
        boxShadow: tokens.selected.shadow,
        color: tokens.selected.foreground
      },
      '&.disabled': {
        backgroundColor: tokens.disabled.background,
        borderColor: tokens.disabled.borderColor,
        boxShadow: tokens.disabled.shadow,
        color: tokens.disabled.background,
        cursor: 'default'
      },
      '&.selected.disabled': {
        color: tokens.disabled.foreground
      }
    }
  }, core.jsx(CheckIcon.CheckIcon, {
    size: "small"
  }));
};
const OptionPrimitive = _ref2 => {
  let {
    children,
    isDisabled,
    isFocused,
    innerProps,
    innerRef,
    className
  } = _ref2;
  const theme = core.useTheme();
  return core.jsx("div", _extends({
    ref: innerRef,
    className: className,
    css: {
      alignItems: 'center',
      color: isDisabled ? theme.colors.foregroundDim : isFocused ? theme.colors.linkHoverColor : undefined,
      cursor: 'pointer',
      display: 'flex',
      fontSize: '0.9em',
      fontWeight: 500,
      justifyContent: 'space-between',
      background: isFocused ? theme.colors.backgroundHover : undefined,
      outline: 0,
      padding: `${theme.spacing.small}px`,
      pointerEvents: isDisabled ? 'none' : undefined,
      '&:not(:first-of-type)': {
        borderTop: `1px solid ${theme.colors.backgroundDim}`
      },
      ':hover': {
        background: theme.colors.backgroundHover,
        color: theme.colors.linkHoverColor
      }
    }
  }, innerProps), children);
};
const Control = _ref3 => {
  let {
    selectProps,
    ...props
  } = _ref3;
  return core.jsx(ReactSelect.components.Control, _extends({
    selectProps: selectProps
  }, props));
};
const defaultComponents = {
  Control,
  Option: OptionPrimitive,
  DropdownIndicator: null,
  IndicatorSeparator: null
};
const Options = _ref4 => {
  let {
    components: propComponents,
    ...props
  } = _ref4;
  const components = react.useMemo(() => ({
    ...defaultComponents,
    ...propComponents
  }), [propComponents]);
  const theme = core.useTheme();
  const optionRendererStyles = react.useMemo(() => ({
    control: provided => ({
      ...provided,
      background: theme.fields.inputBackground,
      boxShadow: 'none',
      cursor: 'text',
      padding: 0,
      minHeight: 34
    }),
    menu: () => ({
      marginTop: 8
    }),
    menuList: provided => ({
      ...provided,
      padding: 0
    }),
    placeholder: provided => ({
      ...provided,
      color: theme.fields.inputPlaceholder
    })
  }), [theme]);
  return core.jsx(ReactSelect__default["default"], _extends({
    backspaceRemovesValue: false,
    captureMenuScroll: false,
    closeMenuOnSelect: false,
    controlShouldRenderValue: false,
    hideSelectedOptions: false,
    isClearable: false,
    isSearchable: true,
    maxMenuHeight: 1000,
    menuIsOpen: true,
    menuShouldScrollIntoView: false,
    styles: optionRendererStyles
    // TODO: JW: Not a fan of this, but it doesn't seem to make a difference
    // if we take it out. react-select bug maybe?
    ,
    tabSelectsValue: false,
    components: components
  }, props));
};

exports.CheckMark = CheckMark;
exports.OptionPrimitive = OptionPrimitive;
exports.Options = Options;
