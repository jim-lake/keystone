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

const ZoomInIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("circle", {
  cx: 11,
  cy: 11,
  r: 8
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 21,
  y1: 21,
  x2: 16.65,
  y2: 16.65
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 11,
  y1: 8,
  x2: 11,
  y2: 14
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 8,
  y1: 11,
  x2: 14,
  y2: 11
})), 'ZoomInIcon');

exports.ZoomInIcon = ZoomInIcon;
