/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';
import { CardValueComponent, CellComponent, FieldController, FieldControllerConfig, FieldProps } from '../../../../types';
export declare const Field: ({ field, value, onChange, autoFocus, forceValidation, }: FieldProps<typeof controller>) => jsx.JSX.Element;
export declare const Cell: CellComponent;
export declare const CardValue: CardValueComponent;
type Validation = {
    isRequired: boolean;
    min: number;
    max: number;
};
type Value = {
    kind: 'update';
    initial: number | null;
    value: string | number | null;
} | {
    kind: 'create';
    value: string | number | null;
};
export declare const controller: (config: FieldControllerConfig<{
    validation: Validation;
    defaultValue: number | null | 'autoincrement';
}>) => FieldController<Value, string> & {
    validation: Validation;
    hasAutoIncrementDefault: boolean;
};
export {};
//# sourceMappingURL=index.d.ts.map