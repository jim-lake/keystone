import { jsx } from '@keystone-ui/core';
import { Options } from '@keystone-ui/options';
import { ListMeta } from '../../../../types';
export declare const fieldSelectionOptionsComponents: Parameters<typeof Options>[0]['components'];
export declare function FieldSelection({ list, fieldModesByFieldPath, }: {
    list: ListMeta;
    fieldModesByFieldPath: Record<string, 'hidden' | 'read'>;
}): jsx.JSX.Element;
//# sourceMappingURL=FieldSelection.d.ts.map