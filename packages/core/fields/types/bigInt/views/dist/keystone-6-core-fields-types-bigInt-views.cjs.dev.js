'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var core = require('@keystone-ui/core');
var fields = require('@keystone-ui/fields');
var React = require('react');
var CellContainer = require('../../../../../dist/CellContainer-524f7ad6.cjs.dev.js');
var CellLink = require('../../../../../dist/CellLink-eaa8183d.cjs.dev.js');
require('@babel/runtime/helpers/defineProperty');
require('@keystone-ui/button');
require('@keystone-ui/icons/icons/AlertTriangleIcon');
require('next/link');
require('@keystone-ui/toast');
require('@keystone-ui/loading');
require('@keystone-ui/modals');
require('apollo-upload-client');
require('@emotion/hash');
require('../../../../../dist/next-fields-bc22e620.cjs.dev.js');
require('../../../../../dist/graphql-ts-schema-db7cad71.cjs.dev.js');
require('@apollo/client');
require('../../../../../dist/admin-meta-graphql-2063c7b9.cjs.dev.js');
require('next/router');
require('@keystone-ui/popover');
require('@keystone-ui/icons/icons/MoreHorizontalIcon');
require('@keystone-ui/icons/icons/ChevronRightIcon');
require('next/head');
require('../../../../../dist/SignoutButton-94652c56.cjs.dev.js');
require('../../../../../dist/Fields-2c77f94f.cjs.dev.js');
require('fast-deep-equal');
require('@keystone-ui/notice');
var utils = require('../../../../../dist/utils-2a3e8185.cjs.dev.js');
require('../../../../../admin-ui/router/dist/keystone-6-core-admin-ui-router.cjs.dev.js');
require('decimal.js');
require('@graphql-ts/schema/api-without-context');
require('@graphql-ts/schema');
require('graphql-upload/GraphQLUpload.js');
require('graphql');
require('@graphql-ts/extend');
require('@graphql-ts/schema/api-with-context');

function BigIntInput(_ref) {
  let {
    value,
    onChange,
    id,
    autoFocus,
    forceValidation,
    validationMessage,
    placeholder
  } = _ref;
  const [hasBlurred, setHasBlurred] = React.useState(false);
  const props = utils.useFormattedInput({
    format: value => value === null ? '' : value.toString(),
    parse: raw => {
      raw = raw.trim();
      if (raw === '') {
        return null;
      }
      if (/^[+-]?\d+$/.test(raw)) {
        try {
          return BigInt(raw);
        } catch {
          return raw;
        }
      }
      return raw;
    }
  }, {
    value,
    onChange,
    onBlur: () => {
      setHasBlurred(true);
    }
  });
  return core.jsx("span", null, core.jsx(fields.TextInput, _extends({
    placeholder: placeholder,
    id: id,
    autoFocus: autoFocus,
    inputMode: "numeric"
  }, props)), (hasBlurred || forceValidation) && validationMessage && core.jsx("span", {
    css: {
      color: 'red'
    }
  }, validationMessage));
}
const Field = _ref2 => {
  let {
    field,
    value,
    onChange,
    autoFocus,
    forceValidation
  } = _ref2;
  const message = validate(value, field.validation, field.label, field.hasAutoIncrementDefault);
  return core.jsx(fields.FieldContainer, null, core.jsx(fields.FieldLabel, {
    htmlFor: field.path
  }, field.label), core.jsx(fields.FieldDescription, {
    id: `${field.path}-description`
  }, field.description), onChange ? core.jsx("span", null, core.jsx(BigIntInput, {
    id: field.path,
    autoFocus: autoFocus,
    onChange: val => {
      onChange({
        ...value,
        value: val
      });
    },
    value: value.value,
    forceValidation: forceValidation,
    placeholder: field.hasAutoIncrementDefault && value.kind === 'create' ? 'Defaults to an incremented number' : undefined,
    validationMessage: message,
    "aria-describedby": field.description === null ? undefined : `${field.path}-description`
  })) : value.value === null ? 'null' : value.value.toString());
};
const Cell = _ref3 => {
  let {
    item,
    field,
    linkTo
  } = _ref3;
  let value = item[field.path] + '';
  return linkTo ? core.jsx(CellLink.CellLink, linkTo, value) : core.jsx(CellContainer.CellContainer, null, value);
};
Cell.supportsLinkTo = true;
const CardValue = _ref4 => {
  let {
    item,
    field
  } = _ref4;
  return core.jsx(fields.FieldContainer, null, core.jsx(fields.FieldLabel, null, field.label), item[field.path] === null ? '' : item[field.path]);
};
function validate(state, validation, label, hasAutoIncrementDefault) {
  const {
    kind,
    value
  } = state;
  if (typeof value === 'string') {
    return `${label} must be a BigInt`;
  }

  // if we receive null initially on the item view and the current value is null,
  // we should always allow saving it because:
  // - the value might be null in the database and we don't want to prevent saving the whole item because of that
  // - we might have null because of an access control error
  if (kind === 'update' && state.initial === null && value === null) {
    return undefined;
  }
  if (kind === 'create' && value === null && hasAutoIncrementDefault) {
    return undefined;
  }
  if (validation.isRequired && value === null) {
    return `${label} is required`;
  }
  if (typeof value === 'bigint') {
    if (value < validation.min) {
      return `${label} must be greater than or equal to ${validation.min}`;
    }
    if (value > validation.max) {
      return `${label} must be less than or equal to ${validation.max}`;
    }
  }
  return undefined;
}
const controller = config => {
  var _config$fieldMeta$def;
  const hasAutoIncrementDefault = typeof config.fieldMeta.defaultValue === 'object' && ((_config$fieldMeta$def = config.fieldMeta.defaultValue) === null || _config$fieldMeta$def === void 0 ? void 0 : _config$fieldMeta$def.kind) === 'autoincrement';
  const validation = {
    isRequired: config.fieldMeta.validation.isRequired,
    min: BigInt(config.fieldMeta.validation.min),
    max: BigInt(config.fieldMeta.validation.max)
  };
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    validation,
    defaultValue: {
      kind: 'create',
      value: typeof config.fieldMeta.defaultValue === 'string' ? BigInt(config.fieldMeta.defaultValue) : null
    },
    deserialize: data => {
      const raw = data[config.path];
      return {
        kind: 'update',
        value: raw === null ? null : BigInt(raw),
        initial: raw
      };
    },
    serialize: value => ({
      [config.path]: value.value === null ? null : value.value.toString()
    }),
    hasAutoIncrementDefault,
    validate: value => validate(value, validation, config.label, hasAutoIncrementDefault) === undefined,
    filter: {
      Filter(_ref5) {
        let {
          autoFocus,
          type,
          onChange,
          value
        } = _ref5;
        return core.jsx(fields.TextInput, {
          onChange: event => {
            if (type === 'in' || type === 'not_in') {
              onChange(event.target.value.replace(/[^\d,\s-]/g, ''));
              return;
            }
            onChange(event.target.value.replace(/[^\d\s-]/g, ''));
          },
          value: value,
          autoFocus: autoFocus
        });
      },
      graphql: _ref6 => {
        let {
          type,
          value
        } = _ref6;
        const valueWithoutWhitespace = value.replace(/\s/g, '');
        const parsed = type === 'in' || type === 'not_in' ? valueWithoutWhitespace.split(',') : valueWithoutWhitespace;
        if (type === 'not') {
          return {
            [config.path]: {
              not: {
                equals: parsed
              }
            }
          };
        }
        const key = type === 'is' ? 'equals' : type === 'not_in' ? 'notIn' : type;
        return {
          [config.path]: {
            [key]: parsed
          }
        };
      },
      Label(_ref7) {
        let {
          label,
          value,
          type
        } = _ref7;
        let renderedValue = value;
        if (['in', 'not_in'].includes(type)) {
          renderedValue = value.split(',').map(value => value.trim()).join(', ');
        }
        return `${label.toLowerCase()}: ${renderedValue}`;
      },
      types: {
        is: {
          label: 'Is exactly',
          initialValue: ''
        },
        not: {
          label: 'Is not exactly',
          initialValue: ''
        },
        gt: {
          label: 'Is greater than',
          initialValue: ''
        },
        lt: {
          label: 'Is less than',
          initialValue: ''
        },
        gte: {
          label: 'Is greater than or equal to',
          initialValue: ''
        },
        lte: {
          label: 'Is less than or equal to',
          initialValue: ''
        },
        in: {
          label: 'Is one of',
          initialValue: ''
        },
        not_in: {
          label: 'Is not one of',
          initialValue: ''
        }
      }
    }
  };
};

exports.CardValue = CardValue;
exports.Cell = Cell;
exports.Field = Field;
exports.controller = controller;
