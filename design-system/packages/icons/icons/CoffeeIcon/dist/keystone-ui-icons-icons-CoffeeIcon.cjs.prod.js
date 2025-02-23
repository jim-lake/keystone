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

const CoffeeIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("path", {
  d: "M18 8h1a4 4 0 0 1 0 8h-1"
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 6,
  y1: 1,
  x2: 6,
  y2: 4
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 10,
  y1: 1,
  x2: 10,
  y2: 4
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 14,
  y1: 1,
  x2: 14,
  y2: 4
})), 'CoffeeIcon');

exports.CoffeeIcon = CoffeeIcon;
