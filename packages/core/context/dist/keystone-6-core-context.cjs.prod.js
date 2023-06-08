'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = require('../../dist/config-7d55c351.cjs.prod.js');
var createSystem = require('../../dist/createSystem-7a99e7f8.cjs.prod.js');
require('graphql');
require('../../dist/next-fields-f1c33a35.cjs.prod.js');
require('decimal.js');
require('../../dist/graphql-ts-schema-e1666bd5.cjs.prod.js');
require('@graphql-ts/schema');
require('graphql-upload/GraphQLUpload.js');
require('@graphql-ts/schema/api-without-context');
require('@graphql-ts/extend');
require('@graphql-ts/schema/api-with-context');
require('graphql/execution/values');
require('../../access/dist/keystone-6-core-access.cjs.prod.js');
require('../../dist/graphql-errors-e0d981de.cjs.prod.js');
require('pluralize');
require('../../dist/utils-7d247517.cjs.prod.js');
require('@apollo/cache-control-types');
require('dataloader');
require('uuid');
require('cuid');
require('p-limit');
require('../../dist/createAdminMeta-dcba7585.cjs.prod.js');
require('path');
require('@babel/runtime/helpers/classPrivateFieldInitSpec');
require('@babel/runtime/helpers/classPrivateFieldGet');
require('@babel/runtime/helpers/classPrivateFieldSet');
require('image-size');
require('stream');
require('fs-extra');
require('@aws-sdk/s3-request-presigner');
require('@aws-sdk/client-s3');
require('@aws-sdk/lib-storage');
require('crypto');
require('filenamify');
require('@sindresorhus/slugify');

function getContext(config$1, PrismaModule) {
  const system = createSystem.createSystem(config.initConfig(config$1));
  const {
    context
  } = system.getKeystone(PrismaModule);
  return context;
}

exports.getContext = getContext;
