import { BaseListTypeInfo, CommonFieldConfig, FieldData } from '../types';
export declare function getResolvedIsNullable(validation: undefined | {
    isRequired?: boolean;
}, db: undefined | {
    isNullable?: boolean;
}): boolean;
export declare function assertReadIsNonNullAllowed<ListTypeInfo extends BaseListTypeInfo>(meta: FieldData, config: CommonFieldConfig<ListTypeInfo>, resolvedIsNullable: boolean): void;
//# sourceMappingURL=non-null-graphql.d.ts.map