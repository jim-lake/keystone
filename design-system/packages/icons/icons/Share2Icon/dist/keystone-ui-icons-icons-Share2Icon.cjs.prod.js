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

const Share2Icon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("circle", {
  cx: 18,
  cy: 5,
  r: 3
}), /*#__PURE__*/React__namespace.createElement("circle", {
  cx: 6,
  cy: 12,
  r: 3
}), /*#__PURE__*/React__namespace.createElement("circle", {
  cx: 18,
  cy: 19,
  r: 3
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 8.59,
  y1: 13.51,
  x2: 15.42,
  y2: 17.49
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 15.41,
  y1: 6.51,
  x2: 8.59,
  y2: 10.49
})), 'Share2Icon');

exports.Share2Icon = Share2Icon;
