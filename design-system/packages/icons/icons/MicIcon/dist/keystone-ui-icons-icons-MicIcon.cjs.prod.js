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

const MicIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("path", {
  d: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M19 10v2a7 7 0 0 1-14 0v-2"
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 12,
  y1: 19,
  x2: 12,
  y2: 23
}), /*#__PURE__*/React__namespace.createElement("line", {
  x1: 8,
  y1: 23,
  x2: 16,
  y2: 23
})), 'MicIcon');

exports.MicIcon = MicIcon;
