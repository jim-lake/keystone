/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';
import { ListMeta } from '../../../../../types';
import { ItemData, DataGetter } from '../../../../../admin-ui/utils';
export declare function InlineEdit({ fields, list, selectedFields, itemGetter, onCancel, onSave, }: {
    fields: readonly string[];
    list: ListMeta;
    selectedFields: string;
    itemGetter: DataGetter<ItemData>;
    onCancel: () => void;
    onSave: (newItemGetter: DataGetter<ItemData>) => void;
}): jsx.JSX.Element;
//# sourceMappingURL=InlineEdit.d.ts.map