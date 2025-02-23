/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';
import { CardValueComponent, CellComponent, FieldController, FieldControllerConfig, FieldProps } from '../../../../types';
export declare const Field: ({ field, autoFocus, value, onChange, forceValidation, }: FieldProps<typeof controller>) => jsx.JSX.Element;
export declare const Cell: CellComponent<typeof controller>;
export declare const CardValue: CardValueComponent<typeof controller>;
type SingleRelationshipValue = {
    kind: 'one';
    id: null | string;
    initialValue: {
        label: string;
        id: string;
    } | null;
    value: {
        label: string;
        id: string;
    } | null;
};
type ManyRelationshipValue = {
    kind: 'many';
    id: null | string;
    initialValue: {
        label: string;
        id: string;
    }[];
    value: {
        label: string;
        id: string;
    }[];
};
type CardsRelationshipValue = {
    kind: 'cards-view';
    id: null | string;
    itemsBeingEdited: ReadonlySet<string>;
    itemBeingCreated: boolean;
    initialIds: ReadonlySet<string>;
    currentIds: ReadonlySet<string>;
    displayOptions: CardsDisplayModeOptions;
};
type CountRelationshipValue = {
    kind: 'count';
    id: null | string;
    count: number;
};
type CardsDisplayModeOptions = {
    cardFields: readonly string[];
    linkToItem: boolean;
    removeMode: 'disconnect' | 'none';
    inlineCreate: {
        fields: readonly string[];
    } | null;
    inlineEdit: {
        fields: readonly string[];
    } | null;
    inlineConnect: boolean;
};
type RelationshipController = FieldController<ManyRelationshipValue | SingleRelationshipValue | CardsRelationshipValue | CountRelationshipValue, string> & {
    display: 'count' | 'cards-or-select';
    listKey: string;
    refListKey: string;
    refFieldKey?: string;
    refLabelField: string;
    refSearchFields: string[];
    hideCreate: boolean;
    many: boolean;
};
export declare const controller: (config: FieldControllerConfig<{
    refFieldKey?: string;
    refListKey: string;
    many: boolean;
    hideCreate: boolean;
    refLabelField: string;
    refSearchFields: string[];
} & ({
    displayMode: 'select';
} | {
    displayMode: 'cards';
    cardFields: readonly string[];
    linkToItem: boolean;
    removeMode: 'disconnect' | 'none';
    inlineCreate: {
        fields: readonly string[];
    } | null;
    inlineEdit: {
        fields: readonly string[];
    } | null;
    inlineConnect: boolean;
} | {
    displayMode: 'count';
})>) => RelationshipController;
export {};
//# sourceMappingURL=index.d.ts.map