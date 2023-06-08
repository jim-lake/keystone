'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var next = require('next');
var createExpressServer = require('../../dist/createExpressServer-937adc5b.cjs.dev.js');
var createSystem = require('../../dist/createSystem-65953aed.cjs.dev.js');
var config = require('../../dist/config-b037e22b.cjs.dev.js');
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
require('../../dist/createAdminMeta-f30763bb.cjs.dev.js');
require('../../dist/graphql-errors-dc804d07.cjs.dev.js');
require('graphql');
require('../../access/dist/keystone-6-core-access.cjs.dev.js');
require('../../dist/next-fields-bc22e620.cjs.dev.js');
require('decimal.js');
require('../../dist/graphql-ts-schema-db7cad71.cjs.dev.js');
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
require('../../dist/utils-c0d33c42.cjs.dev.js');
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
