import { BaseListTypeInfo, FieldTypeFunc, CommonFieldConfig } from '../../../types';
export type FloatFieldConfig<ListTypeInfo extends BaseListTypeInfo> = CommonFieldConfig<ListTypeInfo> & {
    defaultValue?: number;
    isIndexed?: boolean | 'unique';
    validation?: {
        min?: number;
        max?: number;
        isRequired?: boolean;
    };
    db?: {
        isNullable?: boolean;
        map?: string;
        extendPrismaSchema?: (field: string) => string;
    };
};
export declare const float: <ListTypeInfo extends BaseListTypeInfo>({ isIndexed, validation, defaultValue, ...config }?: FloatFieldConfig<ListTypeInfo>) => FieldTypeFunc<ListTypeInfo>;
//# sourceMappingURL=index.d.ts.map