import { GraphQLSchema } from 'graphql';
import type { InitialisedList } from '../core/types-for-lists';
import { KeystoneContext } from '../../types';
export declare function getQueryFactory(list: InitialisedList, schema: GraphQLSchema): (context: KeystoneContext) => {
    findOne: (args: Record<string, any>) => Promise<any>;
    findMany: (args: Record<string, any>) => Promise<any>;
    count: (args: Record<string, any>) => Promise<number>;
    createOne: (args: Record<string, any>) => Promise<any>;
    createMany: (args: Record<string, any>) => Promise<any>;
    updateOne: (args: Record<string, any>) => Promise<any>;
    updateMany: (args: Record<string, any>) => Promise<any>;
    deleteOne: (args: Record<string, any>) => Promise<any>;
    deleteMany: (args: Record<string, any>) => Promise<any>;
};
export declare function getDbFactory(list: InitialisedList, schema: GraphQLSchema): (context: KeystoneContext) => {
    findOne: (args: Record<string, any>) => Promise<any>;
    findMany: (args: Record<string, any>) => Promise<any>;
    count: (args: Record<string, any>) => Promise<any>;
    createOne: (args: Record<string, any>) => Promise<any>;
    createMany: (args: Record<string, any>) => Promise<any>;
    updateOne: (args: Record<string, any>) => Promise<any>;
    updateMany: (args: Record<string, any>) => Promise<any>;
    deleteOne: (args: Record<string, any>) => Promise<any>;
    deleteMany: (args: Record<string, any>) => Promise<any>;
};
//# sourceMappingURL=api.d.ts.map