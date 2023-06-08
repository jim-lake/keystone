'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var core = require('@keystone-ui/core');
require('@babel/runtime/helpers/extends');
require('next/router');
require('next/link');
require('next/head');
var Errors = require('../../../../../dist/Errors-b841e5fe.cjs.prod.js');
var adminUi_context_dist_keystone6CoreAdminUiContext = require('../../../../../admin-ui/context/dist/keystone-6-core-admin-ui-context.cjs.prod.js');
require('@keystone-ui/button');
require('@keystone-ui/popover');
require('@keystone-ui/icons/icons/MoreHorizontalIcon');
require('@keystone-ui/icons/icons/ChevronRightIcon');
require('../../../../../dist/SignoutButton-9832e663.cjs.prod.js');
require('@keystone-ui/modals');
require('@keystone-ui/loading');
require('../../../../../dist/Fields-ec4f4464.cjs.prod.js');
require('@keystone-ui/toast');
require('fast-deep-equal');
require('@apollo/client');
require('@keystone-ui/notice');
require('@babel/runtime/helpers/defineProperty');
require('@keystone-ui/icons/icons/AlertTriangleIcon');
require('apollo-upload-client');
require('@emotion/hash');
require('../../../../../dist/utils-7d247517.cjs.prod.js');
require('../../../../../dist/next-fields-f1c33a35.cjs.prod.js');
require('decimal.js');
require('../../../../../dist/graphql-ts-schema-e1666bd5.cjs.prod.js');
require('@graphql-ts/schema');
require('graphql-upload/GraphQLUpload.js');
require('graphql');
require('@graphql-ts/schema/api-without-context');
require('@graphql-ts/extend');
require('@graphql-ts/schema/api-with-context');
require('../../../../../dist/admin-meta-graphql-4908958f.cjs.prod.js');
require('../../../../../dist/dataGetter-2824eb60.cjs.prod.js');
require('@keystone-ui/fields');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const getApp = props => _ref => {
  let {
    Component,
    pageProps
  } = _ref;
  return /*#__PURE__*/React__default["default"].createElement(core.Core, null, /*#__PURE__*/React__default["default"].createElement(adminUi_context_dist_keystone6CoreAdminUiContext.KeystoneProvider, props, /*#__PURE__*/React__default["default"].createElement(Errors.ErrorBoundary, null, /*#__PURE__*/React__default["default"].createElement(Component, pageProps))));
};

exports.getApp = getApp;
