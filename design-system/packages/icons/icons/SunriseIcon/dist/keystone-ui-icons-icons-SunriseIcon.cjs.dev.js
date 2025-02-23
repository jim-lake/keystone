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

const SunriseIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("path", {
  d: "M17 18a5 5 0 0 0-10 0"
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 12,
  y1: 2,
  x2: 12,
  y2: 9
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 4.22,
  y1: 10.22,
  x2: 5.64,
  y2: 11.64
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 1,
  y1: 18,
  x2: 3,
  y2: 18
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 21,
  y1: 18,
  x2: 23,
  y2: 18
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 18.36,
  y1: 11.64,
  x2: 19.78,
  y2: 10.22
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 23,
  y1: 22,
  x2: 1,
  y2: 22
}), /*#__PURE__*/React__namespace.createElement("polyline", {
  points: "8 6 12 2 16 6"
})), 'SunriseIcon');

exports.SunriseIcon = SunriseIcon;
