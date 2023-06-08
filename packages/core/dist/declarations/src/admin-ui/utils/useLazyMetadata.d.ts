import type { AuthenticatedItem, VisibleLists, CreateViewFieldModes } from '../../types';
import { DocumentNode } from '../apollo';
export type { AuthenticatedItem, VisibleLists, CreateViewFieldModes };
export declare function useLazyMetadata(query: DocumentNode): {
    authenticatedItem: AuthenticatedItem;
    refetch: () => Promise<void>;
    visibleLists: VisibleLists;
    createViewFieldModes: CreateViewFieldModes;
};
//# sourceMappingURL=useLazyMetadata.d.ts.map