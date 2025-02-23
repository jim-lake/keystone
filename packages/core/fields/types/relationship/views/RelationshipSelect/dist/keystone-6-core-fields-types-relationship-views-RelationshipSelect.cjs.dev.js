'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('intersection-observer');
var React = require('react');
var core = require('@keystone-ui/core');
var fields = require('@keystone-ui/fields');
var uuid = require('uuid');
var client = require('@apollo/client');

/** @jsxRuntime classic */
function useIntersectionObserver(cb, ref) {
  const cbRef = React.useRef(cb);
  React.useEffect(() => {
    cbRef.current = cb;
  });
  React.useEffect(() => {
    let observer = new IntersectionObserver(function () {
      return cbRef.current(...arguments);
    }, {});
    let node = ref.current;
    if (node !== null) {
      observer.observe(node);
      return () => observer.unobserve(node);
    }
  }, [ref]);
}
const idValidators = {
  uuid: uuid.validate,
  cuid(value) {
    return value.startsWith('c');
  },
  autoincrement(value) {
    return /^\d+$/.test(value);
  }
};
function useDebouncedValue(value, limitMs) {
  const [debouncedValue, setDebouncedValue] = React.useState(() => value);
  React.useEffect(() => {
    let id = setTimeout(() => {
      setDebouncedValue(() => value);
    }, limitMs);
    return () => {
      clearTimeout(id);
    };
  }, [value, limitMs]);
  return debouncedValue;
}
function useFilter(search, list, searchFields) {
  return React.useMemo(() => {
    if (!search.length) return {
      OR: []
    };
    const idFieldKind = list.fields.id.controller.idFieldKind;
    const trimmedSearch = search.trim();
    const isValidId = idValidators[idFieldKind](trimmedSearch);
    const conditions = [];
    if (isValidId) {
      conditions.push({
        id: {
          equals: trimmedSearch
        }
      });
    }
    for (const fieldKey of searchFields) {
      const field = list.fields[fieldKey];
      conditions.push({
        [field.path]: {
          contains: trimmedSearch,
          mode: field.search === 'insensitive' ? 'insensitive' : undefined
        }
      });
    }
    return {
      OR: conditions
    };
  }, [search, list, searchFields]);
}
const idFieldAlias = '____id____';
const labelFieldAlias = '____label____';
const LoadingIndicatorContext = /*#__PURE__*/React.createContext({
  count: 0,
  ref: () => {}
});
const RelationshipSelect = _ref => {
  var _data$items;
  let {
    autoFocus,
    controlShouldRenderValue,
    isDisabled,
    isLoading,
    labelField,
    searchFields,
    list,
    placeholder,
    portalMenu,
    state,
    extraSelection = ''
  } = _ref;
  const [search, setSearch] = React.useState('');
  // note it's important that this is in state rather than a ref
  // because we want a re-render if the element changes
  // so that we can register the intersection observer
  // on the right element
  const [loadingIndicatorElement, setLoadingIndicatorElement] = React.useState(null);
  const QUERY = client.gql`
    query RelationshipSelect($where: ${list.gqlNames.whereInputName}!, $take: Int!, $skip: Int!) {
      items: ${list.gqlNames.listQueryName}(where: $where, take: $take, skip: $skip) {
        ${idFieldAlias}: id
        ${labelFieldAlias}: ${labelField}
        ${extraSelection}
      }
      count: ${list.gqlNames.listQueryCountName}(where: $where)
    }
  `;
  const debouncedSearch = useDebouncedValue(search, 200);
  const where = useFilter(debouncedSearch, list, searchFields);
  const link = client.useApolloClient().link;
  // we're using a local apollo client here because writing a global implementation of the typePolicies
  // would require making assumptions about how pagination should work which won't always be right
  const apolloClient = React.useMemo(() => new client.ApolloClient({
    link,
    cache: new client.InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            [list.gqlNames.listQueryName]: {
              keyArgs: ['where'],
              merge: (existing, incoming, _ref2) => {
                let {
                  args
                } = _ref2;
                const merged = existing ? existing.slice() : [];
                const {
                  skip
                } = args;
                for (let i = 0; i < incoming.length; ++i) {
                  merged[skip + i] = incoming[i];
                }
                return merged;
              }
            }
          }
        }
      }
    })
  }), [link, list.gqlNames.listQueryName]);
  const initialItemsToLoad = Math.min(list.pageSize, 10);
  const subsequentItemsToLoad = Math.min(list.pageSize, 50);
  const {
    data,
    error,
    loading,
    fetchMore
  } = client.useQuery(QUERY, {
    fetchPolicy: 'network-only',
    variables: {
      where,
      take: initialItemsToLoad,
      skip: 0
    },
    client: apolloClient
  });
  const count = (data === null || data === void 0 ? void 0 : data.count) || 0;
  const options = (data === null || data === void 0 ? void 0 : (_data$items = data.items) === null || _data$items === void 0 ? void 0 : _data$items.map(_ref3 => {
    let {
      [idFieldAlias]: value,
      [labelFieldAlias]: label,
      ...data
    } = _ref3;
    return {
      value,
      label: label || value,
      data
    };
  })) || [];
  const loadingIndicatorContextVal = React.useMemo(() => ({
    count,
    ref: setLoadingIndicatorElement
  }), [count]);

  // we want to avoid fetching more again and `loading` from Apollo
  // doesn't seem to become true when fetching more
  const [lastFetchMore, setLastFetchMore] = React.useState(null);
  useIntersectionObserver(_ref4 => {
    let [{
      isIntersecting
    }] = _ref4;
    const skip = data === null || data === void 0 ? void 0 : data.items.length;
    if (!loading && skip && isIntersecting && options.length < count && ((lastFetchMore === null || lastFetchMore === void 0 ? void 0 : lastFetchMore.extraSelection) !== extraSelection || (lastFetchMore === null || lastFetchMore === void 0 ? void 0 : lastFetchMore.where) !== where || (lastFetchMore === null || lastFetchMore === void 0 ? void 0 : lastFetchMore.list) !== list || (lastFetchMore === null || lastFetchMore === void 0 ? void 0 : lastFetchMore.skip) !== skip)) {
      const QUERY = client.gql`
              query RelationshipSelectMore($where: ${list.gqlNames.whereInputName}!, $take: Int!, $skip: Int!) {
                items: ${list.gqlNames.listQueryName}(where: $where, take: $take, skip: $skip) {
                  ${labelFieldAlias}: ${labelField}
                  ${idFieldAlias}: id
                  ${extraSelection}
                }
              }
            `;
      setLastFetchMore({
        extraSelection,
        list,
        skip,
        where
      });
      fetchMore({
        query: QUERY,
        variables: {
          where,
          take: subsequentItemsToLoad,
          skip
        }
      }).then(() => {
        setLastFetchMore(null);
      }).catch(() => {
        setLastFetchMore(null);
      });
    }
  }, {
    current: loadingIndicatorElement
  });

  // TODO: better error UI
  // TODO: Handle permission errors
  // (ie; user has permission to read this relationship field, but
  // not the related list, or some items on the list)
  if (error) {
    return core.jsx("span", null, "Error");
  }
  if (state.kind === 'one') {
    return core.jsx(LoadingIndicatorContext.Provider, {
      value: loadingIndicatorContextVal
    }, core.jsx(fields.Select
    // this is necessary because react-select passes a second argument to onInputChange
    // and useState setters log a warning if a second argument is passed
    , {
      onInputChange: val => setSearch(val),
      isLoading: loading || isLoading,
      autoFocus: autoFocus,
      components: relationshipSelectComponents,
      portalMenu: portalMenu,
      value: state.value ? {
        value: state.value.id,
        label: state.value.label,
        // @ts-ignore
        data: state.value.data
      } : null,
      options: options,
      onChange: value => {
        state.onChange(value ? {
          id: value.value,
          label: value.label,
          data: value.data
        } : null);
      },
      placeholder: placeholder,
      controlShouldRenderValue: controlShouldRenderValue,
      isClearable: controlShouldRenderValue,
      isDisabled: isDisabled
    }));
  }
  return core.jsx(LoadingIndicatorContext.Provider, {
    value: loadingIndicatorContextVal
  }, core.jsx(fields.MultiSelect // this is necessary because react-select passes a second argument to onInputChange
  // and useState setters log a warning if a second argument is passed
  , {
    onInputChange: val => setSearch(val),
    isLoading: loading || isLoading,
    autoFocus: autoFocus,
    components: relationshipSelectComponents,
    portalMenu: portalMenu,
    value: state.value.map(value => ({
      value: value.id,
      label: value.label,
      data: value.data
    })),
    options: options,
    onChange: value => {
      state.onChange(value.map(x => ({
        id: x.value,
        label: x.label,
        data: x.data
      })));
    },
    placeholder: placeholder,
    controlShouldRenderValue: controlShouldRenderValue,
    isClearable: controlShouldRenderValue,
    isDisabled: isDisabled
  }));
};
const relationshipSelectComponents = {
  MenuList: _ref5 => {
    let {
      children,
      ...props
    } = _ref5;
    const {
      count,
      ref
    } = React.useContext(LoadingIndicatorContext);
    return core.jsx(fields.selectComponents.MenuList, props, children, core.jsx("div", {
      css: {
        textAlign: 'center'
      },
      ref: ref
    }, props.options.length < count && core.jsx("span", {
      css: {
        padding: 8
      }
    }, "Loading...")));
  }
};

exports.RelationshipSelect = RelationshipSelect;
exports.useFilter = useFilter;
