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

const Maximize2Icon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("polyline", {
  points: "15 3 21 3 21 9"
}), /*#__PURE__*/React__namespace.createElement("polyline", {
  points: "9 21 3 21 3 15"
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 21,
  y1: 3,
  x2: 14,
  y2: 10
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 3,
  y1: 21,
  x2: 10,
  y2: 14
})), 'Maximize2Icon');

exports.Maximize2Icon = Maximize2Icon;
