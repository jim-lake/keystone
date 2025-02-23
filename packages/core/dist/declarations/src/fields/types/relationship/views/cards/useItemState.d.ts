import { FieldMeta, ListMeta } from '../../../../../types';
import { DataGetter } from '../../../../../admin-ui/utils';
import { controller } from '../index';
type ItemsState = {
    kind: 'loading';
} | {
    kind: 'error';
    message: string;
} | {
    kind: 'loaded';
};
type Items = Record<string, DataGetter<{
    id: string;
    [key: string]: any;
}>>;
export declare function useItemState({ selectedFields, localList, id, field, }: {
    selectedFields: string;
    localList: ListMeta;
    field: ReturnType<typeof controller>;
    id: string | null;
}): {
    items: Items;
    setItems: (items: Items) => void;
    state: ItemsState;
};
export declare function useFieldsObj(list: ListMeta, fields: readonly string[] | undefined): Record<string, FieldMeta>;
export {};
//# sourceMappingURL=useItemState.d.ts.map