import { GraphQLSchema } from 'graphql';
import type { KeystoneConfig } from './types';
export declare function getFormattedGraphQLSchema(schema: string): string;
export declare function getCommittedArtifacts(config: KeystoneConfig, graphQLSchema: GraphQLSchema): Promise<{
    graphql: string;
    prisma: string;
}>;
export declare function getBuiltKeystoneConfigurationPath(cwd: string): string;
export declare function getBuiltKeystoneConfiguration(cwd: string): {
    lists: import("./types").ListSchemaConfig<import("./types").BaseListTypeInfo>;
    db: import("./types").DatabaseConfig<import("./types").BaseKeystoneTypeInfo>;
    graphql?: import("./types").GraphQLConfig<import("./types").BaseKeystoneTypeInfo> | undefined;
    ui?: import("./types").AdminUIConfig<import("./types").BaseKeystoneTypeInfo> | undefined;
    server?: import("./types").ServerConfig<import("./types").BaseKeystoneTypeInfo> | undefined;
    session?: import("./types").SessionStrategy<any, import("./types").BaseKeystoneTypeInfo> | undefined;
    types?: {
        path?: string | undefined;
    } | undefined;
    extendGraphqlSchema?: import("./types").ExtendGraphqlSchema | undefined;
    storage?: Record<string, import("./types").StorageConfig> | undefined;
    telemetry?: boolean | undefined;
    experimental?: {
        contextInitialisedLists?: boolean | undefined;
    } | undefined;
};
export declare function getSystemPaths(cwd: string, config: KeystoneConfig): {
    config: string;
    admin: string;
    prisma: string;
    types: {
        relativePrismaPath: string;
    };
    schema: {
        types: string;
        prisma: string;
        graphql: string;
    };
};
export declare function validatePrismaAndGraphQLSchemas(cwd: string, config: KeystoneConfig, graphQLSchema: GraphQLSchema): Promise<void>;
export declare function generatePrismaAndGraphQLSchemas(cwd: string, config: KeystoneConfig, graphQLSchema: GraphQLSchema): Promise<{
    graphql: string;
    prisma: string;
}>;
export declare function generateTypescriptTypes(cwd: string, config: KeystoneConfig, graphQLSchema: GraphQLSchema): Promise<void>;
export declare function generateTypescriptTypesAndPrisma(cwd: string, config: KeystoneConfig, graphQLSchema: GraphQLSchema): Promise<void>;
export type PrismaModule = {
    PrismaClient: {
        new (args: unknown): any;
    };
    Prisma: {
        DbNull: unknown;
        JsonNull: unknown;
        [key: string]: unknown;
    };
};
//# sourceMappingURL=artifacts.d.ts.map