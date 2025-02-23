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

const GridIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("rect", {
  x: 3,
  y: 3,
  width: 7,
  height: 7
}), /*#__PURE__*/React__namespace.createElement("rect", {
  x: 14,
  y: 3,
  width: 7,
  height: 7
}), /*#__PURE__*/React__namespace.createElement("rect", {
  x: 14,
  y: 14,
  width: 7,
  height: 7
}), /*#__PURE__*/React__namespace.createElement("rect", {
  x: 3,
  y: 14,
  width: 7,
  height: 7
})), 'GridIcon');

exports.GridIcon = GridIcon;
