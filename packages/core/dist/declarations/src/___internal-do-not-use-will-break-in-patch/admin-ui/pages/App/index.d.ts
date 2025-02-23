/// <reference types="react" />
import { AppProps } from 'next/app';
import { DocumentNode } from 'graphql';
import { AdminConfig, FieldViews } from '../../../../types';
type AppConfig = {
    adminConfig: AdminConfig;
    adminMetaHash: string;
    fieldViews: FieldViews;
    lazyMetadataQuery: DocumentNode;
    apiPath: string;
};
export declare const getApp: (props: AppConfig) => ({ Component, pageProps }: AppProps) => JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map