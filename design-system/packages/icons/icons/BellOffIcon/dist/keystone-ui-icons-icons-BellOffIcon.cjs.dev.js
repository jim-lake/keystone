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

const BellOffIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("path", {
  d: "M13.73 21a2 2 0 0 1-3.46 0"
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M18.63 13A17.89 17.89 0 0 1 18 8"
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M18 8a6 6 0 0 0-9.33-5"
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 1,
  y1: 1,
  x2: 23,
  y2: 23
})), 'BellOffIcon');

exports.BellOffIcon = BellOffIcon;
