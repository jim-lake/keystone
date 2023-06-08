'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./keystone-6-fields-document-primitives.cjs.prod.js");
} else {
  module.exports = require("./keystone-6-fields-document-primitives.cjs.dev.js");
}
