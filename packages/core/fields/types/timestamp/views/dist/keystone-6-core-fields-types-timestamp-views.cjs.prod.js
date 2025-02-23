'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');
var core = require('@keystone-ui/core');
var fields = require('@keystone-ui/fields');
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
var dateFns = require('date-fns');
require('../../../../../admin-ui/router/dist/keystone-6-core-admin-ui-router.cjs.prod.js');
require('decimal.js');
require('@graphql-ts/schema/api-without-context');
require('@graphql-ts/schema');
require('graphql-upload/GraphQLUpload.js');
require('graphql');
require('@graphql-ts/extend');
require('@graphql-ts/schema/api-with-context');

const FULL_TIME_PATTERN = 'HH:mm:ss.SSS';
function formatFullTime(date) {
  return dateFns.format(date, FULL_TIME_PATTERN);
}
function formatTime(time) {
  const date = dateFns.parse(time, FULL_TIME_PATTERN, new Date());
  if (date.getMilliseconds() !== 0) {
    return dateFns.format(date, FULL_TIME_PATTERN);
  }
  if (date.getSeconds() !== 0) {
    return dateFns.format(date, 'HH:mm:ss');
  }
  return dateFns.format(date, 'HH:mm');
}
function parseTime(time) {
  for (const pattern of ['H:m:s.SSS', 'H:m:s', 'H:m', 'H']) {
    const parsed = dateFns.parse(time, pattern, new Date());
    if (dateFns.isValid(parsed)) {
      return dateFns.format(parsed, FULL_TIME_PATTERN);
    }
  }
  return undefined;
}
function constructTimestamp(_ref) {
  let {
    dateValue,
    timeValue
  } = _ref;
  return new Date(`${dateValue}T${timeValue}`).toISOString();
}
function deconstructTimestamp(value) {
  return {
    dateValue: dateFns.formatISO(new Date(value), {
      representation: 'date'
    }),
    timeValue: {
      kind: 'parsed',
      value: formatFullTime(new Date(value))
    }
  };
}
function formatOutput(value) {
  if (!value) return '';
  const date = new Date(value);
  return date.toLocaleString();
}

const Field = _ref => {
  var _value$value$dateValu, _field$fieldMeta$defa;
  let {
    field,
    value,
    onChange,
    forceValidation
  } = _ref;
  const [touchedFirstInput, setTouchedFirstInput] = React.useState(false);
  const [touchedSecondInput, setTouchedSecondInput] = React.useState(false);
  const showValidation = touchedFirstInput && touchedSecondInput || forceValidation;
  const validationMessages = showValidation ? validate(value, field.fieldMeta, field.label) : undefined;
  const timeInputProps = utils.useFormattedInput({
    format(_ref2) {
      let {
        value
      } = _ref2;
      if (value === null) {
        return '';
      }
      return formatTime(value);
    },
    parse(value) {
      value = value.trim();
      if (value === '') {
        return {
          kind: 'parsed',
          value: null
        };
      }
      const parsed = parseTime(value);
      if (parsed !== undefined) {
        return {
          kind: 'parsed',
          value: parsed
        };
      }
      return value;
    }
  }, {
    value: value.value.timeValue,
    onChange(timeValue) {
      onChange === null || onChange === void 0 ? void 0 : onChange({
        ...value,
        value: {
          ...value.value,
          timeValue
        }
      });
    },
    onBlur() {
      setTouchedSecondInput(true);
    }
  });
  return core.jsx(fields.FieldContainer, {
    as: "fieldset"
  }, core.jsx(core.Stack, null, core.jsx(fields.FieldLabel, {
    as: "legend"
  }, field.label), core.jsx(fields.FieldDescription, {
    id: `${field.path}-description`
  }, field.description), onChange ? core.jsx(core.Inline, {
    gap: "small"
  }, core.jsx(core.Stack, null, core.jsx(fields.DatePicker, {
    onUpdate: date => {
      onChange({
        ...value,
        value: {
          dateValue: date,
          timeValue: typeof value.value.timeValue === 'object' && value.value.timeValue.value === null ? {
            kind: 'parsed',
            value: '00:00:00.000'
          } : value.value.timeValue
        }
      });
    },
    onClear: () => {
      onChange({
        ...value,
        value: {
          ...value.value,
          dateValue: null
        }
      });
    },
    onBlur: () => setTouchedFirstInput(true),
    value: (_value$value$dateValu = value.value.dateValue) !== null && _value$value$dateValu !== void 0 ? _value$value$dateValu : ''
  }), (validationMessages === null || validationMessages === void 0 ? void 0 : validationMessages.date) && core.jsx(core.Text, {
    color: "red600",
    size: "small"
  }, validationMessages.date)), core.jsx(core.Stack, null, core.jsx(core.VisuallyHidden, {
    as: "label",
    htmlFor: `${field.path}--time-input`
  }, `${field.label} time field`), core.jsx(fields.TextInput, _extends({
    id: `${field.path}--time-input`
  }, timeInputProps, {
    "aria-describedby": field.description === null ? undefined : `${field.path}-description`,
    disabled: onChange === undefined,
    placeholder: "00:00"
  })), (validationMessages === null || validationMessages === void 0 ? void 0 : validationMessages.time) && core.jsx(core.Text, {
    color: "red600",
    size: "small"
  }, validationMessages.time))) : value.value.dateValue !== null && typeof value.value.timeValue === 'object' && value.value.timeValue.value !== null && core.jsx(core.Text, null, formatOutput(constructTimestamp({
    dateValue: value.value.dateValue,
    timeValue: value.value.timeValue.value
  }))), (value.kind === 'create' && typeof field.fieldMeta.defaultValue !== 'string' && ((_field$fieldMeta$defa = field.fieldMeta.defaultValue) === null || _field$fieldMeta$defa === void 0 ? void 0 : _field$fieldMeta$defa.kind) === 'now' || field.fieldMeta.updatedAt) && core.jsx(core.Text, null, "When this item is saved, this field will be set to the current date and time")));
};
function validate(value, fieldMeta, label) {
  var _fieldMeta$defaultVal;
  const val = value.value;
  const hasDateValue = val.dateValue !== null;
  const hasTimeValue = typeof val.timeValue === 'string' || typeof val.timeValue.value === 'string';
  const isValueEmpty = !hasDateValue && !hasTimeValue;
  // if we recieve null initially on the item view and the current value is null,
  // we should always allow saving it because:
  // - the value might be null in the database and we don't want to prevent saving the whole item because of that
  // - we might have null because of an access control error
  if (value.kind === 'update' && value.initial === null && isValueEmpty) {
    return undefined;
  }
  if (value.kind === 'create' && isValueEmpty && (typeof fieldMeta.defaultValue === 'object' && ((_fieldMeta$defaultVal = fieldMeta.defaultValue) === null || _fieldMeta$defaultVal === void 0 ? void 0 : _fieldMeta$defaultVal.kind) === 'now' || fieldMeta.updatedAt)) {
    return undefined;
  }
  if (fieldMeta.isRequired && isValueEmpty) {
    return {
      date: `${label} is required`
    };
  }
  if (hasDateValue && !hasTimeValue) {
    return {
      time: `${label} requires a time to be provided`
    };
  }
  const timeError = typeof val.timeValue === 'string' ? `${label} requires a valid time in the format hh:mm` : undefined;
  if (hasTimeValue && !hasDateValue) {
    return {
      date: `${label} requires a date to be selected`,
      time: timeError
    };
  }
  if (timeError) {
    return {
      time: timeError
    };
  }
  return undefined;
}
const Cell = _ref3 => {
  let {
    item,
    field,
    linkTo
  } = _ref3;
  let value = item[field.path];
  return linkTo ? core.jsx(CellLink.CellLink, linkTo, formatOutput(value)) : core.jsx(CellContainer.CellContainer, null, formatOutput(value));
};
Cell.supportsLinkTo = true;
const CardValue = _ref4 => {
  let {
    item,
    field
  } = _ref4;
  return core.jsx(fields.FieldContainer, null, core.jsx(fields.FieldLabel, null, field.label), formatOutput(item[field.path]));
};
const controller = config => {
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    fieldMeta: config.fieldMeta,
    defaultValue: {
      kind: 'create',
      value: typeof config.fieldMeta.defaultValue === 'string' ? deconstructTimestamp(config.fieldMeta.defaultValue) : {
        dateValue: null,
        timeValue: {
          kind: 'parsed',
          value: null
        }
      }
    },
    deserialize: data => {
      const value = data[config.path];
      return {
        kind: 'update',
        initial: data[config.path],
        value: value ? deconstructTimestamp(value) : {
          dateValue: null,
          timeValue: {
            kind: 'parsed',
            value: null
          }
        }
      };
    },
    serialize: _ref5 => {
      let {
        value: {
          dateValue,
          timeValue
        }
      } = _ref5;
      if (dateValue && typeof timeValue === 'object' && timeValue.value !== null) {
        let formattedDate = constructTimestamp({
          dateValue,
          timeValue: timeValue.value
        });
        return {
          [config.path]: formattedDate
        };
      }
      return {
        [config.path]: null
      };
    },
    validate: value => validate(value, config.fieldMeta, config.label) === undefined
  };
};

exports.CardValue = CardValue;
exports.Cell = Cell;
exports.Field = Field;
exports.controller = controller;
