import { KeystoneContext } from '../../types';
import { AdminMetaRootVal } from './createAdminMeta';
type Context = KeystoneContext | {
    isAdminUIBuildProcess: true;
};
export declare const KeystoneMeta: import("@graphql-ts/schema").ObjectType<{
    adminMeta: AdminMetaRootVal;
}, Context>;
export {};
//# sourceMappingURL=adminMetaSchema.d.ts.map