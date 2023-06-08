import { i as initConfig } from '../../dist/config-50249dc4.esm.js';
import { c as createSystem } from '../../dist/createSystem-095bd0da.esm.js';
import 'graphql';
import '../../dist/next-fields-34f831a7.esm.js';
import 'decimal.js';
import '../../dist/graphql-ts-schema-9020a95a.esm.js';
import '@graphql-ts/schema';
import 'graphql-upload/GraphQLUpload.js';
import '@graphql-ts/schema/api-without-context';
import '@graphql-ts/extend';
import '@graphql-ts/schema/api-with-context';
import 'graphql/execution/values';
import '../../access/dist/keystone-6-core-access.esm.js';
import '../../dist/graphql-errors-473725b1.esm.js';
import 'pluralize';
import '../../dist/utils-8175c66a.esm.js';
import '@apollo/cache-control-types';
import 'dataloader';
import 'uuid';
import 'cuid';
import 'p-limit';
import '../../dist/createAdminMeta-24be8f3a.esm.js';
import 'path';
import '@babel/runtime/helpers/classPrivateFieldInitSpec';
import '@babel/runtime/helpers/classPrivateFieldGet';
import '@babel/runtime/helpers/classPrivateFieldSet';
import 'image-size';
import 'stream';
import 'fs-extra';
import '@aws-sdk/s3-request-presigner';
import '@aws-sdk/client-s3';
import '@aws-sdk/lib-storage';
import 'crypto';
import 'filenamify';
import '@sindresorhus/slugify';

function getContext(config, PrismaModule) {
  const system = createSystem(initConfig(config));
  const {
    context
  } = system.getKeystone(PrismaModule);
  return context;
}

export { getContext };
