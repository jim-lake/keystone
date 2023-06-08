import { BaseListTypeInfo, FieldTypeFunc, CommonFieldConfig } from '../../../types';
export type ImageFieldConfig<ListTypeInfo extends BaseListTypeInfo> = CommonFieldConfig<ListTypeInfo> & {
    storage: string;
    db?: {
        extendPrismaSchema?: (field: string) => string;
    };
};
export declare const image: <ListTypeInfo extends BaseListTypeInfo>(config: ImageFieldConfig<ListTypeInfo>) => FieldTypeFunc<ListTypeInfo>;
//# sourceMappingURL=index.d.ts.map