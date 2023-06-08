import { ReactNode } from 'react';
export type ModalState = {
    drawerStack: string[];
    pushToDrawerStack: (drawerKey: string) => void;
    popFromDrawerStack: () => void;
};
export declare const DrawerProvider: ({ children }: {
    children: ReactNode;
}) => JSX.Element;
export declare const useDrawerManager: (uniqueKey: string) => number;
//# sourceMappingURL=drawer-context.d.ts.map