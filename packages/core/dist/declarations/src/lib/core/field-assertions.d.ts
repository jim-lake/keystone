import { InitialisedField } from './types-for-lists';
export type ListForValidation = {
    listKey: string;
    fields: Record<string, InitialisedField>;
};
export declare function assertFieldsValid(list: ListForValidation): void;
//# sourceMappingURL=field-assertions.d.ts.map