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

const RepeatIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("polyline", {
  points: "17 1 21 5 17 9"
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M3 11V9a4 4 0 0 1 4-4h14"
}), /*#__PURE__*/React__namespace.createElement("polyline", {
  points: "7 23 3 19 7 15"
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M21 13v2a4 4 0 0 1-4 4H3"
})), 'RepeatIcon');

exports.RepeatIcon = RepeatIcon;
