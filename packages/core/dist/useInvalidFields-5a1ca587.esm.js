import { useMemo } from 'react';
import isDeepEqual from 'fast-deep-equal';
import { g as getRootGraphQLFieldsFromFieldController } from './getRootGraphQLFieldsFromFieldController-11021ec8.esm.js';

function deserializeValue(fields, itemGetter) {
  const value = {};
  Object.keys(fields).forEach(fieldKey => {
    const field = fields[fieldKey];
    const itemForField = {};
    const errors = new Set();
    for (const graphqlField of getRootGraphQLFieldsFromFieldController(field.controller)) {
      const fieldGetter = itemGetter.get(graphqlField);
      if (fieldGetter.errors) {
        fieldGetter.errors.forEach(error => {
          errors.add(error);
        });
      }
      itemForField[graphqlField] = fieldGetter.data;
    }
    if (errors.size) {
      value[fieldKey] = {
        kind: 'error',
        errors: [...errors]
      };
    } else {
      value[fieldKey] = {
        kind: 'value',
        value: field.controller.deserialize(itemForField)
      };
    }
  });
  return value;
}
function serializeValueToObjByFieldKey(fields, value) {
  const obj = {};
  Object.keys(fields).map(fieldKey => {
    const val = value[fieldKey];
    if (val.kind === 'value') {
      obj[fieldKey] = fields[fieldKey].controller.serialize(val.value);
    }
  });
  return obj;
}

function useChangedFieldsAndDataForUpdate(fields, itemGetter, value) {
  const serializedValuesFromItem = useMemo(() => {
    const value = deserializeValue(fields, itemGetter);
    return serializeValueToObjByFieldKey(fields, value);
  }, [fields, itemGetter]);
  const serializedFieldValues = useMemo(() => {
    return serializeValueToObjByFieldKey(fields, value);
  }, [value, fields]);
  return useMemo(() => {
    const changedFields = new Set();
    Object.keys(serializedFieldValues).forEach(fieldKey => {
      let isEqual = isDeepEqual(serializedFieldValues[fieldKey], serializedValuesFromItem[fieldKey]);
      if (!isEqual) {
        changedFields.add(fieldKey);
      }
    });
    const dataForUpdate = {};
    changedFields.forEach(fieldKey => {
      Object.assign(dataForUpdate, serializedFieldValues[fieldKey]);
    });
    Object.keys(serializedFieldValues).filter(fieldKey => {
      var _fields$fieldKey$grap;
      return (_fields$fieldKey$grap = fields[fieldKey].graphql.isNonNull) === null || _fields$fieldKey$grap === void 0 ? void 0 : _fields$fieldKey$grap.includes('update');
    }).filter(fieldKey => !changedFields.has(fieldKey)).forEach(fieldKey => {
      Object.assign(dataForUpdate, serializedFieldValues[fieldKey]);
    });
    return {
      changedFields: changedFields,
      dataForUpdate
    };
  }, [serializedFieldValues, serializedValuesFromItem, fields]);
}

function useInvalidFields(fields, value) {
  return useMemo(() => {
    const invalidFields = new Set();
    Object.keys(value).forEach(fieldPath => {
      const val = value[fieldPath];
      if (val.kind === 'value') {
        const validateFn = fields[fieldPath].controller.validate;
        if (validateFn) {
          const result = validateFn(val.value);
          if (result === false) {
            invalidFields.add(fieldPath);
          }
        }
      }
    });
    return invalidFields;
  }, [fields, value]);
}

export { useInvalidFields as a, deserializeValue as d, serializeValueToObjByFieldKey as s, useChangedFieldsAndDataForUpdate as u };
