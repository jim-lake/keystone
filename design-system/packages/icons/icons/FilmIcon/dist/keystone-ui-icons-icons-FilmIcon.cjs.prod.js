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

const FilmIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("rect", {
  x: 2,
  y: 2,
  width: 20,
  height: 20,
  rx: 2.18,
  ry: 2.18
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 7,
  y1: 2,
  x2: 7,
  y2: 22
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 17,
  y1: 2,
  x2: 17,
  y2: 22
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 2,
  y1: 12,
  x2: 22,
  y2: 12
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 2,
  y1: 7,
  x2: 7,
  y2: 7
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 2,
  y1: 17,
  x2: 7,
  y2: 17
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 17,
  y1: 17,
  x2: 22,
  y2: 17
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 17,
  y1: 7,
  x2: 22,
  y2: 7
})), 'FilmIcon');

exports.FilmIcon = FilmIcon;
