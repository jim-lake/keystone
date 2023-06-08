import { Application } from 'express';
import type { KeystoneConfig } from '../../types';
type AddHealthCheckArgs = {
    config: KeystoneConfig;
    server: Application;
};
export declare function addHealthCheck({ config, server }: AddHealthCheckArgs): Promise<void>;
export {};
//# sourceMappingURL=addHealthCheck.d.ts.map