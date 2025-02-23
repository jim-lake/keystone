'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var core = require('@keystone-ui/core');
var fields = require('@keystone-ui/fields');
var segmentedControl = require('@keystone-ui/segmented-control');
var button = require('@keystone-ui/button');
var CellContainer = require('../../../../../dist/CellContainer-e370d64d.cjs.prod.js');
var CellLink = require('../../../../../dist/CellLink-10f89ceb.cjs.prod.js');
require('@babel/runtime/helpers/defineProperty');
require('@keystone-ui/icons/icons/AlertTriangleIcon');
require('next/link');
require('@keystone-ui/toast');
require('@keystone-ui/loading');
require('@keystone-ui/modals');
require('apollo-upload-client');
require('@emotion/hash');
require('../../../../../dist/next-fields-f1c33a35.cjs.prod.js');
require('../../../../../dist/graphql-ts-schema-e1666bd5.cjs.prod.js');
require('@apollo/client');
require('../../../../../dist/admin-meta-graphql-4908958f.cjs.prod.js');
require('@babel/runtime/helpers/extends');
require('next/router');
require('@keystone-ui/popover');
require('@keystone-ui/icons/icons/MoreHorizontalIcon');
require('@keystone-ui/icons/icons/ChevronRightIcon');
require('next/head');
require('../../../../../dist/SignoutButton-9832e663.cjs.prod.js');
require('../../../../../dist/Fields-f6e48bac.cjs.prod.js');
require('fast-deep-equal');
require('@keystone-ui/notice');
require('../../../../../admin-ui/router/dist/keystone-6-core-admin-ui-router.cjs.prod.js');
require('decimal.js');
require('@graphql-ts/schema/api-without-context');
require('@graphql-ts/schema');
require('graphql-upload/GraphQLUpload.js');
require('graphql');
require('@graphql-ts/extend');
require('@graphql-ts/schema/api-with-context');

/** @jsxRuntime classic */
const Field = _ref => {
  let {
    field,
    value,
    onChange,
    autoFocus,
    forceValidation
  } = _ref;
  const [hasChanged, setHasChanged] = React.useState(false);
  const validationMessage = (hasChanged || forceValidation) && !validate(value, field.isRequired) ? core.jsx(core.Text, {
    color: "red600",
    size: "small"
  }, field.label, " is required") : null;
  return core.jsx(fields.FieldContainer, {
    as: field.displayMode === 'select' ? 'div' : 'fieldset'
  }, field.displayMode === 'select' ? core.jsx(React.Fragment, null, core.jsx(fields.FieldLabel, {
    htmlFor: field.path
  }, field.label), core.jsx(fields.FieldDescription, {
    id: `${field.path}-description`
  }, field.description), core.jsx(fields.Select, {
    id: field.path,
    isClearable: true,
    autoFocus: autoFocus,
    options: field.options,
    isDisabled: onChange === undefined,
    onChange: newVal => {
      onChange === null || onChange === void 0 ? void 0 : onChange({
        ...value,
        value: newVal
      });
      setHasChanged(true);
    },
    value: value.value,
    "aria-describedby": field.description === null ? undefined : `${field.path}-description`,
    portalMenu: true
  }), validationMessage) : field.displayMode === 'radio' ? core.jsx(React.Fragment, null, core.jsx(fields.FieldLabel, {
    as: "legend"
  }, field.label), core.jsx(fields.FieldDescription, {
    id: `${field.path}-description`
  }, field.description), core.jsx(core.Stack, {
    gap: "small",
    marginTop: 'small'
  }, field.options.map(option => {
    var _value$value;
    return core.jsx(fields.Radio, {
      css: {
        alignItems: 'center'
      },
      key: option.value,
      value: option.value,
      checked: ((_value$value = value.value) === null || _value$value === void 0 ? void 0 : _value$value.value) === option.value,
      onChange: event => {
        if (event.target.checked) {
          onChange === null || onChange === void 0 ? void 0 : onChange({
            ...value,
            value: option
          });
          setHasChanged(true);
        }
      }
    }, option.label);
  }), value.value !== null && onChange !== undefined && !field.isRequired && core.jsx(button.Button, {
    onClick: () => {
      onChange({
        ...value,
        value: null
      });
      setHasChanged(true);
    }
  }, "Clear")), validationMessage) : core.jsx(React.Fragment, null, core.jsx(fields.FieldLabel, {
    as: "legend"
  }, field.label), core.jsx(fields.FieldDescription, {
    id: `${field.path}-description`
  }, field.description), core.jsx(core.Stack, {
    across: true,
    gap: "small",
    align: "center"
  }, core.jsx(segmentedControl.SegmentedControl, {
    segments: field.options.map(x => x.label),
    selectedIndex: value.value ? field.options.findIndex(x => x.value === value.value.value) : undefined,
    isReadOnly: onChange === undefined,
    onChange: index => {
      onChange === null || onChange === void 0 ? void 0 : onChange({
        ...value,
        value: field.options[index]
      });
      setHasChanged(true);
    }
  }), value.value !== null && onChange !== undefined && !field.isRequired && core.jsx(button.Button, {
    onClick: () => {
      onChange({
        ...value,
        value: null
      });
      setHasChanged(true);
    }
  }, "Clear")), validationMessage));
};
const Cell = _ref2 => {
  var _field$options$find;
  let {
    item,
    field,
    linkTo
  } = _ref2;
  let value = item[field.path] + '';
  const label = (_field$options$find = field.options.find(x => x.value === value)) === null || _field$options$find === void 0 ? void 0 : _field$options$find.label;
  return linkTo ? core.jsx(CellLink.CellLink, linkTo, label) : core.jsx(CellContainer.CellContainer, null, label);
};
Cell.supportsLinkTo = true;
const CardValue = _ref3 => {
  var _field$options$find2;
  let {
    item,
    field
  } = _ref3;
  let value = item[field.path] + '';
  const label = (_field$options$find2 = field.options.find(x => x.value === value)) === null || _field$options$find2 === void 0 ? void 0 : _field$options$find2.label;
  return core.jsx(fields.FieldContainer, null, core.jsx(fields.FieldLabel, null, field.label), label);
};
function validate(value, isRequired) {
  if (isRequired) {
    // if you got null initially on the update screen, we want to allow saving
    // since the user probably doesn't have read access control
    if (value.kind === 'update' && value.initial === null) {
      return true;
    }
    return value.value !== null;
  }
  return true;
}
const controller = config => {
  var _config$fieldMeta$def, _optionsWithStringVal;
  const optionsWithStringValues = config.fieldMeta.options.map(x => ({
    label: x.label,
    value: x.value.toString()
  }));

  // Transform from string value to type appropriate value
  const t = v => v === null ? null : config.fieldMeta.type === 'integer' ? parseInt(v) : v;
  const stringifiedDefault = (_config$fieldMeta$def = config.fieldMeta.defaultValue) === null || _config$fieldMeta$def === void 0 ? void 0 : _config$fieldMeta$def.toString();
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    defaultValue: {
      kind: 'create',
      value: (_optionsWithStringVal = optionsWithStringValues.find(x => x.value === stringifiedDefault)) !== null && _optionsWithStringVal !== void 0 ? _optionsWithStringVal : null
    },
    type: config.fieldMeta.type,
    displayMode: config.fieldMeta.displayMode,
    isRequired: config.fieldMeta.isRequired,
    options: optionsWithStringValues,
    deserialize: data => {
      for (const option of config.fieldMeta.options) {
        if (option.value === data[config.path]) {
          const stringifiedOption = {
            label: option.label,
            value: option.value.toString()
          };
          return {
            kind: 'update',
            initial: stringifiedOption,
            value: stringifiedOption
          };
        }
      }
      return {
        kind: 'update',
        initial: null,
        value: null
      };
    },
    serialize: value => {
      var _value$value$value, _value$value2;
      return {
        [config.path]: t((_value$value$value = (_value$value2 = value.value) === null || _value$value2 === void 0 ? void 0 : _value$value2.value) !== null && _value$value$value !== void 0 ? _value$value$value : null)
      };
    },
    validate: value => validate(value, config.fieldMeta.isRequired),
    filter: {
      Filter(props) {
        return core.jsx(fields.MultiSelect, {
          onChange: props.onChange,
          options: optionsWithStringValues,
          value: props.value,
          autoFocus: true
        });
      },
      graphql: _ref4 => {
        let {
          type,
          value: options
        } = _ref4;
        return {
          [config.path]: {
            [type === 'not_matches' ? 'notIn' : 'in']: options.map(x => t(x.value))
          }
        };
      },
      Label(_ref5) {
        let {
          type,
          value
        } = _ref5;
        if (!value.length) {
          return type === 'not_matches' ? `is set` : `has no value`;
        }
        if (value.length > 1) {
          const values = value.map(i => i.label).join(', ');
          return type === 'not_matches' ? `is not in [${values}]` : `is in [${values}]`;
        }
        const optionLabel = value[0].label;
        return type === 'not_matches' ? `is not ${optionLabel}` : `is ${optionLabel}`;
      },
      types: {
        matches: {
          label: 'Matches',
          initialValue: []
        },
        not_matches: {
          label: 'Does not match',
          initialValue: []
        }
      }
    }
  };
};

exports.CardValue = CardValue;
exports.Cell = Cell;
exports.Field = Field;
exports.controller = controller;
