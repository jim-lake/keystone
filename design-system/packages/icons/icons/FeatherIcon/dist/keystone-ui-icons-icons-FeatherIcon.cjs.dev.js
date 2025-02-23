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

const FeatherIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("path", {
  d: "M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 16,
  y1: 8,
  x2: 2,
  y2: 22
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 17.5,
  y1: 15,
  x2: 9,
  y2: 15
})), 'FeatherIcon');

exports.FeatherIcon = FeatherIcon;
