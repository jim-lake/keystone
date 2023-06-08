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

const ListIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("line", {
  x1: 8,
  y1: 6,
  x2: 21,
  y2: 6
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 8,
  y1: 12,
  x2: 21,
  y2: 12
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 8,
  y1: 18,
  x2: 21,
  y2: 18
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 3,
  y1: 6,
  x2: 3.01,
  y2: 6
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 3,
  y1: 12,
  x2: 3.01,
  y2: 12
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 3,
  y1: 18,
  x2: 3.01,
  y2: 18
})), 'ListIcon');

exports.ListIcon = ListIcon;
