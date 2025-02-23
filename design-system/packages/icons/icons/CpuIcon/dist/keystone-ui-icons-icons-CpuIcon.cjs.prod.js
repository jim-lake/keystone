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

const CpuIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("rect", {
  x: 4,
  y: 4,
  width: 16,
  height: 16,
  rx: 2,
  ry: 2
}), /*#__PURE__*/React__namespace.createElement("rect", {
  x: 9,
  y: 9,
  width: 6,
  height: 6
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 9,
  y1: 1,
  x2: 9,
  y2: 4
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 15,
  y1: 1,
  x2: 15,
  y2: 4
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 9,
  y1: 20,
  x2: 9,
  y2: 23
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 15,
  y1: 20,
  x2: 15,
  y2: 23
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 20,
  y1: 9,
  x2: 23,
  y2: 9
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 20,
  y1: 14,
  x2: 23,
  y2: 14
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 1,
  y1: 9,
  x2: 4,
  y2: 9
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 1,
  y1: 14,
  x2: 4,
  y2: 14
})), 'CpuIcon');

exports.CpuIcon = CpuIcon;
