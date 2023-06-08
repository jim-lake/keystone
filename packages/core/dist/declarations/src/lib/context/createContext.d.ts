import { GraphQLSchema } from 'graphql';
import { KeystoneContext, KeystoneConfig } from '../../types';
import { PrismaClient } from '../core/utils';
import { InitialisedList } from '../core/types-for-lists';
export declare function createContext({ config, lists, graphQLSchema, graphQLSchemaSudo, prismaClient, }: {
    config: KeystoneConfig;
    lists: Record<string, InitialisedList>;
    graphQLSchema: GraphQLSchema;
    graphQLSchemaSudo: GraphQLSchema;
    prismaClient: PrismaClient;
}): KeystoneContext;
//# sourceMappingURL=createContext.d.ts.map