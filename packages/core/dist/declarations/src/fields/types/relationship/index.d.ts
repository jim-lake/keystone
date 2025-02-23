import { BaseListTypeInfo, FieldTypeFunc, CommonFieldConfig } from '../../../types';
type SelectDisplayConfig = {
    ui?: {
        displayMode?: 'select';
        /**
         * The path of the field to use from the related list for item labels in the select.
         * Defaults to the labelField configured on the related list.
         */
        labelField?: string;
        searchFields?: string[];
    };
};
type CardsDisplayConfig = {
    ui?: {
        displayMode: 'cards';
        cardFields: readonly string[];
        /** Causes the default Card component to render as a link to navigate to the related item */
        linkToItem?: boolean;
        /** Determines whether removing a related item in the UI will delete or unlink it */
        removeMode?: 'disconnect' | 'none';
        /** Configures inline create mode for cards (alternative to opening the create modal) */
        inlineCreate?: {
            fields: readonly string[];
        };
        /** Configures inline edit mode for cards */
        inlineEdit?: {
            fields: readonly string[];
        };
        /** Configures whether a select to add existing items should be shown or not */
        inlineConnect?: boolean | {
            /**
             * The path of the field to use from the related list for item labels in the inline connect
             * Defaults to the labelField configured on the related list.
             */
            labelField: string;
            searchFields?: string[];
        };
    };
};
type CountDisplayConfig = {
    many: true;
    ui?: {
        displayMode: 'count';
    };
};
type OneDbConfig = {
    many?: false;
    db?: {
        extendPrismaSchema?: (field: string) => string;
        foreignKey?: true | {
            map: string;
        };
    };
};
type ManyDbConfig = {
    many: true;
    db?: {
        relationName?: string;
        extendPrismaSchema?: (field: string) => string;
    };
};
export type RelationshipFieldConfig<ListTypeInfo extends BaseListTypeInfo> = CommonFieldConfig<ListTypeInfo> & {
    many?: boolean;
    ref: string;
    ui?: {
        hideCreate?: boolean;
    };
} & (OneDbConfig | ManyDbConfig) & (SelectDisplayConfig | CardsDisplayConfig | CountDisplayConfig);
export declare const relationship: <ListTypeInfo extends BaseListTypeInfo>({ ref, ...config }: (CommonFieldConfig<ListTypeInfo> & {
    many?: boolean | undefined;
    ref: string;
    ui?: {
        hideCreate?: boolean | undefined;
    } | undefined;
} & OneDbConfig & SelectDisplayConfig) | (CommonFieldConfig<ListTypeInfo> & {
    many?: boolean | undefined;
    ref: string;
    ui?: {
        hideCreate?: boolean | undefined;
    } | undefined;
} & OneDbConfig & CardsDisplayConfig) | (CommonFieldConfig<ListTypeInfo> & {
    many?: boolean | undefined;
    ref: string;
    ui?: {
        hideCreate?: boolean | undefined;
    } | undefined;
} & ManyDbConfig & SelectDisplayConfig) | (CommonFieldConfig<ListTypeInfo> & {
    many?: boolean | undefined;
    ref: string;
    ui?: {
        hideCreate?: boolean | undefined;
    } | undefined;
} & ManyDbConfig & CardsDisplayConfig) | (CommonFieldConfig<ListTypeInfo> & {
    many?: boolean | undefined;
    ref: string;
    ui?: {
        hideCreate?: boolean | undefined;
    } | undefined;
} & ManyDbConfig & CountDisplayConfig)) => FieldTypeFunc<ListTypeInfo>;
export {};
//# sourceMappingURL=index.d.ts.map