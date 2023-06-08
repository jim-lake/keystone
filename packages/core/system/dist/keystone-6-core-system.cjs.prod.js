'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var next = require('next');
var createExpressServer = require('../../dist/createExpressServer-5e1c10e0.cjs.prod.js');
var createSystem = require('../../dist/createSystem-7a99e7f8.cjs.prod.js');
var config = require('../../dist/config-7d55c351.cjs.prod.js');
require('url');
require('path');
require('http');
require('cors');
require('body-parser');
require('@apollo/server/express4');
require('express');
require('@apollo/server');
require('@apollo/server/plugin/disabled');
require('@apollo/server/plugin/landingPage/default');
require('graphql-upload/graphqlUploadExpress.js');
require('p-limit');
require('../../dist/createAdminMeta-dcba7585.cjs.prod.js');
require('../../dist/graphql-errors-e0d981de.cjs.prod.js');
require('graphql');
require('../../access/dist/keystone-6-core-access.cjs.prod.js');
require('../../dist/next-fields-f1c33a35.cjs.prod.js');
require('decimal.js');
require('../../dist/graphql-ts-schema-e1666bd5.cjs.prod.js');
require('@graphql-ts/schema');
require('graphql-upload/GraphQLUpload.js');
require('@graphql-ts/schema/api-without-context');
require('@graphql-ts/extend');
require('@graphql-ts/schema/api-with-context');
require('@babel/runtime/helpers/classPrivateFieldInitSpec');
require('@babel/runtime/helpers/classPrivateFieldGet');
require('@babel/runtime/helpers/classPrivateFieldSet');
require('uuid');
require('image-size');
require('stream');
require('fs-extra');
require('@aws-sdk/s3-request-presigner');
require('@aws-sdk/client-s3');
require('@aws-sdk/lib-storage');
require('crypto');
require('filenamify');
require('@sindresorhus/slugify');
require('graphql/execution/values');
require('pluralize');
require('../../dist/utils-7d247517.cjs.prod.js');
require('@apollo/cache-control-types');
require('dataloader');
require('cuid');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var next__default = /*#__PURE__*/_interopDefault(next);

/** @deprecated */
async function createAdminUIMiddleware(config, context, dev, projectAdminPath) {
  const nextApp = next__default["default"]({
    dev,
    dir: projectAdminPath
  });
  await nextApp.prepare();
  return createExpressServer.createAdminUIMiddlewareWithNextApp(config, context, nextApp);
}

exports.createExpressServer = createExpressServer.createExpressServer;
exports.createSystem = createSystem.createSystem;
exports.initConfig = config.initConfig;
exports.createAdminUIMiddleware = createAdminUIMiddleware;
