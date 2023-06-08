import { GraphQLSchema } from 'graphql';
import type { KeystoneConfig } from '../types';
import { AdminMetaRootVal } from '../admin-ui/system/createAdminMeta';
import { InitialisedList } from './core/types-for-lists';
export declare function createGraphQLSchema(config: KeystoneConfig, lists: Record<string, InitialisedList>, adminMeta: AdminMetaRootVal, sudo: boolean): GraphQLSchema;
//# sourceMappingURL=createGraphQLSchema.d.ts.map