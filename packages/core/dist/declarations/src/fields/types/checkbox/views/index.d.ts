/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';
import { CardValueComponent, CellComponent, FieldController, FieldControllerConfig, FieldProps } from '../../../../types';
export declare const Field: ({ field, value, onChange, autoFocus }: FieldProps<typeof controller>) => jsx.JSX.Element;
export declare const Cell: CellComponent;
export declare const CardValue: CardValueComponent;
type CheckboxController = FieldController<boolean, boolean>;
export declare const controller: (config: FieldControllerConfig<{
    defaultValue: boolean;
}>) => CheckboxController;
export {};
//# sourceMappingURL=index.d.ts.map