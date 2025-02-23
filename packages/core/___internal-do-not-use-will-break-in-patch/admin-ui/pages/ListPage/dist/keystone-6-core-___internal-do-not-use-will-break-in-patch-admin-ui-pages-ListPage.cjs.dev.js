'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');
var button = require('@keystone-ui/button');
var core = require('@keystone-ui/core');
var fields = require('@keystone-ui/fields');
var ArrowRightCircleIcon = require('@keystone-ui/icons/icons/ArrowRightCircleIcon');
var loading = require('@keystone-ui/loading');
var modals = require('@keystone-ui/modals');
var toast = require('@keystone-ui/toast');
var SearchIcon = require('@keystone-ui/icons/icons/SearchIcon');
var dataGetter = require('../../../../../dist/dataGetter-cce02896.cjs.dev.js');
require('../../../../../dist/Fields-2c77f94f.cjs.dev.js');
var getRootGraphQLFieldsFromFieldController = require('../../../../../dist/getRootGraphQLFieldsFromFieldController-e2b649ed.cjs.dev.js');
require('fast-deep-equal');
var client = require('@apollo/client');
var CellLink = require('../../../../../dist/CellLink-eaa8183d.cjs.dev.js');
require('@babel/runtime/helpers/defineProperty');
require('@keystone-ui/icons/icons/AlertTriangleIcon');
require('next/link');
var adminUi_context_dist_keystone6CoreAdminUiContext = require('../../../../../admin-ui/context/dist/keystone-6-core-admin-ui-context.cjs.dev.js');
var router = require('next/router');
var popover = require('@keystone-ui/popover');
require('@keystone-ui/icons/icons/MoreHorizontalIcon');
var ChevronRightIcon = require('@keystone-ui/icons/icons/ChevronRightIcon');
var adminUi_router_dist_keystone6CoreAdminUiRouter = require('../../../../../admin-ui/router/dist/keystone-6-core-admin-ui-router.cjs.dev.js');
require('../../../../../dist/SignoutButton-94652c56.cjs.dev.js');
var PageContainer = require('../../../../../dist/PageContainer-6e3879ad.cjs.dev.js');
require('@keystone-ui/notice');
var icons = require('@keystone-ui/icons');
var fields_types_relationship_views_RelationshipSelect_dist_keystone6CoreFieldsTypesRelationshipViewsRelationshipSelect = require('../../../../../fields/types/relationship/views/RelationshipSelect/dist/keystone-6-core-fields-types-relationship-views-RelationshipSelect.cjs.dev.js');
var CreateButtonLink = require('../../../../../dist/CreateButtonLink-369756ea.cjs.dev.js');
var ChevronDownIcon = require('@keystone-ui/icons/icons/ChevronDownIcon');
var options = require('@keystone-ui/options');
require('next/head');
var ChevronLeftIcon = require('@keystone-ui/icons/icons/ChevronLeftIcon');
var pill = require('@keystone-ui/pill');
require('@emotion/weak-memoize');
require('graphql');
require('apollo-upload-client');
require('@emotion/hash');
require('../../../../../dist/utils-c0d33c42.cjs.dev.js');
require('../../../../../dist/next-fields-bc22e620.cjs.dev.js');
require('decimal.js');
require('../../../../../dist/graphql-ts-schema-db7cad71.cjs.dev.js');
require('@graphql-ts/schema');
require('graphql-upload/GraphQLUpload.js');
require('@graphql-ts/schema/api-without-context');
require('@graphql-ts/extend');
require('@graphql-ts/schema/api-with-context');
require('../../../../../dist/admin-meta-graphql-2063c7b9.cjs.dev.js');
require('intersection-observer');
require('uuid');

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
  } = router.useRouter();
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
  } = core.useTheme();
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
  React.useEffect(() => {
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
  return core.jsx(core.Stack, {
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
  }, core.jsx(core.Stack, {
    across: true,
    gap: "xxlarge",
    align: "center"
  }, core.jsx("span", null, `${list.plural} per page: ${pageSize}`), core.jsx("span", null, core.jsx("strong", null, stats))), core.jsx(core.Stack, {
    gap: "medium",
    across: true,
    align: "center"
  }, core.jsx(fields.Select, {
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
  }), core.jsx("span", null, "of ", limit), core.jsx(adminUi_router_dist_keystone6CoreAdminUiRouter.Link, {
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
  }, core.jsx(icons.ChevronLeftIcon, null)), core.jsx(adminUi_router_dist_keystone6CoreAdminUiRouter.Link, {
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
  }, core.jsx(icons.ChevronRightIcon, null))));
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
    return core.jsx("span", null, "No ", plural);
  }
  return core.jsx("span", null, "Showing ", core.jsx("strong", null, stats));
}

function useSelectedFields(list, fieldModesByFieldPath) {
  const {
    query
  } = router.useRouter();
  const selectedFieldsFromUrl = typeof query.fields === 'string' ? query.fields : '';
  return React.useMemo(() => {
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
  return core.jsx(options.OptionPrimitive, props, props.children, core.jsx(options.CheckMark, {
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
  const router$1 = router.useRouter();
  const selectedFields = useSelectedFields(list, fieldModesByFieldPath);
  const setNewSelectedFields = selectedFields => {
    if (isArrayEqual(selectedFields, list.initialColumns)) {
      const {
        fields: _ignore,
        ...otherQueryFields
      } = router$1.query;
      router$1.push({
        query: otherQueryFields
      });
    } else {
      router$1.push({
        query: {
          ...router$1.query,
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
  return core.jsx(popover.Popover, {
    "aria-label": `Columns options, list of column options to apply to the ${list.key} list`,
    triggerRenderer: _ref2 => {
      let {
        triggerProps
      } = _ref2;
      return core.jsx(button.Button, _extends({
        weight: "link",
        css: {
          padding: 4
        }
      }, triggerProps), core.jsx("span", {
        css: {
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }, selectedFields.size, " column", selectedFields.size === 1 ? '' : 's', ' ', core.jsx(ChevronDownIcon.ChevronDownIcon, {
        size: "smallish"
      })));
    }
  }, core.jsx("div", {
    css: {
      width: 320
    }
  }, core.jsx(core.Box, {
    padding: "medium"
  }, core.jsx(options.Options, {
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
    let theme = core.useTheme();
    let iconColor = props.isFocused ? theme.colors.foreground : theme.colors.foregroundDim;
    return core.jsx(options.OptionPrimitive, props, core.jsx("span", null, children), core.jsx("div", {
      css: {
        alignItems: 'center',
        display: 'flex',
        height: 24,
        justifyContent: 'center',
        width: 24
      }
    }, core.jsx(ChevronRightIcon.ChevronRightIcon, {
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
  } = popover.usePopover({
    placement: 'bottom',
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    }]
  });
  return core.jsx(React.Fragment, null, core.jsx(button.Button, _extends({
    tone: "active"
  }, trigger.props, {
    ref: trigger.ref,
    onClick: () => setOpen(!isOpen)
  }), core.jsx(core.Box, {
    as: "span",
    marginRight: "xsmall"
  }, "Filter List"), core.jsx(ChevronDownIcon.ChevronDownIcon, {
    size: "small"
  })), core.jsx(popover.PopoverDialog, _extends({
    "aria-label": `Filters options, list of filters to apply to the ${listKey} list`,
    arrow: arrow,
    isVisible: isOpen
  }, dialog.props, {
    ref: dialog.ref
  }), isOpen && core.jsx(FilterAddPopoverContent, {
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
  const list = adminUi_context_dist_keystone6CoreAdminUiContext.useList(listKey);
  const router$1 = router.useRouter();
  const fieldsWithFilters = React.useMemo(() => {
    const fieldsWithFilters = {};
    Object.keys(list.fields).forEach(fieldPath => {
      const field = list.fields[fieldPath];
      if (filterableFields.has(fieldPath) && field.controller.filter) {
        fieldsWithFilters[fieldPath] = field;
      }
    });
    return fieldsWithFilters;
  }, [list.fields, filterableFields]);
  const filtersByFieldThenType = React.useMemo(() => {
    const filtersByFieldThenType = {};
    Object.keys(fieldsWithFilters).forEach(fieldPath => {
      const field = fieldsWithFilters[fieldPath];
      let hasUnusedFilters = false;
      const filters = {};
      Object.keys(field.controller.filter.types).forEach(filterType => {
        if (router$1.query[`!${fieldPath}_${filterType}`] === undefined) {
          hasUnusedFilters = true;
          filters[filterType] = field.controller.filter.types[filterType].label;
        }
      });
      if (hasUnusedFilters) {
        filtersByFieldThenType[fieldPath] = filters;
      }
    });
    return filtersByFieldThenType;
  }, [router$1.query, fieldsWithFilters]);
  const [state, setState] = React.useState({
    kind: 'selecting-field'
  });
  return core.jsx(core.Stack, {
    padding: "medium",
    as: "form",
    css: {
      minWidth: 320
    },
    onSubmit: event => {
      event.preventDefault();
      if (state.kind === 'filter-value') {
        router$1.push({
          query: {
            ...router$1.query,
            [`!${state.fieldPath}_${state.filterType}`]: JSON.stringify(state.filterValue)
          }
        });
        onClose();
      }
    },
    gap: "small"
  }, core.jsx("div", {
    css: {
      position: 'relative'
    }
  }, state.kind !== 'selecting-field' && core.jsx("button", {
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
  }, core.jsx(core.VisuallyHidden, null, "Back"), core.jsx(ChevronLeftIcon.ChevronLeftIcon, {
    size: "smallish"
  })), core.jsx(core.Heading, {
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
  })())), core.jsx(core.Divider, null), state.kind === 'selecting-field' && core.jsx(options.Options, {
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
  }), state.kind === 'filter-value' && core.jsx(fields.Select, {
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
    return core.jsx(Filter, {
      type: state.filterType,
      value: state.filterValue,
      onChange: value => {
        setState(state => ({
          ...state,
          filterValue: value
        }));
      }
    });
  })(), state.kind == 'filter-value' && core.jsx("div", {
    css: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, core.jsx(button.Button, {
    onClick: onClose
  }, "Cancel"), core.jsx(button.Button, {
    type: "submit"
  }, "Apply")));
}

function FilterList(_ref) {
  let {
    filters,
    list
  } = _ref;
  return core.jsx(core.Inline, {
    gap: "small"
  }, filters.map(filter => {
    const field = list.fields[filter.field];
    return core.jsx(FilterPill, {
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
  const router$1 = router.useRouter();
  const {
    isOpen,
    setOpen,
    trigger,
    dialog,
    arrow
  } = popover.usePopover({
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
  return core.jsx(React.Fragment, null, core.jsx(pill.Pill, _extends({
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
      } = router$1.query;
      router$1.push({
        pathname: router$1.pathname,
        query: queryToKeep
      });
    }
  }), field.label, ' ', core.jsx(Label, {
    label: field.controller.filter.types[filter.type].label,
    type: filter.type,
    value: filter.value
  })), core.jsx(popover.PopoverDialog, _extends({
    "aria-label": `filter item config, dialog for configuring ${filter.field} filter`,
    arrow: arrow
  }, dialog.props, {
    isVisible: isOpen,
    ref: dialog.ref
  }), isOpen && core.jsx(EditDialog, {
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
  const router$1 = router.useRouter();
  const [value, setValue] = React.useState(filter.value);
  return core.jsx(core.Stack, {
    as: "form",
    padding: "small",
    gap: "small",
    onSubmit: event => {
      event.preventDefault();
      router$1.push({
        query: {
          ...router$1.query,
          [`!${filter.field}_${filter.type}`]: JSON.stringify(value)
        }
      });
      onClose();
    }
  }, core.jsx(Filter, {
    type: filter.type,
    value: value,
    onChange: setValue
  }), core.jsx("div", {
    css: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, core.jsx(button.Button, {
    onClick: onClose
  }, "Cancel"), core.jsx(button.Button, {
    type: "submit"
  }, "Save")));
}

function useSort(list, orderableFields) {
  const {
    query
  } = router.useRouter();
  let sortByFromUrl = typeof query.sortBy === 'string' ? query.sortBy : '';
  return React.useMemo(() => {
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
  } = popover.usePopover({
    placement: 'bottom',
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    }]
  });
  return core.jsx(React.Fragment, null, core.jsx(button.Button, _extends({}, trigger.props, {
    weight: "link",
    css: {
      padding: 4
    },
    ref: trigger.ref,
    onClick: () => setOpen(!isOpen)
  }), core.jsx("span", {
    css: {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, sort ? `${list.fields[sort.field].label} ${{
    ASC: 'ascending',
    DESC: 'descending'
  }[sort.direction]}` : 'No field', core.jsx(ChevronDownIcon.ChevronDownIcon, {
    size: "smallish"
  }))), core.jsx(popover.PopoverDialog, _extends({
    "aria-label": `Sort options, list of sorting parameters to apply to the ${list.key} list`,
    arrow: arrow,
    isVisible: isOpen
  }, dialog.props, {
    ref: dialog.ref
  }), isOpen && core.jsx(SortSelectionPopoverContent, {
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
  const router$1 = router.useRouter();
  return core.jsx(core.Stack, {
    padding: "medium",
    css: {
      minWidth: 320
    },
    gap: "small"
  }, core.jsx("div", {
    css: {
      position: 'relative'
    }
  }, core.jsx(core.Heading, {
    textAlign: "center",
    type: "h5"
  }, "Sort")), core.jsx(core.Divider, null), core.jsx(options.Options, {
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
        } = router$1.query;
        router$1.push({
          query: restOfQuery
        });
      } else {
        router$1.push({
          query: {
            ...router$1.query,
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
  } = router.useRouter();
  const possibleFilters = React.useMemo(() => {
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
  const filters = React.useMemo(() => {
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

let listMetaGraphqlQuery = client.gql`
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
  const router$1 = router.useRouter();
  const localStorageKey = `keystone.list.${listKey}.list.page.info`;
  const resetToDefaults = () => {
    localStorage.removeItem(localStorageKey);
    router$1.replace({
      pathname: router$1.pathname
    });
  };

  // GET QUERY FROM CACHE IF CONDITIONS ARE RIGHT
  // MERGE QUERY PARAMS FROM CACHE WITH QUERY PARAMS FROM ROUTER
  React.useEffect(() => {
    let hasSomeQueryParamsWhichAreAboutListPage = Object.keys(router$1.query).some(x => {
      return x.startsWith('!') || storeableQueries.includes(x);
    });
    if (!hasSomeQueryParamsWhichAreAboutListPage && router$1.isReady) {
      const queryParamsFromLocalStorage = localStorage.getItem(localStorageKey);
      let parsed;
      try {
        parsed = JSON.parse(queryParamsFromLocalStorage);
      } catch (err) {}
      if (parsed) {
        router$1.replace({
          query: {
            ...router$1.query,
            ...parsed
          }
        });
      }
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [localStorageKey, router$1.isReady]);
  React.useEffect(() => {
    let queryParamsToSerialize = {};
    Object.keys(router$1.query).forEach(key => {
      if (key.startsWith('!') || storeableQueries.includes(key)) {
        queryParamsToSerialize[key] = router$1.query[key];
      }
    });
    if (Object.keys(queryParamsToSerialize).length) {
      localStorage.setItem(localStorageKey, JSON.stringify(queryParamsToSerialize));
    } else {
      localStorage.removeItem(localStorageKey);
    }
  }, [localStorageKey, router$1]);
  return {
    resetToDefaults
  };
}
const getListPage = props => () => core.jsx(ListPage, props);
const ListPage = _ref => {
  var _metaQuery$data2, _metaQuery$data2$keys, _metaQuery$data$keyst2, _metaQuery$data3, _metaQuery$data3$keys;
  let {
    listKey
  } = _ref;
  const list = adminUi_context_dist_keystone6CoreAdminUiContext.useList(listKey);
  const {
    query,
    push
  } = router.useRouter();
  const {
    resetToDefaults
  } = useQueryParamsFromLocalStorage(listKey);
  const currentPage = typeof query.page === 'string' && !Number.isNaN(parseInt(query.page)) ? Number(query.page) : 1;
  const pageSize = typeof query.pageSize === 'string' && !Number.isNaN(parseInt(query.pageSize)) ? parseInt(query.pageSize) : list.pageSize;
  const metaQuery = client.useQuery(listMetaGraphqlQuery, {
    variables: {
      listKey
    }
  });
  let {
    listViewFieldModesByField,
    filterableFields,
    orderableFields
  } = React.useMemo(() => {
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
  const [searchString, updateSearchString] = React.useState(searchParam);
  const search = fields_types_relationship_views_RelationshipSelect_dist_keystone6CoreFieldsTypesRelationshipViewsRelationshipSelect.useFilter(searchParam, list, searchFields);
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
  } = client.useQuery(React.useMemo(() => {
    let selectedGqlFields = [...selectedFields].map(fieldPath => {
      return list.fields[fieldPath].controller.graphqlSelection;
    }).join('\n');
    return client.gql`
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
  let [dataState, setDataState] = React.useState({
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
  const dataGetter$1 = dataGetter.makeDataGetter(data, error === null || error === void 0 ? void 0 : error.graphQLErrors);
  const [selectedItemsState, setSelectedItems] = React.useState(() => ({
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
  const theme = core.useTheme();
  const showCreate = !((_metaQuery$data$keyst2 = (_metaQuery$data3 = metaQuery.data) === null || _metaQuery$data3 === void 0 ? void 0 : (_metaQuery$data3$keys = _metaQuery$data3.keystone.adminMeta.list) === null || _metaQuery$data3$keys === void 0 ? void 0 : _metaQuery$data3$keys.hideCreate) !== null && _metaQuery$data$keyst2 !== void 0 ? _metaQuery$data$keyst2 : true) || null;
  return core.jsx(PageContainer.PageContainer, {
    header: core.jsx(ListPageHeader, {
      listKey: listKey
    }),
    title: list.label
  }, metaQuery.error ?
  // TODO: Show errors nicely and with information
  'Error...' : data && metaQuery.data ? core.jsx(React.Fragment, null, list.description !== null && core.jsx("p", {
    css: {
      marginTop: '24px',
      maxWidth: '704px'
    }
  }, list.description), core.jsx(core.Stack, {
    across: true,
    gap: "medium",
    align: "center",
    marginTop: "xlarge"
  }, core.jsx("form", {
    onSubmit: e => {
      e.preventDefault();
      updateSearch(searchString);
    }
  }, core.jsx(core.Stack, {
    across: true
  }, core.jsx(fields.TextInput, {
    css: {
      borderRadius: '4px 0px 0px 4px'
    },
    autoFocus: true,
    value: searchString,
    onChange: e => updateSearchString(e.target.value),
    placeholder: `Search by ${searchLabels.length ? searchLabels.join(', ') : 'ID'}`
  }), core.jsx(button.Button, {
    css: {
      borderRadius: '0px 4px 4px 0px'
    },
    type: "submit"
  }, core.jsx(SearchIcon.SearchIcon, null)))), showCreate && core.jsx(CreateButtonLink.CreateButtonLink, {
    list: list
  }), data.count || filters.filters.length ? core.jsx(FilterAdd, {
    listKey: listKey,
    filterableFields: filterableFields
  }) : null, filters.filters.length ? core.jsx(FilterList, {
    filters: filters.filters,
    list: list
  }) : null, Boolean(filters.filters.length || query.sortBy || query.fields || query.search) && core.jsx(button.Button, {
    size: "small",
    onClick: resetToDefaults
  }, "Reset to defaults")), data.count ? core.jsx(React.Fragment, null, core.jsx(ResultsSummaryContainer, null, (() => {
    const selectedItems = selectedItemsState.selectedItems;
    const selectedItemsCount = selectedItems.size;
    if (selectedItemsCount) {
      var _metaQuery$data$keyst3, _metaQuery$data4, _metaQuery$data4$keys;
      return core.jsx(React.Fragment, null, core.jsx("span", {
        css: {
          marginRight: theme.spacing.small
        }
      }, "Selected ", selectedItemsCount, " of ", data.items.length), !((_metaQuery$data$keyst3 = (_metaQuery$data4 = metaQuery.data) === null || _metaQuery$data4 === void 0 ? void 0 : (_metaQuery$data4$keys = _metaQuery$data4.keystone.adminMeta.list) === null || _metaQuery$data4$keys === void 0 ? void 0 : _metaQuery$data4$keys.hideDelete) !== null && _metaQuery$data$keyst3 !== void 0 ? _metaQuery$data$keyst3 : true) && core.jsx(DeleteManyButton, {
        list: list,
        selectedItems: selectedItems,
        refetch: refetch
      }));
    }
    return core.jsx(React.Fragment, null, core.jsx(PaginationLabel, {
      currentPage: currentPage,
      pageSize: pageSize,
      plural: list.plural,
      singular: list.singular,
      total: data.count
    }), ", sorted by ", core.jsx(SortSelection, {
      list: list,
      orderableFields: orderableFields
    }), "with", ' ', core.jsx(FieldSelection, {
      list: list,
      fieldModesByFieldPath: listViewFieldModesByField
    }), ' ');
  })()), core.jsx(ListTable, {
    count: data.count,
    currentPage: currentPage,
    itemsGetter: dataGetter$1.get('items'),
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
  })) : core.jsx(ResultsSummaryContainer, null, "No ", list.plural, " found.")) : core.jsx(core.Center, {
    css: {
      height: `calc(100vh - ${PageContainer.HEADER_HEIGHT}px)`
    }
  }, core.jsx(loading.LoadingDots, {
    label: "Loading item data",
    size: "large",
    tone: "passive"
  })));
};
const ListPageHeader = _ref2 => {
  let {
    listKey
  } = _ref2;
  const list = adminUi_context_dist_keystone6CoreAdminUiContext.useList(listKey);
  return core.jsx(React.Fragment, null, core.jsx("div", {
    css: {
      alignItems: 'center',
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between'
    }
  }, core.jsx(core.Heading, {
    type: "h3"
  }, list.label)));
};
const ResultsSummaryContainer = _ref3 => {
  let {
    children
  } = _ref3;
  return core.jsx("p", {
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
  return core.jsx("span", {
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
  const [deleteItems, deleteItemsState] = client.useMutation(React.useMemo(() => client.gql`
        mutation($where: [${list.gqlNames.whereUniqueInputName}!]!) {
          ${list.gqlNames.deleteManyMutationName}(where: $where) {
            id
            ${list.labelField}
          }
        }
`, [list]), {
    errorPolicy: 'all'
  });
  const [isOpen, setIsOpen] = React.useState(false);
  const toasts = toast.useToasts();
  return core.jsx(React.Fragment, null, core.jsx(button.Button, {
    isLoading: deleteItemsState.loading,
    tone: "negative",
    onClick: async () => {
      setIsOpen(true);
    }
  }, "Delete"), core.jsx(modals.AlertDialog
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
  const list = adminUi_context_dist_keystone6CoreAdminUiContext.useList(listKey);
  const {
    query
  } = router.useRouter();
  const shouldShowLinkIcon = !list.fields[selectedFields.keys().next().value].views.Cell.supportsLinkTo;
  return core.jsx(core.Box, {
    paddingBottom: "xlarge"
  }, core.jsx(TableContainer, null, core.jsx(core.VisuallyHidden, {
    as: "caption"
  }, list.label, " list"), core.jsx("colgroup", null, core.jsx("col", {
    width: "30"
  }), shouldShowLinkIcon && core.jsx("col", {
    width: "30"
  }), [...selectedFields].map(path => core.jsx("col", {
    key: path
  }))), core.jsx(TableHeaderRow, null, core.jsx(TableHeaderCell, {
    css: {
      paddingLeft: 0
    }
  }, core.jsx("label", {
    css: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
      cursor: 'pointer'
    }
  }, core.jsx(fields.CheckboxControl, {
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
  }))), shouldShowLinkIcon && core.jsx(TableHeaderCell, null), [...selectedFields].map(path => {
    const label = list.fields[path].label;
    if (!orderableFields.has(path)) {
      return core.jsx(TableHeaderCell, {
        key: path
      }, label);
    }
    return core.jsx(TableHeaderCell, {
      key: path
    }, core.jsx(adminUi_router_dist_keystone6CoreAdminUiRouter.Link, {
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
    }, label, (sort === null || sort === void 0 ? void 0 : sort.field) === path && core.jsx(SortDirectionArrow, {
      direction: sort.direction
    })));
  })), core.jsx("tbody", null, ((_itemsGetter$data4 = itemsGetter.data) !== null && _itemsGetter$data4 !== void 0 ? _itemsGetter$data4 : []).map((_, index) => {
    const itemGetter = itemsGetter.get(index);
    if (itemGetter.data === null || itemGetter.data.id === null) {
      if (itemGetter.errors) {
        return core.jsx("tr", {
          css: {
            color: 'red'
          },
          key: `index:${index}`
        }, itemGetter.errors[0].message);
      }
      return null;
    }
    const itemId = itemGetter.data.id;
    return core.jsx("tr", {
      key: itemId || `index:${index}`
    }, core.jsx(TableBodyCell, null, core.jsx("label", {
      css: {
        display: 'flex',
        minHeight: 38,
        alignItems: 'center',
        justifyContent: 'start'
      }
    }, core.jsx(fields.CheckboxControl, {
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
    }))), shouldShowLinkIcon && core.jsx(TableBodyCell, null, core.jsx(adminUi_router_dist_keystone6CoreAdminUiRouter.Link, {
      css: {
        textDecoration: 'none',
        minHeight: 38,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      href: `/${list.path}/[id]`,
      as: `/${list.path}/${encodeURIComponent(itemId)}`
    }, core.jsx(ArrowRightCircleIcon.ArrowRightCircleIcon, {
      size: "smallish",
      "aria-label": "Go to item"
    }))), [...selectedFields].map((path, i) => {
      const field = list.fields[path];
      let {
        Cell
      } = list.fields[path].views;
      const itemForField = {};
      for (const graphqlField of getRootGraphQLFieldsFromFieldController.getRootGraphQLFieldsFromFieldController(field.controller)) {
        const fieldGetter = itemGetter.get(graphqlField);
        if (fieldGetter.errors) {
          const errorMessage = fieldGetter.errors[0].message;
          return core.jsx(TableBodyCell, {
            css: {
              color: 'red'
            },
            key: path
          }, i === 0 && Cell.supportsLinkTo ? core.jsx(CellLink.CellLink, {
            href: `/${list.path}/[id]`,
            as: `/${list.path}/${encodeURIComponent(itemId)}`
          }, errorMessage) : errorMessage);
        }
        itemForField[graphqlField] = fieldGetter.data;
      }
      return core.jsx(TableBodyCell, {
        key: path
      }, core.jsx(Cell, {
        field: field.controller,
        item: itemForField,
        linkTo: i === 0 && Cell.supportsLinkTo ? {
          href: `/${list.path}/[id]`,
          as: `/${list.path}/${encodeURIComponent(itemId)}`
        } : undefined
      }));
    }));
  }))), core.jsx(Pagination, {
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
  return core.jsx("table", {
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
  return core.jsx("thead", null, core.jsx("tr", null, children));
};
const TableHeaderCell = props => {
  const {
    colors,
    spacing,
    typography
  } = core.useTheme();
  return core.jsx("th", _extends({
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
  } = core.useTheme();
  return core.jsx("td", _extends({
    css: {
      borderBottom: `1px solid ${colors.border}`,
      fontSize: typography.fontSize.medium
    }
  }, props));
};

exports.getListPage = getListPage;
