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

const CodepenIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("polygon", {
  points: "12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 12,
  y1: 22,
  x2: 12,
  y2: 15.5
}), /*#__PURE__*/React__namespace.createElement("polyline", {
  points: "22 8.5 12 15.5 2 8.5"
}), /*#__PURE__*/React__namespace.createElement("polyline", {
  points: "2 15.5 12 8.5 22 15.5"
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 12,
  y1: 2,
  x2: 12,
  y2: 8.5
})), 'CodepenIcon');

exports.CodepenIcon = CodepenIcon;
