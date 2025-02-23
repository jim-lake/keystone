/** @jsxRuntime classic */
/** @jsx jsx */
import { CardValueComponent, CellComponent, FieldController, FieldControllerConfig } from '../../../../types';
export { Field } from './Field';
export declare const Cell: CellComponent;
export declare const CardValue: CardValueComponent;
type ImageData = {
    src: string;
    height: number;
    width: number;
    filesize: number;
    extension: string;
    id: string;
};
export type ImageValue = {
    kind: 'empty';
} | {
    kind: 'from-server';
    data: ImageData;
} | {
    kind: 'upload';
    data: {
        file: File;
        validity: ValidityState;
    };
    previous: ImageValue;
} | {
    kind: 'remove';
    previous?: Exclude<ImageValue, {
        kind: 'remove';
    }>;
};
type ImageController = FieldController<ImageValue>;
export declare const controller: (config: FieldControllerConfig) => ImageController;
//# sourceMappingURL=index.d.ts.map