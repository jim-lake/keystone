import React, { useMemo, useEffect, useState, useContext, createContext } from 'react';
import { Center } from '@keystone-ui/core';
import { ToastProvider } from '@keystone-ui/toast';
import { LoadingDots } from '@keystone-ui/loading';
import { DrawerProvider } from '@keystone-ui/modals';
import { createUploadLink } from 'apollo-upload-client';
import hashString from '@emotion/hash';
import { g as getGqlNames } from '../../../dist/utils-8175c66a.esm.js';
import '../../../dist/next-fields-34f831a7.esm.js';
import '../../../dist/graphql-ts-schema-9020a95a.esm.js';
import { useLazyQuery, useQuery, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { s as staticAdminMetaQuery } from '../../../dist/admin-meta-graphql-75e8cfcb.esm.js';
import { m as makeDataGetter } from '../../../dist/dataGetter-54fa8f6b.esm.js';
import 'decimal.js';
import '@graphql-ts/schema/api-without-context';
import '@graphql-ts/schema';
import 'graphql-upload/GraphQLUpload.js';
import 'graphql';
import '@graphql-ts/extend';
import '@graphql-ts/schema/api-with-context';

const expectedExports = new Set(['Cell', 'Field', 'controller', 'CardValue']);
const adminMetaLocalStorageKey = 'keystone.adminMeta';
let _mustRenderServerResult = true;
function useMustRenderServerResult() {
  let [, forceUpdate] = useState(0);
  useEffect(() => {
    _mustRenderServerResult = false;
    forceUpdate(1);
  }, []);
  if (typeof window === 'undefined') {
    return true;
  }
  return _mustRenderServerResult;
}
function useAdminMeta(adminMetaHash, fieldViews) {
  const adminMetaFromLocalStorage = useMemo(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const item = localStorage.getItem(adminMetaLocalStorageKey);
    if (item === null) {
      return;
    }
    try {
      let parsed = JSON.parse(item);
      if (parsed.hash === adminMetaHash) {
        return parsed.meta;
      }
    } catch (err) {
      return;
    }
  }, [adminMetaHash]);

  // it seems like Apollo doesn't skip the first fetch when using skip: true so we're using useLazyQuery instead
  const [fetchStaticAdminMeta, {
    data,
    error,
    called
  }] = useLazyQuery(staticAdminMetaQuery, {
    fetchPolicy: 'network-only'
  });
  const shouldFetchAdminMeta = adminMetaFromLocalStorage === undefined && !called;
  useEffect(() => {
    if (shouldFetchAdminMeta) {
      fetchStaticAdminMeta();
    }
  }, [shouldFetchAdminMeta, fetchStaticAdminMeta]);
  const runtimeAdminMeta = useMemo(() => {
    if ((!data || error) && !adminMetaFromLocalStorage) {
      return undefined;
    }
    const adminMeta = adminMetaFromLocalStorage ? adminMetaFromLocalStorage : data.keystone.adminMeta;
    const runtimeAdminMeta = {
      lists: {}
    };
    for (const list of adminMeta.lists) {
      runtimeAdminMeta.lists[list.key] = {
        ...list,
        groups: [],
        gqlNames: getGqlNames({
          listKey: list.key,
          pluralGraphQLName: list.listQueryName
        }),
        // TODO: replace with an object
        fields: {}
      };
      for (const field of list.fields) {
        var _field$itemView$field, _field$itemView, _field$itemView$field2, _field$itemView2;
        expectedExports.forEach(exportName => {
          if (fieldViews[field.viewsIndex][exportName] === undefined) {
            throw new Error(`The view for the field at ${list.key}.${field.path} is missing the ${exportName} export`);
          }
        });
        Object.keys(fieldViews[field.viewsIndex]).forEach(exportName => {
          if (!expectedExports.has(exportName) && exportName !== 'allowedExportsOnCustomViews') {
            throw new Error(`Unexpected export named ${exportName} from the view from the field at ${list.key}.${field.path}`);
          }
        });
        const views = {
          ...fieldViews[field.viewsIndex]
        };
        const customViews = {};
        if (field.customViewsIndex !== null) {
          const customViewsSource = fieldViews[field.customViewsIndex];
          const allowedExportsOnCustomViews = new Set(views.allowedExportsOnCustomViews);
          Object.keys(customViewsSource).forEach(exportName => {
            if (allowedExportsOnCustomViews.has(exportName)) {
              customViews[exportName] = customViewsSource[exportName];
            } else if (expectedExports.has(exportName)) {
              views[exportName] = customViewsSource[exportName];
            } else {
              throw new Error(`Unexpected export named ${exportName} from the custom view from field at ${list.key}.${field.path}`);
            }
          });
        }
        runtimeAdminMeta.lists[list.key].fields[field.path] = {
          ...field,
          itemView: {
            fieldMode: (_field$itemView$field = (_field$itemView = field.itemView) === null || _field$itemView === void 0 ? void 0 : _field$itemView.fieldMode) !== null && _field$itemView$field !== void 0 ? _field$itemView$field : null,
            fieldPosition: (_field$itemView$field2 = (_field$itemView2 = field.itemView) === null || _field$itemView2 === void 0 ? void 0 : _field$itemView2.fieldPosition) !== null && _field$itemView$field2 !== void 0 ? _field$itemView$field2 : null
          },
          graphql: {
            isNonNull: field.isNonNull
          },
          views,
          controller: views.controller({
            listKey: list.key,
            fieldMeta: field.fieldMeta,
            label: field.label,
            description: field.description,
            path: field.path,
            customViews
          })
        };
      }
      for (const group of list.groups) {
        runtimeAdminMeta.lists[list.key].groups.push({
          label: group.label,
          description: group.description,
          fields: group.fields.map(field => runtimeAdminMeta.lists[list.key].fields[field.path])
        });
      }
    }
    if (typeof window !== 'undefined' && !adminMetaFromLocalStorage) {
      localStorage.setItem(adminMetaLocalStorageKey, JSON.stringify({
        hash: hashString(JSON.stringify(adminMeta)),
        meta: adminMeta
      }));
    }
    return runtimeAdminMeta;
  }, [data, error, adminMetaFromLocalStorage, fieldViews]);
  const mustRenderServerResult = useMustRenderServerResult();
  if (mustRenderServerResult) {
    return {
      state: 'loading'
    };
  }
  if (runtimeAdminMeta) {
    return {
      state: 'loaded',
      value: runtimeAdminMeta
    };
  }
  if (error) {
    return {
      state: 'error',
      error,
      refetch: async () => {
        await fetchStaticAdminMeta();
      }
    };
  }
  return {
    state: 'loading'
  };
}

function useLazyMetadata(query) {
  const result = useQuery(query, {
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return useMemo(() => {
    var _result$error, _result$error$network, _result$error2, _result$error$network2, _result$error3, _result$error$network3, _result$error4;
    const refetch = async () => {
      await result.refetch();
    };
    const dataGetter = makeDataGetter(result.data, (_result$error = result.error) === null || _result$error === void 0 ? void 0 : _result$error.graphQLErrors);
    const authenticatedItemGetter = dataGetter.get('authenticatedItem');
    const keystoneMetaGetter = dataGetter.get('keystone');
    return {
      refetch,
      authenticatedItem: getAuthenticatedItem(result, authenticatedItemGetter.errors || ((_result$error$network = (_result$error2 = result.error) === null || _result$error2 === void 0 ? void 0 : _result$error2.networkError) !== null && _result$error$network !== void 0 ? _result$error$network : undefined)),
      visibleLists: getVisibleLists(result, keystoneMetaGetter.errors || ((_result$error$network2 = (_result$error3 = result.error) === null || _result$error3 === void 0 ? void 0 : _result$error3.networkError) !== null && _result$error$network2 !== void 0 ? _result$error$network2 : undefined)),
      createViewFieldModes: getCreateViewFieldModes(result, keystoneMetaGetter.errors || ((_result$error$network3 = (_result$error4 = result.error) === null || _result$error4 === void 0 ? void 0 : _result$error4.networkError) !== null && _result$error$network3 !== void 0 ? _result$error$network3 : undefined))
    };
  }, [result]);
}
function getCreateViewFieldModes(_ref, error) {
  let {
    data
  } = _ref;
  if (error) {
    return {
      state: 'error',
      error
    };
  }
  if (data) {
    const lists = {};
    data.keystone.adminMeta.lists.forEach(list => {
      lists[list.key] = {};
      list.fields.forEach(field => {
        lists[list.key][field.path] = field.createView.fieldMode;
      });
    });
    return {
      state: 'loaded',
      lists
    };
  }
  return {
    state: 'loading'
  };
}
function getVisibleLists(_ref2, error) {
  let {
    data
  } = _ref2;
  if (error) {
    return {
      state: 'error',
      error
    };
  }
  if (data) {
    const lists = new Set();
    data.keystone.adminMeta.lists.forEach(list => {
      if (!list.isHidden) {
        lists.add(list.key);
      }
    });
    return {
      state: 'loaded',
      lists
    };
  }
  return {
    state: 'loading'
  };
}
function getAuthenticatedItem(_ref3, error) {
  let {
    data
  } = _ref3;
  if (error) {
    return {
      state: 'error',
      error
    };
  }
  if (data) {
    if (!data.authenticatedItem ||
    // this is for the case where there is a new type
    // in the AuthenticatedItem union and the query
    // that the admin ui has doesn't get the id
    // (yes, undefined is very specific and very intentional, it should not be checking for null)
    data.authenticatedItem.id === undefined) {
      return {
        state: 'unauthenticated'
      };
    }
    const labelField = Object.keys(data.authenticatedItem).filter(x => x !== '__typename' && x !== 'id')[0];
    return {
      state: 'authenticated',
      id: data.authenticatedItem.id,
      label: data.authenticatedItem[labelField] || data.authenticatedItem.id,
      listKey: data.authenticatedItem.__typename
    };
  }
  return {
    state: 'loading'
  };
}

const KeystoneContext = /*#__PURE__*/createContext(undefined);
function InternalKeystoneProvider(_ref) {
  let {
    adminConfig,
    fieldViews,
    adminMetaHash,
    children,
    lazyMetadataQuery,
    apiPath
  } = _ref;
  const adminMeta = useAdminMeta(adminMetaHash, fieldViews);
  const {
    authenticatedItem,
    visibleLists,
    createViewFieldModes,
    refetch
  } = useLazyMetadata(lazyMetadataQuery);
  const reinitContext = async () => {
    var _adminMeta$refetch;
    await (adminMeta === null || adminMeta === void 0 ? void 0 : (_adminMeta$refetch = adminMeta.refetch) === null || _adminMeta$refetch === void 0 ? void 0 : _adminMeta$refetch.call(adminMeta));
    await refetch();
  };
  if (adminMeta.state === 'loading') {
    return /*#__PURE__*/React.createElement(Center, {
      fillView: true
    }, /*#__PURE__*/React.createElement(LoadingDots, {
      label: "Loading Admin Metadata",
      size: "large"
    }));
  }
  return /*#__PURE__*/React.createElement(ToastProvider, null, /*#__PURE__*/React.createElement(DrawerProvider, null, /*#__PURE__*/React.createElement(KeystoneContext.Provider, {
    value: {
      adminConfig,
      adminMeta,
      fieldViews,
      authenticatedItem,
      reinitContext,
      visibleLists,
      createViewFieldModes,
      apiPath
    }
  }, children)));
}
const KeystoneProvider = props => {
  const apolloClient = useMemo(() => new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({
      uri: props.apiPath,
      headers: {
        'Apollo-Require-Preflight': 'true'
      }
    })
  }), [props.apiPath]);
  return /*#__PURE__*/React.createElement(ApolloProvider, {
    client: apolloClient
  }, /*#__PURE__*/React.createElement(InternalKeystoneProvider, props));
};
const useKeystone = () => {
  const value = useContext(KeystoneContext);
  if (!value) {
    throw new Error('useKeystone must be called inside a KeystoneProvider component');
  }
  if (value.adminMeta.state === 'error') {
    throw new Error('An error occurred when loading Admin Metadata');
  }
  return {
    adminConfig: value.adminConfig,
    adminMeta: value.adminMeta.value,
    authenticatedItem: value.authenticatedItem,
    visibleLists: value.visibleLists,
    createViewFieldModes: value.createViewFieldModes,
    apiPath: value.apiPath
  };
};
const useReinitContext = () => {
  const value = useContext(KeystoneContext);
  if (!value) {
    throw new Error('useReinitContext must be called inside a KeystoneProvider component');
  }
  return value.reinitContext;
};
const useRawKeystone = () => {
  const value = useContext(KeystoneContext);
  if (!value) {
    throw new Error('useRawKeystone must be called inside a KeystoneProvider component');
  }
  return value;
};
const useList = key => {
  const {
    adminMeta: {
      lists
    }
  } = useKeystone();
  if (lists[key]) {
    return lists[key];
  } else {
    throw new Error(`Invalid list key provided to useList: ${key}`);
  }
};

export { KeystoneProvider, useKeystone, useList, useRawKeystone, useReinitContext };
