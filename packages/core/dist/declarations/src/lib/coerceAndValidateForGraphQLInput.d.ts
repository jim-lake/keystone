import type { GraphQLSchema, GraphQLInputType, GraphQLError } from 'graphql';
export declare function coerceAndValidateForGraphQLInput(schema: GraphQLSchema, type: GraphQLInputType, value: any): {
    kind: 'valid';
    value: any;
} | {
    kind: 'error';
    error: GraphQLError;
};
//# sourceMappingURL=coerceAndValidateForGraphQLInput.d.ts.map