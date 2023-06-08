import type { BaseItem } from '@keystone-6/core/types';
import { graphql } from '@keystone-6/core';
import { AuthGqlNames, SecretFieldImpl } from '../types';
export declare function getBaseAuthSchema<I extends string, S extends string>({ listKey, identityField, secretField, gqlNames, secretFieldImpl, base, }: {
    listKey: string;
    identityField: I;
    secretField: S;
    gqlNames: AuthGqlNames;
    secretFieldImpl: SecretFieldImpl;
    base: graphql.BaseSchemaMeta;
}): {
    extension: graphql.Extension;
    ItemAuthenticationWithPasswordSuccess: graphql.ObjectType<{
        sessionToken: string;
        item: BaseItem;
    }>;
};
//# sourceMappingURL=getBaseAuthSchema.d.ts.map