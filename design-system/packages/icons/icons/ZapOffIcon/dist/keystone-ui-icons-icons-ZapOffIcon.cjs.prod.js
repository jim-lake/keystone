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

const ZapOffIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("polyline", {
  points: "12.41 6.75 13 2 10.57 4.92"
}), /*#__PURE__*/React__namespace.createElement("polyline", {
  points: "18.57 12.91 21 10 15.66 10"
}), /*#__PURE__*/React__namespace.createElement("polyline", {
  points: "8 8 3 14 12 14 11 22 16 16"
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 1,
  y1: 1,
  x2: 23,
  y2: 23
})), 'ZapOffIcon');

exports.ZapOffIcon = ZapOffIcon;
