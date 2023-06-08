import type { DatabaseProvider } from './core';
export type Telemetry = {
    informedAt: string | null;
    device: {
        lastSentDate: string | null;
    };
    projects: Partial<{
        [projectPath: string]: {
            lastSentDate: string;
        };
    }>;
};
export type Configuration = {
    telemetry?: undefined | false | Telemetry;
};
export type Device = {
    previous: string | null;
    os: string;
    node: string;
};
export type PackageName = '@keystone-6/core' | '@keystone-6/auth' | '@keystone-6/fields-document' | '@keystone-6/cloudinary' | '@keystone-6/session-store-redis' | '@opensaas/keystone-nextjs-auth';
export type Project = {
    previous: string | null;
    versions: Partial<Record<PackageName, string>>;
    lists: number;
    database: DatabaseProvider;
    fields: {
        [key: string]: number;
    };
};
//# sourceMappingURL=telemetry.d.ts.map