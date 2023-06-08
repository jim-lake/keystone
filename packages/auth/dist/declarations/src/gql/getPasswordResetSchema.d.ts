import { graphql } from '@keystone-6/core';
import { AuthGqlNames, AuthTokenTypeConfig, SecretFieldImpl } from '../types';
export declare function getPasswordResetSchema<I extends string, S extends string>({ listKey, identityField, secretField, gqlNames, passwordResetLink, passwordResetTokenSecretFieldImpl, }: {
    listKey: string;
    identityField: I;
    secretField: S;
    gqlNames: AuthGqlNames;
    passwordResetLink: AuthTokenTypeConfig;
    passwordResetTokenSecretFieldImpl: SecretFieldImpl;
}): graphql.Extension;
//# sourceMappingURL=getPasswordResetSchema.d.ts.map