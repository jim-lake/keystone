import { GraphQLError } from 'graphql';
import { FieldMeta } from '../../types';
import { ItemData } from './serialization';
import { DataGetter } from './dataGetter';
export type Value = Record<string, {
    kind: 'error';
    errors: readonly [GraphQLError, ...GraphQLError[]];
} | {
    kind: 'value';
    value: any;
}>;
export declare function useChangedFieldsAndDataForUpdate(fields: Record<string, FieldMeta>, itemGetter: DataGetter<ItemData>, value: Value): {
    changedFields: ReadonlySet<string>;
    dataForUpdate: Record<string, any>;
};
//# sourceMappingURL=item-form.d.ts.map