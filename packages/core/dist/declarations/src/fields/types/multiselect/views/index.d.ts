import { jsx } from '@keystone-ui/core';
import { CardValueComponent, CellComponent, FieldController, FieldControllerConfig, FieldProps } from '../../../../types';
export declare const Field: ({ field, value, onChange, autoFocus }: FieldProps<typeof controller>) => jsx.JSX.Element;
export declare const Cell: CellComponent<typeof controller>;
export declare const CardValue: CardValueComponent<typeof controller>;
export type AdminMultiSelectFieldMeta = {
    options: readonly {
        label: string;
        value: string | number;
    }[];
    type: 'string' | 'integer' | 'enum';
    defaultValue: string[] | number[];
};
type Config = FieldControllerConfig<AdminMultiSelectFieldMeta>;
type Option = {
    label: string;
    value: string;
};
type Value = readonly Option[];
export declare const controller: (config: Config) => FieldController<Value, Option[]> & {
    options: Option[];
    type: 'string' | 'integer' | 'enum';
    valuesToOptionsWithStringValues: Record<string, Option>;
};
export {};
//# sourceMappingURL=index.d.ts.map