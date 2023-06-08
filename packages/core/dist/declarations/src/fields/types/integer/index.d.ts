import { BaseListTypeInfo, FieldTypeFunc, CommonFieldConfig } from '../../../types';
export type IntegerFieldConfig<ListTypeInfo extends BaseListTypeInfo> = CommonFieldConfig<ListTypeInfo> & {
    isIndexed?: boolean | 'unique';
    defaultValue?: number | {
        kind: 'autoincrement';
    };
    validation?: {
        isRequired?: boolean;
        min?: number;
        max?: number;
    };
    db?: {
        isNullable?: boolean;
        map?: string;
        extendPrismaSchema?: (field: string) => string;
    };
};
export declare const integer: <ListTypeInfo extends BaseListTypeInfo>({ isIndexed, defaultValue: _defaultValue, validation, ...config }?: IntegerFieldConfig<ListTypeInfo>) => FieldTypeFunc<ListTypeInfo>;
//# sourceMappingURL=index.d.ts.map