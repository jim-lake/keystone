'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Icon = require('../../../dist/Icon-73c77f34.cjs.prod.js');
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

const WifiOffIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("line", {
  x1: 1,
  y1: 1,
  x2: 23,
  y2: 23
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M16.72 11.06A10.94 10.94 0 0 1 19 12.55"
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M5 12.55a10.94 10.94 0 0 1 5.17-2.39"
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M10.71 5.05A16 16 0 0 1 22.58 9"
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M1.42 9a15.91 15.91 0 0 1 4.7-2.88"
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M8.53 16.11a6 6 0 0 1 6.95 0"
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 12,
  y1: 20,
  x2: 12.01,
  y2: 20
})), 'WifiOffIcon');

exports.WifiOffIcon = WifiOffIcon;
