import React, { ReactNode } from 'react';
import { TransitionState } from './types';
type DrawerControllerProps = {
    isOpen: boolean;
    children: ReactNode;
};
export declare const DrawerControllerContextProvider: React.Provider<TransitionState | null>;
export declare const useDrawerControllerContext: () => TransitionState;
export declare const DrawerController: ({ isOpen, children }: DrawerControllerProps) => JSX.Element;
export {};
//# sourceMappingURL=DrawerController.d.ts.map