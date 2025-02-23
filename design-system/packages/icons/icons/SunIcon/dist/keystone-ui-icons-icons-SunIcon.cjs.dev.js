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

const SunIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("circle", {
  cx: 12,
  cy: 12,
  r: 5
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 12,
  y1: 1,
  x2: 12,
  y2: 3
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 12,
  y1: 21,
  x2: 12,
  y2: 23
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 4.22,
  y1: 4.22,
  x2: 5.64,
  y2: 5.64
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 18.36,
  y1: 18.36,
  x2: 19.78,
  y2: 19.78
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 1,
  y1: 12,
  x2: 3,
  y2: 12
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 21,
  y1: 12,
  x2: 23,
  y2: 12
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 4.22,
  y1: 19.78,
  x2: 5.64,
  y2: 18.36
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 18.36,
  y1: 5.64,
  x2: 19.78,
  y2: 4.22
})), 'SunIcon');

exports.SunIcon = SunIcon;
