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

const MicOffIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("line", {
  x1: 1,
  y1: 1,
  x2: 23,
  y2: 23
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 12,
  y1: 19,
  x2: 12,
  y2: 23
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 8,
  y1: 23,
  x2: 16,
  y2: 23
})), 'MicOffIcon');

exports.MicOffIcon = MicOffIcon;
