import _extends from '@babel/runtime/helpers/esm/extends';
import { useTheme, jsx, H3, Text, Stack } from '@keystone-ui/core';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@keystone-ui/button';
import { Popover } from '@keystone-ui/popover';
import { MoreHorizontalIcon } from '@keystone-ui/icons/icons/MoreHorizontalIcon';
import { ChevronRightIcon } from '@keystone-ui/icons/icons/ChevronRightIcon';
import { useKeystone } from '../admin-ui/context/dist/keystone-6-core-admin-ui-context.esm.js';
import { Link } from '../admin-ui/router/dist/keystone-6-core-admin-ui-router.esm.js';
import { S as SignoutButton } from './SignoutButton-ef277bf5.esm.js';
import NextLink from 'next/link';

/** @jsxRuntime classic */
const Logo = () => {
  var _adminConfig$componen;
  const {
    spacing
  } = useTheme();
  const {
    adminConfig
  } = useKeystone();
  if ((_adminConfig$componen = adminConfig.components) !== null && _adminConfig$componen !== void 0 && _adminConfig$componen.Logo) {
    return jsx(adminConfig.components.Logo, null);
  }
  return jsx(H3, null, jsx(NextLink, {
    href: "/",
    css: {
      // TODO: we dont' have colors in our design-system for this.
      backgroundImage: `linear-gradient(to right, #0ea5e9, #6366f1)`,
      backgroundClip: 'text',
      lineHeight: '1.75rem',
      color: 'transparent',
      verticalAlign: 'middle',
      transition: 'color 0.3s ease',
      textDecoration: 'none'
    }
  }, jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 220 220",
    css: {
      display: 'inline-block',
      width: '2rem',
      height: '2rem',
      margin: `0  ${spacing.medium}px ${spacing.xsmall}px 0`,
      verticalAlign: 'middle'
    }
  }, jsx("defs", null, jsx("linearGradient", {
    id: "logo-a",
    x1: "0%",
    x2: "50%",
    y1: "0%",
    y2: "71.9%"
  }, jsx("stop", {
    offset: "0%",
    stopColor: "#5AE8FA"
  }), jsx("stop", {
    offset: "100%",
    stopColor: "#2684FF"
  }))), jsx("path", {
    fill: "url(#logo-a)",
    fillRule: "evenodd",
    d: "M290.1 47h117.5c17.8 0 24.3 1.9 30.8 5.3a36.3 36.3 0 0115.1 15.2c3.5 6.5 5.4 13 5.4 30.8v117.4c0 17.9-1.9 24.3-5.4 30.8a36.3 36.3 0 01-15.1 15.2c-6.5 3.4-13 5.3-30.8 5.3H290c-17.8 0-24.3-1.9-30.8-5.3a36.3 36.3 0 01-15.1-15.2c-3.5-6.5-5.3-13-5.3-30.8V98.3c0-17.9 1.8-24.3 5.3-30.8a36.3 36.3 0 0115.1-15.2c6.5-3.4 13-5.3 30.8-5.3zm11.8 56.8V218H327v-36.8l14.4-14.6 34.4 51.4h31.5l-49-69.1 44.7-45.1h-31.3L327 151v-47.3H302z",
    transform: "translate(-238.9 -47)"
  })), "Keystone 6"));
};

const NavItem = _ref => {
  let {
    href,
    children,
    isSelected: _isSelected
  } = _ref;
  const {
    colors,
    palette,
    spacing,
    radii,
    typography
  } = useTheme();
  const router = useRouter();
  const isSelected = _isSelected !== undefined ? _isSelected : router.pathname === href;
  return jsx("li", null, jsx(Link, {
    "aria-current": isSelected ? 'location' : false,
    href: href,
    css: {
      background: 'transparent',
      borderBottomRightRadius: radii.xsmall,
      borderTopRightRadius: radii.xsmall,
      color: palette.neutral700,
      display: 'block',
      fontWeight: typography.fontWeight.medium,
      marginBottom: spacing.xsmall,
      marginRight: spacing.xlarge,
      padding: `${spacing.small}px ${spacing.xlarge}px`,
      position: 'relative',
      textDecoration: 'none',
      ':hover': {
        background: colors.backgroundHover,
        color: colors.linkHoverColor
      },
      '&[aria-current=location]': {
        background: palette.neutral200,
        color: palette.neutral900
      }
    }
  }, children));
};
const AuthenticatedItemDialog = _ref2 => {
  let {
    item
  } = _ref2;
  const {
    apiPath
  } = useKeystone();
  const {
    spacing,
    typography
  } = useTheme();
  return jsx("div", {
    css: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: spacing.xlarge,
      marginBottom: 0
    }
  }, item && item.state === 'authenticated' ? jsx("div", {
    css: {
      fontSize: typography.fontSize.small
    }
  }, "Signed in as ", jsx("strong", {
    css: {
      display: 'block'
    }
  }, item.label)) : process.env.NODE_ENV !== 'production' && jsx("div", {
    css: {
      fontSize: typography.fontSize.small
    }
  }, "GraphQL Playground and Docs"), process.env.NODE_ENV === 'production' ? item && item.state === 'authenticated' && jsx(SignoutButton, null) : jsx(Popover, {
    placement: "bottom",
    triggerRenderer: _ref3 => {
      let {
        triggerProps
      } = _ref3;
      return jsx(Button, _extends({
        size: "small",
        style: {
          padding: 0,
          width: 36
        },
        "aria-label": "Links and signout"
      }, triggerProps), jsx(MoreHorizontalIcon, null));
    }
  }, jsx(Stack, {
    gap: "medium",
    padding: "large",
    dividers: "between"
  }, jsx(PopoverLink, {
    target: "_blank",
    href: apiPath
  }, "API Explorer"), jsx(PopoverLink, {
    target: "_blank",
    href: "https://github.com/keystonejs/keystone"
  }, "GitHub Repository"), jsx(PopoverLink, {
    target: "_blank",
    href: "https://keystonejs.com"
  }, "Keystone Documentation"), item && item.state === 'authenticated' && jsx(SignoutButton, null))));
};
const PopoverLink = _ref4 => {
  let {
    children,
    ...props
  } = _ref4;
  const {
    typography
  } = useTheme();
  return jsx("a", _extends({
    css: {
      alignItems: 'center',
      display: 'flex',
      fontSize: typography.fontSize.small,
      textDecoration: 'none'
    }
  }, props), children, jsx(ChevronRightIcon, {
    size: "small"
  }));
};
const NavigationContainer = _ref5 => {
  let {
    authenticatedItem,
    children
  } = _ref5;
  const {
    spacing
  } = useTheme();
  return jsx("div", {
    css: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative'
    }
  }, jsx(AuthenticatedItemDialog, {
    item: authenticatedItem
  }), jsx("nav", {
    role: "navigation",
    "aria-label": "Side Navigation",
    css: {
      marginTop: spacing.xlarge
    }
  }, jsx("ul", {
    css: {
      padding: 0,
      margin: 0,
      li: {
        listStyle: 'none'
      }
    }
  }, children)));
};
const ListNavItem = _ref6 => {
  let {
    list
  } = _ref6;
  const router = useRouter();
  return jsx(NavItem, {
    isSelected: router.pathname.split('/')[1] === `/${list.path}`.split('/')[1],
    href: `/${list.path}${list.isSingleton ? '/1' : ''}`
  }, list.label);
};
const ListNavItems = _ref7 => {
  let {
    lists = [],
    include = []
  } = _ref7;
  const renderedList = include.length > 0 ? lists.filter(i => include.includes(i.key)) : lists;
  return jsx(Fragment, null, renderedList.map(list => {
    return jsx(ListNavItem, {
      key: list.key,
      list: list
    });
  }));
};
const Navigation = () => {
  var _adminConfig$componen;
  const {
    adminMeta: {
      lists
    },
    adminConfig,
    authenticatedItem,
    visibleLists
  } = useKeystone();
  if (visibleLists.state === 'loading') return null;
  // This visible lists error is critical and likely to result in a server restart
  // if it happens, we'll show the error and not render the navigation component/s
  if (visibleLists.state === 'error') {
    return jsx(Text, {
      as: "span",
      paddingLeft: "xlarge",
      css: {
        color: 'red'
      }
    }, visibleLists.error instanceof Error ? visibleLists.error.message : visibleLists.error[0].message);
  }
  const renderableLists = Object.keys(lists).map(key => {
    if (!visibleLists.lists.has(key)) return null;
    return lists[key];
  }).filter(x => Boolean(x));
  if (adminConfig !== null && adminConfig !== void 0 && (_adminConfig$componen = adminConfig.components) !== null && _adminConfig$componen !== void 0 && _adminConfig$componen.Navigation) {
    return jsx(adminConfig.components.Navigation, {
      authenticatedItem: authenticatedItem,
      lists: renderableLists
    });
  }
  return jsx(NavigationContainer, {
    authenticatedItem: authenticatedItem
  }, jsx(NavItem, {
    href: "/"
  }, "Dashboard"), jsx(ListNavItems, {
    lists: renderableLists
  }));
};

const HEADER_HEIGHT = 80;
const PageWrapper = props => {
  // const { colors } = useTheme();
  return jsx(Fragment, null, jsx("style", null, `body { overflow: hidden; }`), jsx("div", _extends({
    css: {
      // background: colors.background,
      display: 'grid',
      gridTemplateColumns: `minmax(300px, 1fr) 4fr`,
      gridTemplateRows: `${HEADER_HEIGHT}px auto`,
      height: '100vh',
      isolation: 'isolate'
    }
  }, props)));
};
const Sidebar = props => {
  // const { colors } = useTheme();

  return jsx("aside", _extends({
    css: {
      // borderRight: `1px solid ${colors.border}`,
      minWidth: 0,
      // resolves collapsing issues in children
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch'
    }
  }, props));
};
const Content = props => {
  const {
    colors,
    spacing
  } = useTheme();
  return jsx("main", _extends({
    css: {
      backgroundColor: colors.background,
      boxSizing: 'border-box',
      minWidth: 0,
      // resolves collapsing issues in children
      paddingLeft: spacing.xlarge,
      paddingRight: spacing.xlarge,
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      position: 'relative'
    }
  }, props));
};
const PageContainer = _ref => {
  let {
    children,
    header,
    title
  } = _ref;
  const {
    colors,
    spacing
  } = useTheme();
  return jsx(PageWrapper, null, jsx("div", {
    css: {
      alignItems: 'center',
      // borderRight: `1px solid ${colors.border}`,
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      justifyContent: 'space-between',
      paddingLeft: spacing.xlarge,
      paddingRight: spacing.xlarge
    }
  }, jsx(Logo, null)), jsx("header", {
    css: {
      alignItems: 'center',
      backgroundColor: colors.background,
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      justifyContent: 'space-between',
      minWidth: 0,
      // fix flex text truncation
      paddingLeft: spacing.xlarge,
      paddingRight: spacing.xlarge
    }
  }, jsx("title", null, title ? `Keystone - ${title}` : 'Keystone'), header), jsx(Sidebar, null, jsx(Navigation, null)), jsx(Content, null, children));
};

export { HEADER_HEIGHT as H, Logo as L, Navigation as N, PageContainer as P, NavigationContainer as a, NavItem as b, ListNavItems as c, ListNavItem as d };
