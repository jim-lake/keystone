'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@keystone-ui/core');
var AlertTriangleIcon = require('@keystone-ui/icons/icons/AlertTriangleIcon');
var SignoutButton = require('../../../../../dist/SignoutButton-9832e663.cjs.prod.js');
var Errors = require('../../../../../dist/Errors-b841e5fe.cjs.prod.js');
require('@keystone-ui/button');
require('react');
require('@apollo/client');
require('@babel/runtime/helpers/defineProperty');

/** @jsxRuntime classic */
const getNoAccessPage = props => () => core.jsx(NoAccessPage, props);
const NoAccessPage = _ref => {
  let {
    sessionsEnabled
  } = _ref;
  return core.jsx(Errors.ErrorContainer, null, core.jsx(core.Stack, {
    align: "center",
    gap: "medium"
  }, core.jsx(AlertTriangleIcon.AlertTriangleIcon, {
    size: "large"
  }), core.jsx("div", null, "You don't have access to this page."), sessionsEnabled ? core.jsx(SignoutButton.SignoutButton, null) : null));
};

exports.NoAccessPage = NoAccessPage;
exports.getNoAccessPage = getNoAccessPage;
