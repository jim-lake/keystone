'use strict';

var toast = require('@keystone-ui/toast');
var React = require('react');
var isDeepEqual = require('fast-deep-equal');
var client = require('@apollo/client');
var adminUi_context_dist_keystone6CoreAdminUiContext = require('../admin-ui/context/dist/keystone-6-core-admin-ui-context.cjs.dev.js');
var GraphQLErrorNotice = require('./GraphQLErrorNotice-b11fa9f5.cjs.dev.js');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var isDeepEqual__default = /*#__PURE__*/_interopDefault(isDeepEqual);

function useCreateItem(list) {
  const toasts = toast.useToasts();
  const {
    createViewFieldModes
  } = adminUi_context_dist_keystone6CoreAdminUiContext.useKeystone();
  const [createItem, {
    loading,
    error,
    data: returnedData
  }] = client.useMutation(client.gql`mutation($data: ${list.gqlNames.createInputName}!) {
      item: ${list.gqlNames.createMutationName}(data: $data) {
        id
        label: ${list.labelField}
    }
  }`);
  const [value, setValue] = React.useState(() => {
    const value = {};
    Object.keys(list.fields).forEach(fieldPath => {
      value[fieldPath] = {
        kind: 'value',
        value: list.fields[fieldPath].controller.defaultValue
      };
    });
    return value;
  });
  const invalidFields = React.useMemo(() => {
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
  const [forceValidation, setForceValidation] = React.useState(false);
  const data = {};
  Object.keys(list.fields).forEach(fieldPath => {
    const {
      controller
    } = list.fields[fieldPath];
    const serialized = controller.serialize(value[fieldPath].value);
    if (!isDeepEqual__default["default"](serialized, controller.serialize(controller.defaultValue))) {
      Object.assign(data, serialized);
    }
  });
  const shouldPreventNavigation = !(returnedData !== null && returnedData !== void 0 && returnedData.item) && Object.keys(data).length !== 0;
  const shouldPreventNavigationRef = React.useRef(shouldPreventNavigation);
  React.useEffect(() => {
    shouldPreventNavigationRef.current = shouldPreventNavigation;
  }, [shouldPreventNavigation]);
  GraphQLErrorNotice.usePreventNavigation(shouldPreventNavigationRef);
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
      onChange: React.useCallback(getNewValue => {
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

exports.useCreateItem = useCreateItem;
