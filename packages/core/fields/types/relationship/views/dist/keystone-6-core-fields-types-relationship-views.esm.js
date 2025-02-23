import _extends from '@babel/runtime/helpers/esm/extends';
import { useMemo, useState, useCallback, useRef, useEffect, Fragment } from 'react';
import { Button } from '@keystone-ui/button';
import { jsx, Stack, forwardRefWithAs, useTheme, Box, VisuallyHidden, Text } from '@keystone-ui/core';
import { FieldContainer, FieldLabel, FieldLegend, FieldDescription } from '@keystone-ui/fields';
import { DrawerController } from '@keystone-ui/modals';
import { Link } from '../../../../../admin-ui/router/dist/keystone-6-core-admin-ui-router.esm.js';
import { useKeystone, useList } from '../../../../../admin-ui/context/dist/keystone-6-core-admin-ui-context.esm.js';
import { useQuery, gql, useMutation, useApolloClient } from '@apollo/client';
import { C as CellContainer } from '../../../../../dist/CellContainer-8cce1185.esm.js';
import '@babel/runtime/helpers/defineProperty';
import '@keystone-ui/icons/icons/AlertTriangleIcon';
import 'next/link';
import 'next/router';
import '@keystone-ui/popover';
import '@keystone-ui/icons/icons/MoreHorizontalIcon';
import '@keystone-ui/icons/icons/ChevronRightIcon';
import '../../../../../dist/SignoutButton-ef277bf5.esm.js';
import { C as CreateItemDrawer } from '../../../../../dist/CreateItemDrawer-c7086fe7.esm.js';
import '@keystone-ui/notice';
import { Tooltip } from '@keystone-ui/tooltip';
import { LoadingDots } from '@keystone-ui/loading';
import { m as makeDataGetter } from '../../../../../dist/dataGetter-54fa8f6b.esm.js';
import { F as Fields } from '../../../../../dist/Fields-6156179c.esm.js';
import { g as getRootGraphQLFieldsFromFieldController } from '../../../../../dist/getRootGraphQLFieldsFromFieldController-11021ec8.esm.js';
import isDeepEqual from 'fast-deep-equal';
import { RelationshipSelect } from '../RelationshipSelect/dist/keystone-6-core-fields-types-relationship-views-RelationshipSelect.esm.js';
import { useToasts } from '@keystone-ui/toast';
import { d as deserializeValue, u as useChangedFieldsAndDataForUpdate, a as useInvalidFields, s as serializeValueToObjByFieldKey } from '../../../../../dist/useInvalidFields-5a1ca587.esm.js';
import 'next/head';
import 'apollo-upload-client';
import '@emotion/hash';
import '../../../../../dist/next-fields-34f831a7.esm.js';
import '../../../../../dist/graphql-ts-schema-9020a95a.esm.js';
import '../../../../../dist/admin-meta-graphql-75e8cfcb.esm.js';
import { G as GraphQLErrorNotice } from '../../../../../dist/GraphQLErrorNotice-b586b151.esm.js';
import '../../../../../dist/utils-8175c66a.esm.js';
import 'decimal.js';
import '@graphql-ts/schema/api-without-context';
import '@graphql-ts/schema';
import 'graphql-upload/GraphQLUpload.js';
import 'graphql';
import '@graphql-ts/extend';
import '@graphql-ts/schema/api-with-context';
import '../../../../../dist/useCreateItem-2ddc288f.esm.js';
import '@emotion/weak-memoize';
import 'intersection-observer';
import 'uuid';

function useItemState(_ref) {
  let {
    selectedFields,
    localList,
    id,
    field
  } = _ref;
  const {
    data,
    error,
    loading
  } = useQuery(gql`query($id: ID!) {
  item: ${localList.gqlNames.itemQueryName}(where: {id: $id}) {
    id
    relationship: ${field.path} {
      ${selectedFields}
    }
  }
}`, {
    variables: {
      id
    },
    errorPolicy: 'all',
    skip: id === null
  });
  const {
    itemsArrFromData,
    relationshipGetter
  } = useMemo(() => {
    const dataGetter = makeDataGetter(data, error === null || error === void 0 ? void 0 : error.graphQLErrors);
    const relationshipGetter = dataGetter.get('item').get('relationship');
    const isMany = Array.isArray(relationshipGetter.data);
    const itemsArrFromData = (isMany ? relationshipGetter.data.map((_, i) => relationshipGetter.get(i)) : [relationshipGetter]).filter(x => {
      var _x$data;
      return ((_x$data = x.data) === null || _x$data === void 0 ? void 0 : _x$data.id) != null;
    });
    return {
      relationshipGetter,
      itemsArrFromData
    };
  }, [data, error]);
  let [{
    items,
    itemsArrFromData: itemsArrFromDataState
  }, setItemsState] = useState({
    itemsArrFromData: [],
    items: {}
  });
  if (itemsArrFromDataState !== itemsArrFromData) {
    let newItems = {};
    itemsArrFromData.forEach(item => {
      var _items$item$data$id, _item$errors, _initialItemInState$e;
      const initialItemInState = (_items$item$data$id = items[item.data.id]) === null || _items$item$data$id === void 0 ? void 0 : _items$item$data$id.fromInitialQuery;
      if ((items[item.data.id] && initialItemInState || !items[item.data.id]) && (!initialItemInState || item.data !== initialItemInState.data || ((_item$errors = item.errors) === null || _item$errors === void 0 ? void 0 : _item$errors.length) !== ((_initialItemInState$e = initialItemInState.errors) === null || _initialItemInState$e === void 0 ? void 0 : _initialItemInState$e.length) || (item.errors || []).some((err, i) => {
        var _initialItemInState$e2;
        return err !== ((_initialItemInState$e2 = initialItemInState.errors) === null || _initialItemInState$e2 === void 0 ? void 0 : _initialItemInState$e2[i]);
      }))) {
        newItems[item.data.id] = {
          current: item,
          fromInitialQuery: item
        };
      } else {
        newItems[item.data.id] = items[item.data.id];
      }
    });
    items = newItems;
    setItemsState({
      items: newItems,
      itemsArrFromData
    });
  }
  return {
    items: useMemo(() => {
      const itemsToReturn = {};
      Object.keys(items).forEach(id => {
        itemsToReturn[id] = items[id].current;
      });
      return itemsToReturn;
    }, [items]),
    setItems: useCallback(items => {
      setItemsState(state => {
        let itemsForState = {};
        Object.keys(items).forEach(id => {
          var _state$items$id;
          if (items[id] === ((_state$items$id = state.items[id]) === null || _state$items$id === void 0 ? void 0 : _state$items$id.current)) {
            itemsForState[id] = state.items[id];
          } else {
            var _state$items$id2;
            itemsForState[id] = {
              current: items[id],
              fromInitialQuery: (_state$items$id2 = state.items[id]) === null || _state$items$id2 === void 0 ? void 0 : _state$items$id2.fromInitialQuery
            };
          }
        });
        return {
          itemsArrFromData: state.itemsArrFromData,
          items: itemsForState
        };
      });
    }, [setItemsState]),
    state: (() => {
      if (id === null) {
        return {
          kind: 'loaded'
        };
      }
      if (loading) {
        return {
          kind: 'loading'
        };
      }
      if (error !== null && error !== void 0 && error.networkError) {
        return {
          kind: 'error',
          message: error.networkError.message
        };
      }
      if (field.many && !relationshipGetter.data) {
        var _relationshipGetter$e;
        return {
          kind: 'error',
          message: ((_relationshipGetter$e = relationshipGetter.errors) === null || _relationshipGetter$e === void 0 ? void 0 : _relationshipGetter$e[0].message) || ''
        };
      }
      return {
        kind: 'loaded'
      };
    })()
  };
}
function useFieldsObj(list, fields) {
  return useMemo(() => {
    const editFields = {};
    fields === null || fields === void 0 ? void 0 : fields.forEach(fieldPath => {
      editFields[fieldPath] = list.fields[fieldPath];
    });
    return editFields;
  }, [fields, list.fields]);
}

/** @jsxRuntime classic */
function InlineEdit(_ref) {
  var _itemGetter$errors;
  let {
    fields,
    list,
    selectedFields,
    itemGetter,
    onCancel,
    onSave
  } = _ref;
  const fieldsObj = useFieldsObj(list, fields);
  const [update, {
    loading,
    error
  }] = useMutation(gql`mutation ($data: ${list.gqlNames.updateInputName}!, $id: ID!) {
          item: ${list.gqlNames.updateMutationName}(where: { id: $id }, data: $data) {
            ${selectedFields}
          }
        }`, {
    errorPolicy: 'all'
  });
  const [state, setValue] = useState(() => {
    const value = deserializeValue(fieldsObj, itemGetter);
    return {
      value,
      item: itemGetter.data
    };
  });
  if (state.item !== itemGetter.data && (_itemGetter$errors = itemGetter.errors) !== null && _itemGetter$errors !== void 0 && _itemGetter$errors.every(x => {
    var _x$path;
    return ((_x$path = x.path) === null || _x$path === void 0 ? void 0 : _x$path.length) !== 1;
  })) {
    const value = deserializeValue(fieldsObj, itemGetter);
    setValue({
      value,
      item: itemGetter.data
    });
  }
  const {
    changedFields,
    dataForUpdate
  } = useChangedFieldsAndDataForUpdate(fieldsObj, itemGetter, state.value);
  const invalidFields = useInvalidFields(fieldsObj, state.value);
  const [forceValidation, setForceValidation] = useState(false);
  const toasts = useToasts();
  return jsx("form", {
    onSubmit: event => {
      event.preventDefault();
      if (changedFields.size === 0) {
        onCancel();
        return;
      }
      const newForceValidation = invalidFields.size !== 0;
      setForceValidation(newForceValidation);
      if (newForceValidation) return;
      update({
        variables: {
          data: dataForUpdate,
          id: itemGetter.get('id').data
        }
      }).then(_ref2 => {
        let {
          data,
          errors
        } = _ref2;
        // we're checking for path.length === 1 because errors with a path larger than 1 will be field level errors
        // which are handled seperately and do not indicate a failure to update the item
        const error = errors === null || errors === void 0 ? void 0 : errors.find(x => {
          var _x$path2;
          return ((_x$path2 = x.path) === null || _x$path2 === void 0 ? void 0 : _x$path2.length) === 1;
        });
        if (error) {
          toasts.addToast({
            title: 'Failed to update item',
            tone: 'negative',
            message: error.message
          });
        } else {
          toasts.addToast({
            title: data.item[list.labelField] || data.item.id,
            tone: 'positive',
            message: 'Saved successfully'
          });
          onSave(makeDataGetter(data, errors).get('item'));
        }
      }).catch(err => {
        toasts.addToast({
          title: 'Failed to update item',
          tone: 'negative',
          message: err.message
        });
      });
    }
  }, jsx(Stack, {
    gap: "xlarge"
  }, error && jsx(GraphQLErrorNotice, {
    networkError: error === null || error === void 0 ? void 0 : error.networkError
    // we're checking for path.length === 1 because errors with a path larger than 1 will be field level errors
    // which are handled seperately and do not indicate a failure to update the item
    ,
    errors: error === null || error === void 0 ? void 0 : error.graphQLErrors.filter(x => {
      var _x$path3;
      return ((_x$path3 = x.path) === null || _x$path3 === void 0 ? void 0 : _x$path3.length) === 1;
    })
  }), jsx(Fields, {
    fields: fieldsObj,
    forceValidation: forceValidation,
    invalidFields: invalidFields,
    onChange: useCallback(value => {
      setValue(state => ({
        item: state.item,
        value: value(state.value)
      }));
    }, [setValue]),
    value: state.value
  }), jsx(Stack, {
    across: true,
    gap: "small"
  }, jsx(Button, {
    isLoading: loading,
    weight: "bold",
    size: "small",
    tone: "active",
    type: "submit"
  }, "Save"), jsx(Button, {
    size: "small",
    weight: "none",
    onClick: onCancel
  }, "Cancel"))));
}

/** @jsxRuntime classic */
function InlineCreate(_ref) {
  let {
    list,
    onCancel,
    onCreate,
    fields: fieldPaths,
    selectedFields
  } = _ref;
  const toasts = useToasts();
  const fields = useFieldsObj(list, fieldPaths);
  const [createItem, {
    loading,
    error
  }] = useMutation(gql`mutation($data: ${list.gqlNames.createInputName}!) {
      item: ${list.gqlNames.createMutationName}(data: $data) {
        ${selectedFields}
    }
  }`);
  const [value, setValue] = useState(() => {
    const value = {};
    Object.keys(fields).forEach(fieldPath => {
      value[fieldPath] = {
        kind: 'value',
        value: fields[fieldPath].controller.defaultValue
      };
    });
    return value;
  });
  const invalidFields = useInvalidFields(fields, value);
  const [forceValidation, setForceValidation] = useState(false);
  const onSubmit = event => {
    event.preventDefault();
    const newForceValidation = invalidFields.size !== 0;
    setForceValidation(newForceValidation);
    if (newForceValidation) return;
    const data = {};
    const allSerializedValues = serializeValueToObjByFieldKey(fields, value);
    Object.keys(allSerializedValues).forEach(fieldPath => {
      const {
        controller
      } = fields[fieldPath];
      const serialized = allSerializedValues[fieldPath];
      if (!isDeepEqual(serialized, controller.serialize(controller.defaultValue))) {
        Object.assign(data, serialized);
      }
    });
    createItem({
      variables: {
        data
      }
    }).then(_ref2 => {
      let {
        data,
        errors
      } = _ref2;
      // we're checking for path.length === 1 because errors with a path larger than 1 will be field level errors
      // which are handled seperately and do not indicate a failure to update the item
      const error = errors === null || errors === void 0 ? void 0 : errors.find(x => {
        var _x$path;
        return ((_x$path = x.path) === null || _x$path === void 0 ? void 0 : _x$path.length) === 1;
      });
      if (error) {
        toasts.addToast({
          title: 'Failed to create item',
          tone: 'negative',
          message: error.message
        });
      } else {
        toasts.addToast({
          title: data.item[list.labelField] || data.item.id,
          tone: 'positive',
          message: 'Saved successfully'
        });
        onCreate(makeDataGetter(data, errors).get('item'));
      }
    }).catch(err => {
      toasts.addToast({
        title: 'Failed to update item',
        tone: 'negative',
        message: err.message
      });
    });
  };
  return jsx("form", {
    onSubmit: onSubmit
  }, jsx(Stack, {
    gap: "xlarge"
  }, error && jsx(GraphQLErrorNotice, {
    networkError: error === null || error === void 0 ? void 0 : error.networkError,
    errors: error === null || error === void 0 ? void 0 : error.graphQLErrors
  }), jsx(Fields, {
    fields: fields,
    forceValidation: forceValidation,
    invalidFields: invalidFields,
    onChange: setValue,
    value: value
  }), jsx(Stack, {
    gap: "small",
    across: true
  }, jsx(Button, {
    isLoading: loading,
    size: "small",
    tone: "positive",
    weight: "bold",
    type: "submit"
  }, "Create ", list.singular), jsx(Button, {
    size: "small",
    weight: "none",
    onClick: onCancel
  }, "Cancel"))));
}

const CardContainer = forwardRefWithAs((_ref, ref) => {
  let {
    mode = 'view',
    ...props
  } = _ref;
  const {
    tones
  } = useTheme();
  const tone = tones[mode === 'edit' ? 'active' : mode === 'create' ? 'positive' : 'passive'];
  return jsx(Box, _extends({
    ref: ref,
    paddingLeft: "xlarge",
    css: {
      position: 'relative',
      ':before': {
        content: '" "',
        backgroundColor: tone.border,
        borderRadius: 4,
        width: 4,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1
      }
    }
  }, props));
});
function Cards(_ref2) {
  var _displayOptions$inlin;
  let {
    localList,
    field,
    foreignList,
    id,
    value,
    onChange,
    forceValidation
  } = _ref2;
  const {
    displayOptions
  } = value;
  let selectedFields = [...new Set([...displayOptions.cardFields, ...(((_displayOptions$inlin = displayOptions.inlineEdit) === null || _displayOptions$inlin === void 0 ? void 0 : _displayOptions$inlin.fields) || [])])].map(fieldPath => {
    return foreignList.fields[fieldPath].controller.graphqlSelection;
  }).join('\n');
  if (!displayOptions.cardFields.includes('id')) {
    selectedFields += '\nid';
  }
  if (!displayOptions.cardFields.includes(foreignList.labelField) && foreignList.labelField !== 'id') {
    selectedFields += `\n${foreignList.labelField}`;
  }
  const {
    items,
    setItems,
    state: itemsState
  } = useItemState({
    selectedFields,
    localList,
    id,
    field
  });
  const client = useApolloClient();
  const [isLoadingLazyItems, setIsLoadingLazyItems] = useState(false);
  const [showConnectItems, setShowConnectItems] = useState(false);
  const [hideConnectItemsLabel, setHideConnectItemsLabel] = useState('Cancel');
  const editRef = useRef(null);
  const isMountedRef = useRef(false);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  });
  useEffect(() => {
    if (value.itemsBeingEdited) {
      var _editRef$current;
      editRef === null || editRef === void 0 ? void 0 : (_editRef$current = editRef.current) === null || _editRef$current === void 0 ? void 0 : _editRef$current.focus();
    }
  }, [value]);
  if (itemsState.kind === 'loading') {
    return jsx("div", null, jsx(LoadingDots, {
      label: `Loading items for ${field.label} field`
    }));
  }
  if (itemsState.kind === 'error') {
    return jsx("span", {
      css: {
        color: 'red'
      }
    }, itemsState.message);
  }
  const currentIdsArrayWithFetchedItems = [...value.currentIds].map(id => ({
    itemGetter: items[id],
    id
  })).filter(x => x.itemGetter);
  return jsx(Stack, {
    gap: "medium"
  }, currentIdsArrayWithFetchedItems.length !== 0 && jsx(Stack, {
    as: "ul",
    gap: "medium",
    css: {
      padding: 0,
      margin: 0,
      li: {
        listStyle: 'none'
      }
    }
  }, currentIdsArrayWithFetchedItems.map((_ref3, index) => {
    let {
      id,
      itemGetter
    } = _ref3;
    const isEditMode = !!(onChange !== undefined) && value.itemsBeingEdited.has(id);
    return jsx(CardContainer, {
      role: "status",
      mode: isEditMode ? 'edit' : 'view',
      key: id
    }, jsx(VisuallyHidden, {
      as: "h2"
    }, `${field.label} ${index + 1} ${isEditMode ? 'edit' : 'view'} mode`), isEditMode ? jsx(InlineEdit, {
      list: foreignList,
      fields: displayOptions.inlineEdit.fields,
      onSave: newItemGetter => {
        setItems({
          ...items,
          [id]: newItemGetter
        });
        const itemsBeingEdited = new Set(value.itemsBeingEdited);
        itemsBeingEdited.delete(id);
        onChange({
          ...value,
          itemsBeingEdited
        });
      },
      selectedFields: selectedFields,
      itemGetter: itemGetter,
      onCancel: () => {
        const itemsBeingEdited = new Set(value.itemsBeingEdited);
        itemsBeingEdited.delete(id);
        onChange({
          ...value,
          itemsBeingEdited
        });
      }
    }) : jsx(Stack, {
      gap: "xlarge"
    }, displayOptions.cardFields.map(fieldPath => {
      const field = foreignList.fields[fieldPath];
      const itemForField = {};
      for (const graphqlField of getRootGraphQLFieldsFromFieldController(field.controller)) {
        const fieldGetter = itemGetter.get(graphqlField);
        if (fieldGetter.errors) {
          const errorMessage = fieldGetter.errors[0].message;
          return jsx(FieldContainer, null, jsx(FieldLabel, null, field.label), errorMessage);
        }
        itemForField[graphqlField] = fieldGetter.data;
      }
      return jsx(field.views.CardValue, {
        key: fieldPath,
        field: field.controller,
        item: itemForField
      });
    }), jsx(Stack, {
      across: true,
      gap: "small"
    }, displayOptions.inlineEdit && onChange !== undefined && jsx(Button, {
      size: "small",
      disabled: onChange === undefined,
      onClick: () => {
        onChange({
          ...value,
          itemsBeingEdited: new Set([...value.itemsBeingEdited, id])
        });
      },
      tone: "active"
    }, "Edit"), displayOptions.removeMode === 'disconnect' && onChange !== undefined && jsx(Tooltip, {
      content: "This item will not be deleted. It will only be removed from this field."
    }, props => jsx(Button, _extends({
      size: "small",
      disabled: onChange === undefined,
      onClick: () => {
        const currentIds = new Set(value.currentIds);
        currentIds.delete(id);
        onChange({
          ...value,
          currentIds
        });
      }
    }, props, {
      tone: "negative"
    }), "Remove")), displayOptions.linkToItem && jsx(Button, {
      size: "small",
      weight: "link",
      tone: "active",
      css: {
        textDecoration: 'none'
      },
      as: Link,
      href: `/${foreignList.path}/${id}`
    }, "View ", foreignList.singular, " details"))));
  })), onChange === undefined ? null : displayOptions.inlineConnect && showConnectItems ? jsx(CardContainer, {
    mode: "edit"
  }, jsx(Stack, {
    gap: "small",
    across: true,
    css: {
      width: '100%',
      justifyContent: 'space-between',
      'div:first-of-type': {
        flex: '2'
      }
    }
  }, jsx(RelationshipSelect, {
    autoFocus: true,
    controlShouldRenderValue: isLoadingLazyItems,
    isDisabled: onChange === undefined,
    list: foreignList,
    labelField: field.refLabelField,
    searchFields: field.refSearchFields,
    isLoading: isLoadingLazyItems,
    placeholder: `Select a ${foreignList.singular}`,
    portalMenu: true,
    state: {
      kind: 'many',
      async onChange(options) {
        // TODO: maybe use the extraSelection prop on RelationshipSelect here
        const itemsToFetchAndConnect = [];
        options.forEach(item => {
          if (!value.currentIds.has(item.id)) {
            itemsToFetchAndConnect.push(item.id);
          }
        });
        if (itemsToFetchAndConnect.length) {
          try {
            const {
              data,
              errors
            } = await client.query({
              query: gql`query ($ids: [ID!]!) {
                      items: ${foreignList.gqlNames.listQueryName}(where: { id: { in: $ids }}) {
                        ${selectedFields}
                      }
                    }`,
              variables: {
                ids: itemsToFetchAndConnect
              }
            });
            if (isMountedRef.current) {
              const dataGetters = makeDataGetter(data, errors);
              const itemsDataGetter = dataGetters.get('items');
              let newItems = {
                ...items
              };
              let newCurrentIds = field.many ? new Set(value.currentIds) : new Set();
              if (Array.isArray(itemsDataGetter.data)) {
                itemsDataGetter.data.forEach((item, i) => {
                  if ((item === null || item === void 0 ? void 0 : item.id) != null) {
                    newCurrentIds.add(item.id);
                    newItems[item.id] = itemsDataGetter.get(i);
                  }
                });
              }
              if (newCurrentIds.size) {
                setItems(newItems);
                onChange({
                  ...value,
                  currentIds: newCurrentIds
                });
                setHideConnectItemsLabel('Done');
              }
            }
          } finally {
            if (isMountedRef.current) {
              setIsLoadingLazyItems(false);
            }
          }
        }
      },
      value: (() => {
        let options = [];
        Object.keys(items).forEach(id => {
          if (value.currentIds.has(id)) {
            options.push({
              id,
              label: id
            });
          }
        });
        return options;
      })()
    }
  }), jsx(Button, {
    onClick: () => setShowConnectItems(false)
  }, hideConnectItemsLabel))) : value.itemBeingCreated ? jsx(CardContainer, {
    mode: "create"
  }, jsx(InlineCreate, {
    selectedFields: selectedFields,
    fields: displayOptions.inlineCreate.fields,
    list: foreignList,
    onCancel: () => {
      onChange({
        ...value,
        itemBeingCreated: false
      });
    },
    onCreate: itemGetter => {
      const id = itemGetter.data.id;
      setItems({
        ...items,
        [id]: itemGetter
      });
      onChange({
        ...value,
        itemBeingCreated: false,
        currentIds: field.many ? new Set([...value.currentIds, id]) : new Set([id])
      });
    }
  })) : displayOptions.inlineCreate || displayOptions.inlineConnect ? jsx(CardContainer, {
    mode: "create"
  }, jsx(Stack, {
    gap: "small",
    across: true
  }, displayOptions.inlineCreate && jsx(Button, {
    size: "small",
    disabled: onChange === undefined,
    tone: "positive",
    onClick: () => {
      onChange({
        ...value,
        itemBeingCreated: true
      });
    }
  }, "Create ", foreignList.singular), displayOptions.inlineConnect && jsx(Button, {
    size: "small",
    weight: "none",
    tone: "passive",
    onClick: () => {
      setShowConnectItems(true);
      setHideConnectItemsLabel('Cancel');
    }
  }, "Link existing ", foreignList.singular))) : null, forceValidation && jsx(Text, {
    color: "red600",
    size: "small"
  }, "You must finish creating and editing any related ", foreignList.label.toLowerCase(), " before saving the ", localList.singular.toLowerCase()));
}

function LinkToRelatedItems(_ref) {
  var _value$value;
  let {
    itemId,
    value,
    list,
    refFieldKey
  } = _ref;
  function constructQuery(_ref2) {
    let {
      refFieldKey,
      itemId,
      value
    } = _ref2;
    if (!!refFieldKey && itemId) {
      return `!${refFieldKey}_matches="${itemId}"`;
    }
    return `!id_in="${(value === null || value === void 0 ? void 0 : value.value).slice(0, 100).map(_ref3 => {
      let {
        id
      } = _ref3;
      return id;
    }).join(',')}"`;
  }
  const commonProps = {
    size: 'small',
    tone: 'active',
    weight: 'link'
  };
  if (value.kind === 'many') {
    const query = constructQuery({
      refFieldKey,
      value,
      itemId
    });
    return jsx(Button, _extends({}, commonProps, {
      as: Link,
      href: `/${list.path}?${query}`
    }), "View related ", list.plural);
  }
  return jsx(Button, _extends({}, commonProps, {
    as: Link,
    href: `/${list.path}/${(_value$value = value.value) === null || _value$value === void 0 ? void 0 : _value$value.id}`
  }), "View ", list.singular, " details");
}
const Field = _ref4 => {
  var _value$value2;
  let {
    field,
    autoFocus,
    value,
    onChange,
    forceValidation
  } = _ref4;
  const keystone = useKeystone();
  const foreignList = useList(field.refListKey);
  const localList = useList(field.listKey);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  if (value.kind === 'cards-view') {
    return jsx(FieldContainer, {
      as: "fieldset"
    }, jsx(FieldLegend, null, field.label), jsx(FieldDescription, {
      id: `${field.path}-description`
    }, field.description), jsx(Cards, {
      forceValidation: forceValidation,
      field: field,
      id: value.id,
      value: value,
      onChange: onChange,
      foreignList: foreignList,
      localList: localList
    }));
  }
  if (value.kind === 'count') {
    return jsx(Stack, {
      as: "fieldset",
      gap: "medium"
    }, jsx(FieldLegend, null, field.label), jsx(FieldDescription, {
      id: `${field.path}-description`
    }, field.description), jsx("div", null, value.count === 1 ? `There is 1 ${foreignList.singular} ` : `There are ${value.count} ${foreignList.plural} `, "linked to this ", localList.singular));
  }
  const authenticatedItem = keystone.authenticatedItem;
  return jsx(FieldContainer, {
    as: "fieldset"
  }, jsx(FieldLabel, {
    as: "legend"
  }, field.label), jsx(FieldDescription, {
    id: `${field.path}-description`
  }, field.description), jsx(Fragment, null, jsx(Stack, {
    gap: "medium"
  }, jsx(RelationshipSelect, {
    controlShouldRenderValue: true,
    "aria-describedby": field.description === null ? undefined : `${field.path}-description`,
    autoFocus: autoFocus,
    isDisabled: onChange === undefined,
    labelField: field.refLabelField,
    searchFields: field.refSearchFields,
    list: foreignList,
    portalMenu: true,
    state: value.kind === 'many' ? {
      kind: 'many',
      value: value.value,
      onChange(newItems) {
        onChange === null || onChange === void 0 ? void 0 : onChange({
          ...value,
          value: newItems
        });
      }
    } : {
      kind: 'one',
      value: value.value,
      onChange(newVal) {
        if (value.kind === 'one') {
          onChange === null || onChange === void 0 ? void 0 : onChange({
            ...value,
            value: newVal
          });
        }
      }
    }
  }), jsx(Stack, {
    across: true,
    gap: "small"
  }, onChange !== undefined && !field.hideCreate && jsx(Button, {
    size: "small",
    disabled: isDrawerOpen,
    onClick: () => {
      setIsDrawerOpen(true);
    }
  }, "Create related ", foreignList.singular), onChange !== undefined && authenticatedItem.state === 'authenticated' && authenticatedItem.listKey === field.refListKey && (value.kind === 'many' ? value.value.find(x => x.id === authenticatedItem.id) === undefined : ((_value$value2 = value.value) === null || _value$value2 === void 0 ? void 0 : _value$value2.id) !== authenticatedItem.id) && jsx(Button, {
    size: "small",
    onClick: () => {
      const val = {
        label: authenticatedItem.label,
        id: authenticatedItem.id
      };
      if (value.kind === 'many') {
        onChange({
          ...value,
          value: [...value.value, val]
        });
      } else {
        onChange({
          ...value,
          value: val
        });
      }
    }
  }, value.kind === 'many' ? 'Add ' : 'Set as ', authenticatedItem.label), !!(value.kind === 'many' ? value.value.length : value.kind === 'one' && value.value) && jsx(LinkToRelatedItems, {
    itemId: value.id,
    refFieldKey: field.refFieldKey,
    list: foreignList,
    value: value
  }))), onChange !== undefined && jsx(DrawerController, {
    isOpen: isDrawerOpen
  }, jsx(CreateItemDrawer, {
    listKey: foreignList.key,
    onClose: () => {
      setIsDrawerOpen(false);
    },
    onCreate: val => {
      setIsDrawerOpen(false);
      if (value.kind === 'many') {
        onChange({
          ...value,
          value: [...value.value, val]
        });
      } else if (value.kind === 'one') {
        onChange({
          ...value,
          value: val
        });
      }
    }
  }))));
};
const Cell = _ref5 => {
  let {
    field,
    item
  } = _ref5;
  const list = useList(field.refListKey);
  const {
    colors
  } = useTheme();
  if (field.display === 'count') {
    var _item;
    const count = (_item = item[`${field.path}Count`]) !== null && _item !== void 0 ? _item : 0;
    return jsx(CellContainer, null, count, " ", count === 1 ? list.singular : list.plural);
  }
  const data = item[field.path];
  const items = (Array.isArray(data) ? data : [data]).filter(item => item);
  const displayItems = items.length < 5 ? items : items.slice(0, 3);
  const overflow = items.length < 5 ? 0 : items.length - 3;
  const styles = {
    color: colors.foreground,
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    }
  };
  return jsx(CellContainer, null, displayItems.map((item, index) => jsx(Fragment, {
    key: item.id
  }, !!index ? ', ' : '', jsx(Link, {
    href: `/${list.path}/[id]`,
    as: `/${list.path}/${item.id}`,
    css: styles
  }, item.label || item.id))), overflow ? `, and ${overflow} more` : null);
};
const CardValue = _ref6 => {
  let {
    field,
    item
  } = _ref6;
  const list = useList(field.refListKey);
  const data = item[field.path];
  return jsx(FieldContainer, null, jsx(FieldLabel, null, field.label), (Array.isArray(data) ? data : [data]).filter(item => item).map((item, index) => jsx(Fragment, {
    key: item.id
  }, !!index ? ', ' : '', jsx(Link, {
    href: `/${list.path}/[id]`,
    as: `/${list.path}/${item.id}`
  }, item.label || item.id))));
};
const controller = config => {
  const cardsDisplayOptions = config.fieldMeta.displayMode === 'cards' ? {
    cardFields: config.fieldMeta.cardFields,
    inlineCreate: config.fieldMeta.inlineCreate,
    inlineEdit: config.fieldMeta.inlineEdit,
    linkToItem: config.fieldMeta.linkToItem,
    removeMode: config.fieldMeta.removeMode,
    inlineConnect: config.fieldMeta.inlineConnect
  } : undefined;
  const refLabelField = config.fieldMeta.refLabelField;
  const refSearchFields = config.fieldMeta.refSearchFields;
  return {
    refFieldKey: config.fieldMeta.refFieldKey,
    many: config.fieldMeta.many,
    listKey: config.listKey,
    path: config.path,
    label: config.label,
    description: config.description,
    display: config.fieldMeta.displayMode === 'count' ? 'count' : 'cards-or-select',
    refLabelField,
    refSearchFields,
    refListKey: config.fieldMeta.refListKey,
    graphqlSelection: config.fieldMeta.displayMode === 'count' ? `${config.path}Count` : `${config.path} {
              id
              label: ${refLabelField}
            }`,
    hideCreate: config.fieldMeta.hideCreate,
    // note we're not making the state kind: 'count' when ui.displayMode is set to 'count'.
    // that ui.displayMode: 'count' is really just a way to have reasonable performance
    // because our other UIs don't handle relationships with a large number of items well
    // but that's not a problem here since we're creating a new item so we might as well them a better UI
    defaultValue: cardsDisplayOptions !== undefined ? {
      kind: 'cards-view',
      currentIds: new Set(),
      id: null,
      initialIds: new Set(),
      itemBeingCreated: false,
      itemsBeingEdited: new Set(),
      displayOptions: cardsDisplayOptions
    } : config.fieldMeta.many ? {
      id: null,
      kind: 'many',
      initialValue: [],
      value: []
    } : {
      id: null,
      kind: 'one',
      value: null,
      initialValue: null
    },
    deserialize: data => {
      if (config.fieldMeta.displayMode === 'count') {
        var _data;
        return {
          id: data.id,
          kind: 'count',
          count: (_data = data[`${config.path}Count`]) !== null && _data !== void 0 ? _data : 0
        };
      }
      if (cardsDisplayOptions !== undefined) {
        const initialIds = new Set((Array.isArray(data[config.path]) ? data[config.path] : data[config.path] ? [data[config.path]] : []).map(x => x.id));
        return {
          kind: 'cards-view',
          id: data.id,
          itemsBeingEdited: new Set(),
          itemBeingCreated: false,
          initialIds,
          currentIds: initialIds,
          displayOptions: cardsDisplayOptions
        };
      }
      if (config.fieldMeta.many) {
        let value = (data[config.path] || []).map(x => ({
          id: x.id,
          label: x.label || x.id
        }));
        return {
          kind: 'many',
          id: data.id,
          initialValue: value,
          value
        };
      }
      let value = data[config.path];
      if (value) {
        value = {
          id: value.id,
          label: value.label || value.id
        };
      }
      return {
        kind: 'one',
        id: data.id,
        value,
        initialValue: value
      };
    },
    filter: {
      Filter: _ref7 => {
        let {
          onChange,
          value
        } = _ref7;
        const foreignList = useList(config.fieldMeta.refListKey);
        const {
          filterValues,
          loading
        } = useRelationshipFilterValues({
          value,
          list: foreignList
        });
        const state = {
          kind: 'many',
          value: filterValues,
          onChange(newItems) {
            onChange(newItems.map(item => item.id).join(','));
          }
        };
        return jsx(RelationshipSelect, {
          controlShouldRenderValue: true,
          list: foreignList,
          labelField: refLabelField,
          searchFields: refSearchFields,
          isLoading: loading,
          isDisabled: onChange === undefined,
          state: state
        });
      },
      graphql: _ref8 => {
        let {
          value
        } = _ref8;
        const foreignIds = getForeignIds(value);
        if (config.fieldMeta.many) {
          return {
            [config.path]: {
              some: {
                id: {
                  in: foreignIds
                }
              }
            }
          };
        }
        return {
          [config.path]: {
            id: {
              in: foreignIds
            }
          }
        };
      },
      Label(_ref9) {
        let {
          value
        } = _ref9;
        const foreignList = useList(config.fieldMeta.refListKey);
        const {
          filterValues
        } = useRelationshipFilterValues({
          value,
          list: foreignList
        });
        if (!filterValues.length) {
          return `has no value`;
        }
        if (filterValues.length > 1) {
          const values = filterValues.map(i => i.label).join(', ');
          return `is in [${values}]`;
        }
        const optionLabel = filterValues[0].label;
        return `is ${optionLabel}`;
      },
      types: {
        matches: {
          label: 'Matches',
          initialValue: ''
        }
      }
    },
    validate(value) {
      return value.kind !== 'cards-view' || value.itemsBeingEdited.size === 0 && !value.itemBeingCreated;
    },
    serialize: state => {
      if (state.kind === 'many') {
        const newAllIds = new Set(state.value.map(x => x.id));
        const initialIds = new Set(state.initialValue.map(x => x.id));
        let disconnect = state.initialValue.filter(x => !newAllIds.has(x.id)).map(x => ({
          id: x.id
        }));
        let connect = state.value.filter(x => !initialIds.has(x.id)).map(x => ({
          id: x.id
        }));
        if (disconnect.length || connect.length) {
          let output = {};
          if (disconnect.length) {
            output.disconnect = disconnect;
          }
          if (connect.length) {
            output.connect = connect;
          }
          return {
            [config.path]: output
          };
        }
      } else if (state.kind === 'one') {
        var _state$initialValue;
        if (state.initialValue && !state.value) {
          return {
            [config.path]: {
              disconnect: true
            }
          };
        } else if (state.value && state.value.id !== ((_state$initialValue = state.initialValue) === null || _state$initialValue === void 0 ? void 0 : _state$initialValue.id)) {
          return {
            [config.path]: {
              connect: {
                id: state.value.id
              }
            }
          };
        }
      } else if (state.kind === 'cards-view') {
        let disconnect = [...state.initialIds].filter(id => !state.currentIds.has(id)).map(id => ({
          id
        }));
        let connect = [...state.currentIds].filter(id => !state.initialIds.has(id)).map(id => ({
          id
        }));
        if (config.fieldMeta.many) {
          if (disconnect.length || connect.length) {
            return {
              [config.path]: {
                connect: connect.length ? connect : undefined,
                disconnect: disconnect.length ? disconnect : undefined
              }
            };
          }
        } else if (connect.length) {
          return {
            [config.path]: {
              connect: connect[0]
            }
          };
        } else if (disconnect.length) {
          return {
            [config.path]: {
              disconnect: true
            }
          };
        }
      }
      return {};
    }
  };
};
function useRelationshipFilterValues(_ref10) {
  var _data$items;
  let {
    value,
    list
  } = _ref10;
  const foreignIds = getForeignIds(value);
  const where = {
    id: {
      in: foreignIds
    }
  };
  const query = gql`
    query FOREIGNLIST_QUERY($where: ${list.gqlNames.whereInputName}!) {
      items: ${list.gqlNames.listQueryName}(where: $where) {
        id
        ${list.labelField}
      }
    }
  `;
  const {
    data,
    loading
  } = useQuery(query, {
    variables: {
      where
    }
  });
  return {
    filterValues: (data === null || data === void 0 ? void 0 : (_data$items = data.items) === null || _data$items === void 0 ? void 0 : _data$items.map(item => {
      return {
        id: item.id,
        label: item[list.labelField] || item.id
      };
    })) || foreignIds.map(f => ({
      label: f,
      id: f
    })),
    loading: loading
  };
}
function getForeignIds(value) {
  if (typeof value === 'string' && value.length > 0) {
    return value.split(',');
  }
  return [];
}

export { CardValue, Cell, Field, controller };
