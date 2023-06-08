export type JSONValue = string | number | boolean | null | readonly JSONValue[] | {
    [key: string]: JSONValue;
};
export type MaybePromise<T> = T | Promise<T>;
export declare function getGqlNames({ listKey, pluralGraphQLName, }: {
    listKey: string;
    pluralGraphQLName: string;
}): {
    outputTypeName: string;
    itemQueryName: string;
    listQueryName: string;
    listQueryCountName: string;
    listOrderName: string;
    deleteMutationName: string;
    updateMutationName: string;
    createMutationName: string;
    deleteManyMutationName: string;
    updateManyMutationName: string;
    createManyMutationName: string;
    whereInputName: string;
    whereUniqueInputName: string;
    updateInputName: string;
    createInputName: string;
    updateManyInputName: string;
    relateToManyForCreateInputName: string;
    relateToManyForUpdateInputName: string;
    relateToOneForCreateInputName: string;
    relateToOneForUpdateInputName: string;
};
//# sourceMappingURL=utils.d.ts.map