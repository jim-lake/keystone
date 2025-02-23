import _extends from '@babel/runtime/helpers/esm/extends';
import { jsx, useTheme, Heading } from '@keystone-ui/core';
import { ChevronRightIcon } from '@keystone-ui/icons/icons/ChevronRightIcon';
import { Fragment } from 'react';
import { Link } from '../admin-ui/router/dist/keystone-6-core-admin-ui-router.esm.js';

/**
 * NOTE: should probably come from the DS?
 */

const Container = _ref => {
  let {
    children,
    ...props
  } = _ref;
  return jsx("div", _extends({
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
  } = useTheme();
  return jsx(Container, {
    css: {
      alignItems: 'center',
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between'
    }
  }, jsx("div", {
    css: {
      alignItems: 'center',
      display: 'flex',
      flex: 1,
      minWidth: 0
    }
  }, props.list.isSingleton ? jsx(Heading, {
    type: "h3"
  }, props.list.label) : jsx(Fragment, null, jsx(Heading, {
    type: "h3"
  }, jsx(Link, {
    href: `/${props.list.path}`,
    css: {
      textDecoration: 'none'
    }
  }, props.list.label)), jsx("div", {
    css: {
      color: palette.neutral500,
      marginLeft: spacing.xsmall,
      marginRight: spacing.xsmall
    }
  }, jsx(ChevronRightIcon, null)), jsx(Heading, {
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
  } = useTheme();
  return (
    // this container must be relative to catch absolute children
    // particularly the "expanded" document-field, which needs a height of 100%
    jsx(Container, {
      css: {
        position: 'relative',
        height: '100%'
      }
    }, jsx("div", _extends({
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
  } = useTheme();
  return jsx("div", {
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

export { BaseToolbar as B, ColumnLayout as C, ItemPageHeader as I };
