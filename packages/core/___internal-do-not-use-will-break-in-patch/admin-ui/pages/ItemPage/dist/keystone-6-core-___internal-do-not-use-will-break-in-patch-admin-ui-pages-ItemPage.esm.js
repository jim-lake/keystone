import _extends from '@babel/runtime/helpers/esm/extends';
import copyToClipboard from 'clipboard-copy';
import { useRouter } from 'next/router';
import { useMemo, Fragment, useState, useCallback, memo, useRef, useEffect } from 'react';
import { Button } from '@keystone-ui/button';
import { jsx, Center, Box, Stack, useTheme, Text } from '@keystone-ui/core';
import { LoadingDots } from '@keystone-ui/loading';
import { ClipboardIcon } from '@keystone-ui/icons/icons/ClipboardIcon';
import { AlertDialog } from '@keystone-ui/modals';
import { Notice } from '@keystone-ui/notice';
import { useToasts } from '@keystone-ui/toast';
import { Tooltip } from '@keystone-ui/tooltip';
import { FieldLabel, TextInput } from '@keystone-ui/fields';
import { m as makeDataGetter } from '../../../../../dist/dataGetter-54fa8f6b.esm.js';
import { F as Fields } from '../../../../../dist/Fields-6156179c.esm.js';
import '../../../../../dist/getRootGraphQLFieldsFromFieldController-11021ec8.esm.js';
import { d as deserializeValue, u as useChangedFieldsAndDataForUpdate, a as useInvalidFields } from '../../../../../dist/useInvalidFields-5a1ca587.esm.js';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useList } from '../../../../../admin-ui/context/dist/keystone-6-core-admin-ui-context.esm.js';
import { P as PageContainer, H as HEADER_HEIGHT } from '../../../../../dist/PageContainer-0d8d0d38.esm.js';
import { G as GraphQLErrorNotice, u as usePreventNavigation } from '../../../../../dist/GraphQLErrorNotice-b586b151.esm.js';
import { C as CreateButtonLink } from '../../../../../dist/CreateButtonLink-41201098.esm.js';
import { I as ItemPageHeader, C as ColumnLayout, B as BaseToolbar } from '../../../../../dist/common-e0ed4d13.esm.js';
import '@emotion/weak-memoize';
import 'graphql';
import 'fast-deep-equal';
import 'apollo-upload-client';
import '@emotion/hash';
import '../../../../../dist/utils-8175c66a.esm.js';
import '../../../../../dist/next-fields-34f831a7.esm.js';
import 'decimal.js';
import '../../../../../dist/graphql-ts-schema-9020a95a.esm.js';
import '@graphql-ts/schema';
import 'graphql-upload/GraphQLUpload.js';
import '@graphql-ts/schema/api-without-context';
import '@graphql-ts/extend';
import '@graphql-ts/schema/api-with-context';
import '../../../../../dist/admin-meta-graphql-75e8cfcb.esm.js';
import '@keystone-ui/popover';
import '@keystone-ui/icons/icons/MoreHorizontalIcon';
import '@keystone-ui/icons/icons/ChevronRightIcon';
import '../../../../../admin-ui/router/dist/keystone-6-core-admin-ui-router.esm.js';
import 'next/link';
import 'next/head';
import '../../../../../dist/SignoutButton-ef277bf5.esm.js';

function useEventCallback(callback) {
  const callbackRef = useRef(callback);
  const cb = useCallback(function () {
    return callbackRef.current(...arguments);
  }, []);
  useEffect(() => {
    callbackRef.current = callback;
  });
  return cb;
}
function ItemForm(_ref) {
  var _useMemo, _state$item$data, _state$item$data2;
  let {
    listKey,
    itemGetter,
    selectedFields,
    fieldModes,
    fieldPositions,
    showDelete,
    item
  } = _ref;
  const list = useList(listKey);
  const {
    spacing,
    typography
  } = useTheme();
  const [update, {
    loading,
    error,
    data
  }] = useMutation(gql`mutation ($data: ${list.gqlNames.updateInputName}!, $id: ID!) {
      item: ${list.gqlNames.updateMutationName}(where: { id: $id }, data: $data) {
        ${selectedFields}
      }
    }`, {
    errorPolicy: 'all'
  });
  itemGetter = (_useMemo = useMemo(() => {
    if (data) {
      return makeDataGetter(data, error === null || error === void 0 ? void 0 : error.graphQLErrors).get('item');
    }
  }, [data, error])) !== null && _useMemo !== void 0 ? _useMemo : itemGetter;
  const [state, setValue] = useState(() => {
    const value = deserializeValue(list.fields, itemGetter);
    return {
      value,
      item: itemGetter
    };
  });
  if (!loading && state.item.data !== itemGetter.data && (itemGetter.errors || []).every(x => {
    var _x$path;
    return ((_x$path = x.path) === null || _x$path === void 0 ? void 0 : _x$path.length) !== 1;
  })) {
    const value = deserializeValue(list.fields, itemGetter);
    setValue({
      value,
      item: itemGetter
    });
  }
  const {
    changedFields,
    dataForUpdate
  } = useChangedFieldsAndDataForUpdate(list.fields, state.item, state.value);
  const invalidFields = useInvalidFields(list.fields, state.value);
  const [forceValidation, setForceValidation] = useState(false);
  const toasts = useToasts();
  const onSave = useEventCallback(() => {
    const newForceValidation = invalidFields.size !== 0;
    setForceValidation(newForceValidation);
    if (newForceValidation) return;
    update({
      variables: {
        data: dataForUpdate,
        id: state.item.get('id').data
      }
    })
    // TODO -- Experimenting with less detail in the toasts, so the data lines are commented
    // out below. If we're happy with this, clean up the unused lines.
    .then(_ref2 => {
      let {
        /* data, */errors
      } = _ref2;
      // we're checking for path being undefined OR path.length === 1 because errors with a path larger than 1 will
      // be field level errors which are handled seperately and do not indicate a failure to
      // update the item, path being undefined generally indicates a failure in the graphql mutation itself - ie a type error
      const error = errors === null || errors === void 0 ? void 0 : errors.find(x => {
        var _x$path2;
        return x.path === undefined || ((_x$path2 = x.path) === null || _x$path2 === void 0 ? void 0 : _x$path2.length) === 1;
      });
      if (error) {
        toasts.addToast({
          title: 'Failed to update item',
          tone: 'negative',
          message: error.message
        });
      } else {
        toasts.addToast({
          // title: data.item[list.labelField] || data.item.id,
          tone: 'positive',
          title: 'Saved successfully'
          // message: 'Saved successfully',
        });
      }
    }).catch(err => {
      toasts.addToast({
        title: 'Failed to update item',
        tone: 'negative',
        message: err.message
      });
    });
  });
  const labelFieldValue = list.isSingleton ? list.label : (_state$item$data = state.item.data) === null || _state$item$data === void 0 ? void 0 : _state$item$data[list.labelField];
  const itemId = (_state$item$data2 = state.item.data) === null || _state$item$data2 === void 0 ? void 0 : _state$item$data2.id;
  const hasChangedFields = !!changedFields.size;
  usePreventNavigation(useMemo(() => ({
    current: hasChangedFields
  }), [hasChangedFields]));
  return jsx(Fragment, null, jsx(Box, {
    marginTop: "xlarge"
  }, jsx(GraphQLErrorNotice, {
    networkError: error === null || error === void 0 ? void 0 : error.networkError
    // we're checking for path.length === 1 because errors with a path larger than 1 will be field level errors
    // which are handled seperately and do not indicate a failure to update the item
    ,
    errors: error === null || error === void 0 ? void 0 : error.graphQLErrors.filter(x => {
      var _x$path3;
      return ((_x$path3 = x.path) === null || _x$path3 === void 0 ? void 0 : _x$path3.length) === 1;
    })
  }), jsx(Fields, {
    groups: list.groups,
    fieldModes: fieldModes,
    fields: list.fields,
    forceValidation: forceValidation,
    invalidFields: invalidFields,
    position: "form",
    fieldPositions: fieldPositions,
    onChange: useCallback(value => {
      setValue(state => ({
        item: state.item,
        value: value(state.value)
      }));
    }, [setValue]),
    value: state.value
  }), jsx(Toolbar, {
    onSave: onSave,
    hasChangedFields: !!changedFields.size,
    onReset: useEventCallback(() => {
      setValue(state => ({
        item: state.item,
        value: deserializeValue(list.fields, state.item)
      }));
    }),
    loading: loading,
    deleteButton: useMemo(() => showDelete ? jsx(DeleteButton, {
      list: list,
      itemLabel: labelFieldValue !== null && labelFieldValue !== void 0 ? labelFieldValue : itemId,
      itemId: itemId
    }) : undefined, [showDelete, list, labelFieldValue, itemId])
  })), jsx(StickySidebar, null, jsx(FieldLabel, null, "Item ID"), jsx("div", {
    css: {
      display: 'flex',
      alignItems: 'center'
    }
  }, jsx(TextInput, {
    css: {
      marginRight: spacing.medium,
      fontFamily: typography.fontFamily.monospace,
      fontSize: typography.fontSize.small
    },
    readOnly: true,
    value: item.id
  }), jsx(Tooltip, {
    content: "Copy ID"
  }, props => jsx(Button, _extends({}, props, {
    "aria-label": "Copy ID",
    onClick: () => {
      copyToClipboard(item.id);
    }
  }), jsx(ClipboardIcon, {
    size: "small"
  })))), jsx(Box, {
    marginTop: "xlarge"
  }, jsx(Fields, {
    groups: list.groups,
    fieldModes: fieldModes,
    fields: list.fields,
    forceValidation: forceValidation,
    invalidFields: invalidFields,
    position: "sidebar",
    fieldPositions: fieldPositions,
    onChange: useCallback(value => {
      setValue(state => ({
        item: state.item,
        value: value(state.value)
      }));
    }, [setValue]),
    value: state.value
  }))));
}
function DeleteButton(_ref3) {
  let {
    itemLabel,
    itemId,
    list
  } = _ref3;
  const toasts = useToasts();
  const [deleteItem, {
    loading
  }] = useMutation(gql`mutation ($id: ID!) {
      ${list.gqlNames.deleteMutationName}(where: { id: $id }) {
        id
      }
    }`, {
    variables: {
      id: itemId
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return jsx(Fragment, null, jsx(Button, {
    tone: "negative",
    onClick: () => {
      setIsOpen(true);
    }
  }, "Delete"), jsx(AlertDialog
  // TODO: change the copy in the title and body of the modal
  , {
    title: "Delete Confirmation",
    isOpen: isOpen,
    tone: "negative",
    actions: {
      confirm: {
        label: 'Delete',
        action: async () => {
          try {
            await deleteItem();
          } catch (err) {
            return toasts.addToast({
              title: `Failed to delete ${list.singular} item: ${itemLabel}`,
              message: err.message,
              tone: 'negative'
            });
          }
          router.push(list.isSingleton ? '/' : `/${list.path}`);
          return toasts.addToast({
            title: itemLabel,
            message: `Deleted ${list.singular} item successfully`,
            tone: 'positive'
          });
        },
        loading
      },
      cancel: {
        label: 'Cancel',
        action: () => {
          setIsOpen(false);
        }
      }
    }
  }, "Are you sure you want to delete ", jsx("strong", null, itemLabel), "?"));
}
const getItemPage = props => () => jsx(ItemPage, props);
const ItemPage = _ref4 => {
  var _dataGetter$data2, _dataGetter$data2$key, _dataGetter$data2$key2, _dataGetter$data2$key3, _dataGetter$data4, _dataGetter$data4$key, _dataGetter$data4$key2, _dataGetter$data4$key3;
  let {
    listKey
  } = _ref4;
  const list = useList(listKey);
  const id = useRouter().query.id;
  const {
    query,
    selectedFields
  } = useMemo(() => {
    const selectedFields = Object.entries(list.fields).filter(_ref5 => {
      let [fieldKey, field] = _ref5;
      return field.itemView.fieldMode !== 'hidden' ||
      // the id field is hidden but we still need to fetch it
      fieldKey === 'id';
    }).map(_ref6 => {
      let [fieldKey] = _ref6;
      return list.fields[fieldKey].controller.graphqlSelection;
    }).join('\n');
    return {
      selectedFields,
      query: gql`
        query ItemPage($id: ID!, $listKey: String!) {
          item: ${list.gqlNames.itemQueryName}(where: {id: $id}) {
            ${selectedFields}
          }
          keystone {
            adminMeta {
              list(key: $listKey) {
                hideCreate
                hideDelete
                fields {
                  path
                  itemView(id: $id) {
                    fieldMode
                    fieldPosition
                  }
                }
              }
            }
          }
        }
      `
    };
  }, [list]);
  let {
    data,
    error,
    loading
  } = useQuery(query, {
    variables: {
      id,
      listKey
    },
    errorPolicy: 'all',
    skip: id === undefined
  });
  loading || (loading = id === undefined);
  const dataGetter = makeDataGetter(data, error === null || error === void 0 ? void 0 : error.graphQLErrors);
  const itemViewFieldModesByField = useMemo(() => {
    var _dataGetter$data, _dataGetter$data$keys, _dataGetter$data$keys2, _dataGetter$data$keys3, _dataGetter$data$keys4;
    const itemViewFieldModesByField = {};
    (_dataGetter$data = dataGetter.data) === null || _dataGetter$data === void 0 ? void 0 : (_dataGetter$data$keys = _dataGetter$data.keystone) === null || _dataGetter$data$keys === void 0 ? void 0 : (_dataGetter$data$keys2 = _dataGetter$data$keys.adminMeta) === null || _dataGetter$data$keys2 === void 0 ? void 0 : (_dataGetter$data$keys3 = _dataGetter$data$keys2.list) === null || _dataGetter$data$keys3 === void 0 ? void 0 : (_dataGetter$data$keys4 = _dataGetter$data$keys3.fields) === null || _dataGetter$data$keys4 === void 0 ? void 0 : _dataGetter$data$keys4.forEach(field => {
      var _field$itemView;
      if (field === null || field.path === null || (field === null || field === void 0 ? void 0 : (_field$itemView = field.itemView) === null || _field$itemView === void 0 ? void 0 : _field$itemView.fieldMode) == null) return;
      itemViewFieldModesByField[field.path] = field.itemView.fieldMode;
    });
    return itemViewFieldModesByField;
  }, [(_dataGetter$data2 = dataGetter.data) === null || _dataGetter$data2 === void 0 ? void 0 : (_dataGetter$data2$key = _dataGetter$data2.keystone) === null || _dataGetter$data2$key === void 0 ? void 0 : (_dataGetter$data2$key2 = _dataGetter$data2$key.adminMeta) === null || _dataGetter$data2$key2 === void 0 ? void 0 : (_dataGetter$data2$key3 = _dataGetter$data2$key2.list) === null || _dataGetter$data2$key3 === void 0 ? void 0 : _dataGetter$data2$key3.fields]);
  const itemViewFieldPositionsByField = useMemo(() => {
    var _dataGetter$data3, _dataGetter$data3$key, _dataGetter$data3$key2, _dataGetter$data3$key3, _dataGetter$data3$key4;
    const itemViewFieldPositionsByField = {};
    (_dataGetter$data3 = dataGetter.data) === null || _dataGetter$data3 === void 0 ? void 0 : (_dataGetter$data3$key = _dataGetter$data3.keystone) === null || _dataGetter$data3$key === void 0 ? void 0 : (_dataGetter$data3$key2 = _dataGetter$data3$key.adminMeta) === null || _dataGetter$data3$key2 === void 0 ? void 0 : (_dataGetter$data3$key3 = _dataGetter$data3$key2.list) === null || _dataGetter$data3$key3 === void 0 ? void 0 : (_dataGetter$data3$key4 = _dataGetter$data3$key3.fields) === null || _dataGetter$data3$key4 === void 0 ? void 0 : _dataGetter$data3$key4.forEach(field => {
      var _field$itemView2;
      if (field === null || field.path === null || (field === null || field === void 0 ? void 0 : (_field$itemView2 = field.itemView) === null || _field$itemView2 === void 0 ? void 0 : _field$itemView2.fieldPosition) == null) return;
      itemViewFieldPositionsByField[field.path] = field.itemView.fieldPosition;
    });
    return itemViewFieldPositionsByField;
  }, [(_dataGetter$data4 = dataGetter.data) === null || _dataGetter$data4 === void 0 ? void 0 : (_dataGetter$data4$key = _dataGetter$data4.keystone) === null || _dataGetter$data4$key === void 0 ? void 0 : (_dataGetter$data4$key2 = _dataGetter$data4$key.adminMeta) === null || _dataGetter$data4$key2 === void 0 ? void 0 : (_dataGetter$data4$key3 = _dataGetter$data4$key2.list) === null || _dataGetter$data4$key3 === void 0 ? void 0 : _dataGetter$data4$key3.fields]);
  const metaQueryErrors = dataGetter.get('keystone').errors;
  const pageTitle = list.isSingleton ? list.label : loading ? undefined : data && data.item && (data.item[list.labelField] || data.item.id) || id;
  return jsx(PageContainer, {
    title: pageTitle,
    header: jsx(ItemPageHeader, {
      list: list,
      label: loading ? 'Loading...' : data && data.item && (data.item[list.labelField] || data.item.id) || id
    })
  }, loading ? jsx(Center, {
    css: {
      height: `calc(100vh - ${HEADER_HEIGHT}px)`
    }
  }, jsx(LoadingDots, {
    label: "Loading item data",
    size: "large",
    tone: "passive"
  })) : metaQueryErrors ? jsx(Box, {
    marginY: "xlarge"
  }, jsx(Notice, {
    tone: "negative"
  }, metaQueryErrors[0].message)) : jsx(ColumnLayout, null, (data === null || data === void 0 ? void 0 : data.item) == null ? jsx(Box, {
    marginY: "xlarge"
  }, error !== null && error !== void 0 && error.graphQLErrors.length || error !== null && error !== void 0 && error.networkError ? jsx(GraphQLErrorNotice, {
    errors: error === null || error === void 0 ? void 0 : error.graphQLErrors,
    networkError: error === null || error === void 0 ? void 0 : error.networkError
  }) : list.isSingleton ? id === '1' ? jsx(Stack, {
    gap: "medium"
  }, jsx(Notice, {
    tone: "negative"
  }, list.label, " doesn't exist or you don't have access to it."), !data.keystone.adminMeta.list.hideCreate && jsx(CreateButtonLink, {
    list: list
  })) : jsx(Notice, {
    tone: "negative"
  }, "The item with id \"", id, "\" does not exist") : jsx(Notice, {
    tone: "negative"
  }, "The item with id \"", id, "\" could not be found or you don't have access to it.")) : jsx(Fragment, null, jsx(ItemForm, {
    fieldModes: itemViewFieldModesByField,
    fieldPositions: itemViewFieldPositionsByField,
    selectedFields: selectedFields,
    showDelete: !data.keystone.adminMeta.list.hideDelete,
    listKey: listKey,
    itemGetter: dataGetter.get('item'),
    item: data.item
  }))));
};

// Styled Components
// ------------------------------

const Toolbar = /*#__PURE__*/memo(function Toolbar(_ref7) {
  let {
    hasChangedFields,
    loading,
    onSave,
    onReset,
    deleteButton
  } = _ref7;
  return jsx(BaseToolbar, null, jsx(Button, {
    isDisabled: !hasChangedFields,
    isLoading: loading,
    weight: "bold",
    tone: "active",
    onClick: onSave
  }, "Save changes"), jsx(Stack, {
    align: "center",
    across: true,
    gap: "small"
  }, hasChangedFields ? jsx(ResetChangesButton, {
    onReset: onReset
  }) : jsx(Text, {
    weight: "medium",
    paddingX: "large",
    color: "neutral600"
  }, "No changes"), deleteButton));
});
function ResetChangesButton(props) {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  return jsx(Fragment, null, jsx(Button, {
    weight: "none",
    onClick: () => {
      setConfirmModalOpen(true);
    }
  }, "Reset changes"), jsx(AlertDialog, {
    actions: {
      confirm: {
        action: () => props.onReset(),
        label: 'Reset changes'
      },
      cancel: {
        action: () => setConfirmModalOpen(false),
        label: 'Cancel'
      }
    },
    isOpen: isConfirmModalOpen,
    title: "Are you sure you want to reset changes?",
    tone: "negative"
  }, null));
}
const StickySidebar = props => {
  const {
    spacing
  } = useTheme();
  return jsx("div", _extends({
    css: {
      marginTop: spacing.xlarge,
      marginBottom: spacing.xxlarge,
      position: 'sticky',
      top: spacing.xlarge
    }
  }, props));
};

export { getItemPage };
