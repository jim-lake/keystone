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

const LoaderIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("line", {
  x1: 12,
  y1: 2,
  x2: 12,
  y2: 6
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 12,
  y1: 18,
  x2: 12,
  y2: 22
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 4.93,
  y1: 4.93,
  x2: 7.76,
  y2: 7.76
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 16.24,
  y1: 16.24,
  x2: 19.07,
  y2: 19.07
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 2,
  y1: 12,
  x2: 6,
  y2: 12
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 18,
  y1: 12,
  x2: 22,
  y2: 12
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 4.93,
  y1: 19.07,
  x2: 7.76,
  y2: 16.24
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 16.24,
  y1: 7.76,
  x2: 19.07,
  y2: 4.93
})), 'LoaderIcon');

exports.LoaderIcon = LoaderIcon;
