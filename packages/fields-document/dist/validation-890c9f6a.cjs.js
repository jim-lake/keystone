'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./validation-890c9f6a.cjs.prod.js");
} else {
  module.exports = require("./validation-890c9f6a.cjs.dev.js");
}
