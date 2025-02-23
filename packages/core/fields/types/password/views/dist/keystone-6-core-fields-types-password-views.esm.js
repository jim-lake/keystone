import { useState, Fragment } from 'react';
import { Button } from '@keystone-ui/button';
import { jsx, Text, Stack, VisuallyHidden, useTheme } from '@keystone-ui/core';
import { FieldContainer, FieldLabel, FieldDescription, TextInput } from '@keystone-ui/fields';
import { EyeIcon } from '@keystone-ui/icons/icons/EyeIcon';
import { EyeOffIcon } from '@keystone-ui/icons/icons/EyeOffIcon';
import { XIcon } from '@keystone-ui/icons/icons/XIcon';
import { SegmentedControl } from '@keystone-ui/segmented-control';
import dumbPasswords from 'dumb-passwords';
import { C as CellContainer } from '../../../../../dist/CellContainer-8cce1185.esm.js';
import '@babel/runtime/helpers/extends';
import 'next/router';
import 'next/link';
import 'next/head';
import '@babel/runtime/helpers/defineProperty';
import '@keystone-ui/icons/icons/AlertTriangleIcon';
import '@keystone-ui/toast';
import '@keystone-ui/loading';
import '@keystone-ui/modals';
import 'apollo-upload-client';
import '@emotion/hash';
import '../../../../../dist/next-fields-34f831a7.esm.js';
import '../../../../../dist/graphql-ts-schema-9020a95a.esm.js';
import '@apollo/client';
import '../../../../../dist/admin-meta-graphql-75e8cfcb.esm.js';
import '@keystone-ui/popover';
import '@keystone-ui/icons/icons/MoreHorizontalIcon';
import '@keystone-ui/icons/icons/ChevronRightIcon';
import '../../../../../dist/SignoutButton-ef277bf5.esm.js';
import '../../../../../dist/Fields-6156179c.esm.js';
import 'fast-deep-equal';
import '@keystone-ui/notice';
import 'decimal.js';
import '@graphql-ts/schema/api-without-context';
import '@graphql-ts/schema';
import 'graphql-upload/GraphQLUpload.js';
import 'graphql';
import '@graphql-ts/extend';
import '@graphql-ts/schema/api-with-context';

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
    if (validation.rejectCommon && dumbPasswords.check(val)) {
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
  const [showInputValue, setShowInputValue] = useState(false);
  const [touchedFirstInput, setTouchedFirstInput] = useState(false);
  const [touchedSecondInput, setTouchedSecondInput] = useState(false);
  const shouldShowValidation = forceValidation || touchedFirstInput && touchedSecondInput;
  const validationMessage = shouldShowValidation ? validate(value, field.validation, field.label) : undefined;
  const validation = validationMessage && jsx(Text, {
    color: "red600",
    size: "small"
  }, validationMessage);
  const inputType = showInputValue ? 'text' : 'password';
  return jsx(FieldContainer, {
    as: "fieldset"
  }, jsx(FieldLabel, {
    as: "legend"
  }, field.label), jsx(FieldDescription, {
    id: `${field.path}-description`
  }, field.description), onChange === undefined ? isSetText(value.isSet) : value.kind === 'initial' ? jsx(Fragment, null, jsx(Button, {
    autoFocus: autoFocus,
    onClick: () => {
      onChange({
        kind: 'editing',
        confirm: '',
        value: '',
        isSet: value.isSet
      });
    }
  }, value.isSet ? 'Change Password' : 'Set Password'), validation) : jsx(Stack, {
    gap: "small"
  }, jsx("div", {
    css: {
      display: 'flex'
    }
  }, jsx(VisuallyHidden, {
    as: "label",
    htmlFor: `${field.path}-new-password`
  }, "New Password"), jsx(TextInput, {
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
  }), jsx(Spacer, null), jsx(VisuallyHidden, {
    as: "label",
    htmlFor: `${field.path}-confirm-password`
  }, "Confirm Password"), jsx(TextInput, {
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
  }), jsx(Spacer, null), jsx(Button, {
    onClick: () => {
      setShowInputValue(!showInputValue);
    }
  }, jsx(VisuallyHidden, null, showInputValue ? 'Hide Text' : 'Show Text'), showInputValue ? jsx(EyeOffIcon, null) : jsx(EyeIcon, null)), jsx(Spacer, null), jsx(Button, {
    onClick: () => {
      onChange({
        kind: 'initial',
        isSet: value.isSet
      });
    }
  }, jsx(VisuallyHidden, null, "Cancel"), jsx(XIcon, null))), validation));
};
const Cell = _ref2 => {
  var _item$field$path;
  let {
    item,
    field
  } = _ref2;
  return jsx(CellContainer, null, isSetText((_item$field$path = item[field.path]) === null || _item$field$path === void 0 ? void 0 : _item$field$path.isSet));
};
const CardValue = _ref3 => {
  var _item$field$path2;
  let {
    item,
    field
  } = _ref3;
  return jsx(FieldContainer, null, jsx(FieldLabel, null, field.label), isSetText((_item$field$path2 = item[field.path]) === null || _item$field$path2 === void 0 ? void 0 : _item$field$path2.isSet));
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
        return jsx(SegmentedControl, {
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
  } = useTheme();
  return jsx("div", {
    css: {
      width: spacing.small,
      flexShrink: 0
    }
  });
};

export { CardValue, Cell, Field, controller };
