import { BaseListTypeInfo, FieldTypeFunc, CommonFieldConfig } from '../../../types';
export type BigIntFieldConfig<ListTypeInfo extends BaseListTypeInfo> = CommonFieldConfig<ListTypeInfo> & {
    isIndexed?: boolean | 'unique';
    defaultValue?: bigint | {
        kind: 'autoincrement';
    };
    validation?: {
        isRequired?: boolean;
        min?: bigint;
        max?: bigint;
    };
    db?: {
        isNullable?: boolean;
        map?: string;
        extendPrismaSchema?: (field: string) => string;
    };
};
export declare const bigInt: <ListTypeInfo extends BaseListTypeInfo>({ isIndexed, defaultValue: _defaultValue, validation: _validation, ...config }?: BigIntFieldConfig<ListTypeInfo>) => FieldTypeFunc<ListTypeInfo>;
//# sourceMappingURL=index.d.ts.map