'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var button = require('@keystone-ui/button');
var core = require('@keystone-ui/core');
var fields = require('@keystone-ui/fields');
var EyeIcon = require('@keystone-ui/icons/icons/EyeIcon');
var EyeOffIcon = require('@keystone-ui/icons/icons/EyeOffIcon');
var XIcon = require('@keystone-ui/icons/icons/XIcon');
var segmentedControl = require('@keystone-ui/segmented-control');
var dumbPasswords = require('dumb-passwords');
var CellContainer = require('../../../../../dist/CellContainer-e370d64d.cjs.prod.js');
require('@babel/runtime/helpers/extends');
require('next/router');
require('next/link');
require('next/head');
require('@babel/runtime/helpers/defineProperty');
require('@keystone-ui/icons/icons/AlertTriangleIcon');
require('@keystone-ui/toast');
require('@keystone-ui/loading');
require('@keystone-ui/modals');
require('apollo-upload-client');
require('@emotion/hash');
require('../../../../../dist/next-fields-f1c33a35.cjs.prod.js');
require('../../../../../dist/graphql-ts-schema-e1666bd5.cjs.prod.js');
require('@apollo/client');
require('../../../../../dist/admin-meta-graphql-4908958f.cjs.prod.js');
require('@keystone-ui/popover');
require('@keystone-ui/icons/icons/MoreHorizontalIcon');
require('@keystone-ui/icons/icons/ChevronRightIcon');
require('../../../../../dist/SignoutButton-9832e663.cjs.prod.js');
require('../../../../../dist/Fields-f6e48bac.cjs.prod.js');
require('fast-deep-equal');
require('@keystone-ui/notice');
require('decimal.js');
require('@graphql-ts/schema/api-without-context');
require('@graphql-ts/schema');
require('graphql-upload/GraphQLUpload.js');
require('graphql');
require('@graphql-ts/extend');
require('@graphql-ts/schema/api-with-context');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var dumbPasswords__default = /*#__PURE__*/_interopDefault(dumbPasswords);

/** @jsxRuntime classic */
function validate(value, validation, fieldLabel) {
  if (value.kind === 'initial' && (value.isSet === null || value.isSet === true)) {
    return undefined;
  }
  if (value.kind === 'initial' && validation !== null && validation !== void 0 && validation.isRequired) {
    return `${fieldLabel} is required`;
  }
  if (value.kind === 'editing' && value.confirm !== value.value) {
    return `The passwords do not match`;
  }
  if (value.kind === 'editing') {
    const val = value.value;
    if (val.length < validation.length.min) {
      if (validation.length.min === 1) {
        return `${fieldLabel} must not be empty`;
      }
      return `${fieldLabel} must be at least ${validation.length.min} characters long`;
    }
    if (validation.length.max !== null && val.length > validation.length.max) {
      return `${fieldLabel} must be no longer than ${validation.length.max} characters`;
    }
    if (validation.match && !validation.match.regex.test(val)) {
      return validation.match.explanation;
    }
    if (validation.rejectCommon && dumbPasswords__default["default"].check(val)) {
      return `${fieldLabel} is too common and is not allowed`;
    }
  }
  return undefined;
}
function isSetText(isSet) {
  return isSet == null ? 'Access Denied' : isSet ? 'Is set' : 'Is not set';
}
const Field = _ref => {
  let {
    field,
    value,
    onChange,
    forceValidation,
    autoFocus
  } = _ref;
  const [showInputValue, setShowInputValue] = React.useState(false);
  const [touchedFirstInput, setTouchedFirstInput] = React.useState(false);
  const [touchedSecondInput, setTouchedSecondInput] = React.useState(false);
  const shouldShowValidation = forceValidation || touchedFirstInput && touchedSecondInput;
  const validationMessage = shouldShowValidation ? validate(value, field.validation, field.label) : undefined;
  const validation = validationMessage && core.jsx(core.Text, {
    color: "red600",
    size: "small"
  }, validationMessage);
  const inputType = showInputValue ? 'text' : 'password';
  return core.jsx(fields.FieldContainer, {
    as: "fieldset"
  }, core.jsx(fields.FieldLabel, {
    as: "legend"
  }, field.label), core.jsx(fields.FieldDescription, {
    id: `${field.path}-description`
  }, field.description), onChange === undefined ? isSetText(value.isSet) : value.kind === 'initial' ? core.jsx(React.Fragment, null, core.jsx(button.Button, {
    autoFocus: autoFocus,
    onClick: () => {
      onChange({
        kind: 'editing',
        confirm: '',
        value: '',
        isSet: value.isSet
      });
    }
  }, value.isSet ? 'Change Password' : 'Set Password'), validation) : core.jsx(core.Stack, {
    gap: "small"
  }, core.jsx("div", {
    css: {
      display: 'flex'
    }
  }, core.jsx(core.VisuallyHidden, {
    as: "label",
    htmlFor: `${field.path}-new-password`
  }, "New Password"), core.jsx(fields.TextInput, {
    id: `${field.path}-new-password`,
    autoFocus: true,
    invalid: validationMessage !== undefined,
    type: inputType,
    value: value.value,
    placeholder: "New Password",
    onChange: event => {
      onChange({
        ...value,
        value: event.target.value
      });
    },
    onBlur: () => {
      setTouchedFirstInput(true);
    }
  }), core.jsx(Spacer, null), core.jsx(core.VisuallyHidden, {
    as: "label",
    htmlFor: `${field.path}-confirm-password`
  }, "Confirm Password"), core.jsx(fields.TextInput, {
    id: `${field.path}-confirm-password`,
    invalid: validationMessage !== undefined,
    type: inputType,
    value: value.confirm,
    placeholder: "Confirm Password",
    onChange: event => {
      onChange({
        ...value,
        confirm: event.target.value
      });
    },
    onBlur: () => {
      setTouchedSecondInput(true);
    }
  }), core.jsx(Spacer, null), core.jsx(button.Button, {
    onClick: () => {
      setShowInputValue(!showInputValue);
    }
  }, core.jsx(core.VisuallyHidden, null, showInputValue ? 'Hide Text' : 'Show Text'), showInputValue ? core.jsx(EyeOffIcon.EyeOffIcon, null) : core.jsx(EyeIcon.EyeIcon, null)), core.jsx(Spacer, null), core.jsx(button.Button, {
    onClick: () => {
      onChange({
        kind: 'initial',
        isSet: value.isSet
      });
    }
  }, core.jsx(core.VisuallyHidden, null, "Cancel"), core.jsx(XIcon.XIcon, null))), validation));
};
const Cell = _ref2 => {
  var _item$field$path;
  let {
    item,
    field
  } = _ref2;
  return core.jsx(CellContainer.CellContainer, null, isSetText((_item$field$path = item[field.path]) === null || _item$field$path === void 0 ? void 0 : _item$field$path.isSet));
};
const CardValue = _ref3 => {
  var _item$field$path2;
  let {
    item,
    field
  } = _ref3;
  return core.jsx(fields.FieldContainer, null, core.jsx(fields.FieldLabel, null, field.label), isSetText((_item$field$path2 = item[field.path]) === null || _item$field$path2 === void 0 ? void 0 : _item$field$path2.isSet));
};
const controller = config => {
  const validation = {
    ...config.fieldMeta.validation,
    match: config.fieldMeta.validation.match === null ? null : {
      regex: new RegExp(config.fieldMeta.validation.match.regex.source, config.fieldMeta.validation.match.regex.flags),
      explanation: config.fieldMeta.validation.match.explanation
    }
  };
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: `${config.path} {isSet}`,
    validation,
    defaultValue: {
      kind: 'initial',
      isSet: false
    },
    validate: state => validate(state, validation, config.label) === undefined,
    deserialize: data => {
      var _data$config$path$isS, _data$config$path;
      return {
        kind: 'initial',
        isSet: (_data$config$path$isS = (_data$config$path = data[config.path]) === null || _data$config$path === void 0 ? void 0 : _data$config$path.isSet) !== null && _data$config$path$isS !== void 0 ? _data$config$path$isS : null
      };
    },
    serialize: value => {
      if (value.kind === 'initial') return {};
      return {
        [config.path]: value.value
      };
    },
    filter: config.fieldMeta.isNullable === false ? undefined : {
      Filter(props) {
        return core.jsx(segmentedControl.SegmentedControl, {
          selectedIndex: Number(props.value),
          onChange: value => {
            props.onChange(!!value);
          },
          segments: ['Is Not Set', 'Is Set']
        });
      },
      graphql: _ref4 => {
        let {
          value
        } = _ref4;
        return {
          [config.path]: {
            isSet: value
          }
        };
      },
      Label(_ref5) {
        let {
          value
        } = _ref5;
        return value ? 'is set' : 'is not set';
      },
      types: {
        is_set: {
          label: 'Is Set',
          initialValue: true
        }
      }
    }
  };
};
const Spacer = () => {
  const {
    spacing
  } = core.useTheme();
  return core.jsx("div", {
    css: {
      width: spacing.small,
      flexShrink: 0
    }
  });
};

exports.CardValue = CardValue;
exports.Cell = Cell;
exports.Field = Field;
exports.controller = controller;
