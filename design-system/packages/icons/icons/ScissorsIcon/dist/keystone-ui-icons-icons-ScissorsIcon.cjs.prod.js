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

const ScissorsIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("circle", {
  cx: 6,
  cy: 6,
  r: 3
}), /*#__PURE__*/React__namespace.createElement("circle", {
  cx: 6,
  cy: 18,
  r: 3
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 20,
  y1: 4,
  x2: 8.12,
  y2: 15.88
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 14.47,
  y1: 14.48,
  x2: 20,
  y2: 20
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 8.12,
  y1: 8.12,
  x2: 12,
  y2: 12
})), 'ScissorsIcon');

exports.ScissorsIcon = ScissorsIcon;
