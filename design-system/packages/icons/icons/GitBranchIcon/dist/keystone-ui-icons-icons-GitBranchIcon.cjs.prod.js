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

const GitBranchIcon = Icon.createIcon( /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("line", {
  x1: 6,
  y1: 3,
  x2: 6,
  y2: 15
}), /*#__PURE__*/React__namespace.createElement("circle", {
  cx: 18,
  cy: 6,
  r: 3
}), /*#__PURE__*/React__namespace.createElement("circle", {
  cx: 6,
  cy: 18,
  r: 3
}), /*#__PURE__*/React__namespace.createElement("path", {
  d: "M18 9a9 9 0 0 1-9 9"
})), 'GitBranchIcon');

exports.GitBranchIcon = GitBranchIcon;
