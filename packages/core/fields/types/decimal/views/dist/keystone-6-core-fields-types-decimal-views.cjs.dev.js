'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var core = require('@keystone-ui/core');
var fields = require('@keystone-ui/fields');
var Decimal = require('decimal.js');
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
require('@graphql-ts/schema/api-without-context');
require('@graphql-ts/schema');
require('graphql-upload/GraphQLUpload.js');
require('graphql');
require('@graphql-ts/extend');
require('@graphql-ts/schema/api-with-context');

const Field = _ref => {
  var _value$value;
  let {
    field,
    value,
    onChange,
    autoFocus,
    forceValidation
  } = _ref;
  const [hasBlurred, setHasBlurred] = React.useState(false);
  const inputProps = utils.useFormattedInput({
    format(decimal) {
      if (decimal === null) {
        return '';
      }
      return decimal.toFixed(field.scale);
    },
    parse(value) {
      value = value.trim();
      if (value === '') {
        return null;
      }
      let decimal;
      try {
        decimal = new Decimal.Decimal(value);
      } catch (err) {
        return value;
      }
      return decimal;
    }
  }, {
    onChange(val) {
      onChange === null || onChange === void 0 ? void 0 : onChange({
        ...value,
        value: val
      });
    },
    value: value.value,
    onBlur() {
      setHasBlurred(true);
    }
  });
  const validationMessage = validate(value, field.validation, field.label);
  return core.jsx(fields.FieldContainer, null, core.jsx(fields.FieldLabel, {
    htmlFor: field.path
  }, field.label), core.jsx(fields.FieldDescription, {
    id: `${field.path}-description`
  }, field.description), onChange ? core.jsx(fields.TextInput, _extends({
    id: field.path,
    autoFocus: autoFocus
  }, inputProps, {
    "aria-describedby": field.description === null ? undefined : `${field.path}-description`
  })) : (_value$value = value.value) === null || _value$value === void 0 ? void 0 : _value$value.toString(), (hasBlurred || forceValidation) && validationMessage && core.jsx("span", {
    css: {
      color: 'red'
    }
  }, validationMessage));
};
const Cell = _ref2 => {
  let {
    item,
    field,
    linkTo
  } = _ref2;
  let value = item[field.path] || '';
  return linkTo ? core.jsx(CellLink.CellLink, linkTo, value) : core.jsx(CellContainer.CellContainer, null, value);
};
Cell.supportsLinkTo = true;
const CardValue = _ref3 => {
  let {
    item,
    field
  } = _ref3;
  return core.jsx(fields.FieldContainer, null, core.jsx(fields.FieldLabel, null, field.label), item[field.path]);
};
function validate(value, validation, label) {
  const val = value.value;
  if (typeof val === 'string') {
    return `${label} must be a number`;
  }

  // if we recieve null initially on the item view and the current value is null,
  // we should always allow saving it because:
  // - the value might be null in the database and we don't want to prevent saving the whole item because of that
  // - we might have null because of an access control error
  if (value.kind === 'update' && value.initial === null && val === null) {
    return undefined;
  }
  if (val !== null && !val.isFinite()) {
    return `${label} must be finite`;
  }
  if (validation.isRequired && val === null) {
    return `${label} is required`;
  }
  if (val !== null) {
    if (validation.min !== null && val.lessThan(validation.min)) {
      return `${label} must be greater than or equal to ${validation.min}`;
    }
    if (validation.max !== null && val.greaterThan(validation.max)) {
      return `${label} must be less than or equal to ${validation.max}`;
    }
  }
  return undefined;
}
const controller = config => {
  const _validation = config.fieldMeta.validation;
  const validation = {
    isRequired: _validation.isRequired,
    max: _validation.max === null ? null : new Decimal.Decimal(_validation.max),
    min: _validation.min === null ? null : new Decimal.Decimal(_validation.min)
  };
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    scale: config.fieldMeta.scale,
    validation,
    defaultValue: {
      kind: 'create',
      value: config.fieldMeta.defaultValue === null ? null : new Decimal.Decimal(config.fieldMeta.defaultValue)
    },
    deserialize: data => {
      const value = data[config.path] === null ? null : new Decimal.Decimal(data[config.path]);
      return {
        kind: 'update',
        initial: value,
        value
      };
    },
    serialize: value => ({
      [config.path]: value.value === null ? null : typeof value.value === 'string' ? value.value : value.value.toFixed(config.fieldMeta.scale)
    }),
    validate: val => validate(val, validation, config.label) === undefined,
    filter: {
      Filter(_ref4) {
        let {
          autoFocus,
          type,
          onChange,
          value
        } = _ref4;
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
      graphql: _ref5 => {
        let {
          type,
          value
        } = _ref5;
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
      Label(_ref6) {
        let {
          label,
          value,
          type
        } = _ref6;
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
