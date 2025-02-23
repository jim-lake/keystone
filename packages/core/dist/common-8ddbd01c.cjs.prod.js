'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var core = require('@keystone-ui/core');
var ChevronRightIcon = require('@keystone-ui/icons/icons/ChevronRightIcon');
var React = require('react');
var adminUi_router_dist_keystone6CoreAdminUiRouter = require('../admin-ui/router/dist/keystone-6-core-admin-ui-router.cjs.prod.js');

/**
 * NOTE: should probably come from the DS?
 */

const Container = _ref => {
  let {
    children,
    ...props
  } = _ref;
  return core.jsx("div", _extends({
    css: {
      minWidth: 0,
      // fix flex text truncation
      maxWidth: 1080
      // marginLeft: 'auto',
      // marginRight: 'auto',
    }
  }, props), children);
};

function ItemPageHeader(props) {
  const {
    palette,
    spacing
  } = core.useTheme();
  return core.jsx(Container, {
    css: {
      alignItems: 'center',
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between'
    }
  }, core.jsx("div", {
    css: {
      alignItems: 'center',
      display: 'flex',
      flex: 1,
      minWidth: 0
    }
  }, props.list.isSingleton ? core.jsx(core.Heading, {
    type: "h3"
  }, props.list.label) : core.jsx(React.Fragment, null, core.jsx(core.Heading, {
    type: "h3"
  }, core.jsx(adminUi_router_dist_keystone6CoreAdminUiRouter.Link, {
    href: `/${props.list.path}`,
    css: {
      textDecoration: 'none'
    }
  }, props.list.label)), core.jsx("div", {
    css: {
      color: palette.neutral500,
      marginLeft: spacing.xsmall,
      marginRight: spacing.xsmall
    }
  }, core.jsx(ChevronRightIcon.ChevronRightIcon, null)), core.jsx(core.Heading, {
    as: "h1",
    type: "h3",
    css: {
      minWidth: 0,
      maxWidth: '100%',
      overflow: 'hidden',
      flex: 1,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, props.label))));
}
function ColumnLayout(props) {
  const {
    spacing
  } = core.useTheme();
  return (
    // this container must be relative to catch absolute children
    // particularly the "expanded" document-field, which needs a height of 100%
    core.jsx(Container, {
      css: {
        position: 'relative',
        height: '100%'
      }
    }, core.jsx("div", _extends({
      css: {
        alignItems: 'start',
        display: 'grid',
        gap: spacing.xlarge,
        gridTemplateColumns: `2fr 1fr`
      }
    }, props)))
  );
}
function BaseToolbar(props) {
  const {
    colors,
    spacing
  } = core.useTheme();
  return core.jsx("div", {
    css: {
      background: colors.background,
      borderTop: `1px solid ${colors.border}`,
      bottom: 0,
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: spacing.xlarge,
      paddingBottom: spacing.xlarge,
      paddingTop: spacing.xlarge,
      position: 'sticky',
      zIndex: 20
    }
  }, props.children);
}

exports.BaseToolbar = BaseToolbar;
exports.ColumnLayout = ColumnLayout;
exports.ItemPageHeader = ItemPageHeader;
