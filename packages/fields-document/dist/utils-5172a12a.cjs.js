'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./utils-5172a12a.cjs.prod.js");
} else {
  module.exports = require("./utils-5172a12a.cjs.dev.js");
}
