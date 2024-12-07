'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./keystone-ui-popover.cjs.prod.js");
} else {
  module.exports = require("./keystone-ui-popover.cjs.dev.js");
}
