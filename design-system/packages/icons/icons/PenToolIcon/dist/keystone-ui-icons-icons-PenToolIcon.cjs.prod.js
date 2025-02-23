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

const PenToolIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("path", {
  d: "M12 19l7-7 3 3-7 7-3-3z"
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M2 2l7.586 7.586"
}), /*#__PURE__*/React__namespace.createElement("circle", {
  cx: 11,
  cy: 11,
  r: 2
})), 'PenToolIcon');

exports.PenToolIcon = PenToolIcon;
