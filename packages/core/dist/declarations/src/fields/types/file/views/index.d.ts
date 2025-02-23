/** @jsxRuntime classic */
/** @jsx jsx */
import { CardValueComponent, CellComponent, FieldController, FieldControllerConfig } from '../../../../types';
export { Field } from './Field';
export declare const Cell: CellComponent;
export declare const CardValue: CardValueComponent;
type FileData = {
    src: string;
    filesize: number;
    filename: string;
};
export type FileValue = {
    kind: 'empty';
} | {
    kind: 'from-server';
    data: FileData;
} | {
    kind: 'upload';
    data: {
        file: File;
        validity: ValidityState;
    };
    previous: FileValue;
} | {
    kind: 'remove';
    previous?: Exclude<FileValue, {
        kind: 'remove';
    }>;
};
type FileController = FieldController<FileValue>;
export declare const controller: (config: FieldControllerConfig) => FileController;
//# sourceMappingURL=index.d.ts.map