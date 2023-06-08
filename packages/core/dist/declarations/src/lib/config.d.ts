import type { KeystoneConfig } from '../types';
export declare function initConfig(config: KeystoneConfig): {
    lists: import("../types").ListSchemaConfig<import("../types").BaseListTypeInfo>;
    db: import("../types").DatabaseConfig<import("../types").BaseKeystoneTypeInfo>;
    graphql?: import("../types").GraphQLConfig<import("../types").BaseKeystoneTypeInfo> | undefined;
    ui?: import("../types").AdminUIConfig<import("../types").BaseKeystoneTypeInfo> | undefined;
    server?: import("../types").ServerConfig<import("../types").BaseKeystoneTypeInfo> | undefined;
    session?: import("../types").SessionStrategy<any, import("../types").BaseKeystoneTypeInfo> | undefined;
    types?: {
        path?: string | undefined;
    } | undefined;
    extendGraphqlSchema?: import("../types").ExtendGraphqlSchema | undefined;
    storage?: Record<string, import("../types").StorageConfig> | undefined;
    telemetry?: boolean | undefined;
    experimental?: {
        contextInitialisedLists?: boolean | undefined;
    } | undefined;
};
//# sourceMappingURL=config.d.ts.map