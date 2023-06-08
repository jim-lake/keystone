import { BaseListTypeInfo, FieldTypeFunc, CommonFieldConfig } from '../../../types';
export type TimestampFieldConfig<ListTypeInfo extends BaseListTypeInfo> = CommonFieldConfig<ListTypeInfo> & {
    isIndexed?: boolean | 'unique';
    validation?: {
        isRequired?: boolean;
    };
    defaultValue?: string | {
        kind: 'now';
    };
    db?: {
        updatedAt?: boolean;
        isNullable?: boolean;
        map?: string;
        extendPrismaSchema?: (field: string) => string;
    };
};
export declare const timestamp: <ListTypeInfo extends BaseListTypeInfo>({ isIndexed, validation, defaultValue, ...config }?: TimestampFieldConfig<ListTypeInfo>) => FieldTypeFunc<ListTypeInfo>;
//# sourceMappingURL=index.d.ts.map