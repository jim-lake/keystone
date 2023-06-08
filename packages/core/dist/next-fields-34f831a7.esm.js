import 'decimal.js';
import './graphql-ts-schema-9020a95a.esm.js';
import { enum as enum$1, enumValues } from '@graphql-ts/schema/api-without-context';

// https://github.com/prisma/prisma-engines/blob/98490f4bb05f4a47cd715617154a06c2c0d05756/libs/datamodel/connectors/dml/src/default_value.rs#L183-L194

const orderDirectionEnum = enum$1({
  name: 'OrderDirection',
  values: enumValues(['asc', 'desc'])
});
const QueryMode = enum$1({
  name: 'QueryMode',
  values: enumValues(['default', 'insensitive'])
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

export { QueryMode as Q, fieldType as f, orderDirectionEnum as o };
