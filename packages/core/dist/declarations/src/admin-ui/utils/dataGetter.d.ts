import { GraphQLError } from 'graphql';
import { JSONValue } from '../../types';
export type DeepNullable<T> = null | (T extends Array<infer Item> ? Array<DeepNullable<Item>> : {
    [Key in keyof T]: DeepNullable<T[Key]>;
});
export type DataGetter<Value> = {
    readonly data: Value;
    readonly errors?: readonly [GraphQLError, ...GraphQLError[]];
    readonly path: (string | number)[];
    get<Key extends NonNullable<Value> extends Array<any> ? number : Exclude<keyof NonNullable<Value>, symbol>>(field: Key): DataGetter<(Key extends keyof NonNullable<Value> ? NonNullable<Value>[Key] : never) | null>;
};
export declare function makeDataGetter<Data extends JSONValue>(data: Data, errors: readonly GraphQLError[] | undefined): DataGetter<Data>;
//# sourceMappingURL=dataGetter.d.ts.map