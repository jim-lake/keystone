import _extends from '@babel/runtime/helpers/esm/extends';
import { jsx } from '@keystone-ui/core';
import { FieldContainer, FieldLabel, FieldDescription, TextInput } from '@keystone-ui/fields';
import { Decimal } from 'decimal.js';
import { useState } from 'react';
import { C as CellContainer } from '../../../../../dist/CellContainer-8cce1185.esm.js';
import { C as CellLink } from '../../../../../dist/CellLink-c169ac58.esm.js';
import '@babel/runtime/helpers/defineProperty';
import '@keystone-ui/button';
import '@keystone-ui/icons/icons/AlertTriangleIcon';
import 'next/link';
import '@keystone-ui/toast';
import '@keystone-ui/loading';
import '@keystone-ui/modals';
import 'apollo-upload-client';
import '@emotion/hash';
import '../../../../../dist/next-fields-34f831a7.esm.js';
import '../../../../../dist/graphql-ts-schema-9020a95a.esm.js';
import '@apollo/client';
import '../../../../../dist/admin-meta-graphql-75e8cfcb.esm.js';
import 'next/router';
import '@keystone-ui/popover';
import '@keystone-ui/icons/icons/MoreHorizontalIcon';
import '@keystone-ui/icons/icons/ChevronRightIcon';
import 'next/head';
import '../../../../../dist/SignoutButton-ef277bf5.esm.js';
import '../../../../../dist/Fields-6156179c.esm.js';
import 'fast-deep-equal';
import '@keystone-ui/notice';
import { u as useFormattedInput } from '../../../../../dist/utils-a1d22085.esm.js';
import '../../../../../admin-ui/router/dist/keystone-6-core-admin-ui-router.esm.js';
import '@graphql-ts/schema/api-without-context';
import '@graphql-ts/schema';
import 'graphql-upload/GraphQLUpload.js';
import 'graphql';
import '@graphql-ts/extend';
import '@graphql-ts/schema/api-with-context';

const Field = _ref => {
  var _value$value;
  let {
    field,
    value,
    onChange,
    autoFocus,
    forceValidation
  } = _ref;
  const [hasBlurred, setHasBlurred] = useState(false);
  const inputProps = useFormattedInput({
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
        decimal = new Decimal(value);
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
  return jsx(FieldContainer, null, jsx(FieldLabel, {
    htmlFor: field.path
  }, field.label), jsx(FieldDescription, {
    id: `${field.path}-description`
  }, field.description), onChange ? jsx(TextInput, _extends({
    id: field.path,
    autoFocus: autoFocus
  }, inputProps, {
    "aria-describedby": field.description === null ? undefined : `${field.path}-description`
  })) : (_value$value = value.value) === null || _value$value === void 0 ? void 0 : _value$value.toString(), (hasBlurred || forceValidation) && validationMessage && jsx("span", {
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
  return linkTo ? jsx(CellLink, linkTo, value) : jsx(CellContainer, null, value);
};
Cell.supportsLinkTo = true;
const CardValue = _ref3 => {
  let {
    item,
    field
  } = _ref3;
  return jsx(FieldContainer, null, jsx(FieldLabel, null, field.label), item[field.path]);
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
    max: _validation.max === null ? null : new Decimal(_validation.max),
    min: _validation.min === null ? null : new Decimal(_validation.min)
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
      value: config.fieldMeta.defaultValue === null ? null : new Decimal(config.fieldMeta.defaultValue)
    },
    deserialize: data => {
      const value = data[config.path] === null ? null : new Decimal(data[config.path]);
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
        return jsx(TextInput, {
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

export { CardValue, Cell, Field, controller };
