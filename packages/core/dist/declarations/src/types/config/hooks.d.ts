import type { KeystoneContextFromListTypeInfo, MaybePromise } from '..';
import type { BaseListTypeInfo } from '../type-info';
type CommonArgs<ListTypeInfo extends BaseListTypeInfo> = {
    context: KeystoneContextFromListTypeInfo<ListTypeInfo>;
    /**
     * The key of the list that the operation is occurring on
     */
    listKey: string;
};
type ResolveInputListHook<ListTypeInfo extends BaseListTypeInfo, Operation extends 'create' | 'update'> = (args: {
    create: {
        operation: 'create';
        item: undefined;
        /**
         * The GraphQL input **before** default values are applied
         */
        inputData: ListTypeInfo['inputs']['create'];
        /**
         * The GraphQL input **after** being resolved by the field type's input resolver
         */
        resolvedData: ListTypeInfo['prisma']['create'];
    };
    update: {
        operation: 'update';
        item: ListTypeInfo['item'];
        /**
         * The GraphQL input **before** default values are applied
         */
        inputData: ListTypeInfo['inputs']['update'];
        /**
         * The GraphQL input **after** being resolved by the field type's input resolver
         */
        resolvedData: ListTypeInfo['prisma']['update'];
    };
}[Operation] & CommonArgs<ListTypeInfo>) => MaybePromise<ListTypeInfo['prisma'][Operation]>;
export type ListHooks<ListTypeInfo extends BaseListTypeInfo> = {
    /**
     * Used to **modify the input** for create and update operations after default values and access control have been applied
     */
    resolveInput?: ResolveInputListHook<ListTypeInfo, 'create' | 'update'> | {
        create?: ResolveInputListHook<ListTypeInfo, 'create'>;
        update?: ResolveInputListHook<ListTypeInfo, 'update'>;
    };
    /**
     * Used to **validate the input** for create and update operations once all resolveInput hooks resolved
     */
    validateInput?: ValidateInputHook<ListTypeInfo>;
    /**
     * Used to **validate** that a delete operation can happen after access control has occurred
     */
    validateDelete?: ValidateDeleteHook<ListTypeInfo>;
    /**
     * Used to **cause side effects** before a create, update, or delete operation once all validateInput hooks have resolved
     */
    beforeOperation?: BeforeOperationHook<ListTypeInfo>;
    /**
     * Used to **cause side effects** after a create, update, or delete operation operation has occurred
     */
    afterOperation?: AfterOperationHook<ListTypeInfo>;
};
export type ResolvedListHooks<ListTypeInfo extends BaseListTypeInfo> = {
    /**
     * Used to **modify the input** for create and update operations after default values and access control have been applied
     */
    resolveInput: {
        create: ResolveInputListHook<ListTypeInfo, 'create'>;
        update: ResolveInputListHook<ListTypeInfo, 'update'>;
    };
    /**
     * Used to **validate the input** for create and update operations once all resolveInput hooks resolved
     */
    validateInput?: ValidateInputHook<ListTypeInfo>;
    /**
     * Used to **validate** that a delete operation can happen after access control has occurred
     */
    validateDelete?: ValidateDeleteHook<ListTypeInfo>;
    /**
     * Used to **cause side effects** before a create, update, or delete operation once all validateInput hooks have resolved
     */
    beforeOperation?: BeforeOperationHook<ListTypeInfo>;
    /**
     * Used to **cause side effects** after a create, update, or delete operation operation has occurred
     */
    afterOperation?: AfterOperationHook<ListTypeInfo>;
};
export type FieldHooks<ListTypeInfo extends BaseListTypeInfo, FieldKey extends ListTypeInfo['fields'] = ListTypeInfo['fields']> = {
    /**
     * Used to **modify the input** for create and update operations after default values and access control have been applied
     */
    resolveInput?: ResolveInputFieldHook<ListTypeInfo, FieldKey>;
    /**
     * Used to **validate the input** for create and update operations once all resolveInput hooks resolved
     */
    validateInput?: ValidateInputFieldHook<ListTypeInfo, FieldKey>;
    /**
     * Used to **validate** that a delete operation can happen after access control has occurred
     */
    validateDelete?: ValidateDeleteFieldHook<ListTypeInfo, FieldKey>;
    /**
     * Used to **cause side effects** before a create, update, or delete operation once all validateInput hooks have resolved
     */
    beforeOperation?: BeforeOperationFieldHook<ListTypeInfo, FieldKey>;
    /**
     * Used to **cause side effects** after a create, update, or delete operation operation has occurred
     */
    afterOperation?: AfterOperationFieldHook<ListTypeInfo, FieldKey>;
};
export type ResolvedFieldHooks<ListTypeInfo extends BaseListTypeInfo> = FieldHooks<ListTypeInfo, ListTypeInfo['fields']>;
type ArgsForCreateOrUpdateOperation<ListTypeInfo extends BaseListTypeInfo> = {
    operation: 'create';
    item?: ListTypeInfo['item'];
    /**
     * The GraphQL input **before** default values are applied
     */
    inputData: ListTypeInfo['inputs']['create'];
    /**
     * The GraphQL input **after** being resolved by the field type's input resolver
     */
    resolvedData: ListTypeInfo['prisma']['create'];
} | {
    operation: 'update';
    item: ListTypeInfo['item'];
    /**
     * The GraphQL input **before** default values are applied
     */
    inputData: ListTypeInfo['inputs']['update'];
    /**
     * The GraphQL input **after** being resolved by the field type's input resolver
     */
    resolvedData: ListTypeInfo['prisma']['update'];
};
type ResolveInputFieldHook<ListTypeInfo extends BaseListTypeInfo, FieldKey extends ListTypeInfo['fields']> = (args: ArgsForCreateOrUpdateOperation<ListTypeInfo> & CommonArgs<ListTypeInfo> & {
    fieldKey: FieldKey;
}) => MaybePromise<ListTypeInfo['prisma']['create' | 'update'][FieldKey] | undefined>;
type ValidateInputHook<ListTypeInfo extends BaseListTypeInfo> = (args: ArgsForCreateOrUpdateOperation<ListTypeInfo> & {
    addValidationError: (error: string) => void;
} & CommonArgs<ListTypeInfo>) => Promise<void> | void;
type ValidateInputFieldHook<ListTypeInfo extends BaseListTypeInfo, FieldKey extends ListTypeInfo['fields']> = (args: ArgsForCreateOrUpdateOperation<ListTypeInfo> & {
    addValidationError: (error: string) => void;
} & CommonArgs<ListTypeInfo> & {
    fieldKey: FieldKey;
}) => Promise<void> | void;
type ValidateDeleteHook<ListTypeInfo extends BaseListTypeInfo> = (args: {
    operation: 'delete';
    item: ListTypeInfo['item'];
    addValidationError: (error: string) => void;
} & CommonArgs<ListTypeInfo>) => Promise<void> | void;
type ValidateDeleteFieldHook<ListTypeInfo extends BaseListTypeInfo, FieldKey extends ListTypeInfo['fields']> = (args: {
    operation: 'delete';
    item: ListTypeInfo['item'];
    addValidationError: (error: string) => void;
} & CommonArgs<ListTypeInfo> & {
    fieldKey: FieldKey;
}) => Promise<void> | void;
type BeforeOperationHook<ListTypeInfo extends BaseListTypeInfo> = (args: (ArgsForCreateOrUpdateOperation<ListTypeInfo> | {
    operation: 'delete';
    item: ListTypeInfo['item'];
    inputData: undefined;
    resolvedData: undefined;
}) & CommonArgs<ListTypeInfo>) => Promise<void> | void;
type BeforeOperationFieldHook<ListTypeInfo extends BaseListTypeInfo, FieldKey extends ListTypeInfo['fields']> = (args: (ArgsForCreateOrUpdateOperation<ListTypeInfo> | {
    operation: 'delete';
    item: ListTypeInfo['item'];
    inputData: undefined;
    resolvedData: undefined;
}) & CommonArgs<ListTypeInfo> & {
    fieldKey: FieldKey;
}) => Promise<void> | void;
type AfterOperationHook<ListTypeInfo extends BaseListTypeInfo> = (args: ({
    operation: 'create';
    originalItem: undefined;
    item?: ListTypeInfo['item'];
    /**
     * The GraphQL input **before** default values are applied
     */
    inputData: ListTypeInfo['inputs']['create'];
    /**
     * The GraphQL input **after** being resolved by the field type's input resolver
     */
    resolvedData: ListTypeInfo['prisma']['create'];
} | {
    operation: 'update';
    item: ListTypeInfo['item'];
    originalItem: ListTypeInfo['item'];
    /**
     * The GraphQL input **before** default values are applied
     */
    inputData: ListTypeInfo['inputs']['update'];
    /**
     * The GraphQL input **after** being resolved by the field type's input resolver
     */
    resolvedData: ListTypeInfo['prisma']['update'];
} | {
    operation: 'delete';
    item: undefined;
    originalItem: ListTypeInfo['item'];
    inputData: undefined;
    resolvedData: undefined;
}) & CommonArgs<ListTypeInfo>) => Promise<void> | void;
type AfterOperationFieldHook<ListTypeInfo extends BaseListTypeInfo, FieldKey extends ListTypeInfo['fields']> = (args: ({
    operation: 'create';
    originalItem: undefined;
    item?: ListTypeInfo['item'];
    /**
     * The GraphQL input **before** default values are applied
     */
    inputData: ListTypeInfo['inputs']['create'];
    /**
     * The GraphQL input **after** being resolved by the field type's input resolver
     */
    resolvedData: ListTypeInfo['prisma']['create'];
} | {
    operation: 'update';
    item: ListTypeInfo['item'];
    originalItem: ListTypeInfo['item'];
    /**
     * The GraphQL input **before** default values are applied
     */
    inputData: ListTypeInfo['inputs']['update'];
    /**
     * The GraphQL input **after** being resolved by the field type's input resolver
     */
    resolvedData: ListTypeInfo['prisma']['update'];
} | {
    operation: 'delete';
    item: undefined;
    originalItem: ListTypeInfo['item'];
    inputData: undefined;
    resolvedData: undefined;
}) & CommonArgs<ListTypeInfo> & {
    fieldKey: FieldKey;
}) => Promise<void> | void;
export {};
//# sourceMappingURL=hooks.d.ts.map