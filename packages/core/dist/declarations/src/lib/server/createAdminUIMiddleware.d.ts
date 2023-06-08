import express from 'express';
import type next from 'next';
import type { KeystoneConfig, KeystoneContext } from '../../types';
export declare function createAdminUIMiddlewareWithNextApp(config: KeystoneConfig, commonContext: KeystoneContext, nextApp: ReturnType<typeof next>): (req: express.Request, res: express.Response) => Promise<void>;
//# sourceMappingURL=createAdminUIMiddleware.d.ts.map