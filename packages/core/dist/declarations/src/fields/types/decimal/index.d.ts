import { FieldTypeFunc, BaseListTypeInfo, CommonFieldConfig } from '../../../types';
export type DecimalFieldConfig<ListTypeInfo extends BaseListTypeInfo> = CommonFieldConfig<ListTypeInfo> & {
    validation?: {
        min?: string;
        max?: string;
        isRequired?: boolean;
    };
    precision?: number;
    scale?: number;
    defaultValue?: string;
    isIndexed?: boolean | 'unique';
    db?: {
        isNullable?: boolean;
        map?: string;
        extendPrismaSchema?: (field: string) => string;
    };
};
export declare const decimal: <ListTypeInfo extends BaseListTypeInfo>({ isIndexed, precision, scale, validation, defaultValue, ...config }?: DecimalFieldConfig<ListTypeInfo>) => FieldTypeFunc<ListTypeInfo>;
//# sourceMappingURL=index.d.ts.map