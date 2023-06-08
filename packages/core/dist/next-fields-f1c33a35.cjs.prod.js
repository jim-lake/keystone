'use strict';

require('decimal.js');
require('./graphql-ts-schema-e1666bd5.cjs.prod.js');
var apiWithoutContext = require('@graphql-ts/schema/api-without-context');

// https://github.com/prisma/prisma-engines/blob/98490f4bb05f4a47cd715617154a06c2c0d05756/libs/datamodel/connectors/dml/src/default_value.rs#L183-L194

const orderDirectionEnum = apiWithoutContext["enum"]({
  name: 'OrderDirection',
  values: apiWithoutContext.enumValues(['asc', 'desc'])
});
const QueryMode = apiWithoutContext["enum"]({
  name: 'QueryMode',
  values: apiWithoutContext.enumValues(['default', 'insensitive'])
});

// TODO: this isn't right for create
// for create though, db level defaults need to be taken into account for when to not allow undefined
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// fieldType(dbField)(fieldInfo) => { ...fieldInfo, dbField };
function fieldType(dbField) {
  return function fieldTypeWrapper(graphQLInfo) {
    return {
      ...graphQLInfo,
      dbField
    };
  };
}

exports.QueryMode = QueryMode;
exports.fieldType = fieldType;
exports.orderDirectionEnum = orderDirectionEnum;
