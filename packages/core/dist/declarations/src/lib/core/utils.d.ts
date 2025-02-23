import { Limit } from 'p-limit';
import { PrismaModule } from '../../artifacts';
import { BaseItem, KeystoneConfig, KeystoneContext } from '../../types';
import { InitialisedList } from './types-for-lists';
import { PrismaFilter, UniquePrismaFilter } from './where-inputs';
declare const prisma: unique symbol;
export type PrismaPromise<T> = Promise<T> & {
    [prisma]: true;
};
type PrismaModel = {
    count: (arg: {
        where?: PrismaFilter;
        take?: number;
        skip?: number;
        orderBy?: readonly Record<string, 'asc' | 'desc'>[];
    }) => PrismaPromise<number>;
    findMany: (arg: {
        where?: PrismaFilter;
        take?: number;
        skip?: number;
        cursor?: UniquePrismaFilter;
        orderBy?: readonly Record<string, 'asc' | 'desc'>[];
        include?: Record<string, boolean>;
        select?: Record<string, any>;
    }) => PrismaPromise<BaseItem[]>;
    delete: (arg: {
        where: UniquePrismaFilter;
    }) => PrismaPromise<BaseItem>;
    deleteMany: (arg: {
        where: PrismaFilter;
    }) => PrismaPromise<BaseItem>;
    findUnique: (args: {
        where: UniquePrismaFilter;
        include?: Record<string, any>;
        select?: Record<string, any>;
    }) => PrismaPromise<BaseItem | null>;
    findFirst: (args: {
        where: PrismaFilter;
        include?: Record<string, any>;
        select?: Record<string, any>;
    }) => PrismaPromise<BaseItem | null>;
    create: (args: {
        data: Record<string, any>;
        include?: Record<string, any>;
        select?: Record<string, any>;
    }) => PrismaPromise<BaseItem>;
    update: (args: {
        where: UniquePrismaFilter;
        data: Record<string, any>;
        include?: Record<string, any>;
        select?: Record<string, any>;
    }) => PrismaPromise<BaseItem>;
};
export type UnwrapPromise<TPromise extends Promise<any>> = TPromise extends Promise<infer T> ? T : never;
export type UnwrapPromises<T extends Promise<any>[]> = {
    [Key in keyof T]: Key extends number ? UnwrapPromise<T[Key]> : never;
};
export type PrismaClient = {
    $disconnect(): Promise<void>;
    $connect(): Promise<void>;
    $transaction<T extends PrismaPromise<any>[]>(promises: [...T]): UnwrapPromises<T>;
} & Record<string, PrismaModel>;
export declare function runWithPrisma<T>(context: KeystoneContext, { prisma: { listKey } }: InitialisedList, fn: (model: PrismaModel) => Promise<T>): Promise<T>;
declare const idTypeSymbol: unique symbol;
export type IdType = {
    ___keystoneIdType: typeof idTypeSymbol;
    toString(): string;
};
export declare const isFulfilled: <T>(arg: PromiseSettledResult<T>) => arg is PromiseFulfilledResult<T>;
export declare const isRejected: (arg: PromiseSettledResult<any>) => arg is PromiseRejectedResult;
type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
export declare function promiseAllRejectWithAllErrors<T extends unknown[]>(promises: readonly [...T]): Promise<{
    [P in keyof T]: Awaited<T[P]>;
}>;
export declare function getNamesFromList(listKey: string, { graphql, ui, isSingleton }: KeystoneConfig['lists'][string]): {
    graphql: {
        names: {
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
        namePlural: string;
    };
    ui: {
        labels: {
            label: string;
            singular: string;
            plural: string;
            path: string;
        };
    };
};
export declare function getDBFieldKeyForFieldOnMultiField(fieldKey: string, subField: string): string;
export declare function setWriteLimit(prismaClient: object, limit: Limit): void;
export declare function getWriteLimit(context: KeystoneContext): Limit;
export declare function setPrismaNamespace(prismaClient: object, prismaNamespace: PrismaModule['Prisma']): void;
export declare function getPrismaNamespace(context: KeystoneContext): {
    [key: string]: unknown;
    DbNull: unknown;
    JsonNull: unknown;
};
export declare function areArraysEqual(a: readonly unknown[], b: readonly unknown[]): boolean;
export {};
//# sourceMappingURL=utils.d.ts.map