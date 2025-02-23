'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var core = require('@keystone-ui/core');
var fields = require('@keystone-ui/fields');
var React = require('react');
var CellContainer = require('../../../../../dist/CellContainer-e370d64d.cjs.prod.js');
var CellLink = require('../../../../../dist/CellLink-10f89ceb.cjs.prod.js');
require('@babel/runtime/helpers/defineProperty');
require('@keystone-ui/button');
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
require('next/router');
require('@keystone-ui/popover');
require('@keystone-ui/icons/icons/MoreHorizontalIcon');
require('@keystone-ui/icons/icons/ChevronRightIcon');
require('next/head');
require('../../../../../dist/SignoutButton-9832e663.cjs.prod.js');
require('../../../../../dist/Fields-f6e48bac.cjs.prod.js');
require('fast-deep-equal');
require('@keystone-ui/notice');
var utils = require('../../../../../dist/utils-7e63b2a9.cjs.prod.js');
require('../../../../../admin-ui/router/dist/keystone-6-core-admin-ui-router.cjs.prod.js');
require('decimal.js');
require('@graphql-ts/schema/api-without-context');
require('@graphql-ts/schema');
require('graphql-upload/GraphQLUpload.js');
require('graphql');
require('@graphql-ts/extend');
require('@graphql-ts/schema/api-with-context');

function validate(value, validation, label) {
  const val = value.value;

  // if we recieve null initially on the item view and the current value is null,
  // we should always allow saving it because:
  // - the value might be null in the database and we don't want to prevent saving the whole item because of that
  // - we might have null because of an access control error
  if (value.kind === 'update' && value.initial === null && val === null) {
    return undefined;
  }
  if (value.kind === 'create' && value.value === null) {
    return undefined;
  }
  if (validation.isRequired && val === null) {
    return `${label} is required`;
  }

  // we don't parse infinite numbers into +-Infinity/NaN so that we don't lose the text that the user wrote
  // so we need to try parsing it again here to provide good messages
  if (typeof val === 'string') {
    const number = parseFloat(val);
    if (isNaN(number)) {
      return `${label} must be a number`;
    }
    return `${label} must be finite`;
  }
  if (typeof val === 'number') {
    if (typeof (validation === null || validation === void 0 ? void 0 : validation.min) === 'number' && val < validation.min) {
      return `${label} must be greater than or equal to ${validation.min}`;
    }
    if (typeof (validation === null || validation === void 0 ? void 0 : validation.max) === 'number' && val > (validation === null || validation === void 0 ? void 0 : validation.max)) {
      return `${label} must be less than or equal to ${validation.max}`;
    }
  }
  return undefined;
}
function FloatInput(_ref) {
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
      let parsed = parseFloat(raw);
      if (Number.isFinite(parsed)) {
        return parsed;
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
  const message = validate(value, field.validation, field.label);
  return core.jsx(fields.FieldContainer, null, core.jsx(fields.FieldLabel, {
    htmlFor: field.path
  }, field.label), core.jsx(fields.FieldDescription, {
    id: `${field.path}-description`
  }, field.description), onChange ? core.jsx("span", null, core.jsx(FloatInput, {
    id: field.path,
    autoFocus: autoFocus,
    onChange: val => {
      onChange({
        ...value,
        value: val
      });
    },
    "aria-describedby": field.description === null ? undefined : `${field.path}-description`,
    value: value.value,
    forceValidation: forceValidation,
    validationMessage: message
  })) : value.value);
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
  return core.jsx(fields.FieldContainer, null, core.jsx(fields.FieldLabel, null, field.label), item[field.path]);
};
const controller = config => {
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    validation: config.fieldMeta.validation,
    defaultValue: {
      kind: 'create',
      value: config.fieldMeta.defaultValue
    },
    deserialize: data => ({
      kind: 'update',
      initial: data[config.path],
      value: data[config.path]
    }),
    serialize: value => ({
      [config.path]: value.value
    }),
    validate: value => validate(value, config.fieldMeta.validation, config.label) === undefined,
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
              onChange(event.target.value.replace(/[^\d\.,\s-]/g, ''));
              return;
            }
            onChange(event.target.value.replace(/[^\d\.\s-]/g, ''));
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
        const parsed = type === 'in' || type === 'not_in' ? valueWithoutWhitespace.split(',').map(x => parseFloat(x)) : parseFloat(valueWithoutWhitespace);
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
