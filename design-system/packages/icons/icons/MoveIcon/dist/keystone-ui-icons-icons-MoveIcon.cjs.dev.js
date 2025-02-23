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

const MoveIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("polyline", {
  points: "5 9 2 12 5 15"
}), /*#__PURE__*/React__namespace.createElement("polyline", {
  points: "9 5 12 2 15 5"
}), /*#__PURE__*/React__namespace.createElement("polyline", {
  points: "15 19 12 22 9 19"
}), /*#__PURE__*/React__namespace.createElement("polyline", {
  points: "19 9 22 12 19 15"
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 2,
  y1: 12,
  x2: 22,
  y2: 12
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 12,
  y1: 2,
  x2: 12,
  y2: 22
})), 'MoveIcon');

exports.MoveIcon = MoveIcon;
