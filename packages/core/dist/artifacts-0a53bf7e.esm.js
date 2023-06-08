import path__default from 'path';
import { createRequire } from 'module';
import { GraphQLInputObjectType, GraphQLEnumType, introspectionTypes, GraphQLNonNull, GraphQLList, GraphQLScalarType, printSchema } from 'graphql';
import * as fs from 'fs-extra';
import { formatSchema, getGenerators } from '@prisma/internals';
import { E as ExitError } from './utils-b5eeaa17.esm.js';
import { l as getDBFieldKeyForFieldOnMultiField, y as areArraysEqual, v as initialiseLists, i as initConfig } from './config-50249dc4.esm.js';

const introspectionTypesSet = new Set(introspectionTypes);
function stringify(x) {
  return JSON.stringify(x).slice(1, -1);
}
function printEnumTypeDefinition(type) {
  return [`export type ${type.name} =`, type.getValues().map(x => `  | '${stringify(x.name)}'`).join('\n') + ';'].join('\n');
}
function printTypeReference(type, scalars) {
  if (type instanceof GraphQLNonNull) {
    return printTypeReferenceWithoutNullable(type.ofType, scalars);
  }
  return `${printTypeReferenceWithoutNullable(type, scalars)} | null`;
}
function printTypeReferenceWithoutNullable(type, scalars) {
  if (type instanceof GraphQLList) {
    return `ReadonlyArray<${printTypeReference(type.ofType, scalars)}> | ${printTypeReference(type.ofType, scalars)}`;
  }
  const name = type.name;
  if (type instanceof GraphQLScalarType) {
    if (scalars[name] === undefined) return 'any';
    return `Scalars['${stringify(name)}']`;
  }
  return name;
}
function printInputObjectTypeDefinition(type, scalars) {
  return [`export type ${type.name} = {`, ...Object.values(type.getFields()).map(_ref => {
    let {
      type,
      defaultValue,
      name
    } = _ref;
    const maybe = type instanceof GraphQLNonNull ? '' : '?';
    return `  readonly ${name}${maybe}: ${printTypeReference(type, scalars)};`;
  }), '};'].join('\n');
}
function printInputTypesFromSchema(schema, scalars) {
  const output = ['type Scalars = {', ...Object.keys(scalars).map(scalar => `  readonly ${scalar}: ${scalars[scalar]};`), '};'];
  for (const type of Object.values(schema.getTypeMap())) {
    // We don't want to print TS types for the built-in GraphQL introspection types
    // they won't be used for anything we want to print here.
    if (introspectionTypesSet.has(type)) continue;
    if (type instanceof GraphQLInputObjectType) {
      output.push('', printInputObjectTypeDefinition(type, scalars));
    }
    if (type instanceof GraphQLEnumType) {
      output.push('', printEnumTypeDefinition(type));
    }
  }
  return output.join('\n');
}
function printInterimType(prismaClientPath, list, listKey, typename, operation) {
  const prismaType = `import('${prismaClientPath}').Prisma.${listKey}${operation}Input`;
  return [`type Resolved${typename} = {`, ...Object.entries(list.fields).map(_ref2 => {
    let [fieldKey, {
      dbField
    }] = _ref2;
    if (dbField.kind === 'none' || fieldKey === 'id') return `  ${fieldKey}?: undefined;`;
    if (dbField.kind === 'multi') {
      return [`  ${fieldKey}: {`, ...Object.entries(dbField.fields).map(_ref3 => {
        let [subFieldKey, subDbField] = _ref3;
        // TODO: untrue if a db defaultValue is set
        //              const optional = operation === 'Create' && subDbField.mode === 'required' ? '' : '?';
        const optional = '?';
        return `  ${subFieldKey}${optional}: ${prismaType}['${fieldKey}_${subFieldKey}'];`;
      }), `  };`].join('\n');
    }

    // TODO: untrue if a db defaultValue is set
    //        const optional = operation === 'Create' && dbField.mode === 'required' ? '' : '?';
    const optional = '?';
    return `  ${fieldKey}${optional}: ${prismaType}['${fieldKey}'];`;
  }), `};`].join('\n');
}
function printListTypeInfo(prismaClientPath, listKey, list) {
  // prettier-ignore
  const {
    whereInputName,
    whereUniqueInputName,
    createInputName,
    updateInputName,
    listOrderName
  } = list.graphql.names;
  const listTypeInfoName = `Lists.${listKey}.TypeInfo`;

  // prettier-ignore
  return [`export type ${listKey}<Session = any> = import('@keystone-6/core').ListConfig<${listTypeInfoName}<Session>, any>;`, `namespace ${listKey} {`, `  export type Item = import('${prismaClientPath}').${listKey};`, `  export type TypeInfo<Session = any> = {`, `    key: '${listKey}';`, `    isSingleton: ${list.isSingleton};`, `    fields: ${Object.keys(list.fields).map(x => `'${x}'`).join(' | ')}`, `    item: Item;`, `    inputs: {`, `      where: ${list.graphql.isEnabled.query ? whereInputName : 'never'};`, `      uniqueWhere: ${list.graphql.isEnabled.query ? whereUniqueInputName : 'never'};`, `      create: ${list.graphql.isEnabled.create ? createInputName : 'never'};`, `      update: ${list.graphql.isEnabled.update ? updateInputName : 'never'};`, `      orderBy: ${list.graphql.isEnabled.query ? listOrderName : 'never'};`, `    };`, `    prisma: {`, `      create: ${list.graphql.isEnabled.create ? `Resolved${createInputName}` : 'never'};`, `      update: ${list.graphql.isEnabled.update ? `Resolved${updateInputName}` : 'never'};`, `    };`, `    all: __TypeInfo<Session>;`, `  };`, `}`].map(line => `  ${line}`).join('\n');
}
function printGeneratedTypes(prismaClientPath, graphQLSchema, lists) {
  const interimCreateUpdateTypes = [];
  const listsTypeInfo = [];
  const listsNamespaces = [];
  prismaClientPath = stringify(prismaClientPath).replace(/'/g, `\\'`);
  for (const [listKey, list] of Object.entries(lists)) {
    const listTypeInfoName = `Lists.${listKey}.TypeInfo`;
    if (list.graphql.isEnabled.create) {
      interimCreateUpdateTypes.push(printInterimType(prismaClientPath, list, listKey, list.graphql.names.createInputName, 'Create'));
    }
    if (list.graphql.isEnabled.update) {
      interimCreateUpdateTypes.push(printInterimType(prismaClientPath, list, listKey, list.graphql.names.updateInputName, 'Update'));
    }
    listsTypeInfo.push(`    readonly ${listKey}: ${listTypeInfoName};`);
    listsNamespaces.push(printListTypeInfo(prismaClientPath, listKey, list));
  }
  return ['/* eslint-disable */', '', printInputTypesFromSchema(graphQLSchema, {
    ID: 'string',
    Boolean: 'boolean',
    String: 'string',
    Int: 'number',
    Float: 'number',
    JSON: `import('@keystone-6/core/types').JSONValue`,
    Decimal: `import('@keystone-6/core/types').Decimal | string`
  }), '', interimCreateUpdateTypes.join('\n\n'), '', 'export declare namespace Lists {', ...listsNamespaces, '}', `export type Context<Session = any> = import('@keystone-6/core/types').KeystoneContext<TypeInfo<Session>>;`, `export type Config<Session = any> = import('@keystone-6/core/types').KeystoneConfig<TypeInfo<Session>>;`, '', 'export type TypeInfo<Session = any> = {', `  lists: {`, ...listsTypeInfo, `  };`, `  prisma: import('${prismaClientPath}').PrismaClient;`, `  session: Session;`, `};`, ``,
  // we need to reference the `TypeInfo` above in another type that is also called `TypeInfo`
  `type __TypeInfo<Session = any> = TypeInfo<Session>;`, ``, `export type Lists<Session = any> = {`, `  [Key in keyof TypeInfo['lists']]?: import('@keystone-6/core').ListConfig<TypeInfo<Session>['lists'][Key], any>`, `} & Record<string, import('@keystone-6/core').ListConfig<any, any>>;`, ``, `export {}`, ``].join('\n');
}

const modifiers = {
  required: '',
  optional: '?',
  many: '[]'
};
function printIndex(fieldPath, index) {
  return {
    none: '',
    unique: '@unique',
    index: `\n@@index([${fieldPath}])`
  }[index || 'none'];
}
function printNativeType(nativeType, datasourceName) {
  return nativeType === undefined ? '' : ` @${datasourceName}.${nativeType}`;
}
function printScalarDefaultValue(defaultValue) {
  if (defaultValue.kind === 'literal') {
    if (typeof defaultValue.value === 'string') {
      return JSON.stringify(defaultValue.value);
    }
    return defaultValue.value.toString();
  }
  if (defaultValue.kind === 'now' || defaultValue.kind === 'autoincrement' || defaultValue.kind === 'cuid' || defaultValue.kind === 'uuid') {
    return `${defaultValue.kind}()`;
  }
  if (defaultValue.kind === 'dbgenerated') {
    return `dbgenerated(${JSON.stringify(defaultValue.value)})`;
  }
  assertNever(defaultValue);
}
function assertNever(arg) {
  throw new Error(`expected to never be called but was called with ${arg}`);
}
function printField(fieldPath, field, datasourceName, lists) {
  if (field.kind === 'scalar') {
    const nativeType = printNativeType(field.nativeType, datasourceName);
    const index = printIndex(fieldPath, field.index);
    const defaultValue = field.default ? ` @default(${printScalarDefaultValue(field.default)})` : '';
    const map = field.map ? ` @map(${JSON.stringify(field.map)})` : '';
    const updatedAt = field.updatedAt ? ' @updatedAt' : '';
    return `${fieldPath} ${field.scalar}${modifiers[field.mode]}${updatedAt}${nativeType}${defaultValue}${map}${index}`;
  }
  if (field.kind === 'enum') {
    const index = printIndex(fieldPath, field.index);
    const defaultValue = field.default ? ` @default(${field.default.value})` : '';
    const map = field.map ? ` @map(${JSON.stringify(field.map)})` : '';
    return `${fieldPath} ${field.name}${modifiers[field.mode]}${defaultValue}${map}${index}`;
  }
  if (field.kind === 'multi') {
    return Object.entries(field.fields).map(_ref => {
      let [subField, field] = _ref;
      return printField(getDBFieldKeyForFieldOnMultiField(fieldPath, subField), field, datasourceName, lists);
    }).join('\n');
  }
  if (field.kind === 'relation') {
    if (field.mode === 'many') {
      return `${fieldPath} ${field.list}[] @relation("${field.relationName}")`;
    }
    if (field.foreignIdField.kind === 'none') {
      return `${fieldPath} ${field.list}? @relation("${field.relationName}")`;
    }
    const relationIdFieldPath = `${fieldPath}Id`;
    const relationField = `${fieldPath} ${field.list}? @relation("${field.relationName}", fields: [${relationIdFieldPath}], references: [id])`;
    const foreignList = lists[field.list];
    const foreignIdField = foreignList.resolvedDbFields.id;
    assertDbFieldIsValidForIdField(foreignList.listKey, foreignList.isSingleton, foreignIdField);
    const nativeType = printNativeType(foreignIdField.nativeType, datasourceName);
    const index = printIndex(relationIdFieldPath, field.foreignIdField.kind === 'owned' ? 'index' : 'unique');
    const relationIdField = `${relationIdFieldPath} ${foreignIdField.scalar}? @map(${JSON.stringify(field.foreignIdField.map)}) ${nativeType}${index}`;
    return `${relationField}\n${relationIdField}`;
  }
  // TypeScript's control flow analysis doesn't understand that this will never happen without the assertNever
  // (this will still correctly validate if any case is unhandled though)
  return assertNever(field);
}
function collectEnums(lists) {
  const enums = {};
  for (const [listKey, {
    resolvedDbFields
  }] of Object.entries(lists)) {
    for (const [fieldPath, field] of Object.entries(resolvedDbFields)) {
      const fields = field.kind === 'multi' ? Object.entries(field.fields).map(_ref2 => {
        let [key, field] = _ref2;
        return [field, `${listKey}.${fieldPath} (sub field ${key})`];
      }) : [[field, `${listKey}.${fieldPath}`]];
      for (const [field, ref] of fields) {
        if (field.kind !== 'enum') continue;
        const alreadyExistingEnum = enums[field.name];
        if (alreadyExistingEnum === undefined) {
          enums[field.name] = {
            values: field.values,
            firstDefinedByRef: ref
          };
          continue;
        }
        if (!areArraysEqual(alreadyExistingEnum.values, field.values)) {
          throw new Error(`The fields ${alreadyExistingEnum.firstDefinedByRef} and ${ref} both specify Prisma schema enums` + `with the name ${field.name} but they have different values:\n` + `enum from ${alreadyExistingEnum.firstDefinedByRef}:\n${JSON.stringify(alreadyExistingEnum.values, null, 2)}\n` + `enum from ${ref}:\n${JSON.stringify(field.values, null, 2)}`);
        }
      }
    }
  }
  return Object.entries(enums).map(_ref3 => {
    let [enumName, {
      values
    }] = _ref3;
    return `enum ${enumName} {\n${values.join('\n')}\n}`;
  }).join('\n');
}
function assertDbFieldIsValidForIdField(listKey, isSingleton, field) {
  if (field.kind !== 'scalar') {
    throw new Error(`id fields must be either a String or Int Prisma scalar but the id field for the ${listKey} list is not a scalar`);
  }
  // this may be loosened in the future
  if (field.scalar !== 'String' && field.scalar !== 'Int' && field.scalar !== 'BigInt') {
    throw new Error(`id fields must be String, Int or BigInt Prisma scalars but the id field for the ${listKey} list is a ${field.scalar} scalar`);
  }
  if (field.mode !== 'required') {
    throw new Error(`id fields must be a singular required field but the id field for the ${listKey} list is ${field.mode === 'many' ? 'a many' : 'an optional'} field`);
  }
  if (field.index !== undefined) {
    throw new Error(`id fields must not specify indexes themselves but the id field for the ${listKey} list specifies an index`);
  }
  // this will likely be loosened in the future
  if (field.default === undefined && !isSingleton) {
    throw new Error(`id fields must specify a Prisma/database level default value but the id field for the ${listKey} list does not`);
  }
}
function printPrismaSchema(lists, prismaClientPath, provider, prismaPreviewFeatures, additionalPrismaDatasourceProperties, extendPrismaCompleteSchema) {
  const additionalDataSources = Object.entries(additionalPrismaDatasourceProperties || {}).map(_ref4 => {
    let [key, value] = _ref4;
    return `${key} = "${value}"`;
  });
  const prismaSchema = [`// This file is automatically generated by Keystone, do not modify it manually.`, `// Modify your Keystone config when you want to change this.`, ``, `datasource ${provider} {`, `url = env("DATABASE_URL")`, `shadowDatabaseUrl = env("SHADOW_DATABASE_URL")`, `provider = "${provider}"`, ...additionalDataSources, `}`, ``, `generator client {`, `provider = "prisma-client-js"`, ...(prismaClientPath ? [`output = "${prismaClientPath}"`] : []), ...(prismaPreviewFeatures !== null && prismaPreviewFeatures !== void 0 && prismaPreviewFeatures.length ? [`previewFeatures = ["${prismaPreviewFeatures.join('","')}"]`] : []), '}'];
  for (const [listKey, {
    resolvedDbFields,
    prisma: {
      mapping,
      extendPrismaSchema: extendPrismaListSchema
    },
    isSingleton
  }] of Object.entries(lists)) {
    const listPrisma = [`model ${listKey} {`];
    for (const [fieldPath, field] of Object.entries(resolvedDbFields)) {
      if (fieldPath === 'id') {
        assertDbFieldIsValidForIdField(listKey, isSingleton, field);
      }
      if (field.kind !== 'none') {
        let fieldPrisma = printField(fieldPath, field, provider, lists);
        if (fieldPath === 'id') {
          fieldPrisma += ' @id';
        }
        listPrisma.push(field.extendPrismaSchema ? field.extendPrismaSchema(fieldPrisma) : fieldPrisma);
      }
    }
    if (mapping !== undefined) {
      listPrisma.push(`@@map(${JSON.stringify(mapping)})`);
    }
    listPrisma.push('}');
    const listPrismaStr = listPrisma.join('\n');
    prismaSchema.push(extendPrismaListSchema ? extendPrismaListSchema(listPrismaStr) : listPrismaStr);
  }
  prismaSchema.push(collectEnums(lists));
  const prismaSchemaStr = prismaSchema.join('\n');
  return extendPrismaCompleteSchema ? extendPrismaCompleteSchema(prismaSchemaStr) : prismaSchemaStr;
}

function getFormattedGraphQLSchema(schema) {
  return '# This file is automatically generated by Keystone, do not modify it manually.\n' + '# Modify your Keystone config when you want to change this.\n\n' + schema + '\n';
}
async function getCommittedArtifacts(config, graphQLSchema) {
  const lists = initialiseLists(config);
  const prismaSchema = printPrismaSchema(lists, config.db.prismaClientPath, config.db.provider, config.db.prismaPreviewFeatures, config.db.additionalPrismaDatasourceProperties, config.db.extendPrismaSchema);
  return {
    graphql: getFormattedGraphQLSchema(printSchema(graphQLSchema)),
    prisma: await formatPrismaSchema(prismaSchema)
  };
}
let hasEnsuredBinariesExist = false;
async function ensurePrismaBinariesExist() {
  // ensureBinariesExist does a bunch of slightly expensive things
  // so if we can avoid running it a bunch in tests, that's ideal
  if (hasEnsuredBinariesExist) return;
  // we're resolving @prisma/engines from @prisma/internals
  // because we don't want to depend on @prisma/engines
  // since its version includes a commit hash from https://github.com/prisma/prisma-engines
  // and we just want to use whatever version @prisma/internals is using
  // also note we use an exact version of @prisma/internals
  // so if @prisma/internals suddenly stops depending on @prisma/engines
  // that won't break a released version of Keystone
  // also, we're not just directly importing @prisma/engines
  // since stricter package managers(e.g. pnpm, Yarn Berry)
  // don't allow importing packages that aren't explicitly depended on
  const requireFromPrismaSdk = createRequire(require.resolve('@prisma/internals'));
  const prismaEngines = requireFromPrismaSdk('@prisma/engines');
  await prismaEngines.ensureBinariesExist();
  hasEnsuredBinariesExist = true;
}
async function formatPrismaSchema(schema) {
  await ensurePrismaBinariesExist();
  return formatSchema({
    schema
  });
}
async function readFileButReturnNothingIfDoesNotExist(path) {
  try {
    return await fs.readFile(path, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      return;
    }
    throw err;
  }
}

// TODO: this cannot be changed for now, circular dependency with getSystemPaths, getEsbuildConfig
function getBuiltKeystoneConfigurationPath(cwd) {
  return path__default.join(cwd, '.keystone/config.js');
}
function getBuiltKeystoneConfiguration(cwd) {
  const configPath = getBuiltKeystoneConfigurationPath(cwd);
  return initConfig(require(configPath).default);
}
function posixify(s) {
  return s.split(path__default.sep).join('/');
}
function getSystemPaths(cwd, config) {
  var _config$types;
  const prismaClientPath = config.db.prismaClientPath ? path__default.join(cwd, config.db.prismaClientPath) : null;
  const builtTypesPath = (_config$types = config.types) !== null && _config$types !== void 0 && _config$types.path ? path__default.join(cwd, config.types.path) : path__default.join(cwd, 'node_modules/.keystone/types.ts');
  const relativePrismaPath = prismaClientPath ? `./${posixify(path__default.relative(path__default.dirname(builtTypesPath), prismaClientPath))}` : '@prisma/client';
  return {
    config: getBuiltKeystoneConfigurationPath(cwd),
    admin: path__default.join(cwd, '.keystone/admin'),
    prisma: prismaClientPath !== null && prismaClientPath !== void 0 ? prismaClientPath : '@prisma/client',
    types: {
      relativePrismaPath
    },
    schema: {
      types: builtTypesPath,
      prisma: path__default.join(cwd, 'schema.prisma'),
      graphql: path__default.join(cwd, 'schema.graphql')
    }
  };
}
async function validatePrismaAndGraphQLSchemas(cwd, config, graphQLSchema) {
  const paths = getSystemPaths(cwd, config);
  const artifacts = await getCommittedArtifacts(config, graphQLSchema);
  const [writtenGraphQLSchema, writtenPrismaSchema] = await Promise.all([readFileButReturnNothingIfDoesNotExist(paths.schema.graphql), readFileButReturnNothingIfDoesNotExist(paths.schema.prisma)]);
  const outOfDateSchemas = (() => {
    if (writtenGraphQLSchema !== artifacts.graphql && writtenPrismaSchema !== artifacts.prisma) {
      return 'both';
    }
    if (writtenGraphQLSchema !== artifacts.graphql) {
      return 'graphql';
    }
    if (writtenPrismaSchema !== artifacts.prisma) {
      return 'prisma';
    }
  })();
  if (!outOfDateSchemas) return;
  const message = {
    both: 'Your Prisma and GraphQL schemas are not up to date',
    graphql: 'Your GraphQL schema is not up to date',
    prisma: 'Your Prisma schema is not up to date'
  }[outOfDateSchemas];
  console.error(message);
  throw new ExitError(1);
}
async function generatePrismaAndGraphQLSchemas(cwd, config, graphQLSchema) {
  const paths = getSystemPaths(cwd, config);
  const artifacts = await getCommittedArtifacts(config, graphQLSchema);
  await Promise.all([fs.writeFile(paths.schema.graphql, artifacts.graphql), fs.writeFile(paths.schema.prisma, artifacts.prisma)]);
  return artifacts;
}
async function generateTypescriptTypes(cwd, config, graphQLSchema) {
  const lists = initialiseLists(config);
  const paths = getSystemPaths(cwd, config);
  await fs.outputFile(paths.schema.types, printGeneratedTypes(paths.types.relativePrismaPath, graphQLSchema, lists));
}
async function generateTypescriptTypesAndPrisma(cwd, config, graphQLSchema) {
  const paths = getSystemPaths(cwd, config);
  const dataProxy = config.db.url.startsWith('prisma:');
  if (dataProxy === true) {
    console.log('✨ Generating Prisma Client (data proxy)');
  }
  await Promise.all([generatePrismaClient(paths.schema.prisma, dataProxy), generateTypescriptTypes(cwd, config, graphQLSchema)]);
}
async function generatePrismaClient(prismaSchemaPath, dataProxy) {
  const generators = await getGenerators({
    schemaPath: prismaSchemaPath,
    dataProxy
  });
  await Promise.all(generators.map(async generator => {
    try {
      await generator.generate();
    } finally {
      const closePromise = new Promise(resolve => {
        const child = generator.generatorProcess.child;
        child.once('exit', () => {
          resolve();
        });
      });
      generator.stop();
      await closePromise;
    }
  }));
}

export { getSystemPaths as a, generatePrismaAndGraphQLSchemas as b, generateTypescriptTypesAndPrisma as c, getFormattedGraphQLSchema as d, generateTypescriptTypes as e, getBuiltKeystoneConfigurationPath as f, getBuiltKeystoneConfiguration as g, getCommittedArtifacts as h, printPrismaSchema as p, validatePrismaAndGraphQLSchemas as v };
