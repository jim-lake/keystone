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

const VolumeXIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("polygon", {
  points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 23,
  y1: 9,
  x2: 17,
  y2: 15
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 17,
  y1: 9,
  x2: 23,
  y2: 15
})), 'VolumeXIcon');

exports.VolumeXIcon = VolumeXIcon;
