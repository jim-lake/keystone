/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';
import { Decimal } from 'decimal.js';
import { CardValueComponent, CellComponent, FieldController, FieldControllerConfig, FieldProps } from '../../../../types';
export declare const Field: ({ field, value, onChange, autoFocus, forceValidation, }: FieldProps<typeof controller>) => jsx.JSX.Element;
export declare const Cell: CellComponent;
export declare const CardValue: CardValueComponent;
export type DecimalFieldMeta = {
    precision: number;
    scale: number;
    defaultValue: string | null;
    validation: {
        isRequired: boolean;
        max: string | null;
        min: string | null;
    };
};
type Config = FieldControllerConfig<DecimalFieldMeta>;
type Validation = {
    isRequired: boolean;
    max: Decimal | null;
    min: Decimal | null;
};
type InnerValue = string | Decimal | null;
type Value = {
    kind: 'create';
    value: InnerValue;
} | {
    kind: 'update';
    initial: InnerValue;
    value: InnerValue;
};
export declare const controller: (config: Config) => FieldController<Value, string> & {
    scale: number;
    validation: Validation;
};
export {};
//# sourceMappingURL=index.d.ts.map