import { DateType } from '../types';
/**
 * Un-formatted date for server side storage (ISO8601), like '2019-09-18'
 */
export declare const formatDateType: (date: Date) => DateType;
export declare const deserializeDate: (date: string) => Date;
export declare const formatDate: (date: Date) => string;
export declare const dateFormatPlaceholder: string;
//# sourceMappingURL=dateFormatters.d.ts.map