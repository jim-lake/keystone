import { BaseListTypeInfo } from '@keystone-6/core/types';
import { AuthConfig } from '../types';
type InitTemplateArgs = {
    listKey: string;
    initFirstItem: NonNullable<AuthConfig<BaseListTypeInfo>['initFirstItem']>;
};
export declare const initTemplate: ({ listKey, initFirstItem }: InitTemplateArgs) => string;
export {};
//# sourceMappingURL=init.d.ts.map