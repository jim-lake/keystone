export * as postgresql from './providers/postgresql';
export * as sqlite from './providers/sqlite';
export * as mysql from './providers/mysql';
type CommonFilter<T> = {
    equals?: T | null;
    in?: readonly T[] | null;
    notIn?: readonly T[] | null;
    lt?: T | null;
    lte?: T | null;
    gt?: T | null;
    gte?: T | null;
    contains?: T | null;
    startsWith?: T | null;
    endsWith?: T | null;
    not?: CommonFilter<T> | null;
};
export declare function resolveCommon(val: CommonFilter<any> | null): object | null;
export declare function resolveString(val: (CommonFilter<string> & {
    mode?: 'default' | 'insensitive' | null;
}) | null): object | null;
//# sourceMappingURL=internal.d.ts.map