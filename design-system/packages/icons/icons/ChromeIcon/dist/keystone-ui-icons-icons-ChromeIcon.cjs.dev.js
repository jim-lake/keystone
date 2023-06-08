'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Icon = require('../../../dist/Icon-7f0ccf14.cjs.dev.js');
require('@babel/runtime/helpers/extends');
require('@keystone-ui/core');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

const ChromeIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("circle", {
  cx: 12,
  cy: 12,
  r: 10
}), /*#__PURE__*/React__namespace.createElement("circle", {
  cx: 12,
  cy: 12,
  r: 4
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 21.17,
  y1: 8,
  x2: 12,
  y2: 8
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 3.95,
  y1: 6.06,
  x2: 8.54,
  y2: 14
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 10.88,
  y1: 21.94,
  x2: 15.46,
  y2: 14
})), 'ChromeIcon');

exports.ChromeIcon = ChromeIcon;
