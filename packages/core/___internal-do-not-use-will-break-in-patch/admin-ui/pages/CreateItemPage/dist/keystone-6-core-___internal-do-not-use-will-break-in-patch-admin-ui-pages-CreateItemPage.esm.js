import { jsx, Box } from '@keystone-ui/core';
import { LoadingDots } from '@keystone-ui/loading';
import { Button } from '@keystone-ui/button';
import { useRouter } from 'next/router';
import { F as Fields } from '../../../../../dist/Fields-ff30179b.esm.js';
import '../../../../../dist/getRootGraphQLFieldsFromFieldController-11021ec8.esm.js';
import 'react';
import 'fast-deep-equal';
import { P as PageContainer } from '../../../../../dist/PageContainer-0d8d0d38.esm.js';
import { useList, useKeystone } from '../../../../../admin-ui/context/dist/keystone-6-core-admin-ui-context.esm.js';
import '@babel/runtime/helpers/extends';
import 'next/link';
import 'next/head';
import '@babel/runtime/helpers/defineProperty';
import '@keystone-ui/icons/icons/AlertTriangleIcon';
import '@keystone-ui/popover';
import '@keystone-ui/icons/icons/MoreHorizontalIcon';
import '@keystone-ui/icons/icons/ChevronRightIcon';
import '../../../../../dist/SignoutButton-ef277bf5.esm.js';
import '@keystone-ui/modals';
import { u as useCreateItem } from '../../../../../dist/useCreateItem-2ddc288f.esm.js';
import { G as GraphQLErrorNotice } from '../../../../../dist/GraphQLErrorNotice-b586b151.esm.js';
import { I as ItemPageHeader, C as ColumnLayout, B as BaseToolbar } from '../../../../../dist/common-e0ed4d13.esm.js';
import '@keystone-ui/fields';
import '@emotion/weak-memoize';
import 'graphql';
import '../../../../../admin-ui/router/dist/keystone-6-core-admin-ui-router.esm.js';
import '@keystone-ui/toast';
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
import '@apollo/client';
import '../../../../../dist/admin-meta-graphql-75e8cfcb.esm.js';
import '../../../../../dist/dataGetter-54fa8f6b.esm.js';
import '@keystone-ui/notice';

/** @jsxRuntime classic */
function CreatePageForm(props) {
  var _createItem$error, _createItem$error2;
  const createItem = useCreateItem(props.list);
  const router = useRouter();
  return jsx(Box, {
    paddingTop: "xlarge"
  }, createItem.error && jsx(GraphQLErrorNotice, {
    networkError: (_createItem$error = createItem.error) === null || _createItem$error === void 0 ? void 0 : _createItem$error.networkError,
    errors: (_createItem$error2 = createItem.error) === null || _createItem$error2 === void 0 ? void 0 : _createItem$error2.graphQLErrors
  }), jsx(Fields, createItem.props), jsx(BaseToolbar, null, jsx(Button, {
    isLoading: createItem.state === 'loading',
    weight: "bold",
    tone: "active",
    onClick: async () => {
      const item = await createItem.create();
      if (item) {
        router.push(`/${props.list.path}/${item.id}`);
      }
    }
  }, "Create ", props.list.singular)));
}
const getCreateItemPage = props => () => jsx(CreateItemPage, props);
function CreateItemPage(props) {
  const list = useList(props.listKey);
  const {
    createViewFieldModes
  } = useKeystone();
  return jsx(PageContainer, {
    title: `Create ${list.singular}`,
    header: jsx(ItemPageHeader, {
      list: list,
      label: "Create"
    })
  }, jsx(ColumnLayout, null, jsx(Box, null, createViewFieldModes.state === 'error' && jsx(GraphQLErrorNotice, {
    networkError: createViewFieldModes.error instanceof Error ? createViewFieldModes.error : undefined,
    errors: createViewFieldModes.error instanceof Error ? undefined : createViewFieldModes.error
  }), createViewFieldModes.state === 'loading' && jsx(LoadingDots, {
    label: "Loading create form"
  }), jsx(CreatePageForm, {
    list: list
  }))));
}

export { getCreateItemPage };
