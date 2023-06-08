import { graphql } from '@keystone-6/core';
import { AuthGqlNames, AuthTokenTypeConfig, SecretFieldImpl } from '../types';
export declare function getMagicAuthLinkSchema<I extends string>({ listKey, identityField, gqlNames, magicAuthLink, magicAuthTokenSecretFieldImpl, base, }: {
    listKey: string;
    identityField: I;
    gqlNames: AuthGqlNames;
    magicAuthLink: AuthTokenTypeConfig;
    magicAuthTokenSecretFieldImpl: SecretFieldImpl;
    base: graphql.BaseSchemaMeta;
}): graphql.Extension;
//# sourceMappingURL=getMagicAuthLinkSchema.d.ts.map