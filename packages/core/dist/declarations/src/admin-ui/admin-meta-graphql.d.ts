import { JSONValue } from '../types';
export declare const staticAdminMetaQuery: import("graphql/language/ast").DocumentNode;
export type StaticAdminMetaQuery = {
    keystone: {
        __typename: 'KeystoneMeta';
        adminMeta: {
            __typename: 'KeystoneAdminMeta';
            lists: Array<{
                __typename: 'KeystoneAdminUIListMeta';
                key: string;
                path: string;
                description: string | null;
                label: string;
                labelField: string;
                singular: string;
                plural: string;
                fields: Array<{
                    __typename: 'KeystoneAdminUIFieldMeta';
                    path: string;
                    label: string;
                    description: string | null;
                    fieldMeta: JSONValue | null;
                    viewsIndex: number;
                    customViewsIndex: number | null;
                    search: QueryMode | null;
                    isNonNull: ('read' | 'create' | 'update')[];
                    itemView: {
                        __typename: 'KeystoneAdminUIFieldMetaItemView';
                        fieldPosition: KeystoneAdminUIFieldMetaItemViewFieldPosition | null;
                        fieldMode: KeystoneAdminUIFieldMetaItemViewFieldMode | null;
                    } | null;
                }>;
                groups: Array<{
                    __typename: 'KeystoneAdminUIFieldGroupMeta';
                    label: string;
                    description: string | null;
                    fields: Array<{
                        __typename: 'KeystoneAdminUIFieldMeta';
                        path: string;
                    }>;
                }>;
                pageSize: number;
                initialColumns: Array<string>;
                initialSort: {
                    __typename: 'KeystoneAdminUISort';
                    field: string;
                    direction: KeystoneAdminUISortDirection;
                } | null;
                isSingleton: boolean;
                itemQueryName: string;
                listQueryName: string;
            }>;
        };
    };
};
type QueryMode = 'default' | 'insensitive';
type KeystoneAdminUIFieldMetaItemViewFieldMode = 'edit' | 'read' | 'hidden';
type KeystoneAdminUIFieldMetaItemViewFieldPosition = 'form' | 'sidebar';
type KeystoneAdminUISortDirection = 'ASC' | 'DESC';
export {};
//# sourceMappingURL=admin-meta-graphql.d.ts.map