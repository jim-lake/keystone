/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';
import { CardValueComponent, CellComponent, FieldController, FieldControllerConfig, FieldProps } from '../../../../types';
export declare const Field: ({ field, value, onChange, forceValidation, autoFocus, }: FieldProps<typeof controller>) => jsx.JSX.Element;
export declare const Cell: CellComponent;
export declare const CardValue: CardValueComponent;
type Validation = {
    isRequired: boolean;
    rejectCommon: boolean;
    match: {
        regex: RegExp;
        explanation: string;
    } | null;
    length: {
        min: number;
        max: number | null;
    };
};
export type PasswordFieldMeta = {
    isNullable: boolean;
    validation: {
        isRequired: boolean;
        rejectCommon: boolean;
        match: {
            regex: {
                source: string;
                flags: string;
            };
            explanation: string;
        } | null;
        length: {
            min: number;
            max: number | null;
        };
    };
};
type Value = {
    kind: 'initial';
    isSet: boolean | null;
} | {
    kind: 'editing';
    isSet: boolean | null;
    value: string;
    confirm: string;
};
type PasswordController = FieldController<Value, boolean> & {
    validation: Validation;
};
export declare const controller: (config: FieldControllerConfig<PasswordFieldMeta>) => PasswordController;
export {};
//# sourceMappingURL=index.d.ts.map