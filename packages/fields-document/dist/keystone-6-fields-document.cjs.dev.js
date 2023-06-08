'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var graphql = require('graphql');
var types = require('@keystone-6/core/types');
var core = require('@keystone-6/core');
var validation = require('./validation-8639b3d5.cjs.dev.js');
var weakMemoize = require('@emotion/weak-memoize');
var utils = require('./utils-5e00927a.cjs.dev.js');
require('./utils-c93d66aa.cjs.dev.js');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var weakMemoize__default = /*#__PURE__*/_interopDefault(weakMemoize);

const labelFieldAlias = '____document_field_relationship_item_label';
const idFieldAlias = '____document_field_relationship_item_id';
function addRelationshipData(nodes, context, relationships, componentBlocks) {
  return Promise.all(nodes.map(async node => {
    if (node.type === 'relationship') {
      const relationship = relationships[node.relationship];
      if (!relationship) return node;
      return {
        ...node,
        data: await fetchDataForOne(context, relationship.listKey, relationship.selection || '', node.data)
      };
    }
    if (node.type === 'component-block') {
      const componentBlock = componentBlocks[node.component];
      if (componentBlock) {
        const [props, children] = await Promise.all([addRelationshipDataToComponentProps({
          kind: 'object',
          fields: componentBlock.schema
        }, node.props, (relationship, data) => fetchRelationshipData(context, relationship.listKey, relationship.many, relationship.selection || '', data)), addRelationshipData(node.children, context, relationships, componentBlocks)]);
        return {
          ...node,
          props,
          children
        };
      }
    }
    if ('children' in node && Array.isArray(node.children)) {
      return {
        ...node,
        children: await addRelationshipData(node.children, context, relationships, componentBlocks)
      };
    }
    return node;
  }));
}
async function fetchRelationshipData(context, listKey, many, selection, data) {
  if (!many) return fetchDataForOne(context, listKey, selection, data);
  const ids = Array.isArray(data) ? data.filter(item => item.id != null).map(x => x.id) : [];
  if (!ids.length) return [];
  const labelField = getLabelFieldsForLists(context.graphql.schema)[listKey];
  const val = await context.graphql.run({
    query: `query($ids: [ID!]!) {items:${context.gqlNames(listKey).listQueryName}(where: { id: { in: $ids } }) {${idFieldAlias}:id ${labelFieldAlias}:${labelField}\n${selection || ''}}}`,
    variables: {
      ids
    }
  });
  return Array.isArray(val.items) ? val.items.map(_ref => {
    let {
      [labelFieldAlias]: label,
      [idFieldAlias]: id,
      ...data
    } = _ref;
    return {
      id,
      label,
      data
    };
  }) : [];
}
async function fetchDataForOne(context, listKey, selection, data) {
  // Single related item
  const id = data === null || data === void 0 ? void 0 : data.id;
  if (id == null) return null;
  const labelField = getLabelFieldsForLists(context.graphql.schema)[listKey];

  // An exception here indicates something wrong with either the system or the
  // configuration (e.g. a bad selection field). These will surface as system
  // errors from the GraphQL field resolver.
  const val = await context.graphql.run({
    query: `query($id: ID!) {item:${context.gqlNames(listKey).itemQueryName}(where: {id:$id}) {${labelFieldAlias}:${labelField}\n${selection}}}`,
    variables: {
      id
    }
  });
  if (val.item === null) {
    if (!process.env.TEST_ADAPTER) {
      // If we're unable to find the item (e.g. we have a dangling reference), or access was denied
      // then simply return { id } and leave `label` and `data` undefined.
      console.error(`Unable to fetch relationship data: listKey: ${listKey}, many: false, selection: ${selection}, id: ${id} `);
    }
    return {
      id,
      data: undefined,
      label: undefined
    };
  }
  return {
    id,
    label: val.item[labelFieldAlias],
    data: (() => {
      const {
        [labelFieldAlias]: _ignore,
        ...otherData
      } = val.item;
      return otherData;
    })()
  };
}
async function addRelationshipDataToComponentProps(schema, val, fetchData) {
  switch (schema.kind) {
    case 'child':
    case 'form':
      {
        return val;
      }
    case 'relationship':
      {
        return fetchData(schema, val);
      }
    case 'object':
      {
        return Object.fromEntries(await Promise.all(Object.keys(schema.fields).map(async key => [key,
        // if val[key] === undefined, we know a new field was added to the schema
        // but there is old data in the database that doesn't have the new field
        // we're intentionally not just magically adding it because we may want to
        // have a more optimised strategy of hydrating relationships so we don't
        // want to add something unrelated that requires the current "traverse everything" strategy
        val[key] === undefined ? undefined : await addRelationshipDataToComponentProps(schema.fields[key], val[key], fetchData)])));
      }
    case 'conditional':
      {
        return {
          discriminant: val.discriminant,
          value: await addRelationshipDataToComponentProps(schema.values[val.discriminant], val.value, fetchData)
        };
      }
    case 'array':
      {
        return await Promise.all(val.map(async innerVal => addRelationshipDataToComponentProps(schema.element, innerVal, fetchData)));
      }
  }
  utils.assertNever(schema);
}
const document$1 = graphql.parse(`
  query {
    keystone {
      adminMeta {
        lists {
          key
          labelField
        }
      }
    }
  }
`);
const getLabelFieldsForLists = weakMemoize__default["default"](function getLabelFieldsForLists(schema) {
  const {
    data,
    errors
  } = graphql.executeSync({
    schema,
    document: document$1,
    contextValue: {
      isAdminUIBuildProcess: true
    }
  });
  if (errors !== null && errors !== void 0 && errors.length) {
    throw errors[0];
  }
  return Object.fromEntries(data.keystone.adminMeta.lists.map(x => [x.key, x.labelField]));
});

function assertValidComponentSchema(schema, lists) {
  assertValidComponentSchemaInner(schema, [], [], new Set(), lists);
}

// recursive things can exist but they have to either be:
// - inside the non-default portion of a conditional field
// - inside an array field
// when we hit the non-default portion of a conditional field or an array field
// checking inside of it essentially means pretend it's a new thing
function assertValidComponentSchemaInner(schema, schemaAncestors, propPath, seenProps, lists) {
  if (schema.kind === 'form' || schema.kind === 'child') {
    return;
  }
  if (schema.kind === 'relationship') {
    if (lists.has(schema.listKey)) {
      return;
    }
    throw new Error(`The relationship field at "${propPath.join('.')}" has the listKey "${schema.listKey}" but no list named "${schema.listKey}" exists.`);
  }
  const ancestor = schemaAncestors.indexOf(schema);
  if (ancestor !== -1) {
    throw new Error(`The field "${propPath.join('.')}" is the same as it's ancestor. Use an array or conditional field for recursive structures.`);
  }
  if (seenProps.has(schema)) {
    return;
  }
  propPath.push(schema.kind);
  try {
    seenProps.add(schema);
    if (schema.kind === 'array') {
      assertValidComponentSchemaInner(schema.element, [], propPath, seenProps, lists);
      return;
    }
    if (schema.kind === 'object') {
      schemaAncestors.push(schema);
      for (const [key, innerProp] of Object.entries(schema.fields)) {
        propPath.push(key);
        if (schema.fields[key] !== innerProp) {
          throw new Error(`Fields on an object field must not change over time but the field at "${propPath.join('.')}" changes between accesses`);
        }
        assertValidComponentSchemaInner(innerProp, schemaAncestors, propPath, seenProps, lists);
        propPath.pop();
      }
      schemaAncestors.pop();
      return;
    }
    if (schema.kind === 'conditional') {
      schemaAncestors.push(schema);
      const stringifiedDefaultDiscriminant = schema.discriminant.defaultValue.toString();
      for (const [key, innerProp] of Object.entries(schema.values)) {
        propPath.push(key);
        if (schema.values[key] !== innerProp) {
          throw new Error(`Fields on a conditional field must not change over time but the field at "${propPath.join('.')}" changes between accesses`);
        }
        assertValidComponentSchemaInner(innerProp, key === stringifiedDefaultDiscriminant ? schemaAncestors : [], propPath, seenProps, lists);
        propPath.pop();
      }
      schemaAncestors.pop();
      return;
    }
  } finally {
    propPath.pop();
  }
  utils.assertNever(schema);
}

function wrapGraphQLFieldInResolver(inputField, getVal) {
  return core.graphql.field({
    type: inputField.type,
    args: inputField.args,
    deprecationReason: inputField.deprecationReason,
    description: inputField.description,
    extensions: inputField.extensions,
    resolve(value, args, context, info) {
      const val = getVal(value);
      if (!inputField.resolve) {
        return val;
      }
      return inputField.resolve({
        value: val
      }, args, context, info);
    }
  });
}
function getOutputGraphQLField(name, schema, interfaceImplementations, cache, meta) {
  if (!cache.has(schema)) {
    const res = getOutputGraphQLFieldInner(name, schema, interfaceImplementations, cache, meta);
    cache.set(schema, res);
  }
  return cache.get(schema);
}
function getOutputGraphQLFieldInner(name, schema, interfaceImplementations, cache, meta) {
  if (schema.kind === 'form') {
    return wrapGraphQLFieldInResolver(schema.graphql.output, x => x.value);
  }
  if (schema.kind === 'object') {
    return core.graphql.field({
      type: core.graphql.object()({
        name,
        fields: () => Object.fromEntries(Object.entries(schema.fields).map(_ref => {
          let [key, val] = _ref;
          const field = getOutputGraphQLField(`${name}${key[0].toUpperCase()}${key.slice(1)}`, val, interfaceImplementations, cache, meta);
          return [key, wrapGraphQLFieldInResolver(field, source => source[key])];
        }))
      }),
      resolve(_ref2) {
        let {
          value
        } = _ref2;
        return value;
      }
    });
  }
  if (schema.kind === 'array') {
    const innerField = getOutputGraphQLField(name, schema.element, interfaceImplementations, cache, meta);
    const resolve = innerField.resolve;
    return core.graphql.field({
      type: core.graphql.list(innerField.type),
      args: innerField.args,
      deprecationReason: innerField.deprecationReason,
      description: innerField.description,
      extensions: innerField.extensions,
      resolve(_ref3, args, context, info) {
        let {
          value
        } = _ref3;
        if (!resolve) {
          return value;
        }
        return value.map(val => resolve({
          value: val
        }, args, context, info));
      }
    });
  }
  if (schema.kind === 'conditional') {
    let discriminantField;
    const getDiscriminantField = () => {
      if (!discriminantField) {
        discriminantField = getOutputGraphQLField(name + 'Discriminant', schema.discriminant, interfaceImplementations, cache, meta);
      }
      return discriminantField;
    };
    const interfaceType = core.graphql.interface()({
      name,
      resolveType: value => {
        const stringifiedDiscriminant = value.discriminant.toString();
        return name + stringifiedDiscriminant[0].toUpperCase() + stringifiedDiscriminant.slice(1);
      },
      fields: () => ({
        discriminant: getDiscriminantField()
      })
    });
    interfaceImplementations.push(...Object.entries(schema.values).map(_ref4 => {
      let [key, val] = _ref4;
      const innerName = name + key[0].toUpperCase() + key.slice(1);
      return core.graphql.object()({
        name: innerName,
        interfaces: [interfaceType],
        fields: () => ({
          discriminant: wrapGraphQLFieldInResolver(getDiscriminantField(), x => x.discriminant),
          value: getOutputGraphQLField(`${innerName}Value`, val, interfaceImplementations, cache, meta)
        })
      });
    }));
    return core.graphql.field({
      type: interfaceType,
      resolve(_ref5) {
        let {
          value
        } = _ref5;
        return value;
      }
    });
  }
  if (schema.kind === 'relationship') {
    const listOutputType = meta.lists[schema.listKey].types.output;
    return core.graphql.field({
      type: schema.many ? core.graphql.list(listOutputType) : listOutputType,
      resolve(_ref6, args, context) {
        let {
          value
        } = _ref6;
        if (Array.isArray(value)) {
          return context.db[schema.listKey].findMany({
            where: {
              id: {
                in: value.map(x => x.id)
              }
            }
          });
        }
        if ((value === null || value === void 0 ? void 0 : value.id) == null) {
          return null;
        }
        return context.db[schema.listKey].findOne({
          where: {
            id: value.id
          }
        });
      }
    });
  }
  utils.assertNever(schema);
}

function getGraphQLInputType(name, schema, operation, cache, meta) {
  if (!cache.has(schema)) {
    const res = getGraphQLInputTypeInner(name, schema, operation, cache, meta);
    cache.set(schema, res);
  }
  return cache.get(schema);
}
function getGraphQLInputTypeInner(name, schema, operation, cache, meta) {
  if (schema.kind === 'form') {
    return schema.graphql.input;
  }
  if (schema.kind === 'object') {
    return core.graphql.inputObject({
      name: `${name}${operation[0].toUpperCase()}${operation.slice(1)}Input`,
      fields: () => Object.fromEntries(Object.entries(schema.fields).map(_ref => {
        let [key, val] = _ref;
        const type = getGraphQLInputType(`${name}${key[0].toUpperCase()}${key.slice(1)}`, val, operation, cache, meta);
        return [key, core.graphql.arg({
          type
        })];
      }))
    });
  }
  if (schema.kind === 'array') {
    const innerType = getGraphQLInputType(name, schema.element, operation, cache, meta);
    return core.graphql.list(innerType);
  }
  if (schema.kind === 'conditional') {
    return core.graphql.inputObject({
      name: `${name}${operation[0].toUpperCase()}${operation.slice(1)}Input`,
      fields: () => Object.fromEntries(Object.entries(schema.values).map(_ref2 => {
        let [key, val] = _ref2;
        const type = getGraphQLInputType(`${name}${key[0].toUpperCase()}${key.slice(1)}`, val, operation, cache, meta);
        return [key, core.graphql.arg({
          type
        })];
      }))
    });
  }
  if (schema.kind === 'relationship') {
    const inputType = meta.lists[schema.listKey].types.relateTo[schema.many ? 'many' : 'one'][operation];
    // there are cases where this won't exist
    // for example if gql omit is enabled on the related field
    if (inputType === undefined) {
      throw new Error('');
    }
    return inputType;
  }
  utils.assertNever(schema);
}
async function getValueForUpdate(schema, value, prevValue, context, path) {
  if (value === undefined) {
    return prevValue;
  }
  if (prevValue === undefined) {
    prevValue = utils.getInitialPropsValue(schema);
  }
  if (schema.kind === 'form') {
    if (schema.validate(value)) {
      return value;
    }
    throw new Error(`The value of the form field at '${path.join('.')}' is invalid`);
  }
  if (value === null) {
    throw new Error(`${schema.kind[0].toUpperCase() + schema.kind.slice(1)} fields cannot be set to null but the field at '${path.join('.')}' is null`);
  }
  if (schema.kind === 'object') {
    return Object.fromEntries(await Promise.all(Object.entries(schema.fields).map(async _ref3 => {
      let [key, val] = _ref3;
      return [key, await getValueForUpdate(val, value[key], prevValue[key], context, path.concat(key))];
    })));
  }
  if (schema.kind === 'array') {
    return Promise.all(value.map((val, i) => getValueForUpdate(schema.element, val, prevValue[i], context, path.concat(i))));
  }
  if (schema.kind === 'relationship') {
    if (schema.many) {
      const val = value;
      return resolveRelateToManyForUpdateInput(val, context, schema.listKey, prevValue);
    } else {
      const val = value;
      return resolveRelateToOneForUpdateInput(val, context, schema.listKey);
    }
  }
  if (schema.kind === 'conditional') {
    const conditionalValueKeys = Object.keys(value);
    if (conditionalValueKeys.length !== 1) {
      throw new Error(`Conditional field inputs must set exactly one of the fields but the field at ${path.join('.')} has ${conditionalValueKeys.length} fields set`);
    }
    const key = conditionalValueKeys[0];
    let discriminant = key;
    if ((key === 'true' || key === 'false') && !schema.discriminant.validate(key)) {
      discriminant = key === 'true';
    }
    return {
      discriminant,
      value: await getValueForUpdate(schema.values[key], value[key], prevValue.discriminant === discriminant ? prevValue.value : utils.getInitialPropsValue(schema), context, path.concat('value'))
    };
  }
  utils.assertNever(schema);
}
async function getValueForCreate(schema, value, context, path) {
  // If value is undefined, get the specified defaultValue
  if (value === undefined) {
    return utils.getInitialPropsValue(schema);
  }
  if (schema.kind === 'form') {
    if (schema.validate(value)) {
      return value;
    }
    throw new Error(`The value of the form field at '${path.join('.')}' is invalid`);
  }
  if (value === null) {
    throw new Error(`${schema.kind[0].toUpperCase() + schema.kind.slice(1)} fields cannot be set to null but the field at '${path.join('.')}' is null`);
  }
  if (schema.kind === 'array') {
    return Promise.all(value.map((val, i) => getValueForCreate(schema.element, val, context, path.concat(i))));
  }
  if (schema.kind === 'object') {
    return Object.fromEntries(await Promise.all(Object.entries(schema.fields).map(async _ref4 => {
      let [key, val] = _ref4;
      return [key, await getValueForCreate(val, value[key], context, path.concat(key))];
    })));
  }
  if (schema.kind === 'relationship') {
    if (schema.many) {
      const val = value;
      return resolveRelateToManyForCreateInput(val, context, schema.listKey);
    } else {
      const val = value;
      return resolveRelateToOneForCreateInput(val, context, schema.listKey);
    }
  }
  if (schema.kind === 'conditional') {
    if (value === null) {
      throw new Error();
    }
    const conditionalValueKeys = Object.keys(value);
    if (conditionalValueKeys.length !== 1) {
      throw new Error();
    }
    const key = conditionalValueKeys[0];
    let discriminant = key;
    if ((key === 'true' || key === 'false') && !schema.discriminant.validate(key)) {
      discriminant = key === 'true';
    }
    return {
      discriminant,
      value: await getValueForCreate(schema.values[key], value[key], context, path.concat('value'))
    };
  }
  utils.assertNever(schema);
}
/** MANY */

class RelationshipErrors extends Error {
  constructor(errors) {
    super('Multiple relationship errors');
    this.errors = errors;
  }
}
function getResolvedUniqueWheres(uniqueInputs, context, foreignListKey, operation) {
  return uniqueInputs.map(uniqueInput => checkUniqueItemExists(uniqueInput, foreignListKey, context, operation));
}

// these aren't here out of thinking this is better syntax(i do not think it is),
// it's just because TS won't infer the arg is X bit
const isFulfilled = arg => arg.status === 'fulfilled';
const isRejected = arg => arg.status === 'rejected';
async function resolveRelateToManyForCreateInput(value, context, foreignListKey, tag) {
  if (!Array.isArray(value.connect) && !Array.isArray(value.create)) {
    throw new Error(`You must provide "connect" or "create" in to-many relationship inputs for "create" operations.`);
  }

  // Perform queries for the connections
  const connects = Promise.allSettled(getResolvedUniqueWheres(value.connect || [], context, foreignListKey, 'connect'));

  // Perform nested mutations for the creations
  const creates = Promise.allSettled((value.create || []).map(x => resolveCreateMutation(x, context, foreignListKey)));
  const [connectResult, createResult] = await Promise.all([connects, creates]);

  // Collect all the errors
  const errors = [...connectResult, ...createResult].filter(isRejected);
  if (errors.length) {
    // readd tag
    throw new RelationshipErrors(errors.map(x => ({
      error: x.reason,
      tag: tag || ''
    })));
  }

  // Perform queries for the connections
  return [...connectResult, ...createResult].filter(isFulfilled).map(x => x.value);
}
async function resolveRelateToManyForUpdateInput(value, context, foreignListKey, prevVal) {
  if (!Array.isArray(value.connect) && !Array.isArray(value.create) && !Array.isArray(value.disconnect) && !Array.isArray(value.set)) {
    throw new Error(`You must provide at least one of "set", "connect", "create" or "disconnect" in to-many relationship inputs for "update" operations.`);
  }
  if (value.set && value.disconnect) {
    throw new Error(`The "set" and "disconnect" fields cannot both be provided to to-many relationship inputs for "update" operations.`);
  }

  // Perform queries for the connections
  const connects = Promise.allSettled(getResolvedUniqueWheres(value.connect || [], context, foreignListKey, 'connect'));
  const disconnects = Promise.allSettled(getResolvedUniqueWheres(value.disconnect || [], context, foreignListKey, 'disconnect'));
  const sets = Promise.allSettled(getResolvedUniqueWheres(value.set || [], context, foreignListKey, 'set'));

  // Perform nested mutations for the creations
  const creates = Promise.allSettled((value.create || []).map(x => resolveCreateMutation(x, context, foreignListKey)));
  const [connectResult, createResult, disconnectResult, setResult] = await Promise.all([connects, creates, disconnects, sets]);

  // Collect all the errors
  const errors = [...connectResult, ...createResult, ...disconnectResult, ...setResult].filter(isRejected);
  if (errors.length) {
    throw new RelationshipErrors(errors.map(x => ({
      error: x.reason,
      tag: ''
    })));
  }
  let values = prevVal;
  if (value.set) {
    values = setResult.filter(isFulfilled).map(x => x.value);
  }
  const idsToDisconnect = new Set(disconnectResult.filter(isFulfilled).map(x => x.value.id));
  values = values.filter(x => !idsToDisconnect.has(x.id));
  values.push(...connectResult.filter(isFulfilled).map(x => x.value));
  values.push(...createResult.filter(isFulfilled).map(x => x.value));
  return values;
}

/** ONE */

const missingItem = (operation, uniqueWhere) => {
  throw new Error(`You cannot perform the '${operation}' operation on the item '${JSON.stringify(uniqueWhere)}'. It may not exist.`);
};
async function checkUniqueItemExists(uniqueInput, listKey, context, operation) {
  // Check whether the item exists (from this users POV).
  const item = await context.db[listKey].findOne({
    where: uniqueInput
  });
  if (item === null) {
    throw missingItem(operation, uniqueInput);
  }
  return {
    id: item.id.toString()
  };
}
async function handleCreateAndUpdate(value, context, foreignListKey) {
  if (value.connect) {
    return checkUniqueItemExists(value.connect, foreignListKey, context, 'connect');
  } else if (value.create) {
    return resolveCreateMutation(value, context, foreignListKey);
  }
}
async function resolveCreateMutation(value, context, foreignListKey) {
  const mutationType = context.graphql.schema.getMutationType();
  const {
    id
  } = await mutationType.getFields()[context.gqlNames(foreignListKey).createMutationName].resolve({}, {
    data: value.create
  }, context,
  // we happen to know this isn't used
  // no one else should rely on that though
  // it could change in the future
  {});
  return {
    id: id.toString()
  };
}
function resolveRelateToOneForCreateInput(value, context, foreignListKey) {
  const numOfKeys = Object.keys(value).length;
  if (numOfKeys !== 1) {
    throw new Error(`You must provide "connect" or "create" in to-one relationship inputs for "create" operations.`);
  }
  return handleCreateAndUpdate(value, context, foreignListKey);
}
function resolveRelateToOneForUpdateInput(value, context, foreignListKey) {
  if (Object.keys(value).length !== 1) {
    throw new Error(`You must provide one of "connect", "create" or "disconnect" in to-one relationship inputs for "update" operations.`);
  }
  if (value.connect || value.create) {
    return handleCreateAndUpdate(value, context, foreignListKey);
  } else if (value.disconnect) {
    return null;
  }
}

const structure = _ref => {
  let {
    schema,
    ...config
  } = _ref;
  return meta => {
    var _config$db;
    if (config.isIndexed === 'unique') {
      throw Error("isIndexed: 'unique' is not a supported option for field type structure");
    }
    const lists = new Set(Object.keys(meta.lists));
    try {
      assertValidComponentSchema(schema, lists);
    } catch (err) {
      throw new Error(`${meta.listKey}.${meta.fieldKey}: ${err.message}`);
    }
    const defaultValue = utils.getInitialPropsValue(schema);
    const unreferencedConcreteInterfaceImplementations = [];
    const name = meta.listKey + meta.fieldKey[0].toUpperCase() + meta.fieldKey.slice(1);
    return types.jsonFieldTypePolyfilledForSQLite(meta.provider, {
      ...config,
      hooks: {
        ...config.hooks,
        async resolveInput(args) {
          var _config$hooks;
          let val = args.resolvedData[meta.fieldKey];
          if (args.operation === 'update') {
            let prevVal = args.item[meta.fieldKey];
            if (meta.provider === 'sqlite') {
              prevVal = JSON.parse(prevVal);
              val = args.inputData[meta.fieldKey];
            }
            val = await getValueForUpdate(schema, val, prevVal, args.context, []);
            if (meta.provider === 'sqlite') {
              val = JSON.stringify(val);
            }
          }
          return (_config$hooks = config.hooks) !== null && _config$hooks !== void 0 && _config$hooks.resolveInput ? config.hooks.resolveInput({
            ...args,
            resolvedData: {
              ...args.resolvedData,
              [meta.fieldKey]: val
            }
          }) : val;
        }
      },
      input: {
        create: {
          arg: core.graphql.arg({
            type: getGraphQLInputType(name, schema, 'create', new Map(), meta)
          }),
          async resolve(val, context) {
            return await getValueForCreate(schema, val, context, []);
          }
        },
        update: {
          arg: core.graphql.arg({
            type: getGraphQLInputType(name, schema, 'update', new Map(), meta)
          })
        }
      },
      output: core.graphql.field({
        type: core.graphql.object()({
          name: `${name}Output`,
          fields: {
            structure: getOutputGraphQLField(name, schema, unreferencedConcreteInterfaceImplementations, new Map(), meta),
            json: core.graphql.field({
              type: core.graphql.JSON,
              args: {
                hydrateRelationships: core.graphql.arg({
                  type: core.graphql.nonNull(core.graphql.Boolean),
                  defaultValue: false
                })
              },
              resolve(_ref2, args, context) {
                let {
                  value
                } = _ref2;
                if (args.hydrateRelationships) {
                  return addRelationshipDataToComponentProps(schema, value, (schema, value) => fetchRelationshipData(context, schema.listKey, schema.many, schema.selection || '', value));
                }
                return value;
              }
            })
          }
        }),
        resolve(source) {
          return source;
        }
      }),
      __ksTelemetryFieldTypeName: '@keystone-6/structure',
      views: '@keystone-6/fields-document/structure-views',
      getAdminMeta: () => ({}),
      unreferencedConcreteInterfaceImplementations
    }, {
      default: {
        kind: 'literal',
        value: JSON.stringify(defaultValue)
      },
      map: (_config$db = config.db) === null || _config$db === void 0 ? void 0 : _config$db.map,
      mode: 'required'
    });
  };
};

const document = function () {
  let {
    componentBlocks = {},
    dividers,
    formatting,
    layouts,
    relationships: configRelationships,
    links,
    ...config
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return meta => {
    var _config$db, _config$db2;
    const documentFeatures = normaliseDocumentFeatures({
      dividers,
      formatting,
      layouts,
      links
    });
    const relationships = normaliseRelationships(configRelationships, meta);
    const inputResolver = data => {
      if (data === null) {
        throw new graphql.GraphQLError('Input error: Document fields cannot be set to null');
      }
      if (data === undefined) {
        return data;
      }
      return validation.validateAndNormalizeDocument(data, documentFeatures, componentBlocks, relationships);
    };
    if (config.isIndexed === 'unique') {
      throw Error("isIndexed: 'unique' is not a supported option for field type document");
    }
    const lists = new Set(Object.keys(meta.lists));
    for (const [name, block] of Object.entries(componentBlocks)) {
      try {
        assertValidComponentSchema({
          kind: 'object',
          fields: block.schema
        }, lists);
      } catch (err) {
        throw new Error(`Component block ${name} in ${meta.listKey}.${meta.fieldKey}: ${err.message}`);
      }
    }
    return types.jsonFieldTypePolyfilledForSQLite(meta.provider, {
      ...config,
      __ksTelemetryFieldTypeName: '@keystone-6/document',
      input: {
        create: {
          arg: core.graphql.arg({
            type: core.graphql.JSON
          }),
          resolve(val) {
            if (val === undefined) {
              val = [{
                type: 'paragraph',
                children: [{
                  text: ''
                }]
              }];
            }
            return inputResolver(val);
          }
        },
        update: {
          arg: core.graphql.arg({
            type: core.graphql.JSON
          }),
          resolve: inputResolver
        }
      },
      output: core.graphql.field({
        type: core.graphql.object()({
          name: `${meta.listKey}_${meta.fieldKey}_Document`,
          fields: {
            document: core.graphql.field({
              args: {
                hydrateRelationships: core.graphql.arg({
                  type: core.graphql.nonNull(core.graphql.Boolean),
                  defaultValue: false
                })
              },
              type: core.graphql.nonNull(core.graphql.JSON),
              resolve(_ref, _ref2, context) {
                let {
                  document
                } = _ref;
                let {
                  hydrateRelationships
                } = _ref2;
                return hydrateRelationships ? addRelationshipData(document, context, relationships, componentBlocks) : document;
              }
            })
          }
        }),
        resolve(_ref3) {
          let {
            value
          } = _ref3;
          if (value === null) {
            return null;
          }
          return {
            document: value
          };
        }
      }),
      views: '@keystone-6/fields-document/views',
      getAdminMeta() {
        return {
          relationships,
          documentFeatures,
          componentBlocksPassedOnServer: Object.keys(componentBlocks)
        };
      }
    }, {
      mode: 'required',
      default: {
        kind: 'literal',
        value: JSON.stringify([{
          type: 'paragraph',
          children: [{
            text: ''
          }]
        }])
      },
      map: (_config$db = config.db) === null || _config$db === void 0 ? void 0 : _config$db.map,
      extendPrismaSchema: (_config$db2 = config.db) === null || _config$db2 === void 0 ? void 0 : _config$db2.extendPrismaSchema
    });
  };
};
function normaliseRelationships(configRelationships, meta) {
  const relationships = {};
  if (configRelationships) {
    Object.keys(configRelationships).forEach(key => {
      var _relationship$selecti;
      const relationship = configRelationships[key];
      if (meta.lists[relationship.listKey] === undefined) {
        throw new Error(`An inline relationship ${relationship.label} (${key}) in the field at ${meta.listKey}.${meta.fieldKey} has listKey set to "${relationship.listKey}" but no list named "${relationship.listKey}" exists.`);
      }
      relationships[key] = {
        ...relationship,
        selection: (_relationship$selecti = relationship.selection) !== null && _relationship$selecti !== void 0 ? _relationship$selecti : null
      };
    });
  }
  return relationships;
}
function normaliseDocumentFeatures(config) {
  var _config$formatting, _formatting$alignment, _formatting$alignment2, _formatting$blockType, _formatting$blockType2, _formatting$inlineMar, _formatting$inlineMar2, _formatting$inlineMar3, _formatting$inlineMar4, _formatting$inlineMar5, _formatting$inlineMar6, _formatting$inlineMar7, _formatting$inlineMar8, _formatting$listTypes, _formatting$listTypes2;
  const formatting = config.formatting === true ? {
    alignment: true,
    blockTypes: true,
    headingLevels: true,
    inlineMarks: true,
    listTypes: true,
    softBreaks: true
  } : (_config$formatting = config.formatting) !== null && _config$formatting !== void 0 ? _config$formatting : {};
  const documentFeatures = {
    formatting: {
      alignment: formatting.alignment === true ? {
        center: true,
        end: true
      } : {
        center: !!((_formatting$alignment = formatting.alignment) !== null && _formatting$alignment !== void 0 && _formatting$alignment.center),
        end: !!((_formatting$alignment2 = formatting.alignment) !== null && _formatting$alignment2 !== void 0 && _formatting$alignment2.end)
      },
      blockTypes: (formatting === null || formatting === void 0 ? void 0 : formatting.blockTypes) === true ? {
        blockquote: true,
        code: true
      } : {
        blockquote: !!((_formatting$blockType = formatting.blockTypes) !== null && _formatting$blockType !== void 0 && _formatting$blockType.blockquote),
        code: !!((_formatting$blockType2 = formatting.blockTypes) !== null && _formatting$blockType2 !== void 0 && _formatting$blockType2.code)
      },
      headingLevels: (formatting === null || formatting === void 0 ? void 0 : formatting.headingLevels) === true ? [1, 2, 3, 4, 5, 6] : [...new Set(formatting === null || formatting === void 0 ? void 0 : formatting.headingLevels)].sort(),
      inlineMarks: formatting.inlineMarks === true ? {
        bold: true,
        code: true,
        italic: true,
        keyboard: true,
        strikethrough: true,
        subscript: true,
        superscript: true,
        underline: true
      } : {
        bold: !!((_formatting$inlineMar = formatting.inlineMarks) !== null && _formatting$inlineMar !== void 0 && _formatting$inlineMar.bold),
        code: !!((_formatting$inlineMar2 = formatting.inlineMarks) !== null && _formatting$inlineMar2 !== void 0 && _formatting$inlineMar2.code),
        italic: !!((_formatting$inlineMar3 = formatting.inlineMarks) !== null && _formatting$inlineMar3 !== void 0 && _formatting$inlineMar3.italic),
        strikethrough: !!((_formatting$inlineMar4 = formatting.inlineMarks) !== null && _formatting$inlineMar4 !== void 0 && _formatting$inlineMar4.strikethrough),
        underline: !!((_formatting$inlineMar5 = formatting.inlineMarks) !== null && _formatting$inlineMar5 !== void 0 && _formatting$inlineMar5.underline),
        keyboard: !!((_formatting$inlineMar6 = formatting.inlineMarks) !== null && _formatting$inlineMar6 !== void 0 && _formatting$inlineMar6.keyboard),
        subscript: !!((_formatting$inlineMar7 = formatting.inlineMarks) !== null && _formatting$inlineMar7 !== void 0 && _formatting$inlineMar7.subscript),
        superscript: !!((_formatting$inlineMar8 = formatting.inlineMarks) !== null && _formatting$inlineMar8 !== void 0 && _formatting$inlineMar8.superscript)
      },
      listTypes: formatting.listTypes === true ? {
        ordered: true,
        unordered: true
      } : {
        ordered: !!((_formatting$listTypes = formatting.listTypes) !== null && _formatting$listTypes !== void 0 && _formatting$listTypes.ordered),
        unordered: !!((_formatting$listTypes2 = formatting.listTypes) !== null && _formatting$listTypes2 !== void 0 && _formatting$listTypes2.unordered)
      },
      softBreaks: !!formatting.softBreaks
    },
    links: !!config.links,
    layouts: [...new Set((config.layouts || []).map(x => JSON.stringify(x)))].map(x => JSON.parse(x)),
    dividers: !!config.dividers
  };
  return documentFeatures;
}

exports.document = document;
exports.structure = structure;
