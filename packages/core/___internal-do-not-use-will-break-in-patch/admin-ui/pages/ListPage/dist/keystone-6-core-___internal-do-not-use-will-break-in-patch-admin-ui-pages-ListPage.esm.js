import _extends from '@babel/runtime/helpers/esm/extends';
import { useEffect, useMemo, Fragment, useState } from 'react';
import { Button } from '@keystone-ui/button';
import { useTheme, jsx, Stack, Box, VisuallyHidden, Heading, Divider, Inline, Center } from '@keystone-ui/core';
import { Select, TextInput, CheckboxControl } from '@keystone-ui/fields';
import { ArrowRightCircleIcon } from '@keystone-ui/icons/icons/ArrowRightCircleIcon';
import { LoadingDots } from '@keystone-ui/loading';
import { AlertDialog } from '@keystone-ui/modals';
import { useToasts } from '@keystone-ui/toast';
import { SearchIcon } from '@keystone-ui/icons/icons/SearchIcon';
import { m as makeDataGetter } from '../../../../../dist/dataGetter-54fa8f6b.esm.js';
import '../../../../../dist/Fields-6156179c.esm.js';
import { g as getRootGraphQLFieldsFromFieldController } from '../../../../../dist/getRootGraphQLFieldsFromFieldController-11021ec8.esm.js';
import 'fast-deep-equal';
import { gql, useQuery, useMutation } from '@apollo/client';
import { C as CellLink } from '../../../../../dist/CellLink-c169ac58.esm.js';
import '@babel/runtime/helpers/defineProperty';
import '@keystone-ui/icons/icons/AlertTriangleIcon';
import 'next/link';
import { useList } from '../../../../../admin-ui/context/dist/keystone-6-core-admin-ui-context.esm.js';
import { useRouter } from 'next/router';
import { Popover, usePopover, PopoverDialog } from '@keystone-ui/popover';
import '@keystone-ui/icons/icons/MoreHorizontalIcon';
import { ChevronRightIcon as ChevronRightIcon$1 } from '@keystone-ui/icons/icons/ChevronRightIcon';
import { Link } from '../../../../../admin-ui/router/dist/keystone-6-core-admin-ui-router.esm.js';
import '../../../../../dist/SignoutButton-ef277bf5.esm.js';
import { P as PageContainer, H as HEADER_HEIGHT } from '../../../../../dist/PageContainer-0d8d0d38.esm.js';
import '@keystone-ui/notice';
import { ChevronLeftIcon, ChevronRightIcon } from '@keystone-ui/icons';
import { useFilter } from '../../../../../fields/types/relationship/views/RelationshipSelect/dist/keystone-6-core-fields-types-relationship-views-RelationshipSelect.esm.js';
import { C as CreateButtonLink } from '../../../../../dist/CreateButtonLink-41201098.esm.js';
import { ChevronDownIcon } from '@keystone-ui/icons/icons/ChevronDownIcon';
import { Options, OptionPrimitive, CheckMark } from '@keystone-ui/options';
import 'next/head';
import { ChevronLeftIcon as ChevronLeftIcon$1 } from '@keystone-ui/icons/icons/ChevronLeftIcon';
import { Pill } from '@keystone-ui/pill';
import '@emotion/weak-memoize';
import 'graphql';
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
import 'intersection-observer';
import 'uuid';

/** @jsxRuntime classic */
const getPaginationStats = _ref => {
  let {
    list,
    pageSize,
    currentPage,
    total
  } = _ref;
  let stats = '';
  if (total > pageSize) {
    const start = pageSize * (currentPage - 1) + 1;
    const end = Math.min(start + pageSize - 1, total);
    stats = `${start} - ${end} of ${total} ${list.plural}`;
  } else {
    if (total > 1 && list.plural) {
      stats = `${total} ${list.plural}`;
    } else if (total === 1 && list.singular) {
      stats = `${total} ${list.singular}`;
    }
  }
  return {
    stats
  };
};
function Pagination(_ref2) {
  let {
    currentPage,
    total,
    pageSize,
    list
  } = _ref2;
  const {
    query,
    pathname,
    push
  } = useRouter();
  const {
    stats
  } = getPaginationStats({
    list,
    currentPage,
    total,
    pageSize
  });
  const {
    opacity
  } = useTheme();
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;
  const minPage = 1;
  const nxtQuery = {
    ...query,
    page: nextPage
  };
  const prevQuery = {
    ...query,
    page: prevPage
  };
  const limit = Math.ceil(total / pageSize);
  const pages = [];
  useEffect(() => {
    // Check if the current page is larger than
    // the maximal page given the total and associated page size value.
    // (This could happen due to a deletion event, in which case we want to reroute the user to a previous page).
    if (currentPage > Math.ceil(total / pageSize)) {
      push({
        pathname,
        query: {
          ...query,
          page: Math.ceil(total / pageSize)
        }
      });
    }
  }, [total, pageSize, currentPage, pathname, query, push]);

  // Don't render the pagiantion component if the pageSize is greater than the total number of items in the list.
  if (total <= pageSize) return null;
  const onChange = selectedOption => {
    push({
      pathname,
      query: {
        ...query,
        page: selectedOption.value
      }
    });
  };
  for (let page = minPage; page <= limit; page++) {
    pages.push({
      label: String(page),
      value: String(page)
    });
  }
  return jsx(Stack, {
    as: "nav",
    role: "navigation",
    "aria-label": "Pagination",
    paddingLeft: "medium",
    paddingRight: "medium",
    paddingTop: "large",
    paddingBottom: "large",
    across: true,
    align: "center",
    css: {
      width: '100%',
      justifyContent: 'space-between'
    }
  }, jsx(Stack, {
    across: true,
    gap: "xxlarge",
    align: "center"
  }, jsx("span", null, `${list.plural} per page: ${pageSize}`), jsx("span", null, jsx("strong", null, stats))), jsx(Stack, {
    gap: "medium",
    across: true,
    align: "center"
  }, jsx(Select, {
    width: "medium",
    value: {
      label: String(currentPage),
      value: String(currentPage)
    },
    options: pages,
    styles: {
      valueContainer: provided => ({
        ...provided,
        paddingLeft: '12px',
        paddingRight: '16px'
      })
    },
    menuPortalTarget: document.body,
    onChange: onChange
  }), jsx("span", null, "of ", limit), jsx(Link, {
    "aria-label": "Previous page",
    css: {
      color: '#415269',
      ...(prevPage < minPage && {
        pointerEvents: 'none',
        opacity: opacity.disabled
      })
    },
    href: {
      query: prevQuery
    }
  }, jsx(ChevronLeftIcon, null)), jsx(Link, {
    "aria-label": "Next page",
    css: {
      color: '#415269',
      ...(nextPage > limit && {
        pointerEvents: 'none',
        opacity: opacity.disabled
      })
    },
    href: {
      query: nxtQuery
    }
  }, jsx(ChevronRightIcon, null))));
}
function PaginationLabel(_ref3) {
  let {
    currentPage,
    pageSize,
    plural,
    singular,
    total
  } = _ref3;
  const {
    stats
  } = getPaginationStats({
    list: {
      plural,
      singular
    },
    currentPage,
    total,
    pageSize
  });
  if (!total) {
    return jsx("span", null, "No ", plural);
  }
  return jsx("span", null, "Showing ", jsx("strong", null, stats));
}

function useSelectedFields(list, fieldModesByFieldPath) {
  const {
    query
  } = useRouter();
  const selectedFieldsFromUrl = typeof query.fields === 'string' ? query.fields : '';
  return useMemo(() => {
    let selectedFieldsArray = selectedFieldsFromUrl ? selectedFieldsFromUrl.split(',') : list.initialColumns;
    let fields = selectedFieldsArray.filter(field => {
      return fieldModesByFieldPath[field] === 'read';
    });
    return new Set(fields.length === 0 ? [list.labelField] : fields);
  }, [list, selectedFieldsFromUrl, fieldModesByFieldPath]);
}

function isArrayEqual(arrA, arrB) {
  if (arrA.length !== arrB.length) return false;
  for (let i = 0; i < arrA.length; i++) {
    if (arrA[i] !== arrB[i]) {
      return false;
    }
  }
  return true;
}
const Option = props => {
  return jsx(OptionPrimitive, props, props.children, jsx(CheckMark, {
    isDisabled: props.isDisabled,
    isFocused: props.isFocused,
    isSelected: props.isSelected
  }));
};

// TODO: return type required by pnpm :(
const fieldSelectionOptionsComponents = {
  Option
};
function FieldSelection(_ref) {
  let {
    list,
    fieldModesByFieldPath
  } = _ref;
  const router = useRouter();
  const selectedFields = useSelectedFields(list, fieldModesByFieldPath);
  const setNewSelectedFields = selectedFields => {
    if (isArrayEqual(selectedFields, list.initialColumns)) {
      const {
        fields: _ignore,
        ...otherQueryFields
      } = router.query;
      router.push({
        query: otherQueryFields
      });
    } else {
      router.push({
        query: {
          ...router.query,
          fields: selectedFields.join(',')
        }
      });
    }
  };
  const fields = [];
  Object.keys(fieldModesByFieldPath).forEach(fieldPath => {
    if (fieldModesByFieldPath[fieldPath] === 'read') {
      fields.push({
        value: fieldPath,
        label: list.fields[fieldPath].label,
        isDisabled: selectedFields.size === 1 && selectedFields.has(fieldPath)
      });
    }
  });
  return jsx(Popover, {
    "aria-label": `Columns options, list of column options to apply to the ${list.key} list`,
    triggerRenderer: _ref2 => {
      let {
        triggerProps
      } = _ref2;
      return jsx(Button, _extends({
        weight: "link",
        css: {
          padding: 4
        }
      }, triggerProps), jsx("span", {
        css: {
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }, selectedFields.size, " column", selectedFields.size === 1 ? '' : 's', ' ', jsx(ChevronDownIcon, {
        size: "smallish"
      })));
    }
  }, jsx("div", {
    css: {
      width: 320
    }
  }, jsx(Box, {
    padding: "medium"
  }, jsx(Options, {
    onChange: options => {
      if (!Array.isArray(options)) return;
      setNewSelectedFields(options.map(x => x.value));
    },
    isMulti: true,
    value: fields.filter(option => selectedFields.has(option.value)),
    options: fields,
    components: fieldSelectionOptionsComponents
  }))));
}

const fieldSelectComponents = {
  Option: _ref => {
    let {
      children,
      ...props
    } = _ref;
    let theme = useTheme();
    let iconColor = props.isFocused ? theme.colors.foreground : theme.colors.foregroundDim;
    return jsx(OptionPrimitive, props, jsx("span", null, children), jsx("div", {
      css: {
        alignItems: 'center',
        display: 'flex',
        height: 24,
        justifyContent: 'center',
        width: 24
      }
    }, jsx(ChevronRightIcon$1, {
      css: {
        color: iconColor
      }
    })));
  }
};
function FilterAdd(_ref2) {
  let {
    listKey,
    filterableFields
  } = _ref2;
  const {
    isOpen,
    setOpen,
    trigger,
    dialog,
    arrow
  } = usePopover({
    placement: 'bottom',
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    }]
  });
  return jsx(Fragment, null, jsx(Button, _extends({
    tone: "active"
  }, trigger.props, {
    ref: trigger.ref,
    onClick: () => setOpen(!isOpen)
  }), jsx(Box, {
    as: "span",
    marginRight: "xsmall"
  }, "Filter List"), jsx(ChevronDownIcon, {
    size: "small"
  })), jsx(PopoverDialog, _extends({
    "aria-label": `Filters options, list of filters to apply to the ${listKey} list`,
    arrow: arrow,
    isVisible: isOpen
  }, dialog.props, {
    ref: dialog.ref
  }), isOpen && jsx(FilterAddPopoverContent, {
    onClose: () => {
      setOpen(false);
    },
    listKey: listKey,
    filterableFields: filterableFields
  })));
}
function FilterAddPopoverContent(_ref3) {
  let {
    onClose,
    listKey,
    filterableFields
  } = _ref3;
  const list = useList(listKey);
  const router = useRouter();
  const fieldsWithFilters = useMemo(() => {
    const fieldsWithFilters = {};
    Object.keys(list.fields).forEach(fieldPath => {
      const field = list.fields[fieldPath];
      if (filterableFields.has(fieldPath) && field.controller.filter) {
        fieldsWithFilters[fieldPath] = field;
      }
    });
    return fieldsWithFilters;
  }, [list.fields, filterableFields]);
  const filtersByFieldThenType = useMemo(() => {
    const filtersByFieldThenType = {};
    Object.keys(fieldsWithFilters).forEach(fieldPath => {
      const field = fieldsWithFilters[fieldPath];
      let hasUnusedFilters = false;
      const filters = {};
      Object.keys(field.controller.filter.types).forEach(filterType => {
        if (router.query[`!${fieldPath}_${filterType}`] === undefined) {
          hasUnusedFilters = true;
          filters[filterType] = field.controller.filter.types[filterType].label;
        }
      });
      if (hasUnusedFilters) {
        filtersByFieldThenType[fieldPath] = filters;
      }
    });
    return filtersByFieldThenType;
  }, [router.query, fieldsWithFilters]);
  const [state, setState] = useState({
    kind: 'selecting-field'
  });
  return jsx(Stack, {
    padding: "medium",
    as: "form",
    css: {
      minWidth: 320
    },
    onSubmit: event => {
      event.preventDefault();
      if (state.kind === 'filter-value') {
        router.push({
          query: {
            ...router.query,
            [`!${state.fieldPath}_${state.filterType}`]: JSON.stringify(state.filterValue)
          }
        });
        onClose();
      }
    },
    gap: "small"
  }, jsx("div", {
    css: {
      position: 'relative'
    }
  }, state.kind !== 'selecting-field' && jsx("button", {
    type: "button",
    onClick: () => {
      setState({
        kind: 'selecting-field'
      });
    },
    css: {
      border: 0,
      background: 'transparent',
      cursor: 'pointer',
      position: 'absolute'
    }
  }, jsx(VisuallyHidden, null, "Back"), jsx(ChevronLeftIcon$1, {
    size: "smallish"
  })), jsx(Heading, {
    textAlign: "center",
    type: "h5"
  }, (() => {
    switch (state.kind) {
      case 'selecting-field':
        {
          return 'Filter';
        }
      case 'filter-value':
        {
          return list.fields[state.fieldPath].label;
        }
    }
  })())), jsx(Divider, null), state.kind === 'selecting-field' && jsx(Options, {
    components: fieldSelectComponents,
    onChange: newVal => {
      const fieldPath = newVal.value;
      const filterType = Object.keys(filtersByFieldThenType[fieldPath])[0];
      setState({
        kind: 'filter-value',
        fieldPath,
        filterType,
        filterValue: fieldsWithFilters[fieldPath].controller.filter.types[filterType].initialValue
      });
    },
    options: Object.keys(filtersByFieldThenType).map(fieldPath => ({
      label: fieldsWithFilters[fieldPath].label,
      value: fieldPath
    }))
  }), state.kind === 'filter-value' && jsx(Select, {
    width: "full",
    value: {
      value: state.filterType,
      label: filtersByFieldThenType[state.fieldPath][state.filterType]
    },
    onChange: newVal => {
      if (newVal) {
        setState({
          kind: 'filter-value',
          fieldPath: state.fieldPath,
          filterValue: fieldsWithFilters[state.fieldPath].controller.filter.types[newVal.value].initialValue,
          filterType: newVal.value
        });
      }
    },
    options: Object.keys(filtersByFieldThenType[state.fieldPath]).map(filterType => ({
      label: filtersByFieldThenType[state.fieldPath][filterType],
      value: filterType
    }))
  }), state.kind == 'filter-value' && (() => {
    const {
      Filter
    } = fieldsWithFilters[state.fieldPath].controller.filter;
    return jsx(Filter, {
      type: state.filterType,
      value: state.filterValue,
      onChange: value => {
        setState(state => ({
          ...state,
          filterValue: value
        }));
      }
    });
  })(), state.kind == 'filter-value' && jsx("div", {
    css: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, jsx(Button, {
    onClick: onClose
  }, "Cancel"), jsx(Button, {
    type: "submit"
  }, "Apply")));
}

function FilterList(_ref) {
  let {
    filters,
    list
  } = _ref;
  return jsx(Inline, {
    gap: "small"
  }, filters.map(filter => {
    const field = list.fields[filter.field];
    return jsx(FilterPill, {
      key: `${filter.field}_${filter.type}`,
      field: field,
      filter: filter
    });
  }));
}
function FilterPill(_ref2) {
  let {
    filter,
    field
  } = _ref2;
  const router = useRouter();
  const {
    isOpen,
    setOpen,
    trigger,
    dialog,
    arrow
  } = usePopover({
    placement: 'bottom',
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    }]
  });
  // doing this because returning a string from Label will be VERY common
  // but https://github.com/microsoft/TypeScript/issues/21699 isn't resolved yet
  const Label = field.controller.filter.Label;
  return jsx(Fragment, null, jsx(Pill, _extends({
    containerProps: {
      'aria-label': `Filter item ${filter.field}, press to edit filter`
    }
  }, trigger.props, {
    ref: trigger.ref,
    onClick: () => setOpen(!isOpen),
    weight: "light",
    tone: "passive",
    onRemove: () => {
      const {
        [`!${filter.field}_${filter.type}`]: _ignore,
        ...queryToKeep
      } = router.query;
      router.push({
        pathname: router.pathname,
        query: queryToKeep
      });
    }
  }), field.label, ' ', jsx(Label, {
    label: field.controller.filter.types[filter.type].label,
    type: filter.type,
    value: filter.value
  })), jsx(PopoverDialog, _extends({
    "aria-label": `filter item config, dialog for configuring ${filter.field} filter`,
    arrow: arrow
  }, dialog.props, {
    isVisible: isOpen,
    ref: dialog.ref
  }), isOpen && jsx(EditDialog, {
    onClose: () => {
      setOpen(false);
    },
    field: field,
    filter: filter
  })));
}
function EditDialog(_ref3) {
  let {
    filter,
    field,
    onClose
  } = _ref3;
  const Filter = field.controller.filter.Filter;
  const router = useRouter();
  const [value, setValue] = useState(filter.value);
  return jsx(Stack, {
    as: "form",
    padding: "small",
    gap: "small",
    onSubmit: event => {
      event.preventDefault();
      router.push({
        query: {
          ...router.query,
          [`!${filter.field}_${filter.type}`]: JSON.stringify(value)
        }
      });
      onClose();
    }
  }, jsx(Filter, {
    type: filter.type,
    value: value,
    onChange: setValue
  }), jsx("div", {
    css: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, jsx(Button, {
    onClick: onClose
  }, "Cancel"), jsx(Button, {
    type: "submit"
  }, "Save")));
}

function useSort(list, orderableFields) {
  const {
    query
  } = useRouter();
  let sortByFromUrl = typeof query.sortBy === 'string' ? query.sortBy : '';
  return useMemo(() => {
    if (sortByFromUrl === '') {
      if (!list.initialSort || !orderableFields.has(list.initialSort.field)) {
        return null;
      }
      return list.initialSort;
    }
    let direction = 'ASC';
    let sortByField = sortByFromUrl;
    if (sortByFromUrl.charAt(0) === '-') {
      sortByField = sortByFromUrl.slice(1);
      direction = 'DESC';
    }
    if (!orderableFields.has(sortByField)) return null;
    return {
      field: sortByField,
      direction
    };
  }, [sortByFromUrl, list, orderableFields]);
}

function SortSelection(_ref) {
  let {
    list,
    orderableFields
  } = _ref;
  const sort = useSort(list, orderableFields);
  const {
    isOpen,
    setOpen,
    trigger,
    dialog,
    arrow
  } = usePopover({
    placement: 'bottom',
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    }]
  });
  return jsx(Fragment, null, jsx(Button, _extends({}, trigger.props, {
    weight: "link",
    css: {
      padding: 4
    },
    ref: trigger.ref,
    onClick: () => setOpen(!isOpen)
  }), jsx("span", {
    css: {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, sort ? `${list.fields[sort.field].label} ${{
    ASC: 'ascending',
    DESC: 'descending'
  }[sort.direction]}` : 'No field', jsx(ChevronDownIcon, {
    size: "smallish"
  }))), jsx(PopoverDialog, _extends({
    "aria-label": `Sort options, list of sorting parameters to apply to the ${list.key} list`,
    arrow: arrow,
    isVisible: isOpen
  }, dialog.props, {
    ref: dialog.ref
  }), isOpen && jsx(SortSelectionPopoverContent, {
    onClose: () => {
      setOpen(false);
    },
    list: list,
    orderableFields: orderableFields
  })));
}
const noFieldOption = {
  label: 'No field',
  value: '___________NO_FIELD___________'
};
function SortSelectionPopoverContent(_ref2) {
  let {
    onClose,
    list,
    orderableFields
  } = _ref2;
  const sort = useSort(list, orderableFields);
  const router = useRouter();
  return jsx(Stack, {
    padding: "medium",
    css: {
      minWidth: 320
    },
    gap: "small"
  }, jsx("div", {
    css: {
      position: 'relative'
    }
  }, jsx(Heading, {
    textAlign: "center",
    type: "h5"
  }, "Sort")), jsx(Divider, null), jsx(Options, {
    value: sort ? {
      label: list.fields[sort.field].label,
      value: sort.field
    } : noFieldOption,
    components: fieldSelectionOptionsComponents,
    onChange: newVal => {
      const fieldPath = newVal.value;
      if (fieldPath === noFieldOption.value) {
        const {
          sortBy,
          ...restOfQuery
        } = router.query;
        router.push({
          query: restOfQuery
        });
      } else {
        router.push({
          query: {
            ...router.query,
            sortBy: (sort === null || sort === void 0 ? void 0 : sort.field) === fieldPath && sort.direction === 'ASC' ? `-${sort.field}` : fieldPath
          }
        });
      }
      onClose();
    },
    options: [...orderableFields].map(fieldPath => ({
      label: list.fields[fieldPath].label,
      value: fieldPath
    })).concat(noFieldOption)
  }));
}

function useFilters(list, filterableFields) {
  const {
    query
  } = useRouter();
  const possibleFilters = useMemo(() => {
    const possibleFilters = {};
    Object.entries(list.fields).forEach(_ref => {
      let [fieldPath, field] = _ref;
      if (field.controller.filter && filterableFields.has(fieldPath)) {
        Object.keys(field.controller.filter.types).forEach(type => {
          possibleFilters[`!${fieldPath}_${type}`] = {
            type,
            field: fieldPath
          };
        });
      }
    });
    return possibleFilters;
  }, [list, filterableFields]);
  const filters = useMemo(() => {
    let filters = [];
    Object.keys(query).forEach(key => {
      const filter = possibleFilters[key];
      const val = query[key];
      if (filter && typeof val === 'string') {
        let value;
        try {
          value = JSON.parse(val);
        } catch (err) {}
        if (val !== undefined) {
          filters.push({
            ...filter,
            value
          });
        }
      }
    });
    const where = filters.reduce((_where, filter) => {
      return Object.assign(_where, list.fields[filter.field].controller.filter.graphql({
        type: filter.type,
        value: filter.value
      }));
    }, {});
    if (list.isSingleton) return {
      filters,
      where: {
        id: {
          equals: 1
        },
        AND: [where]
      }
    };
    return {
      filters,
      where
    };
  }, [query, possibleFilters, list]);
  return filters;
}

let listMetaGraphqlQuery = gql`
  query ($listKey: String!) {
    keystone {
      adminMeta {
        list(key: $listKey) {
          hideDelete
          hideCreate
          fields {
            path
            isOrderable
            isFilterable
            listView {
              fieldMode
            }
          }
        }
      }
    }
  }
`;
const storeableQueries = ['sortBy', 'fields'];
function useQueryParamsFromLocalStorage(listKey) {
  const router = useRouter();
  const localStorageKey = `keystone.list.${listKey}.list.page.info`;
  const resetToDefaults = () => {
    localStorage.removeItem(localStorageKey);
    router.replace({
      pathname: router.pathname
    });
  };

  // GET QUERY FROM CACHE IF CONDITIONS ARE RIGHT
  // MERGE QUERY PARAMS FROM CACHE WITH QUERY PARAMS FROM ROUTER
  useEffect(() => {
    let hasSomeQueryParamsWhichAreAboutListPage = Object.keys(router.query).some(x => {
      return x.startsWith('!') || storeableQueries.includes(x);
    });
    if (!hasSomeQueryParamsWhichAreAboutListPage && router.isReady) {
      const queryParamsFromLocalStorage = localStorage.getItem(localStorageKey);
      let parsed;
      try {
        parsed = JSON.parse(queryParamsFromLocalStorage);
      } catch (err) {}
      if (parsed) {
        router.replace({
          query: {
            ...router.query,
            ...parsed
          }
        });
      }
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [localStorageKey, router.isReady]);
  useEffect(() => {
    let queryParamsToSerialize = {};
    Object.keys(router.query).forEach(key => {
      if (key.startsWith('!') || storeableQueries.includes(key)) {
        queryParamsToSerialize[key] = router.query[key];
      }
    });
    if (Object.keys(queryParamsToSerialize).length) {
      localStorage.setItem(localStorageKey, JSON.stringify(queryParamsToSerialize));
    } else {
      localStorage.removeItem(localStorageKey);
    }
  }, [localStorageKey, router]);
  return {
    resetToDefaults
  };
}
const getListPage = props => () => jsx(ListPage, props);
const ListPage = _ref => {
  var _metaQuery$data2, _metaQuery$data2$keys, _metaQuery$data$keyst2, _metaQuery$data3, _metaQuery$data3$keys;
  let {
    listKey
  } = _ref;
  const list = useList(listKey);
  const {
    query,
    push
  } = useRouter();
  const {
    resetToDefaults
  } = useQueryParamsFromLocalStorage(listKey);
  const currentPage = typeof query.page === 'string' && !Number.isNaN(parseInt(query.page)) ? Number(query.page) : 1;
  const pageSize = typeof query.pageSize === 'string' && !Number.isNaN(parseInt(query.pageSize)) ? parseInt(query.pageSize) : list.pageSize;
  const metaQuery = useQuery(listMetaGraphqlQuery, {
    variables: {
      listKey
    }
  });
  let {
    listViewFieldModesByField,
    filterableFields,
    orderableFields
  } = useMemo(() => {
    const listViewFieldModesByField = {};
    const orderableFields = new Set();
    const filterableFields = new Set();
    for (const field of ((_metaQuery$data = metaQuery.data) === null || _metaQuery$data === void 0 ? void 0 : (_metaQuery$data$keyst = _metaQuery$data.keystone.adminMeta.list) === null || _metaQuery$data$keyst === void 0 ? void 0 : _metaQuery$data$keyst.fields) || []) {
      var _metaQuery$data, _metaQuery$data$keyst;
      listViewFieldModesByField[field.path] = field.listView.fieldMode;
      if (field.isOrderable) {
        orderableFields.add(field.path);
      }
      if (field.isFilterable) {
        filterableFields.add(field.path);
      }
    }
    return {
      listViewFieldModesByField,
      orderableFields,
      filterableFields
    };
  }, [(_metaQuery$data2 = metaQuery.data) === null || _metaQuery$data2 === void 0 ? void 0 : (_metaQuery$data2$keys = _metaQuery$data2.keystone.adminMeta.list) === null || _metaQuery$data2$keys === void 0 ? void 0 : _metaQuery$data2$keys.fields]);
  const sort = useSort(list, orderableFields);
  const filters = useFilters(list, filterableFields);
  const searchFields = Object.keys(list.fields).filter(key => list.fields[key].search);
  const searchLabels = searchFields.map(key => list.fields[key].label);
  const searchParam = typeof query.search === 'string' ? query.search : '';
  const [searchString, updateSearchString] = useState(searchParam);
  const search = useFilter(searchParam, list, searchFields);
  const updateSearch = value => {
    const {
      search,
      ...queries
    } = query;
    if (value.trim()) {
      push({
        query: {
          ...queries,
          search: value
        }
      });
    } else {
      push({
        query: queries
      });
    }
  };
  let selectedFields = useSelectedFields(list, listViewFieldModesByField);
  let {
    data: newData,
    error: newError,
    refetch
  } = useQuery(useMemo(() => {
    let selectedGqlFields = [...selectedFields].map(fieldPath => {
      return list.fields[fieldPath].controller.graphqlSelection;
    }).join('\n');
    return gql`
      query ($where: ${list.gqlNames.whereInputName}, $take: Int!, $skip: Int!, $orderBy: [${list.gqlNames.listOrderName}!]) {
        items: ${list.gqlNames.listQueryName}(where: $where,take: $take, skip: $skip, orderBy: $orderBy) {
          ${
    // TODO: maybe namespace all the fields instead of doing this
    selectedFields.has('id') ? '' : 'id'}
          ${selectedGqlFields}
        }
        count: ${list.gqlNames.listQueryCountName}(where: $where)
      }
    `;
  }, [list, selectedFields]), {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    skip: !metaQuery.data,
    variables: {
      where: {
        ...filters.where,
        ...search
      },
      take: pageSize,
      skip: (currentPage - 1) * pageSize,
      orderBy: sort ? [{
        [sort.field]: sort.direction.toLowerCase()
      }] : undefined
    }
  });
  let [dataState, setDataState] = useState({
    data: newData,
    error: newError
  });
  if (newData && dataState.data !== newData) {
    setDataState({
      data: newData,
      error: newError
    });
  }
  const {
    data,
    error
  } = dataState;
  const dataGetter = makeDataGetter(data, error === null || error === void 0 ? void 0 : error.graphQLErrors);
  const [selectedItemsState, setSelectedItems] = useState(() => ({
    itemsFromServer: undefined,
    selectedItems: new Set()
  }));

  // this removes the selected items which no longer exist when the data changes
  // because someone goes to another page, changes filters or etc.
  if (data && data.items && selectedItemsState.itemsFromServer !== data.items) {
    const newSelectedItems = new Set();
    data.items.forEach(item => {
      if (selectedItemsState.selectedItems.has(item.id)) {
        newSelectedItems.add(item.id);
      }
    });
    setSelectedItems({
      itemsFromServer: data.items,
      selectedItems: newSelectedItems
    });
  }
  const theme = useTheme();
  const showCreate = !((_metaQuery$data$keyst2 = (_metaQuery$data3 = metaQuery.data) === null || _metaQuery$data3 === void 0 ? void 0 : (_metaQuery$data3$keys = _metaQuery$data3.keystone.adminMeta.list) === null || _metaQuery$data3$keys === void 0 ? void 0 : _metaQuery$data3$keys.hideCreate) !== null && _metaQuery$data$keyst2 !== void 0 ? _metaQuery$data$keyst2 : true) || null;
  return jsx(PageContainer, {
    header: jsx(ListPageHeader, {
      listKey: listKey
    }),
    title: list.label
  }, metaQuery.error ?
  // TODO: Show errors nicely and with information
  'Error...' : data && metaQuery.data ? jsx(Fragment, null, list.description !== null && jsx("p", {
    css: {
      marginTop: '24px',
      maxWidth: '704px'
    }
  }, list.description), jsx(Stack, {
    across: true,
    gap: "medium",
    align: "center",
    marginTop: "xlarge"
  }, jsx("form", {
    onSubmit: e => {
      e.preventDefault();
      updateSearch(searchString);
    }
  }, jsx(Stack, {
    across: true
  }, jsx(TextInput, {
    css: {
      borderRadius: '4px 0px 0px 4px'
    },
    autoFocus: true,
    value: searchString,
    onChange: e => updateSearchString(e.target.value),
    placeholder: `Search by ${searchLabels.length ? searchLabels.join(', ') : 'ID'}`
  }), jsx(Button, {
    css: {
      borderRadius: '0px 4px 4px 0px'
    },
    type: "submit"
  }, jsx(SearchIcon, null)))), showCreate && jsx(CreateButtonLink, {
    list: list
  }), data.count || filters.filters.length ? jsx(FilterAdd, {
    listKey: listKey,
    filterableFields: filterableFields
  }) : null, filters.filters.length ? jsx(FilterList, {
    filters: filters.filters,
    list: list
  }) : null, Boolean(filters.filters.length || query.sortBy || query.fields || query.search) && jsx(Button, {
    size: "small",
    onClick: resetToDefaults
  }, "Reset to defaults")), data.count ? jsx(Fragment, null, jsx(ResultsSummaryContainer, null, (() => {
    const selectedItems = selectedItemsState.selectedItems;
    const selectedItemsCount = selectedItems.size;
    if (selectedItemsCount) {
      var _metaQuery$data$keyst3, _metaQuery$data4, _metaQuery$data4$keys;
      return jsx(Fragment, null, jsx("span", {
        css: {
          marginRight: theme.spacing.small
        }
      }, "Selected ", selectedItemsCount, " of ", data.items.length), !((_metaQuery$data$keyst3 = (_metaQuery$data4 = metaQuery.data) === null || _metaQuery$data4 === void 0 ? void 0 : (_metaQuery$data4$keys = _metaQuery$data4.keystone.adminMeta.list) === null || _metaQuery$data4$keys === void 0 ? void 0 : _metaQuery$data4$keys.hideDelete) !== null && _metaQuery$data$keyst3 !== void 0 ? _metaQuery$data$keyst3 : true) && jsx(DeleteManyButton, {
        list: list,
        selectedItems: selectedItems,
        refetch: refetch
      }));
    }
    return jsx(Fragment, null, jsx(PaginationLabel, {
      currentPage: currentPage,
      pageSize: pageSize,
      plural: list.plural,
      singular: list.singular,
      total: data.count
    }), ", sorted by ", jsx(SortSelection, {
      list: list,
      orderableFields: orderableFields
    }), "with", ' ', jsx(FieldSelection, {
      list: list,
      fieldModesByFieldPath: listViewFieldModesByField
    }), ' ');
  })()), jsx(ListTable, {
    count: data.count,
    currentPage: currentPage,
    itemsGetter: dataGetter.get('items'),
    listKey: listKey,
    pageSize: pageSize,
    selectedFields: selectedFields,
    sort: sort,
    selectedItems: selectedItemsState.selectedItems,
    onSelectedItemsChange: selectedItems => {
      setSelectedItems({
        itemsFromServer: selectedItemsState.itemsFromServer,
        selectedItems
      });
    },
    orderableFields: orderableFields
  })) : jsx(ResultsSummaryContainer, null, "No ", list.plural, " found.")) : jsx(Center, {
    css: {
      height: `calc(100vh - ${HEADER_HEIGHT}px)`
    }
  }, jsx(LoadingDots, {
    label: "Loading item data",
    size: "large",
    tone: "passive"
  })));
};
const ListPageHeader = _ref2 => {
  let {
    listKey
  } = _ref2;
  const list = useList(listKey);
  return jsx(Fragment, null, jsx("div", {
    css: {
      alignItems: 'center',
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between'
    }
  }, jsx(Heading, {
    type: "h3"
  }, list.label)));
};
const ResultsSummaryContainer = _ref3 => {
  let {
    children
  } = _ref3;
  return jsx("p", {
    css: {
      // TODO: don't do this
      // (this is to make it so things don't move when a user selects an item)
      minHeight: 38,
      display: 'flex',
      alignItems: 'center'
    }
  }, children);
};
const SortDirectionArrow = _ref4 => {
  let {
    direction
  } = _ref4;
  const size = '0.25em';
  return jsx("span", {
    css: {
      borderLeft: `${size} solid transparent`,
      borderRight: `${size} solid transparent`,
      borderTop: `${size} solid`,
      display: 'inline-block',
      height: 0,
      marginLeft: '0.33em',
      marginTop: '-0.125em',
      verticalAlign: 'middle',
      width: 0,
      transform: `rotate(${direction === 'DESC' ? '0deg' : '180deg'})`
    }
  });
};
function DeleteManyButton(_ref5) {
  let {
    selectedItems,
    list,
    refetch
  } = _ref5;
  const [deleteItems, deleteItemsState] = useMutation(useMemo(() => gql`
        mutation($where: [${list.gqlNames.whereUniqueInputName}!]!) {
          ${list.gqlNames.deleteManyMutationName}(where: $where) {
            id
            ${list.labelField}
          }
        }
`, [list]), {
    errorPolicy: 'all'
  });
  const [isOpen, setIsOpen] = useState(false);
  const toasts = useToasts();
  return jsx(Fragment, null, jsx(Button, {
    isLoading: deleteItemsState.loading,
    tone: "negative",
    onClick: async () => {
      setIsOpen(true);
    }
  }, "Delete"), jsx(AlertDialog
  // TODO: change the copy in the title and body of the modal
  , {
    isOpen: isOpen,
    title: "Delete Confirmation",
    tone: "negative",
    actions: {
      confirm: {
        label: 'Delete',
        action: async () => {
          const {
            data,
            errors
          } = await deleteItems({
            variables: {
              where: [...selectedItems].map(id => ({
                id
              }))
            }
          });
          /*
            Data returns an array where successful deletions are item objects
            and unsuccessful deletions are null values.
            Run a reduce to count success and failure as well as
            to generate the success message to be passed to the success toast
           */
          const {
            successfulItems,
            unsuccessfulItems,
            successMessage
          } = data[list.gqlNames.deleteManyMutationName].reduce((acc, curr) => {
            if (curr) {
              acc.successfulItems++;
              acc.successMessage = acc.successMessage === '' ? acc.successMessage += curr[list.labelField] : acc.successMessage += `, ${curr[list.labelField]}`;
            } else {
              acc.unsuccessfulItems++;
            }
            return acc;
          }, {
            successfulItems: 0,
            unsuccessfulItems: 0,
            successMessage: ''
          });

          // If there are errors
          if (errors !== null && errors !== void 0 && errors.length) {
            // Find out how many items failed to delete.
            // Reduce error messages down to unique instances, and append to the toast as a message.
            toasts.addToast({
              tone: 'negative',
              title: `Failed to delete ${unsuccessfulItems} of ${data[list.gqlNames.deleteManyMutationName].length} ${list.plural}`,
              message: errors.reduce((acc, error) => {
                if (acc.indexOf(error.message) < 0) {
                  acc.push(error.message);
                }
                return acc;
              }, []).join('\n')
            });
          }
          if (successfulItems) {
            toasts.addToast({
              tone: 'positive',
              title: `Deleted ${successfulItems} of ${data[list.gqlNames.deleteManyMutationName].length} ${list.plural} successfully`,
              message: successMessage
            });
          }
          return refetch();
        }
      },
      cancel: {
        label: 'Cancel',
        action: () => {
          setIsOpen(false);
        }
      }
    }
  }, "Are you sure you want to delete ", selectedItems.size, ' ', selectedItems.size === 1 ? list.singular : list.plural, "?"));
}
function ListTable(_ref6) {
  var _itemsGetter$data, _itemsGetter$data4;
  let {
    selectedFields,
    listKey,
    itemsGetter,
    count,
    sort,
    currentPage,
    pageSize,
    selectedItems,
    onSelectedItemsChange,
    orderableFields
  } = _ref6;
  const list = useList(listKey);
  const {
    query
  } = useRouter();
  const shouldShowLinkIcon = !list.fields[selectedFields.keys().next().value].views.Cell.supportsLinkTo;
  return jsx(Box, {
    paddingBottom: "xlarge"
  }, jsx(TableContainer, null, jsx(VisuallyHidden, {
    as: "caption"
  }, list.label, " list"), jsx("colgroup", null, jsx("col", {
    width: "30"
  }), shouldShowLinkIcon && jsx("col", {
    width: "30"
  }), [...selectedFields].map(path => jsx("col", {
    key: path
  }))), jsx(TableHeaderRow, null, jsx(TableHeaderCell, {
    css: {
      paddingLeft: 0
    }
  }, jsx("label", {
    css: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
      cursor: 'pointer'
    }
  }, jsx(CheckboxControl, {
    size: "small",
    checked: selectedItems.size === ((_itemsGetter$data = itemsGetter.data) === null || _itemsGetter$data === void 0 ? void 0 : _itemsGetter$data.length),
    css: {
      cursor: 'default'
    },
    onChange: () => {
      var _itemsGetter$data2;
      const newSelectedItems = new Set();
      if (selectedItems.size !== ((_itemsGetter$data2 = itemsGetter.data) === null || _itemsGetter$data2 === void 0 ? void 0 : _itemsGetter$data2.length)) {
        var _itemsGetter$data3;
        (_itemsGetter$data3 = itemsGetter.data) === null || _itemsGetter$data3 === void 0 ? void 0 : _itemsGetter$data3.forEach(item => {
          if (item !== null && item.id !== null) {
            newSelectedItems.add(item.id);
          }
        });
      }
      onSelectedItemsChange(newSelectedItems);
    }
  }))), shouldShowLinkIcon && jsx(TableHeaderCell, null), [...selectedFields].map(path => {
    const label = list.fields[path].label;
    if (!orderableFields.has(path)) {
      return jsx(TableHeaderCell, {
        key: path
      }, label);
    }
    return jsx(TableHeaderCell, {
      key: path
    }, jsx(Link, {
      css: {
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        ':hover': {
          color: 'inherit'
        }
      },
      href: {
        query: {
          ...query,
          sortBy: (sort === null || sort === void 0 ? void 0 : sort.field) === path && sort.direction === 'ASC' ? `-${path}` : path
        }
      }
    }, label, (sort === null || sort === void 0 ? void 0 : sort.field) === path && jsx(SortDirectionArrow, {
      direction: sort.direction
    })));
  })), jsx("tbody", null, ((_itemsGetter$data4 = itemsGetter.data) !== null && _itemsGetter$data4 !== void 0 ? _itemsGetter$data4 : []).map((_, index) => {
    const itemGetter = itemsGetter.get(index);
    if (itemGetter.data === null || itemGetter.data.id === null) {
      if (itemGetter.errors) {
        return jsx("tr", {
          css: {
            color: 'red'
          },
          key: `index:${index}`
        }, itemGetter.errors[0].message);
      }
      return null;
    }
    const itemId = itemGetter.data.id;
    return jsx("tr", {
      key: itemId || `index:${index}`
    }, jsx(TableBodyCell, null, jsx("label", {
      css: {
        display: 'flex',
        minHeight: 38,
        alignItems: 'center',
        justifyContent: 'start'
      }
    }, jsx(CheckboxControl, {
      size: "small",
      checked: selectedItems.has(itemId),
      css: {
        cursor: 'default'
      },
      onChange: () => {
        const newSelectedItems = new Set(selectedItems);
        if (selectedItems.has(itemId)) {
          newSelectedItems.delete(itemId);
        } else {
          newSelectedItems.add(itemId);
        }
        onSelectedItemsChange(newSelectedItems);
      }
    }))), shouldShowLinkIcon && jsx(TableBodyCell, null, jsx(Link, {
      css: {
        textDecoration: 'none',
        minHeight: 38,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      href: `/${list.path}/[id]`,
      as: `/${list.path}/${encodeURIComponent(itemId)}`
    }, jsx(ArrowRightCircleIcon, {
      size: "smallish",
      "aria-label": "Go to item"
    }))), [...selectedFields].map((path, i) => {
      const field = list.fields[path];
      let {
        Cell
      } = list.fields[path].views;
      const itemForField = {};
      for (const graphqlField of getRootGraphQLFieldsFromFieldController(field.controller)) {
        const fieldGetter = itemGetter.get(graphqlField);
        if (fieldGetter.errors) {
          const errorMessage = fieldGetter.errors[0].message;
          return jsx(TableBodyCell, {
            css: {
              color: 'red'
            },
            key: path
          }, i === 0 && Cell.supportsLinkTo ? jsx(CellLink, {
            href: `/${list.path}/[id]`,
            as: `/${list.path}/${encodeURIComponent(itemId)}`
          }, errorMessage) : errorMessage);
        }
        itemForField[graphqlField] = fieldGetter.data;
      }
      return jsx(TableBodyCell, {
        key: path
      }, jsx(Cell, {
        field: field.controller,
        item: itemForField,
        linkTo: i === 0 && Cell.supportsLinkTo ? {
          href: `/${list.path}/[id]`,
          as: `/${list.path}/${encodeURIComponent(itemId)}`
        } : undefined
      }));
    }));
  }))), jsx(Pagination, {
    list: list,
    total: count,
    currentPage: currentPage,
    pageSize: pageSize
  }));
}
const TableContainer = _ref7 => {
  let {
    children
  } = _ref7;
  return jsx("table", {
    css: {
      minWidth: '100%',
      tableLayout: 'fixed',
      'tr:last-child td': {
        borderBottomWidth: 0
      }
    },
    cellPadding: "0",
    cellSpacing: "0"
  }, children);
};
const TableHeaderRow = _ref8 => {
  let {
    children
  } = _ref8;
  return jsx("thead", null, jsx("tr", null, children));
};
const TableHeaderCell = props => {
  const {
    colors,
    spacing,
    typography
  } = useTheme();
  return jsx("th", _extends({
    css: {
      backgroundColor: colors.background,
      borderBottom: `2px solid ${colors.border}`,
      color: colors.foregroundDim,
      fontSize: typography.fontSize.medium,
      fontWeight: typography.fontWeight.medium,
      padding: spacing.small,
      textAlign: 'left',
      position: 'sticky',
      top: 0
    }
  }, props));
};
const TableBodyCell = props => {
  const {
    colors,
    typography
  } = useTheme();
  return jsx("td", _extends({
    css: {
      borderBottom: `1px solid ${colors.border}`,
      fontSize: typography.fontSize.medium
    }
  }, props));
};

export { getListPage };
