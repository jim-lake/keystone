import { FieldTypeFunc, CommonFieldConfig, BaseListTypeInfo } from '../../../types';
export type FileFieldConfig<ListTypeInfo extends BaseListTypeInfo> = {
    storage: string;
    db?: {
        extendPrismaSchema?: (field: string) => string;
    };
} & CommonFieldConfig<ListTypeInfo>;
export declare const file: <ListTypeInfo extends BaseListTypeInfo>(config: FileFieldConfig<ListTypeInfo>) => FieldTypeFunc<ListTypeInfo>;
//# sourceMappingURL=index.d.ts.map