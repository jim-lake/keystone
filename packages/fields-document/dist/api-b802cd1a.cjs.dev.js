'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var core$1 = require('@keystone-6/core');
var core = require('@keystone-ui/core');
var fields$1 = require('@keystone-ui/fields');
var React = require('react');
var sanitizeUrl = require('@braintree/sanitize-url');

function isValidURL(url) {
  return url === sanitizeUrl.sanitizeUrl(url);
}

// this is written like this rather than ArrayField<ComponentSchema> to avoid TypeScript erroring about circularity

// this is written like this rather than ArrayField<ComponentSchemaForGraphQL> to avoid TypeScript erroring about circularity

const fields = {
  text(_ref) {
    let {
      label,
      defaultValue = ''
    } = _ref;
    return {
      kind: 'form',
      Input(_ref2) {
        let {
          value,
          onChange,
          autoFocus
        } = _ref2;
        return core.jsx(fields$1.FieldContainer, null, core.jsx(fields$1.FieldLabel, null, label), core.jsx(fields$1.TextInput, {
          autoFocus: autoFocus,
          value: value,
          onChange: event => {
            onChange(event.target.value);
          }
        }));
      },
      options: undefined,
      defaultValue,
      validate(value) {
        return typeof value === 'string';
      },
      graphql: {
        input: core$1.graphql.String,
        output: core$1.graphql.field({
          type: core$1.graphql.String
        })
      }
    };
  },
  integer(_ref3) {
    let {
      label,
      defaultValue = 0
    } = _ref3;
    const validate = value => {
      return typeof value === 'number' && Number.isFinite(value);
    };
    return {
      kind: 'form',
      Input(_ref4) {
        let {
          value,
          onChange,
          autoFocus,
          forceValidation
        } = _ref4;
        const [blurred, setBlurred] = React.useState(false);
        const [inputValue, setInputValue] = React.useState(String(value));
        const showValidation = forceValidation || blurred && !validate(value);
        return core.jsx(fields$1.FieldContainer, null, core.jsx(fields$1.FieldLabel, null, label), core.jsx(fields$1.TextInput, {
          onBlur: () => setBlurred(true),
          autoFocus: autoFocus,
          value: inputValue,
          onChange: event => {
            const raw = event.target.value;
            setInputValue(raw);
            if (/^[+-]?\d+$/.test(raw)) {
              onChange(Number(raw));
            } else {
              onChange(NaN);
            }
          }
        }), showValidation && core.jsx("span", {
          css: {
            color: 'red'
          }
        }, "Please specify an integer"));
      },
      options: undefined,
      defaultValue,
      validate,
      graphql: {
        input: core$1.graphql.Int,
        output: core$1.graphql.field({
          type: core$1.graphql.Int
        })
      }
    };
  },
  url(_ref5) {
    let {
      label,
      defaultValue = ''
    } = _ref5;
    const validate = value => {
      return typeof value === 'string' && (value === '' || isValidURL(value));
    };
    return {
      kind: 'form',
      Input(_ref6) {
        let {
          value,
          onChange,
          autoFocus,
          forceValidation
        } = _ref6;
        const [blurred, setBlurred] = React.useState(false);
        const showValidation = forceValidation || blurred && !validate(value);
        return core.jsx(fields$1.FieldContainer, null, core.jsx(fields$1.FieldLabel, null, label), core.jsx(fields$1.TextInput, {
          onBlur: () => setBlurred(true),
          autoFocus: autoFocus,
          value: value,
          onChange: event => {
            onChange(event.target.value);
          }
        }), showValidation && core.jsx("span", {
          css: {
            color: 'red'
          }
        }, "Please provide a valid URL"));
      },
      options: undefined,
      defaultValue,
      validate,
      graphql: {
        input: core$1.graphql.String,
        output: core$1.graphql.field({
          type: core$1.graphql.String
        })
      }
    };
  },
  select(_ref7) {
    let {
      label,
      options,
      defaultValue
    } = _ref7;
    const optionValuesSet = new Set(options.map(x => x.value));
    if (!optionValuesSet.has(defaultValue)) {
      throw new Error(`A defaultValue of ${defaultValue} was provided to a select field but it does not match the value of one of the options provided`);
    }
    return {
      kind: 'form',
      Input(_ref8) {
        let {
          value,
          onChange,
          autoFocus
        } = _ref8;
        return core.jsx(fields$1.FieldContainer, null, core.jsx(fields$1.FieldLabel, null, label), core.jsx(fields$1.Select, {
          autoFocus: autoFocus,
          value: options.find(option => option.value === value) || null,
          onChange: option => {
            if (option) {
              onChange(option.value);
            }
          },
          options: options
        }));
      },
      options,
      defaultValue,
      validate(value) {
        return typeof value === 'string' && optionValuesSet.has(value);
      },
      graphql: {
        input: core$1.graphql.String,
        output: core$1.graphql.field({
          type: core$1.graphql.String,
          // TODO: investigate why this resolve is required here
          resolve(_ref9) {
            let {
              value
            } = _ref9;
            return value;
          }
        })
      }
    };
  },
  multiselect(_ref10) {
    let {
      label,
      options,
      defaultValue
    } = _ref10;
    const valuesToOption = new Map(options.map(x => [x.value, x]));
    return {
      kind: 'form',
      Input(_ref11) {
        let {
          value,
          onChange,
          autoFocus
        } = _ref11;
        return core.jsx(fields$1.FieldContainer, null, core.jsx(fields$1.FieldLabel, null, label), core.jsx(fields$1.MultiSelect, {
          autoFocus: autoFocus,
          value: value.map(x => valuesToOption.get(x)),
          options: options,
          onChange: options => {
            onChange(options.map(x => x.value));
          }
        }));
      },
      options,
      defaultValue,
      validate(value) {
        return Array.isArray(value) && value.every(value => typeof value === 'string' && valuesToOption.has(value));
      },
      graphql: {
        input: core$1.graphql.list(core$1.graphql.nonNull(core$1.graphql.String)),
        output: core$1.graphql.field({
          type: core$1.graphql.list(core$1.graphql.nonNull(core$1.graphql.String)),
          // TODO: investigate why this resolve is required here
          resolve(_ref12) {
            let {
              value
            } = _ref12;
            return value;
          }
        })
      }
    };
  },
  checkbox(_ref13) {
    let {
      label,
      defaultValue = false
    } = _ref13;
    return {
      kind: 'form',
      Input(_ref14) {
        let {
          value,
          onChange,
          autoFocus
        } = _ref14;
        return core.jsx(fields$1.FieldContainer, null, core.jsx(fields$1.Checkbox, {
          checked: value,
          autoFocus: autoFocus,
          onChange: event => {
            onChange(event.target.checked);
          }
        }, label));
      },
      options: undefined,
      defaultValue,
      validate(value) {
        return typeof value === 'boolean';
      },
      graphql: {
        input: core$1.graphql.Boolean,
        output: core$1.graphql.field({
          type: core$1.graphql.Boolean
        })
      }
    };
  },
  empty() {
    return {
      kind: 'form',
      Input() {
        return null;
      },
      options: undefined,
      defaultValue: null,
      validate(value) {
        return value === null || value === undefined;
      }
    };
  },
  child(options) {
    return {
      kind: 'child',
      options: options.kind === 'block' ? {
        kind: 'block',
        placeholder: options.placeholder,
        dividers: options.dividers,
        formatting: options.formatting === 'inherit' ? {
          blockTypes: 'inherit',
          headingLevels: 'inherit',
          inlineMarks: 'inherit',
          listTypes: 'inherit',
          alignment: 'inherit',
          softBreaks: 'inherit'
        } : options.formatting,
        links: options.links,
        relationships: options.relationships
      } : {
        kind: 'inline',
        placeholder: options.placeholder,
        formatting: options.formatting === 'inherit' ? {
          inlineMarks: 'inherit',
          softBreaks: 'inherit'
        } : options.formatting,
        links: options.links,
        relationships: options.relationships
      }
    };
  },
  object(fields) {
    return {
      kind: 'object',
      fields
    };
  },
  conditional(discriminant, values) {
    if ((discriminant.validate('true') || discriminant.validate('false')) && (discriminant.validate(true) || discriminant.validate(false))) {
      throw new Error('The discriminant of a conditional field only supports string values, or boolean values, not both.');
    }
    return {
      kind: 'conditional',
      discriminant,
      values: values
    };
  },
  relationship(_ref15) {
    let {
      listKey,
      selection,
      label,
      many
    } = _ref15;
    return {
      kind: 'relationship',
      listKey,
      selection,
      label,
      many: many ? true : false
    };
  },
  array(element, opts) {
    return {
      kind: 'array',
      element,
      itemLabel: opts === null || opts === void 0 ? void 0 : opts.itemLabel,
      label: opts === null || opts === void 0 ? void 0 : opts.label
    };
  }
};

// this is a separate type so that this is distributive

function component(options) {
  return options;
}
const NotEditable = _ref16 => {
  let {
    children,
    ...props
  } = _ref16;
  return core.jsx("span", _extends({
    css: {
      userSelect: 'none'
    },
    contentEditable: false
  }, props), children);
};

exports.NotEditable = NotEditable;
exports.component = component;
exports.fields = fields;
exports.isValidURL = isValidURL;
