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

const BarChartIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("line", {
  x1: 12,
  y1: 20,
  x2: 12,
  y2: 10
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 18,
  y1: 20,
  x2: 18,
  y2: 4
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 6,
  y1: 20,
  x2: 6,
  y2: 16
})), 'BarChartIcon');

exports.BarChartIcon = BarChartIcon;
