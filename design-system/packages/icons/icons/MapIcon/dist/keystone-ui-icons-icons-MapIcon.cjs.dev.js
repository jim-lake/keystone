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

const MapIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("polygon", {
  points: "1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 8,
  y1: 2,
  x2: 8,
  y2: 18
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 16,
  y1: 6,
  x2: 16,
  y2: 22
})), 'MapIcon');

exports.MapIcon = MapIcon;
