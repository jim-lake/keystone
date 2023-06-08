import { GraphQLError } from 'graphql';
export declare const userInputError: (msg: string) => GraphQLError;
export declare const accessDeniedError: (msg: string) => GraphQLError;
export declare const prismaError: (err: Error) => GraphQLError;
export declare const validationFailureError: (messages: string[]) => GraphQLError;
export declare const extensionError: (extension: string, things: {
    error: Error;
    tag: string;
}[]) => GraphQLError;
export declare const resolverError: (things: {
    error: Error;
    tag: string;
}[]) => GraphQLError;
export declare const relationshipError: (things: {
    error: Error;
    tag: string;
}[]) => GraphQLError;
export declare const accessReturnError: (things: {
    tag: string;
    returned: string;
}[]) => GraphQLError;
export declare const limitsExceededError: (args: {
    type: string;
    limit: number;
    list: string;
}) => GraphQLError;
export declare const filterAccessError: ({ operation, fieldKeys, }: {
    operation: 'filter' | 'orderBy';
    fieldKeys: string[];
}) => GraphQLError;
//# sourceMappingURL=graphql-errors.d.ts.map