import { GraphQLSchema } from 'graphql';
import { AdminMetaRootVal } from '../system/createAdminMeta';
type AppTemplateOptions = {
    configFileExists: boolean;
};
export declare const appTemplate: (adminMetaRootVal: AdminMetaRootVal, graphQLSchema: GraphQLSchema, { configFileExists }: AppTemplateOptions, apiPath: string) => string;
export {};
//# sourceMappingURL=app.d.ts.map