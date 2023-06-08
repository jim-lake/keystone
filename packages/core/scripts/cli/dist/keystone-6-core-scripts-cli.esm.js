import meow from 'meow';
import { E as ExitError } from '../../../dist/utils-b5eeaa17.esm.js';
import esbuild from 'esbuild';
import nextBuild from 'next/dist/build';
import * as path from 'path';
import path__default from 'path';
import { promisify } from 'util';
import * as fs from 'fs-extra';
import fs__default from 'fs-extra';
import resolve from 'resolve';
import { walk as walk$1 } from '@nodelib/fs.walk';
import hashString from '@emotion/hash';
import { executeSync, parse, GraphQLUnionType, GraphQLNonNull, GraphQLScalarType, Kind, printSchema } from 'graphql';
import { s as staticAdminMetaQuery } from '../../../dist/admin-meta-graphql-75e8cfcb.esm.js';
import { c as createSystem } from '../../../dist/createSystem-095bd0da.esm.js';
import { g as getBuiltKeystoneConfiguration, a as getSystemPaths, v as validatePrismaAndGraphQLSchemas, b as generatePrismaAndGraphQLSchemas, c as generateTypescriptTypesAndPrisma, p as printPrismaSchema, d as getFormattedGraphQLSchema, e as generateTypescriptTypes, f as getBuiltKeystoneConfigurationPath } from '../../../dist/artifacts-0a53bf7e.esm.js';
import url from 'url';
import { createServer } from 'http';
import next from 'next';
import express from 'express';
import { d as devMigrations, p as pushPrismaSchemaToDatabase, a as deployMigrations } from '../../../dist/migrations-87c66232.esm.js';
import { t as telemetryEndpoint, p as pkgDir$1, h as healthCheckPath, c as createAdminUIMiddlewareWithNextApp, a as createExpressServer } from '../../../dist/createExpressServer-6c365efa.esm.js';
import os from 'os';
import ci from 'ci-info';
import Conf from 'conf';
import fetch from 'node-fetch';
import chalk from 'chalk';
import { v as initialiseLists } from '../../../dist/config-50249dc4.esm.js';
import execa from 'execa';
import '@apollo/client';
import 'p-limit';
import '../../../dist/createAdminMeta-24be8f3a.esm.js';
import '../../../dist/graphql-errors-473725b1.esm.js';
import '../../../access/dist/keystone-6-core-access.esm.js';
import '../../../dist/next-fields-34f831a7.esm.js';
import 'decimal.js';
import '../../../dist/graphql-ts-schema-9020a95a.esm.js';
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
import '@aws-sdk/s3-request-presigner';
import '@aws-sdk/client-s3';
import '@aws-sdk/lib-storage';
import 'crypto';
import 'filenamify';
import '@sindresorhus/slugify';
import 'module';
import '@prisma/internals';
import '@prisma/migrate';
import 'prompts';
import 'cors';
import 'body-parser';
import '@apollo/server/express4';
import '@apollo/server';
import '@apollo/server/plugin/disabled';
import '@apollo/server/plugin/landingPage/default';
import 'graphql-upload/graphqlUploadExpress.js';
import 'graphql/execution/values';
import 'pluralize';
import '../../../dist/utils-8175c66a.esm.js';
import '@apollo/cache-control-types';
import 'dataloader';
import 'cuid';

const appTemplate = (adminMetaRootVal, graphQLSchema, _ref, apiPath) => {
  let {
    configFileExists
  } = _ref;
  const result = executeSync({
    document: staticAdminMetaQuery,
    schema: graphQLSchema,
    contextValue: {
      isAdminUIBuildProcess: true
    }
  });
  if (result.errors) {
    throw result.errors[0];
  }
  const {
    adminMeta
  } = result.data.keystone;
  const adminMetaQueryResultHash = hashString(JSON.stringify(adminMeta));
  const allViews = adminMetaRootVal.views.map(viewRelativeToProject => {
    const isRelativeToFile = viewRelativeToProject.startsWith('./') || viewRelativeToProject.startsWith('../');
    const viewRelativeToAppFile = isRelativeToFile ? '../../../' + viewRelativeToProject : viewRelativeToProject;

    // we're not using serializePathForImport here because we want the thing you write for a view
    // to be exactly what you would put in an import in the project directory.
    // we're still using JSON.stringify to escape anything that might need to be though
    return JSON.stringify(viewRelativeToAppFile);
  });
  // -- TEMPLATE START
  return `import { getApp } from '@keystone-6/core/___internal-do-not-use-will-break-in-patch/admin-ui/pages/App';

${allViews.map((views, i) => `import * as view${i} from ${views};`).join('\n')}

${configFileExists ? `import * as adminConfig from "../../../admin/config";` : 'var adminConfig = {};'}

export default getApp({
  lazyMetadataQuery: ${JSON.stringify(getLazyMetadataQuery(graphQLSchema, adminMeta))},
  fieldViews: [${allViews.map((_, i) => `view${i}`)}],
  adminMetaHash: "${adminMetaQueryResultHash}",
  adminConfig: adminConfig,
  apiPath: "${apiPath}",
});
`;
  // -- TEMPLATE END
};

function getLazyMetadataQuery(graphqlSchema, adminMeta) {
  const selections = parse(`fragment x on y {
    keystone {
      adminMeta {
        lists {
          key
          isHidden
          fields {
            path
            createView {
              fieldMode
            }
          }
        }
      }
    }
  }`).definitions[0].selectionSet.selections;
  const queryType = graphqlSchema.getQueryType();
  if (queryType) {
    const getListByKey = name => adminMeta.lists.find(_ref2 => {
      let {
        key
      } = _ref2;
      return key === name;
    });
    const fields = queryType.getFields();
    if (fields['authenticatedItem'] !== undefined) {
      const authenticatedItemType = fields['authenticatedItem'].type;
      if (!(authenticatedItemType instanceof GraphQLUnionType) || authenticatedItemType.name !== 'AuthenticatedItem') {
        throw new Error(`The type of Query.authenticatedItem must be a type named AuthenticatedItem and be a union of types that refer to Keystone lists but it is "${authenticatedItemType.toString()}"`);
      }
      for (const type of authenticatedItemType.getTypes()) {
        const fields = type.getFields();
        const list = getListByKey(type.name);
        if (list === undefined) {
          throw new Error(`All members of the AuthenticatedItem union must refer to Keystone lists but "${type.name}" is in the AuthenticatedItem union but is not a Keystone list`);
        }
        let labelGraphQLField = fields[list.labelField];
        if (labelGraphQLField === undefined) {
          throw new Error(`The labelField for the list "${list.key}" is "${list.labelField}" but the GraphQL type does not have a field named "${list.labelField}"`);
        }
        let labelGraphQLFieldType = labelGraphQLField.type;
        if (labelGraphQLFieldType instanceof GraphQLNonNull) {
          labelGraphQLFieldType = labelGraphQLFieldType.ofType;
        }
        if (!(labelGraphQLFieldType instanceof GraphQLScalarType)) {
          throw new Error(`Label fields must be scalar GraphQL types but the labelField "${list.labelField}" on the list "${list.key}" is not a scalar type`);
        }
        const requiredArgs = labelGraphQLField.args.filter(arg => arg.defaultValue === undefined && arg.type instanceof GraphQLNonNull);
        if (requiredArgs.length) {
          throw new Error(`Label fields must have no required arguments but the labelField "${list.labelField}" on the list "${list.key}" has a required argument "${requiredArgs[0].name}"`);
        }
      }
      selections.push({
        kind: Kind.FIELD,
        name: {
          kind: Kind.NAME,
          value: 'authenticatedItem'
        },
        selectionSet: {
          kind: Kind.SELECTION_SET,
          selections: authenticatedItemType.getTypes().map(_ref3 => {
            let {
              name
            } = _ref3;
            return {
              kind: Kind.INLINE_FRAGMENT,
              typeCondition: {
                kind: Kind.NAMED_TYPE,
                name: {
                  kind: Kind.NAME,
                  value: name
                }
              },
              selectionSet: {
                kind: Kind.SELECTION_SET,
                selections: [{
                  kind: Kind.FIELD,
                  name: {
                    kind: Kind.NAME,
                    value: 'id'
                  }
                }, {
                  kind: Kind.FIELD,
                  name: {
                    kind: Kind.NAME,
                    value: getListByKey(name).labelField
                  }
                }]
              }
            };
          })
        }
      });
    }
  }

  // We're returning the complete query AST here for explicit-ness
  return {
    kind: 'Document',
    definitions: [{
      kind: 'OperationDefinition',
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections
      }
    }]
  };
}

const homeTemplate = `export { HomePage as default } from '@keystone-6/core/___internal-do-not-use-will-break-in-patch/admin-ui/pages/HomePage';
`;

const listTemplate = listKey => `import { getListPage } from '@keystone-6/core/___internal-do-not-use-will-break-in-patch/admin-ui/pages/ListPage';

export default getListPage(${JSON.stringify({
  listKey
})});
`;

const itemTemplate = listKey => `import { getItemPage } from '@keystone-6/core/___internal-do-not-use-will-break-in-patch/admin-ui/pages/ItemPage';

export default getItemPage(${JSON.stringify({
  listKey
})})
`;

const noAccessTemplate = session => `import { getNoAccessPage } from '@keystone-6/core/___internal-do-not-use-will-break-in-patch/admin-ui/pages/NoAccessPage';

export default getNoAccessPage(${JSON.stringify({
  sessionsEnabled: !!session
})})
`;

const createItemTemplate = listKey => `import { getCreateItemPage } from '@keystone-6/core/___internal-do-not-use-will-break-in-patch/admin-ui/pages/CreateItemPage';

export default getCreateItemPage(${JSON.stringify({
  listKey
})})
`;

const nextConfigTemplate = basePath => `const nextConfig = {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    experimental: {
      appDir: false,
    },
    // We use transpilePackages for the custom admin-ui pages in the ./admin folder
    // as they import ts files into nextjs
    transpilePackages: ['../../admin'],
    ${basePath ? `basePath: '${basePath}',` : ''} 
  }
  
  module.exports = nextConfig`;

const pkgDir = path.dirname(require.resolve('@keystone-6/core/package.json'));
const writeAdminFiles = (config, graphQLSchema, adminMeta, configFileExists) => {
  var _config$ui, _config$graphql;
  return [{
    mode: 'write',
    src: nextConfigTemplate((_config$ui = config.ui) === null || _config$ui === void 0 ? void 0 : _config$ui.basePath),
    outputPath: 'next.config.js'
  }, {
    mode: 'copy',
    inputPath: path.join(pkgDir, 'static', 'favicon.ico'),
    outputPath: 'public/favicon.ico'
  }, {
    mode: 'write',
    src: noAccessTemplate(config.session),
    outputPath: 'pages/no-access.js'
  }, {
    mode: 'write',
    src: appTemplate(adminMeta, graphQLSchema, {
      configFileExists
    }, ((_config$graphql = config.graphql) === null || _config$graphql === void 0 ? void 0 : _config$graphql.path) || '/api/graphql'),
    outputPath: 'pages/_app.js'
  }, {
    mode: 'write',
    src: homeTemplate,
    outputPath: 'pages/index.js'
  }, ...adminMeta.lists.flatMap(_ref => {
    let {
      path,
      key
    } = _ref;
    return [{
      mode: 'write',
      src: listTemplate(key),
      outputPath: `pages/${path}/index.js`
    }, {
      mode: 'write',
      src: itemTemplate(key),
      outputPath: `pages/${path}/[id].js`
    }, {
      mode: 'write',
      src: createItemTemplate(key),
      outputPath: `pages/${path}/create.js`
    }];
  })];
};

function serializePathForImport(path) {
  // JSON.stringify is important here because it will escape windows style paths(and any thing else that might potentially be in there)
  return JSON.stringify(path
  // Next is unhappy about imports that include .ts/tsx in them because TypeScript is unhappy with them because when doing a TypeScript compilation with tsc, the imports won't be written so they would be wrong there
  .replace(/\.tsx?$/, '').replace(new RegExp(`\\${path__default.sep}`, 'g'), '/'));
}

const walk = promisify(walk$1);
function getDoesAdminConfigExist() {
  try {
    const configPath = path__default.join(process.cwd(), 'admin', 'config');
    resolve.sync(configPath, {
      extensions: ['.ts', '.tsx', '.js'],
      preserveSymlinks: false
    });
    return true;
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return false;
    }
    throw err;
  }
}
async function writeAdminFile(file, projectAdminPath) {
  const outputFilename = path__default.join(projectAdminPath, file.outputPath);
  if (file.mode === 'copy') {
    if (!path__default.isAbsolute(file.inputPath)) {
      throw new Error(`An inputPath of "${file.inputPath}" was provided to copy but inputPaths must be absolute`);
    }
    await fs__default.ensureDir(path__default.dirname(outputFilename));
    // TODO: should we use copyFile or copy?
    await fs__default.copyFile(file.inputPath, outputFilename);
  }
  let content;
  try {
    content = await fs__default.readFile(outputFilename, 'utf8');
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }
  if (file.mode === 'write' && content !== file.src) {
    await fs__default.outputFile(outputFilename, file.src);
  }
  return path__default.normalize(outputFilename);
}
const pageExtensions = new Set(['.js', '.jsx', '.ts', '.tsx']);
const generateAdminUI = async (config, graphQLSchema, adminMeta, projectAdminPath, isLiveReload) => {
  var _config$ui$getAdditio, _config$ui, _config$ui$getAdditio2;
  // when we're not doing a live reload, we want to clear everything out except the .next directory (not the .next directory because it has caches)
  // so that at least every so often, we'll clear out anything that the deleting we do during live reloads doesn't (should just be directories)
  if (!isLiveReload) {
    const dir = await fs__default.readdir(projectAdminPath).catch(err => {
      if (err.code === 'ENOENT') {
        return [];
      }
      throw err;
    });
    await Promise.all(dir.map(x => {
      if (x === '.next') return;
      return fs__default.remove(path__default.join(projectAdminPath, x));
    }));
  }

  // Write out the files configured by the user
  const userFiles = (_config$ui$getAdditio = (_config$ui = config.ui) === null || _config$ui === void 0 ? void 0 : (_config$ui$getAdditio2 = _config$ui.getAdditionalFiles) === null || _config$ui$getAdditio2 === void 0 ? void 0 : _config$ui$getAdditio2.map(x => x(config))) !== null && _config$ui$getAdditio !== void 0 ? _config$ui$getAdditio : [];
  const userFilesToWrite = (await Promise.all(userFiles)).flat();
  const savedFiles = await Promise.all(userFilesToWrite.map(file => writeAdminFile(file, projectAdminPath)));
  const uniqueFiles = new Set(savedFiles);

  // Write out the built-in admin UI files. Don't overwrite any user-defined pages.
  const configFileExists = getDoesAdminConfigExist();
  let adminFiles = writeAdminFiles(config, graphQLSchema, adminMeta, configFileExists);

  // Add files to pages/ which point to any files which exist in admin/pages
  const adminConfigDir = path__default.join(process.cwd(), 'admin');
  const userPagesDir = path__default.join(adminConfigDir, 'pages');
  let userPagesEntries = [];
  try {
    userPagesEntries = await walk(userPagesDir, {
      entryFilter: entry => entry.dirent.isFile() && pageExtensions.has(path__default.extname(entry.name))
    });
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }
  for (const {
    path
  } of userPagesEntries) {
    const outputFilename = path__default.relative(adminConfigDir, path);
    const importPath = path__default.relative(path__default.dirname(path__default.join(projectAdminPath, outputFilename)), path);
    const serializedImportPath = serializePathForImport(importPath);
    adminFiles.push({
      mode: 'write',
      outputPath: outputFilename,
      src: `export { default } from ${serializedImportPath}`
    });
  }
  adminFiles = adminFiles.filter(x => !uniqueFiles.has(path__default.normalize(path__default.join(projectAdminPath, x.outputPath))));
  await Promise.all(adminFiles.map(file => writeAdminFile(file, projectAdminPath)));

  // Because Next will re-compile things (or at least check things and log a bunch of stuff)
  // if we delete pages and then re-create them, we want to avoid that when live reloading
  // so we only delete things that shouldn't exist anymore
  // this won't clear out empty directories, this is fine since:
  // - they won't create pages in Admin UI which is really what this deleting is about avoiding
  // - we'll remove them when the user restarts the process
  if (isLiveReload) {
    const ignoredDir = path__default.resolve(projectAdminPath, '.next');
    const ignoredFiles = new Set([...adminFiles.map(x => x.outputPath), ...uniqueFiles, 'next-env.d.ts', 'pages/api/__keystone_api_build.js'].map(x => path__default.resolve(projectAdminPath, x)));
    const entries = await walk(projectAdminPath, {
      deepFilter: entry => entry.path !== ignoredDir,
      entryFilter: entry => entry.dirent.isFile() && !ignoredFiles.has(entry.path)
    });
    await Promise.all(entries.map(entry => fs__default.remove(entry.path)));
  }
};

// WARNING: be careful not to import `esbuild` within next

function getEsbuildConfig(cwd) {
  return {
    entryPoints: ['./keystone'],
    absWorkingDir: cwd,
    bundle: true,
    // TODO: this cannot be changed for now, circular dependency with getSystemPaths, getEsbuildConfig
    outfile: '.keystone/config.js',
    format: 'cjs',
    platform: 'node',
    plugins: [{
      name: 'external-node_modules',
      setup(build) {
        build.onResolve({
          // this regex is intended to be the opposite of /^\.\.?(?:\/|$)/
          // so it matches anything that isn't a relative import
          // so this means that we're only going to bundle relative imports
          // we can't use a negative lookahead/lookbehind because this regex is executed
          // by Go's regex package which doesn't support them
          // this regex could have less duplication with nested groups but this is probably easier to read
          filter: /(?:^[^.])|(?:^\.[^/.])|(?:^\.\.[^/])/
        }, args => {
          return {
            external: true,
            path: args.path
          };
        });
      }
    }]
  };
}

async function build(cwd, _ref) {
  var _config$ui;
  let {
    frozen,
    prisma,
    ui
  } = _ref;
  await esbuild.build(getEsbuildConfig(cwd));

  // TODO: this cannot be changed for now, circular dependency with getSystemPaths, getEsbuildConfig
  const config = getBuiltKeystoneConfiguration(cwd);
  const {
    graphQLSchema,
    adminMeta
  } = createSystem(config);
  const paths = getSystemPaths(cwd, config);
  if (prisma) {
    if (frozen) {
      await validatePrismaAndGraphQLSchemas(cwd, config, graphQLSchema);
      console.log('✨ GraphQL and Prisma schemas are up to date');
    } else {
      await generatePrismaAndGraphQLSchemas(cwd, config, graphQLSchema);
      console.log('✨ Generated GraphQL and Prisma schemas');
    }
    await generateTypescriptTypesAndPrisma(cwd, config, graphQLSchema);
  }
  if ((_config$ui = config.ui) !== null && _config$ui !== void 0 && _config$ui.isDisabled || !ui) return;
  console.log('✨ Generating Admin UI code');
  await generateAdminUI(config, graphQLSchema, adminMeta, paths.admin, false);
  console.log('✨ Building Admin UI');
  await nextBuild(paths.admin);
}

const packageNames = ['@keystone-6/core', '@keystone-6/auth', '@keystone-6/fields-document', '@keystone-6/cloudinary', '@keystone-6/session-store-redis', '@opensaas/keystone-nextjs-auth'];
function log(message) {
  if (process.env.KEYSTONE_TELEMETRY_DEBUG === '1') {
    console.log(`${message}`);
  }
}
function getTelemetryConfig() {
  const userConfig = new Conf({
    projectName: 'keystonejs',
    projectSuffix: '',
    projectVersion: '2.0.0',
    migrations: {
      '^2.0.0': store => {
        var _existing$device$last;
        const existing = store.get('telemetry');
        if (!existing) return;
        const replacement = {
          // every informedAt was a copy of device.informedAt, it was copied everywhere
          informedAt: existing.device.informedAt,
          device: {
            lastSentDate: (_existing$device$last = existing.device.lastSentDate) !== null && _existing$device$last !== void 0 ? _existing$device$last : null
          },
          projects: {} // manually copying this below
        };

        // copy existing project lastSentDate's
        for (const [projectPath, project] of Object.entries(existing.projects)) {
          if (projectPath === 'default') continue; // informedAt moved to root

          // dont copy garbage
          if (typeof project !== 'object') continue;
          if (typeof project.lastSentDate !== 'string') continue;
          if (new Date(project.lastSentDate).toString() === 'Invalid Date') continue;

          // only lastSentDate is retained
          replacement.projects[projectPath] = {
            lastSentDate: project.lastSentDate
          };
        }
        store.set('telemetry', replacement);
      }
    }
  });
  return {
    telemetry: userConfig.get('telemetry'),
    userConfig
  };
}
function getDefaultedTelemetryConfig() {
  const {
    telemetry,
    userConfig
  } = getTelemetryConfig();
  if (telemetry === undefined) {
    return {
      telemetry: {
        informedAt: null,
        device: {
          lastSentDate: null
        },
        projects: {} // help Typescript infer the type
      },

      userConfig
    };
  }
  return {
    telemetry,
    userConfig
  };
}
const todaysDate = new Date().toISOString().slice(0, 10);
function collectFieldCount(lists) {
  const fields = {
    unknown: 0
  };
  for (const list of Object.values(lists)) {
    for (const [fieldPath, field] of Object.entries(list.fields)) {
      const fieldType = field.__ksTelemetryFieldTypeName;
      if (!fieldType) {
        // skip id fields
        if (fieldPath.endsWith('id')) continue;
        fields.unknown++;
        continue;
      }
      fields[fieldType] || (fields[fieldType] = 0);
      fields[fieldType] += 1;
    }
  }
  return fields;
}
function collectPackageVersions() {
  const versions = {
    '@keystone-6/core': '0.0.0' // effectively unknown
  };

  for (const packageName of packageNames) {
    try {
      const packageJson = require(`${packageName}/package.json`);
      versions[packageName] = packageJson.version;
    } catch {
      // do nothing, most likely because the package is not installed
    }
  }
  return versions;
}
function printAbout() {
  console.log(`${chalk.yellow('Keystone collects anonymous data when you run')} ${chalk.green('"keystone dev"')}`);
  console.log();
  console.log(`For more information, including how to opt-out see https://keystonejs.com/telemetry`);
}
function printTelemetryStatus() {
  const {
    telemetry
  } = getTelemetryConfig();
  if (telemetry === undefined) {
    console.log(`Keystone telemetry has been reset to ${chalk.yellow('uninitialized')}`);
    console.log();
    console.log(`Telemetry will be sent the next time you run ${chalk.green('"keystone dev"')}, unless you opt-out`);
  } else if (telemetry === false) {
    console.log(`Keystone telemetry is ${chalk.red('disabled')}`);
    console.log();
    console.log(`Telemetry will ${chalk.red('not')} be sent by this system user`);
  } else if (typeof telemetry === 'object') {
    console.log(`Keystone telemetry is ${chalk.green('enabled')}`);
    console.log();
    console.log(`  Device telemetry was last sent on ${telemetry.device.lastSentDate}`);
    for (const [projectPath, project] of Object.entries(telemetry.projects)) {
      console.log(`  Project telemetry for "${chalk.yellow(projectPath)}" was last sent on ${project === null || project === void 0 ? void 0 : project.lastSentDate}`);
    }
    console.log();
    console.log(`Telemetry will be sent the next time you run ${chalk.green('"keystone dev"')}, unless you opt-out`);
  }
}
function inform() {
  const {
    telemetry,
    userConfig
  } = getDefaultedTelemetryConfig();

  // no telemetry? somehow our earlier checks missed an opt out, do nothing
  if (telemetry === false) return;
  console.log(); // gap to help visiblity
  console.log(`${chalk.bold('Keystone Telemetry')}`);
  printAbout();
  console.log(`You can use ${chalk.green('"keystone telemetry --help"')} to update your preferences at any time`);
  console.log();
  console.log(`No telemetry data has been sent yet, but telemetry will be sent the next time you run ${chalk.green('"keystone dev"')}, unless you opt-out`);
  console.log(); // gap to help visiblity

  // update the informedAt
  telemetry.informedAt = new Date().toJSON();
  userConfig.set('telemetry', telemetry);
}
async function sendEvent(eventType, eventData) {
  const endpoint = process.env.KEYSTONE_TELEMETRY_ENDPOINT || telemetryEndpoint;
  const url = `${endpoint}/v1/event/${eventType}`;
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  });
  log(`sent ${eventType} report`);
}
async function sendProjectTelemetryEvent(cwd, lists, dbProviderName) {
  var _telemetry$projects$c;
  const {
    telemetry,
    userConfig
  } = getDefaultedTelemetryConfig();

  // no telemetry? somehow our earlier checks missed an opt out, do nothing
  if (telemetry === false) return;
  const project = (_telemetry$projects$c = telemetry.projects[cwd]) !== null && _telemetry$projects$c !== void 0 ? _telemetry$projects$c : {
    lastSentDate: null
  };
  const {
    lastSentDate
  } = project;
  if (lastSentDate && lastSentDate >= todaysDate) {
    log('project telemetry already sent today');
    return;
  }
  await sendEvent('project', {
    previous: lastSentDate,
    fields: collectFieldCount(lists),
    lists: Object.keys(lists).length,
    versions: collectPackageVersions(),
    database: dbProviderName
  });

  // update the project lastSentDate
  telemetry.projects[cwd] = {
    lastSentDate: todaysDate
  };
  userConfig.set('telemetry', telemetry);
}
async function sendDeviceTelemetryEvent() {
  const {
    telemetry,
    userConfig
  } = getDefaultedTelemetryConfig();

  // no telemetry? somehow our earlier checks missed an opt out, do nothing
  if (telemetry === false) return;
  const {
    lastSentDate
  } = telemetry.device;
  if (lastSentDate && lastSentDate >= todaysDate) {
    log('device telemetry already sent today');
    return;
  }
  await sendEvent('device', {
    previous: lastSentDate,
    os: os.platform(),
    node: process.versions.node.split('.')[0]
  });

  // update the device lastSentDate
  telemetry.device = {
    lastSentDate: todaysDate
  };
  userConfig.set('telemetry', telemetry);
}
async function runTelemetry(cwd, lists, dbProviderName) {
  try {
    if (ci.isCI ||
    // don't run in CI
    process.env.NODE_ENV === 'production' ||
    // don't run in production
    process.env.KEYSTONE_TELEMETRY_DISABLED === '1' // don't run if the user has disabled it
    ) {
      return;
    }
    const {
      telemetry
    } = getDefaultedTelemetryConfig();

    // don't run if the user has opted out
    if (telemetry === false) return;

    // don't send telemetry before we inform the user, allowing opt-out
    if (!telemetry.informedAt) return inform();
    await sendProjectTelemetryEvent(cwd, lists, dbProviderName);
    await sendDeviceTelemetryEvent();
  } catch (err) {
    log(err);
  }
}
function enableTelemetry() {
  const {
    telemetry,
    userConfig
  } = getTelemetryConfig();
  if (telemetry === false) {
    userConfig.delete('telemetry');
  }
  printTelemetryStatus();
}
function disableTelemetry() {
  const {
    userConfig
  } = getTelemetryConfig();
  userConfig.set('telemetry', false);
  printTelemetryStatus();
}
function resetTelemetry() {
  const {
    userConfig
  } = getTelemetryConfig();
  userConfig.delete('telemetry');
  printTelemetryStatus();
}

const devLoadingHTMLFilepath = path__default.join(pkgDir$1, 'static', 'dev-loading.html');
function stripExtendHttpServer(config) {
  const {
    server,
    ...rest
  } = config;
  if (server) {
    const {
      extendHttpServer,
      ...restServer
    } = server;
    return {
      ...rest,
      server: restServer
    };
  }
  return rest;
}
function resolvablePromise() {
  let _resolve;
  const promise = new Promise(resolve => {
    _resolve = resolve;
  });
  promise.resolve = _resolve;
  return promise;
}
async function dev(cwd, _ref) {
  var _esbuildConfig$plugin, _config$server;
  let {
    dbPush,
    prisma,
    server,
    ui
  } = _ref;
  console.log('✨ Starting Keystone');
  let lastPromise = resolvablePromise();
  const builds = {
    [Symbol.asyncIterator]: () => ({
      next: () => lastPromise
    })
  };
  function addBuildResult(build) {
    const prev = lastPromise;
    lastPromise = resolvablePromise();
    prev.resolve({
      value: build,
      done: false
    });
  }
  const esbuildConfig = getEsbuildConfig(cwd);
  const esbuildContext = await esbuild.context({
    ...esbuildConfig,
    plugins: [...((_esbuildConfig$plugin = esbuildConfig.plugins) !== null && _esbuildConfig$plugin !== void 0 ? _esbuildConfig$plugin : []), {
      name: 'esbuildWatchPlugin',
      setup(build) {
        // TODO: no any
        build.onEnd(addBuildResult);
      }
    }]
  });
  try {
    const firstBuild = await esbuildContext.rebuild();
    addBuildResult(firstBuild);
  } catch (e) {
    // esbuild prints everything we want users to see
  }
  esbuildContext.watch();

  // TODO: this cannot be changed for now, circular dependency with getSystemPaths, getEsbuildConfig
  const app = server ? express() : null;
  const httpServer = app ? createServer(app) : null;
  let expressServer = null;
  let hasAddedAdminUIMiddleware = false;
  const configWithExtendHttp = getBuiltKeystoneConfiguration(cwd);
  const config = stripExtendHttpServer(configWithExtendHttp);
  const paths = getSystemPaths(cwd, config);
  const isReady = () => !server || expressServer !== null && hasAddedAdminUIMiddleware;
  let prismaClient = null;
  async function stop(aHttpServer) {
    let exit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    await esbuildContext.dispose();

    //   WARNING: this is only actually required for tests
    // stop httpServer
    if (aHttpServer) {
      await new Promise(async (resolve, reject) => {
        aHttpServer.close(async err => {
          if (err) {
            console.error('Error closing the server', err);
            return reject(err);
          }
          resolve(null);
        });
      });
    }

    //   WARNING: this is only required for tests
    // stop Prisma
    try {
      var _prismaClient, _prismaClient$disconn;
      await ((_prismaClient = prismaClient) === null || _prismaClient === void 0 ? void 0 : (_prismaClient$disconn = _prismaClient.disconnect) === null || _prismaClient$disconn === void 0 ? void 0 : _prismaClient$disconn.call(_prismaClient));
    } catch (err) {
      console.error('Error disconnecting from the database', err);
      throw err;
    }
    if (exit) throw new ExitError(1);
  }
  const initKeystone = async () => {
    var _configWithExtendHttp;
    await fs__default.remove(paths.admin);
    const {
      adminMeta,
      graphQLSchema,
      context,
      prismaSchema,
      prismaClientModule,
      apolloServer,
      ...rest
    } = await setupInitialKeystone(cwd, config, {
      server,
      prisma,
      dbPush
    });
    if (configWithExtendHttp !== null && configWithExtendHttp !== void 0 && (_configWithExtendHttp = configWithExtendHttp.server) !== null && _configWithExtendHttp !== void 0 && _configWithExtendHttp.extendHttpServer && httpServer && context) {
      configWithExtendHttp.server.extendHttpServer(httpServer, context, graphQLSchema);
    }
    prismaClient = context === null || context === void 0 ? void 0 : context.prisma;
    if (rest.expressServer) {
      ({
        expressServer
      } = rest);
    }
    const nextApp = await initAdminUI(cwd, config, graphQLSchema, adminMeta, ui);
    if (nextApp && expressServer && context) {
      expressServer.use(createAdminUIMiddlewareWithNextApp(config, context, nextApp));
    }
    hasAddedAdminUIMiddleware = true;
    initKeystonePromiseResolve();
    const initialisedLists = initialiseLists(config);
    const originalPrismaSchema = printPrismaSchema(initialisedLists, config.db.prismaClientPath, config.db.provider, config.db.prismaPreviewFeatures, config.db.additionalPrismaDatasourceProperties, config.db.extendPrismaSchema);
    let lastPrintedGraphQLSchema = printSchema(graphQLSchema);
    let lastApolloServer = apolloServer || null;
    if (config.telemetry !== false) {
      runTelemetry(cwd, initialisedLists, config.db.provider);
    }
    for await (const buildResult of builds) {
      if (buildResult.errors.length) continue;
      console.log('compiled successfully');
      try {
        // wipe the require cache
        {
          const resolved = require.resolve(paths.config);
          delete require.cache[resolved];
        }
        const newConfigWithHttp = getBuiltKeystoneConfiguration(cwd);
        const newConfig = stripExtendHttpServer(newConfigWithHttp);
        if (prisma) {
          const newPrismaSchema = printPrismaSchema(initialiseLists(newConfig), config.db.prismaClientPath, newConfig.db.provider, newConfig.db.prismaPreviewFeatures, newConfig.db.additionalPrismaDatasourceProperties, newConfig.db.extendPrismaSchema);
          if (originalPrismaSchema !== newPrismaSchema) {
            console.error('🔄 Your prisma schema has changed, please restart Keystone');
            return stop(null, true);
          }
          // we only need to test for the things which influence the prisma client creation
          // and aren't written into the prisma schema since we check whether the prisma schema has changed above
          if (JSON.stringify(newConfig.db.enableLogging) !== JSON.stringify(config.db.enableLogging) || newConfig.db.url !== config.db.url || newConfig.db.useMigrations !== config.db.useMigrations) {
            console.error('Your database configuration has changed, please restart Keystone');
            return stop(null, true);
          }
        }
        const {
          graphQLSchema,
          getKeystone,
          adminMeta
        } = createSystem(newConfig);
        // we're not using generateCommittedArtifacts or any of the similar functions
        // because we will never need to write a new prisma schema here
        // and formatting the prisma schema leaves some listeners on the process
        // which means you get a "there's probably a memory leak" warning from node
        const newPrintedGraphQLSchema = printSchema(graphQLSchema);
        if (newPrintedGraphQLSchema !== lastPrintedGraphQLSchema) {
          await fs__default.writeFile(paths.schema.graphql, getFormattedGraphQLSchema(newPrintedGraphQLSchema));
          lastPrintedGraphQLSchema = newPrintedGraphQLSchema;
        }
        await generateTypescriptTypes(cwd, newConfig, graphQLSchema);
        await generateAdminUI(newConfig, graphQLSchema, adminMeta, paths.admin, true);
        if (prismaClientModule) {
          if (server && lastApolloServer) {
            const keystone = getKeystone({
              PrismaClient: function fakePrismaClientClass() {
                return prismaClient;
              },
              Prisma: prismaClientModule.Prisma
            });
            const servers = await createExpressServer(newConfig, graphQLSchema, keystone.context);
            if (nextApp) {
              servers.expressServer.use(createAdminUIMiddlewareWithNextApp(newConfig, keystone.context, nextApp));
            }
            expressServer = servers.expressServer;
            let prevApolloServer = lastApolloServer;
            lastApolloServer = servers.apolloServer;
            await prevApolloServer.stop();
          }
        }
      } catch (err) {
        console.error(`Error loading your Keystone config`, err);
      }
    }
  };

  // You shouldn't really be doing a healthcheck on the dev server, but we
  // respond on the endpoint with the correct error code just in case. This
  // doesn't send the configured data shape, because config doesn't allow
  // for the "not ready" case but that's probably OK.
  if ((_config$server = config.server) !== null && _config$server !== void 0 && _config$server.healthCheck && app) {
    const healthCheckPath$1 = config.server.healthCheck === true ? healthCheckPath : config.server.healthCheck.path || healthCheckPath;
    app.use(healthCheckPath$1, (req, res, next) => {
      if (expressServer) return next();
      res.status(503).json({
        status: 'fail',
        timestamp: Date.now()
      });
    });
  }

  // Serve the dev status page for the Admin UI
  let initKeystonePromiseResolve;
  let initKeystonePromiseReject;
  let initKeystonePromise = new Promise((resolve, reject) => {
    initKeystonePromiseResolve = resolve;
    initKeystonePromiseReject = reject;
  });
  if (app && httpServer) {
    app.use('/__keystone_dev_status', (req, res) => {
      res.json({
        ready: isReady() ? true : false
      });
    });

    // Pass the request the express server, or serve the loading page
    app.use((req, res, next) => {
      var _config$graphql;
      // If both the express server and Admin UI Middleware are ready, we're go!
      if (expressServer && hasAddedAdminUIMiddleware) {
        return expressServer(req, res, next);
      }
      // Otherwise, we may be able to serve the GraphQL API
      const {
        pathname
      } = url.parse(req.url);
      if (expressServer && pathname === (((_config$graphql = config.graphql) === null || _config$graphql === void 0 ? void 0 : _config$graphql.path) || '/api/graphql')) {
        return expressServer(req, res, next);
      }
      // Serve the loading page
      res.sendFile(devLoadingHTMLFilepath);
    });
    const httpOptions = {
      port: 3000
    };
    if (config !== null && config !== void 0 && config.server && 'port' in config.server) {
      httpOptions.port = config.server.port;
    }
    if (config !== null && config !== void 0 && config.server && 'options' in config.server && config.server.options) {
      Object.assign(httpOptions, config.server.options);
    }

    // preference env.PORT if supplied
    if ('PORT' in process.env) {
      httpOptions.port = parseInt(process.env.PORT || '');
    }

    // preference env.HOST if supplied
    if ('HOST' in process.env) {
      httpOptions.host = process.env.HOST || '';
    }
    const server = httpServer.listen(httpOptions, err => {
      var _config$graphql2;
      if (err) throw err;
      const easyHost = [undefined, '', '::', '0.0.0.0'].includes(httpOptions.host) ? 'localhost' : httpOptions.host;
      console.log(`⭐️ Server listening on ${httpOptions.host || ''}:${httpOptions.port} (http://${easyHost}:${httpOptions.port}/)`);
      console.log(`⭐️ GraphQL API available at ${((_config$graphql2 = config.graphql) === null || _config$graphql2 === void 0 ? void 0 : _config$graphql2.path) || '/api/graphql'}`);

      // Don't start initialising Keystone until the dev server is ready,
      // otherwise it slows down the first response significantly
      initKeystone().catch(async err => {
        await stop(server);
        initKeystonePromiseReject(err);
      });
    });
    await initKeystonePromise;
    return async () => await stop(server);
  } else {
    await initKeystone();
    return () => Promise.resolve();
  }
}
async function setupInitialKeystone(cwd, config, options) {
  const {
    dbPush,
    prisma,
    server
  } = options;
  const {
    graphQLSchema,
    adminMeta,
    getKeystone
  } = createSystem(config);

  // mkdir's for local storage
  for (const val of Object.values(config.storage || {})) {
    if (val.kind !== 'local') continue;
    fs__default.mkdirSync(val.storagePath, {
      recursive: true
    });
    console.warn(`WARNING: 'mkdir -p ${val.storagePath}' won't happen in production`);
  }
  const paths = getSystemPaths(cwd, config);

  // Generate the Artifacts
  if (prisma) {
    console.log('✨ Generating GraphQL and Prisma schemas');
    const prismaSchema = (await generatePrismaAndGraphQLSchemas(cwd, config, graphQLSchema)).prisma;
    const prismaClientGenerationPromise = generateTypescriptTypesAndPrisma(cwd, config, graphQLSchema);
    if (config.db.useMigrations) {
      await devMigrations(config.db.url, config.db.shadowDatabaseUrl, prismaSchema, paths.schema.prisma, false);
    } else if (dbPush) {
      await pushPrismaSchemaToDatabase(config.db.url, config.db.shadowDatabaseUrl, prismaSchema, paths.schema.prisma, false);
    } else {
      console.warn('⚠️ Skipping database schema push');
    }
    await prismaClientGenerationPromise;
    const prismaClientModule = require(paths.prisma);
    const keystone = getKeystone(prismaClientModule);
    console.log('✨ Connecting to the database');
    await keystone.connect(); // TODO: remove, replace with server.onStart
    if (!server) {
      return {
        adminMeta,
        graphQLSchema,
        context: keystone.context,
        prismaSchema,
        prismaClientModule
      };
    }
    console.log('✨ Creating server');
    const {
      apolloServer,
      expressServer
    } = await createExpressServer(config, graphQLSchema, keystone.context);
    console.log(`✅ GraphQL API ready`);
    return {
      adminMeta,
      expressServer,
      apolloServer,
      graphQLSchema,
      context: keystone.context,
      prismaSchema,
      prismaClientModule
    };
  }
  return {
    adminMeta,
    graphQLSchema
  };
}
async function initAdminUI(cwd, config, graphQLSchema, adminMeta, ui) {
  var _config$ui;
  if ((_config$ui = config.ui) !== null && _config$ui !== void 0 && _config$ui.isDisabled || !ui) return;
  const paths = getSystemPaths(cwd, config);
  console.log('✨ Generating Admin UI code');
  await generateAdminUI(config, graphQLSchema, adminMeta, paths.admin, false);
  console.log('✨ Preparing Admin UI app');
  const nextApp = next({
    dev: true,
    dir: paths.admin
  });
  await nextApp.prepare();
  console.log(`✅ Admin UI ready`);
  return nextApp;
}

async function prisma(cwd, args, frozen) {
  if (frozen) {
    args = args.filter(arg => arg !== '--frozen');
  } else {
    await esbuild.build(getEsbuildConfig(cwd));
  }

  // TODO: this cannot be changed for now, circular dependency with getSystemPaths, getEsbuildConfig
  const config = getBuiltKeystoneConfiguration(cwd);
  const {
    graphQLSchema
  } = createSystem(config);
  await validatePrismaAndGraphQLSchemas(cwd, config, graphQLSchema);
  await generateTypescriptTypesAndPrisma(cwd, config, graphQLSchema);
  const result = await execa('node', [require.resolve('prisma'), ...args], {
    cwd,
    stdio: 'inherit',
    reject: false,
    env: {
      ...process.env,
      DATABASE_URL: config.db.url,
      PRISMA_HIDE_UPDATE_MESSAGE: '1'
    }
  });
  if (result.exitCode !== 0) throw new ExitError(result.exitCode);
}

const start = async (cwd, _ref) => {
  var _config$ui;
  let {
    ui,
    withMigrations
  } = _ref;
  console.log('✨ Starting Keystone');

  // TODO: this cannot be changed for now, circular dependency with getSystemPaths, getEsbuildConfig
  const builtConfigPath = getBuiltKeystoneConfigurationPath(cwd);

  // This is the compiled version of the configuration which was generated during the build step
  if (!fs.existsSync(builtConfigPath)) {
    console.error('🚨 keystone build must be run before running keystone start');
    throw new ExitError(1);
  }
  const config = getBuiltKeystoneConfiguration(cwd);
  const paths = getSystemPaths(cwd, config);
  const {
    getKeystone,
    graphQLSchema
  } = createSystem(config);
  const prismaClient = require(paths.prisma);
  const keystone = getKeystone(prismaClient);
  if (withMigrations) {
    console.log('✨ Applying database migrations');
    await deployMigrations(paths.schema.prisma, config.db.url);
  }
  console.log('✨ Connecting to the database');
  await keystone.connect();
  console.log('✨ Creating server');
  const {
    expressServer,
    httpServer
  } = await createExpressServer(config, graphQLSchema, keystone.context);
  console.log(`✅ GraphQL API ready`);
  if (!((_config$ui = config.ui) !== null && _config$ui !== void 0 && _config$ui.isDisabled) || ui) {
    console.log('✨ Preparing Admin UI Next.js app');
    const nextApp = next({
      dev: false,
      dir: paths.admin
    });
    await nextApp.prepare();
    expressServer.use(await createAdminUIMiddlewareWithNextApp(config, keystone.context, nextApp));
    console.log(`✅ Admin UI ready`);
  }
  const httpOptions = {
    port: 3000
  };
  if (config !== null && config !== void 0 && config.server && 'port' in config.server) {
    httpOptions.port = config.server.port;
  }
  if (config !== null && config !== void 0 && config.server && 'options' in config.server && config.server.options) {
    Object.assign(httpOptions, config.server.options);
  }

  // preference env.PORT if supplied
  if ('PORT' in process.env) {
    httpOptions.port = parseInt(process.env.PORT || '');
  }

  // preference env.HOST if supplied
  if ('HOST' in process.env) {
    httpOptions.host = process.env.HOST || '';
  }
  httpServer.listen(httpOptions, err => {
    if (err) throw err;
    const easyHost = [undefined, '', '::', '0.0.0.0'].includes(httpOptions.host) ? 'localhost' : httpOptions.host;
    console.log(`⭐️ Server listening on ${httpOptions.host || ''}:${httpOptions.port} (http://${easyHost}:${httpOptions.port}/)`);
  });
};

async function telemetry(cwd, command) {
  const usageText = `
    Usage
      $ keystone telemetry [command]
    Commands
      disable     opt-out of telemetry, disabled for this system user
      enable      opt-in to telemetry
      reset       resets your telemetry configuration (if any)
      status      show if telemetry is enabled, disabled or uninitialised

For more details visit: https://keystonejs.com/telemetry
    `;
  if (command === 'disable') return disableTelemetry();
  if (command === 'enable') return enableTelemetry();
  if (command === 'reset') return resetTelemetry();
  if (command === 'status') return printTelemetryStatus();
  if (command === '--help') {
    console.log(`${chalk.bold('Keystone Telemetry')}`);
    console.log(usageText);
    return;
  }
  console.error(command ? `Invalid option: ${command}` : '');
  console.error(usageText);
}

function defaultFlags(flags, defaults) {
  flags = {
    ...defaults,
    ...flags
  };
  for (const [key, value] of Object.entries(flags)) {
    if (value !== undefined && !(key in defaults)) {
      // TODO: maybe we should prevent other flags?
      //throw new Error(`Option '${key}' is unsupported for this command`);
      continue;
    }
    const defaultValue = defaults[key];
    // should we default the flag?
    if (value === undefined) {
      flags[key] = defaultValue;
    }
    if (typeof value !== typeof defaultValue) {
      throw new Error(`Option '${key}' should be of type ${typeof defaultValue}`);
    }
  }
  return flags;
}
async function cli(cwd, argv) {
  const {
    input,
    help,
    flags
  } = meow(`
    Usage
      $ keystone [command] [options]
    Commands
        dev           start the project in development mode (default)
        postinstall   build the project (for development, optional)
        build         build the project (required by \`keystone start\`)
        start         start the project
        prisma        run Prisma CLI commands safely
        telemetry     sets telemetry preference (enable/disable/status)

    Options
      --fix (postinstall) @deprecated
        do build the graphql or prisma schemas, don't validate them

      --frozen (build, prisma)
        don't build the graphql or prisma schemas, only validate them

      --no-db-push (dev)
        don't push any updates of your Prisma schema to your database

      --no-prisma (build, dev)
        don't build or validate the prisma schema

      --no-server (dev)
        don't start the express server

      --no-ui (build, dev, start)
        don't build and serve the AdminUI

      --with-migrations (start)
        trigger prisma to run migrations as part of startup
    `, {
    argv
  });
  const command = input[0] || 'dev';
  if (command === 'dev') {
    return dev(cwd, defaultFlags(flags, {
      dbPush: true,
      prisma: true,
      server: true,
      ui: true
    }));
  }
  if (command === 'build') {
    return build(cwd, defaultFlags(flags, {
      frozen: false,
      prisma: true,
      ui: true
    }));
  }
  if (command === 'start') {
    return start(cwd, defaultFlags(flags, {
      ui: true,
      withMigrations: false
    }));
  }
  if (command === 'prisma') {
    return prisma(cwd, argv.slice(1), Boolean(flags.frozen));
  }
  if (command === 'telemetry') return telemetry(cwd, argv[1]);

  // WARNING: postinstall is an alias for `build --frozen --no-ui`
  if (command === 'postinstall') {
    return build(cwd, {
      frozen: !defaultFlags(flags, {
        fix: false
      }).fix,
      prisma: true,
      ui: false
    });
  }
  console.log(`${command} is an unknown command`);
  console.log(help);
  throw new ExitError(1);
}

export { cli };
