import { BaseListTypeInfo, FieldTypeFunc, CommonFieldConfig } from '../../../types';
export type CalendarDayFieldConfig<ListTypeInfo extends BaseListTypeInfo> = CommonFieldConfig<ListTypeInfo> & {
    isIndexed?: boolean | 'unique';
    validation?: {
        isRequired?: boolean;
    };
    defaultValue?: string;
    db?: {
        isNullable?: boolean;
        extendPrismaSchema?: (field: string) => string;
        map?: string;
    };
};
export declare const calendarDay: <ListTypeInfo extends BaseListTypeInfo>({ isIndexed, validation, defaultValue, ...config }?: CalendarDayFieldConfig<ListTypeInfo>) => FieldTypeFunc<ListTypeInfo>;
//# sourceMappingURL=index.d.ts.map