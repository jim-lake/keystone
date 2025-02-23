import { BaseListTypeInfo, FieldTypeFunc, CommonFieldConfig } from '../../../types';
export type MultiselectFieldConfig<ListTypeInfo extends BaseListTypeInfo> = CommonFieldConfig<ListTypeInfo> & ({
    /**
     * When a value is provided as just a string, it will be formatted in the same way
     * as field labels are to create the label.
     */
    options: readonly ({
        label: string;
        value: string;
    } | string)[];
    /**
     * If `enum` is provided on SQLite, it will use an enum in GraphQL but a string in the database.
     */
    type?: 'string' | 'enum';
    defaultValue?: readonly string[];
} | {
    options: readonly {
        label: string;
        value: number;
    }[];
    type: 'integer';
    defaultValue?: readonly number[];
}) & {
    db?: {
        map?: string;
        extendPrismaSchema?: (field: string) => string;
    };
};
export declare const multiselect: <ListTypeInfo extends BaseListTypeInfo>({ defaultValue, ...config }: MultiselectFieldConfig<ListTypeInfo>) => FieldTypeFunc<ListTypeInfo>;
//# sourceMappingURL=index.d.ts.map