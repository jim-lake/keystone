import type { BaseFields, BaseListTypeInfo, KeystoneConfig, BaseKeystoneTypeInfo, ListConfig } from './types';
export declare function config<TypeInfo extends BaseKeystoneTypeInfo>(config: KeystoneConfig<TypeInfo>): KeystoneConfig<TypeInfo>;
export declare function group<__Fields extends BaseFields<ListTypeInfo>, // TODO: remove in breaking change
ListTypeInfo extends BaseListTypeInfo>(config: {
    label: string;
    description?: string;
    fields: BaseFields<ListTypeInfo>;
}): BaseFields<ListTypeInfo>;
export declare function list<__Fields extends BaseFields<ListTypeInfo>, // TODO: remove in breaking change
ListTypeInfo extends BaseListTypeInfo>(config: ListConfig<ListTypeInfo>): ListConfig<ListTypeInfo>;
//# sourceMappingURL=schema.d.ts.map