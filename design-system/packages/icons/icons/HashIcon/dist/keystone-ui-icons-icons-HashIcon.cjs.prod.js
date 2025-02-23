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

const HashIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("line", {
  x1: 4,
  y1: 9,
  x2: 20,
  y2: 9
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 4,
  y1: 15,
  x2: 20,
  y2: 15
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 10,
  y1: 3,
  x2: 8,
  y2: 21
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 16,
  y1: 3,
  x2: 14,
  y2: 21
})), 'HashIcon');

exports.HashIcon = HashIcon;
