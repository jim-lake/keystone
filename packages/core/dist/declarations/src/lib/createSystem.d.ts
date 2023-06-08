import type { KeystoneConfig } from '../types';
import type { PrismaModule } from '../artifacts';
export declare function createSystem(config: KeystoneConfig): {
    graphQLSchema: import("graphql").GraphQLSchema;
    adminMeta: import("../admin-ui/system/createAdminMeta").AdminMetaRootVal;
    getKeystone: (prismaModule: PrismaModule) => {
        connect(): Promise<void>;
        disconnect(): Promise<void>;
        context: import("../types").KeystoneContext;
    };
};
//# sourceMappingURL=createSystem.d.ts.map