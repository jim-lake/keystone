/// <reference types="node" />
/// <reference types="node" />
import type { IncomingMessage, ServerResponse } from 'http';
import type { Readable } from 'stream';
import type { GraphQLSchema, ExecutionResult, DocumentNode } from 'graphql';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import type { InitialisedList } from '../lib/core/types-for-lists';
import type { SessionStrategy } from './session';
import type { BaseListTypeInfo, BaseKeystoneTypeInfo } from './type-info';
export type KeystoneContext<TypeInfo extends BaseKeystoneTypeInfo = BaseKeystoneTypeInfo> = {
    req?: IncomingMessage;
    res?: ServerResponse;
    db: KeystoneDbAPI<TypeInfo['lists']>;
    query: KeystoneListsAPI<TypeInfo['lists']>;
    graphql: KeystoneGraphQLAPI;
    sudo: () => KeystoneContext<TypeInfo>;
    exitSudo: () => KeystoneContext<TypeInfo>;
    withSession: (session?: TypeInfo['session']) => KeystoneContext<TypeInfo>;
    withRequest: (req: IncomingMessage, res?: ServerResponse) => Promise<KeystoneContext<TypeInfo>>;
    prisma: TypeInfo['prisma'];
    files: FilesContext;
    images: ImagesContext;
    /** @deprecated */
    gqlNames: (listKey: string) => InitialisedList['graphql']['names'];
    experimental?: {
        /** @deprecated This value is only available if you have config.experimental.contextInitialisedLists = true.
         * This is not a stable API and may contain breaking changes in `patch` level releases.
         */
        initialisedLists: Record<string, InitialisedList>;
    };
    sessionStrategy?: SessionStrategy<TypeInfo['session'], TypeInfo>;
    session?: TypeInfo['session'];
};
type UniqueWhereInput<ListTypeInfo extends BaseListTypeInfo> = false extends ListTypeInfo['isSingleton'] ? {
    readonly where: ListTypeInfo['inputs']['uniqueWhere'];
} : {
    readonly where?: ListTypeInfo['inputs']['uniqueWhere'];
};
export type KeystoneListsAPI<KeystoneListsTypeInfo extends Record<string, BaseListTypeInfo>> = {
    [Key in keyof KeystoneListsTypeInfo]: {
        findMany(args?: {
            readonly where?: KeystoneListsTypeInfo[Key]['inputs']['where'];
            readonly take?: number;
            readonly skip?: number;
            readonly orderBy?: KeystoneListsTypeInfo[Key]['inputs']['orderBy'] | readonly KeystoneListsTypeInfo[Key]['inputs']['orderBy'][];
            readonly cursor?: KeystoneListsTypeInfo[Key]['inputs']['uniqueWhere'];
        } & ResolveFields): Promise<readonly Record<string, any>[]>;
        findOne(args: UniqueWhereInput<KeystoneListsTypeInfo[Key]> & ResolveFields): Promise<Record<string, any>>;
        count(args?: {
            readonly where?: KeystoneListsTypeInfo[Key]['inputs']['where'];
        }): Promise<number>;
        updateOne(args: UniqueWhereInput<KeystoneListsTypeInfo[Key]> & {
            readonly data: KeystoneListsTypeInfo[Key]['inputs']['update'];
        } & ResolveFields): Promise<Record<string, any>>;
        updateMany(args: {
            readonly data: readonly (UniqueWhereInput<KeystoneListsTypeInfo[Key]> & {
                readonly data: KeystoneListsTypeInfo[Key]['inputs']['update'];
            })[];
        } & ResolveFields): Promise<Record<string, any>[]>;
        createOne(args: {
            readonly data: KeystoneListsTypeInfo[Key]['inputs']['create'];
        } & ResolveFields): Promise<Record<string, any>>;
        createMany(args: {
            readonly data: readonly KeystoneListsTypeInfo[Key]['inputs']['create'][];
        } & ResolveFields): Promise<Record<string, any>[]>;
        deleteOne(args: UniqueWhereInput<KeystoneListsTypeInfo[Key]> & ResolveFields): Promise<Record<string, any> | null>;
        deleteMany(args: {
            readonly where: readonly KeystoneListsTypeInfo[Key]['inputs']['uniqueWhere'][];
        } & ResolveFields): Promise<Record<string, any>[]>;
    };
};
type ResolveFields = {
    /**
     * @default 'id'
     */
    readonly query?: string;
};
export type KeystoneDbAPI<KeystoneListsTypeInfo extends Record<string, BaseListTypeInfo>> = {
    [Key in keyof KeystoneListsTypeInfo]: {
        findMany(args?: {
            readonly where?: KeystoneListsTypeInfo[Key]['inputs']['where'];
            readonly take?: number;
            readonly skip?: number;
            readonly orderBy?: KeystoneListsTypeInfo[Key]['inputs']['orderBy'] | readonly KeystoneListsTypeInfo[Key]['inputs']['orderBy'][];
            readonly cursor?: KeystoneListsTypeInfo[Key]['inputs']['uniqueWhere'];
        }): Promise<readonly KeystoneListsTypeInfo[Key]['item'][]>;
        findOne(args: UniqueWhereInput<KeystoneListsTypeInfo[Key]>): Promise<KeystoneListsTypeInfo[Key]['item'] | null>;
        count(args?: {
            readonly where?: KeystoneListsTypeInfo[Key]['inputs']['where'];
        }): Promise<number>;
        updateOne(args: UniqueWhereInput<KeystoneListsTypeInfo[Key]> & {
            readonly data: KeystoneListsTypeInfo[Key]['inputs']['update'];
        }): Promise<KeystoneListsTypeInfo[Key]['item']>;
        updateMany(args: {
            readonly data: readonly (UniqueWhereInput<KeystoneListsTypeInfo[Key]> & {
                readonly data: KeystoneListsTypeInfo[Key]['inputs']['update'];
            })[];
        }): Promise<KeystoneListsTypeInfo[Key]['item'][]>;
        createOne(args: {
            readonly data: KeystoneListsTypeInfo[Key]['inputs']['create'];
        }): Promise<KeystoneListsTypeInfo[Key]['item']>;
        createMany(args: {
            readonly data: readonly KeystoneListsTypeInfo[Key]['inputs']['create'][];
        }): Promise<KeystoneListsTypeInfo[Key]['item'][]>;
        deleteOne(args: UniqueWhereInput<KeystoneListsTypeInfo[Key]>): Promise<KeystoneListsTypeInfo[Key]['item']>;
        deleteMany(args: {
            readonly where: readonly KeystoneListsTypeInfo[Key]['inputs']['uniqueWhere'][];
        }): Promise<KeystoneListsTypeInfo[Key]['item'][]>;
    };
};
export type KeystoneGraphQLAPI = {
    schema: GraphQLSchema;
    run: <TData, TVariables extends Record<string, any>>(args: GraphQLExecutionArguments<TData, TVariables>) => Promise<TData>;
    raw: <TData, TVariables extends Record<string, any>>(args: GraphQLExecutionArguments<TData, TVariables>) => Promise<ExecutionResult<TData>>;
};
type GraphQLExecutionArguments<TData, TVariables> = {
    query: string | DocumentNode | TypedDocumentNode<TData, TVariables>;
    variables?: TVariables;
};
export type AssetMode = 'local' | 's3';
export type FileMetadata = {
    filename: string;
    filesize: number;
};
export type FileData = {
    filename: string;
} & FileMetadata;
export type FilesContext = (storage: string) => {
    getUrl: (filename: string) => Promise<string>;
    getDataFromStream: (stream: Readable, filename: string) => Promise<FileData>;
    deleteAtSource: (filename: string) => Promise<void>;
};
export type ImageExtension = 'jpg' | 'png' | 'webp' | 'gif';
export type ImageMetadata = {
    extension: ImageExtension;
    filesize: number;
    width: number;
    height: number;
};
export type ImageData = {
    id: string;
} & ImageMetadata;
export type ImagesContext = (storage: string) => {
    getUrl: (id: string, extension: ImageExtension) => Promise<string>;
    getDataFromStream: (stream: Readable, filename: string) => Promise<ImageData>;
    deleteAtSource: (id: string, extension: ImageExtension) => Promise<void>;
};
export {};
//# sourceMappingURL=context.d.ts.map