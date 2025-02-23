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

const WifiIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("path", {
  d: "M5 12.55a11 11 0 0 1 14.08 0"
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M1.42 9a16 16 0 0 1 21.16 0"
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M8.53 16.11a6 6 0 0 1 6.95 0"
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 12,
  y1: 20,
  x2: 12.01,
  y2: 20
})), 'WifiIcon');

exports.WifiIcon = WifiIcon;
