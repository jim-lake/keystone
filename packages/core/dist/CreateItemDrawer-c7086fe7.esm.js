import { jsx, Box } from '@keystone-ui/core';
import { Drawer } from '@keystone-ui/modals';
import { LoadingDots } from '@keystone-ui/loading';
import { useKeystone, useList } from '../admin-ui/context/dist/keystone-6-core-admin-ui-context.esm.js';
import { F as Fields } from './Fields-6156179c.esm.js';
import { u as useCreateItem } from './useCreateItem-2ddc288f.esm.js';
import { G as GraphQLErrorNotice } from './GraphQLErrorNotice-b586b151.esm.js';

/** @jsxRuntime classic */
function CreateItemDrawer(_ref) {
  var _createItemState$erro, _createItemState$erro2;
  let {
    listKey,
    onClose,
    onCreate
  } = _ref;
  const {
    createViewFieldModes
  } = useKeystone();
  const list = useList(listKey);
  const createItemState = useCreateItem(list);
  return jsx(Drawer, {
    title: `Create ${list.singular}`,
    width: "wide",
    actions: {
      confirm: {
        label: `Create ${list.singular}`,
        loading: createItemState.state === 'loading',
        action: async () => {
          const item = await createItemState.create();
          if (item) {
            onCreate({
              id: item.id,
              label: item.label || item.id
            });
          }
        }
      },
      cancel: {
        label: 'Cancel',
        action: () => {
          if (!createItemState.shouldPreventNavigation || window.confirm('There are unsaved changes, are you sure you want to exit?')) {
            onClose();
          }
        }
      }
    }
  }, createViewFieldModes.state === 'error' && jsx(GraphQLErrorNotice, {
    networkError: createViewFieldModes.error instanceof Error ? createViewFieldModes.error : undefined,
    errors: createViewFieldModes.error instanceof Error ? undefined : createViewFieldModes.error
  }), createViewFieldModes.state === 'loading' && jsx(LoadingDots, {
    label: "Loading create form"
  }), createItemState.error && jsx(GraphQLErrorNotice, {
    networkError: (_createItemState$erro = createItemState.error) === null || _createItemState$erro === void 0 ? void 0 : _createItemState$erro.networkError,
    errors: (_createItemState$erro2 = createItemState.error) === null || _createItemState$erro2 === void 0 ? void 0 : _createItemState$erro2.graphQLErrors
  }), jsx(Box, {
    paddingY: "xlarge"
  }, jsx(Fields, createItemState.props)));
}

export { CreateItemDrawer as C };
