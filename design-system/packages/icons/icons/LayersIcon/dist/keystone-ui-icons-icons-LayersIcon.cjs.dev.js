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

const LayersIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("polygon", {
  points: "12 2 2 7 12 12 22 7 12 2"
}), /*#__PURE__*/React__namespace.createElement("polyline", {
  points: "2 17 12 22 22 17"
}), /*#__PURE__*/React__namespace.createElement("polyline", {
  points: "2 12 12 17 22 12"
})), 'LayersIcon');

exports.LayersIcon = LayersIcon;
