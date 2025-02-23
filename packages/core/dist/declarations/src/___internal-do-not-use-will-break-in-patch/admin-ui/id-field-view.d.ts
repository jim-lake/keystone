/** @jsxRuntime classic */
/** @jsx jsx */
import { CardValueComponent, CellComponent, FieldController, FieldControllerConfig, IdFieldConfig } from '../../types';
export declare const Field: () => null;
export declare const Cell: CellComponent;
export declare const CardValue: CardValueComponent;
export declare const controller: (config: FieldControllerConfig<IdFieldConfig>) => FieldController<void, string> & {
    idFieldKind: IdFieldConfig['kind'];
};
//# sourceMappingURL=id-field-view.d.ts.map