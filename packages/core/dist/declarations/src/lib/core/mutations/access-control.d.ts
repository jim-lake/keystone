import { BaseItem, KeystoneContext } from '../../../types';
import { InitialisedList } from '../types-for-lists';
import { InputFilter, UniqueInputFilter, UniquePrismaFilter } from '../where-inputs';
export declare function checkUniqueItemExists(uniqueInput: UniqueInputFilter, foreignList: InitialisedList, context: KeystoneContext, operation: string): Promise<UniquePrismaFilter>;
export declare function applyAccessControlForCreate(list: InitialisedList, context: KeystoneContext, inputData: Record<string, unknown>): Promise<void>;
export declare function getAccessControlledItemForUpdate(list: InitialisedList, context: KeystoneContext, uniqueWhere: UniquePrismaFilter, accessFilters: boolean | InputFilter, inputData: Record<string, any>): Promise<BaseItem>;
export declare function getAccessControlledItemForDelete(list: InitialisedList, context: KeystoneContext, uniqueWhere: UniquePrismaFilter, accessFilters: boolean | InputFilter): Promise<BaseItem>;
//# sourceMappingURL=access-control.d.ts.map