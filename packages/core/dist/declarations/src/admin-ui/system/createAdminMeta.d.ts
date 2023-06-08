import { KeystoneConfig, MaybePromise, BaseListTypeInfo, KeystoneContext, JSONValue, MaybeItemFunction } from '../../types';
import { InitialisedList } from '../../lib/core/types-for-lists';
type ContextFunction<Return> = (context: KeystoneContext) => MaybePromise<Return>;
export type FieldMetaRootVal = {
    key: string;
    /**
     * @deprecated use .key, not .path
     */
    path: string;
    label: string;
    description: string | null;
    fieldMeta: JSONValue | null;
    viewsIndex: number;
    customViewsIndex: number | null;
    listKey: string;
    search: 'default' | 'insensitive' | null;
    isOrderable: ContextFunction<boolean>;
    isFilterable: ContextFunction<boolean>;
    isNonNull: ('read' | 'create' | 'update')[];
    createView: {
        fieldMode: ContextFunction<'edit' | 'hidden'>;
    };
    itemView: {
        fieldMode: MaybeItemFunction<'edit' | 'read' | 'hidden', BaseListTypeInfo>;
        fieldPosition: MaybeItemFunction<'form' | 'sidebar', BaseListTypeInfo>;
    };
    listView: {
        fieldMode: ContextFunction<'read' | 'hidden'>;
    };
};
export type FieldGroupMeta = {
    label: string;
    description: string | null;
    fields: Array<FieldMetaRootVal>;
};
export type ListMetaRootVal = {
    key: string;
    path: string;
    description: string | null;
    label: string;
    labelField: string;
    singular: string;
    plural: string;
    fields: FieldMetaRootVal[];
    fieldsByKey: Record<string, FieldMetaRootVal>;
    groups: Array<FieldGroupMeta>;
    pageSize: number;
    initialColumns: string[];
    initialSort: {
        field: string;
        direction: 'ASC' | 'DESC';
    } | null;
    isSingleton: boolean;
    itemQueryName: string;
    listQueryName: string;
    isHidden: ContextFunction<boolean>;
    hideCreate: ContextFunction<boolean>;
    hideDelete: ContextFunction<boolean>;
};
export type AdminMetaRootVal = {
    lists: ListMetaRootVal[];
    listsByKey: Record<string, ListMetaRootVal>;
    views: string[];
    isAccessAllowed: undefined | ((context: KeystoneContext) => MaybePromise<boolean>);
};
export declare function createAdminMeta(config: KeystoneConfig, initialisedLists: Record<string, InitialisedList>): AdminMetaRootVal;
export declare function getAdminMetaForRelationshipField(): AdminMetaRootVal;
export {};
//# sourceMappingURL=createAdminMeta.d.ts.map