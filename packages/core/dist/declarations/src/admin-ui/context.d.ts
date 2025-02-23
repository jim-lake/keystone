import { ReactNode } from 'react';
import type { AdminConfig, AdminMeta, FieldViews } from '../types';
import { ApolloError, DocumentNode } from './apollo';
import { AuthenticatedItem, VisibleLists, CreateViewFieldModes } from './utils/useLazyMetadata';
type KeystoneContextType = {
    adminConfig: AdminConfig;
    adminMeta: {
        state: 'loaded';
        value: AdminMeta;
    } | {
        state: 'error';
        error: ApolloError;
        refetch: () => Promise<void>;
    };
    fieldViews: FieldViews;
    authenticatedItem: AuthenticatedItem;
    visibleLists: VisibleLists;
    createViewFieldModes: CreateViewFieldModes;
    reinitContext: () => Promise<void>;
    apiPath: string;
};
type KeystoneProviderProps = {
    children: ReactNode;
    adminConfig: AdminConfig;
    adminMetaHash: string;
    fieldViews: FieldViews;
    lazyMetadataQuery: DocumentNode;
    apiPath: string;
};
export declare const KeystoneProvider: (props: KeystoneProviderProps) => JSX.Element;
export declare const useKeystone: () => {
    adminConfig: AdminConfig;
    adminMeta: AdminMeta;
    authenticatedItem: AuthenticatedItem;
    visibleLists: VisibleLists;
    createViewFieldModes: CreateViewFieldModes;
    apiPath: string;
};
export declare const useReinitContext: () => () => Promise<void>;
export declare const useRawKeystone: () => KeystoneContextType;
export declare const useList: (key: string) => import("../types").ListMeta;
export {};
//# sourceMappingURL=context.d.ts.map