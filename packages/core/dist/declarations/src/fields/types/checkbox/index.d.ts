import { BaseListTypeInfo, CommonFieldConfig, FieldTypeFunc } from '../../../types';
export type CheckboxFieldConfig<ListTypeInfo extends BaseListTypeInfo> = CommonFieldConfig<ListTypeInfo> & {
    defaultValue?: boolean;
    db?: {
        map?: string;
        extendPrismaSchema?: (field: string) => string;
    };
};
export declare const checkbox: <ListTypeInfo extends BaseListTypeInfo>({ defaultValue, ...config }?: CheckboxFieldConfig<ListTypeInfo>) => FieldTypeFunc<ListTypeInfo>;
//# sourceMappingURL=index.d.ts.map