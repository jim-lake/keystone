import { graphql } from '@keystone-6/core';
import { BaseItem } from '@keystone-6/core/types';
import { GraphQLSchema } from 'graphql';
import { AuthGqlNames, InitFirstItemConfig } from '../types';
export declare function getInitFirstItemSchema({ listKey, fields, itemData, gqlNames, graphQLSchema, ItemAuthenticationWithPasswordSuccess, }: {
    listKey: string;
    fields: InitFirstItemConfig<any>['fields'];
    itemData: InitFirstItemConfig<any>['itemData'];
    gqlNames: AuthGqlNames;
    graphQLSchema: GraphQLSchema;
    ItemAuthenticationWithPasswordSuccess: graphql.ObjectType<{
        item: BaseItem;
        sessionToken: string;
    }>;
}): graphql.Extension;
//# sourceMappingURL=getInitFirstItemSchema.d.ts.map