import express from 'express';
import type { KeystoneConfig, KeystoneContext } from '../types';
export { createSystem } from './lib/createSystem';
export { createExpressServer } from './lib/server/createExpressServer';
export { initConfig } from './lib/config';
/** @deprecated */
export declare function createAdminUIMiddleware(config: KeystoneConfig, context: KeystoneContext, dev: boolean, projectAdminPath: string): Promise<(req: express.Request, res: express.Response) => void>;
//# sourceMappingURL=system.d.ts.map