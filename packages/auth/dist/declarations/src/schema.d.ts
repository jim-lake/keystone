import { GraphQLSchema } from 'graphql';
import { AuthGqlNames, AuthTokenTypeConfig, InitFirstItemConfig, SecretFieldImpl } from './types';
export declare function getSecretFieldImpl(schema: GraphQLSchema, listKey: string, fieldKey: string): SecretFieldImpl;
export declare const getSchemaExtension: ({ identityField, listKey, secretField, gqlNames, initFirstItem, passwordResetLink, magicAuthLink, sessionData, }: {
    identityField: string;
    listKey: string;
    secretField: string;
    gqlNames: AuthGqlNames;
    initFirstItem?: InitFirstItemConfig<any> | undefined;
    passwordResetLink?: AuthTokenTypeConfig | undefined;
    magicAuthLink?: AuthTokenTypeConfig | undefined;
    sessionData: string;
}) => (schema: GraphQLSchema) => GraphQLSchema;
//# sourceMappingURL=schema.d.ts.map