import { useToasts } from '@keystone-ui/toast';
import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import isDeepEqual from 'fast-deep-equal';
import { useMutation, gql } from '@apollo/client';
import { useKeystone } from '../admin-ui/context/dist/keystone-6-core-admin-ui-context.esm.js';
import { u as usePreventNavigation } from './GraphQLErrorNotice-b586b151.esm.js';

function useCreateItem(list) {
  const toasts = useToasts();
  const {
    createViewFieldModes
  } = useKeystone();
  const [createItem, {
    loading,
    error,
    data: returnedData
  }] = useMutation(gql`mutation($data: ${list.gqlNames.createInputName}!) {
      item: ${list.gqlNames.createMutationName}(data: $data) {
        id
        label: ${list.labelField}
    }
  }`);
  const [value, setValue] = useState(() => {
    const value = {};
    Object.keys(list.fields).forEach(fieldPath => {
      value[fieldPath] = {
        kind: 'value',
        value: list.fields[fieldPath].controller.defaultValue
      };
    });
    return value;
  });
  const invalidFields = useMemo(() => {
    const invalidFields = new Set();
    Object.keys(value).forEach(fieldPath => {
      const val = value[fieldPath].value;
      const validateFn = list.fields[fieldPath].controller.validate;
      if (validateFn) {
        const result = validateFn(val);
        if (result === false) {
          invalidFields.add(fieldPath);
        }
      }
    });
    return invalidFields;
  }, [list, value]);
  const [forceValidation, setForceValidation] = useState(false);
  const data = {};
  Object.keys(list.fields).forEach(fieldPath => {
    const {
      controller
    } = list.fields[fieldPath];
    const serialized = controller.serialize(value[fieldPath].value);
    if (!isDeepEqual(serialized, controller.serialize(controller.defaultValue))) {
      Object.assign(data, serialized);
    }
  });
  const shouldPreventNavigation = !(returnedData !== null && returnedData !== void 0 && returnedData.item) && Object.keys(data).length !== 0;
  const shouldPreventNavigationRef = useRef(shouldPreventNavigation);
  useEffect(() => {
    shouldPreventNavigationRef.current = shouldPreventNavigation;
  }, [shouldPreventNavigation]);
  usePreventNavigation(shouldPreventNavigationRef);
  return {
    state: loading ? 'loading' : !(returnedData !== null && returnedData !== void 0 && returnedData.item) ? 'created' : 'editing',
    shouldPreventNavigation,
    error,
    props: {
      fields: list.fields,
      groups: list.groups,
      fieldModes: createViewFieldModes.state === 'loaded' ? createViewFieldModes.lists[list.key] : null,
      forceValidation,
      invalidFields,
      value,
      onChange: useCallback(getNewValue => {
        setValue(oldValues => getNewValue(oldValues));
      }, [])
    },
    async create() {
      const newForceValidation = invalidFields.size !== 0;
      setForceValidation(newForceValidation);
      if (newForceValidation) return undefined;
      let outputData;
      try {
        outputData = await createItem({
          variables: {
            data
          },
          update(cache, _ref) {
            var _data$item;
            let {
              data
            } = _ref;
            if (typeof (data === null || data === void 0 ? void 0 : (_data$item = data.item) === null || _data$item === void 0 ? void 0 : _data$item.id) === 'string') {
              cache.evict({
                id: 'ROOT_QUERY',
                fieldName: `${list.gqlNames.itemQueryName}(${JSON.stringify({
                  where: {
                    id: data.item.id
                  }
                })})`
              });
            }
          }
        }).then(x => x.data);
      } catch {
        return undefined;
      }
      shouldPreventNavigationRef.current = false;
      const label = outputData.item.label || outputData.item.id;
      toasts.addToast({
        title: label,
        message: 'Created Successfully',
        tone: 'positive'
      });
      return outputData.item;
    }
  };
}

export { useCreateItem as u };
