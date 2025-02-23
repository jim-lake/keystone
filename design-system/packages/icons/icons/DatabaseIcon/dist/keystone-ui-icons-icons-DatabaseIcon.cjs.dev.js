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

const DatabaseIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("ellipse", {
  cx: 12,
  cy: 5,
  rx: 9,
  ry: 3
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"
})), 'DatabaseIcon');

exports.DatabaseIcon = DatabaseIcon;
