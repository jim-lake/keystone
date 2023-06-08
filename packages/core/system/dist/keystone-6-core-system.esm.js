import next from 'next';
import { c as createAdminUIMiddlewareWithNextApp } from '../../dist/createExpressServer-6c365efa.esm.js';
export { a as createExpressServer } from '../../dist/createExpressServer-6c365efa.esm.js';
export { c as createSystem } from '../../dist/createSystem-095bd0da.esm.js';
export { i as initConfig } from '../../dist/config-50249dc4.esm.js';
import 'url';
import 'path';
import 'http';
import 'cors';
import 'body-parser';
import '@apollo/server/express4';
import 'express';
import '@apollo/server';
import '@apollo/server/plugin/disabled';
import '@apollo/server/plugin/landingPage/default';
import 'graphql-upload/graphqlUploadExpress.js';
import 'p-limit';
import '../../dist/createAdminMeta-24be8f3a.esm.js';
import '../../dist/graphql-errors-473725b1.esm.js';
import 'graphql';
import '../../access/dist/keystone-6-core-access.esm.js';
import '../../dist/next-fields-34f831a7.esm.js';
import 'decimal.js';
import '../../dist/graphql-ts-schema-9020a95a.esm.js';
import '@graphql-ts/schema';
import 'graphql-upload/GraphQLUpload.js';
import '@graphql-ts/schema/api-without-context';
import '@graphql-ts/extend';
import '@graphql-ts/schema/api-with-context';
import '@babel/runtime/helpers/classPrivateFieldInitSpec';
import '@babel/runtime/helpers/classPrivateFieldGet';
import '@babel/runtime/helpers/classPrivateFieldSet';
import 'uuid';
import 'image-size';
import 'stream';
import 'fs-extra';
import '@aws-sdk/s3-request-presigner';
import '@aws-sdk/client-s3';
import '@aws-sdk/lib-storage';
import 'crypto';
import 'filenamify';
import '@sindresorhus/slugify';
import 'graphql/execution/values';
import 'pluralize';
import '../../dist/utils-8175c66a.esm.js';
import '@apollo/cache-control-types';
import 'dataloader';
import 'cuid';

/** @deprecated */
async function createAdminUIMiddleware(config, context, dev, projectAdminPath) {
  const nextApp = next({
    dev,
    dir: projectAdminPath
  });
  await nextApp.prepare();
  return createAdminUIMiddlewareWithNextApp(config, context, nextApp);
}

export { createAdminUIMiddleware };
