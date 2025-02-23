/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';
import { ListMeta } from '../../../../../types';
import { ItemData, DataGetter } from '../../../../../admin-ui/utils';
export declare function InlineCreate({ list, onCancel, onCreate, fields: fieldPaths, selectedFields, }: {
    list: ListMeta;
    selectedFields: string;
    fields: readonly string[];
    onCancel: () => void;
    onCreate: (itemGetter: DataGetter<ItemData>) => void;
}): jsx.JSX.Element;
//# sourceMappingURL=InlineCreate.d.ts.map