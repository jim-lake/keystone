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

const Minimize2Icon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("polyline", {
  points: "4 14 10 14 10 20"
}), /*#__PURE__*/React__namespace.createElement("polyline", {
  points: "20 10 14 10 14 4"
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 14,
  y1: 10,
  x2: 21,
  y2: 3
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 3,
  y1: 21,
  x2: 10,
  y2: 14
})), 'Minimize2Icon');

exports.Minimize2Icon = Minimize2Icon;
