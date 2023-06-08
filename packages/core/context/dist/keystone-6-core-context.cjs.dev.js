'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = require('../../dist/config-b037e22b.cjs.dev.js');
var createSystem = require('../../dist/createSystem-65953aed.cjs.dev.js');
require('graphql');
require('../../dist/next-fields-bc22e620.cjs.dev.js');
require('decimal.js');
require('../../dist/graphql-ts-schema-db7cad71.cjs.dev.js');
require('@graphql-ts/schema');
require('graphql-upload/GraphQLUpload.js');
require('@graphql-ts/schema/api-without-context');
require('@graphql-ts/extend');
require('@graphql-ts/schema/api-with-context');
require('graphql/execution/values');
require('../../access/dist/keystone-6-core-access.cjs.dev.js');
require('../../dist/graphql-errors-dc804d07.cjs.dev.js');
require('pluralize');
require('../../dist/utils-c0d33c42.cjs.dev.js');
require('@apollo/cache-control-types');
require('dataloader');
require('uuid');
require('cuid');
require('p-limit');
require('../../dist/createAdminMeta-f30763bb.cjs.dev.js');
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
