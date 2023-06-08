import { BaseListTypeInfo, JSONValue, FieldTypeFunc, CommonFieldConfig } from '../../../types';
export type JsonFieldConfig<ListTypeInfo extends BaseListTypeInfo> = CommonFieldConfig<ListTypeInfo> & {
    defaultValue?: JSONValue;
    db?: {
        map?: string;
        extendPrismaSchema?: (field: string) => string;
    };
};
export declare const json: <ListTypeInfo extends BaseListTypeInfo>({ defaultValue, ...config }?: JsonFieldConfig<ListTypeInfo>) => FieldTypeFunc<ListTypeInfo>;
//# sourceMappingURL=index.d.ts.map