import { CacheHint } from '@apollo/cache-control-types';
import { getGqlNames } from '../../types';
import type { GraphQLTypesForList, NextFieldType, BaseListTypeInfo, KeystoneConfig, CacheHintArgs, MaybePromise } from '../../types';
import { ResolvedListHooks, ResolvedFieldHooks } from '../../types/config/hooks';
import { FilterOrderArgs } from '../../types/config/fields';
import { ResolvedFieldAccessControl, ResolvedListAccessControl } from './access-control';
import { ResolvedDBField } from './resolve-relationships';
export type InitialisedField = Omit<NextFieldType, 'dbField' | 'access' | 'graphql'> & {
    dbField: ResolvedDBField;
    access: ResolvedFieldAccessControl;
    hooks: ResolvedFieldHooks<BaseListTypeInfo>;
    graphql: {
        isEnabled: {
            read: boolean;
            create: boolean;
            update: boolean;
            filter: boolean | ((args: FilterOrderArgs<BaseListTypeInfo>) => MaybePromise<boolean>);
            orderBy: boolean | ((args: FilterOrderArgs<BaseListTypeInfo>) => MaybePromise<boolean>);
        };
        isNonNull: {
            read: boolean;
            create: boolean;
            update: boolean;
        };
        cacheHint: CacheHint | undefined;
    };
};
export type InitialisedList = {
    access: ResolvedListAccessControl;
    fields: Record<string, InitialisedField>;
    groups: {
        fields: BaseListTypeInfo['fields'][];
        label: string;
        description: string | null;
    }[];
    hooks: ResolvedListHooks<BaseListTypeInfo>;
    /** This will include the opposites to one-sided relationships */
    resolvedDbFields: Record<string, ResolvedDBField>;
    lists: Record<string, InitialisedList>;
    cacheHint: ((args: CacheHintArgs) => CacheHint) | undefined;
    listKey: string;
    graphql: {
        types: GraphQLTypesForList;
        names: ReturnType<typeof getGqlNames>;
        namePlural: string;
        isEnabled: IsEnabled;
    };
    prisma: {
        listKey: string;
        mapping: string | undefined;
        extendPrismaSchema: ((schema: string) => string) | undefined;
    };
    ui: {
        labels: {
            label: string;
            singular: string;
            plural: string;
            path: string;
        };
        labelField: string;
        searchFields: Set<string>;
        searchableFields: Map<string, 'default' | 'insensitive' | null>;
    };
    isSingleton: boolean;
};
type IsEnabled = {
    type: boolean;
    query: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    filter: boolean | ((args: FilterOrderArgs<BaseListTypeInfo>) => MaybePromise<boolean>);
    orderBy: boolean | ((args: FilterOrderArgs<BaseListTypeInfo>) => MaybePromise<boolean>);
};
/**
 * 1. Get the `isEnabled` config object from the listConfig - the returned object will be modified later
 * 2. Instantiate `lists` object - it is done here as the object will be added to the listGraphqlTypes
 * 3. Get graphqlTypes
 * 4. Initialise fields - field functions are called
 * 5. Handle relationships - ensure correct linking between two sides of all relationships (including one-sided relationships)
 * 6.
 */
export declare function initialiseLists(config: KeystoneConfig): Record<string, InitialisedList>;
export {};
//# sourceMappingURL=types-for-lists.d.ts.map