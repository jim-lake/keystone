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

const FileTextIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("path", {
  d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
}), /*#__PURE__*/React__namespace.createElement("polyline", {
  points: "14 2 14 8 20 8"
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 16,
  y1: 13,
  x2: 8,
  y2: 13
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 16,
  y1: 17,
  x2: 8,
  y2: 17
}), /*#__PURE__*/React__namespace.createElement("polyline", {
  points: "10 9 9 9 8 9"
})), 'FileTextIcon');

exports.FileTextIcon = FileTextIcon;
