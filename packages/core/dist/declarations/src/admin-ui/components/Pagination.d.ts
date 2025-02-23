import { jsx } from '@keystone-ui/core';
interface PaginationProps {
    pageSize: number;
    total: number;
    currentPage: number;
    list: Record<string, any>;
}
export declare function Pagination({ currentPage, total, pageSize, list }: PaginationProps): jsx.JSX.Element | null;
export declare function PaginationLabel({ currentPage, pageSize, plural, singular, total, }: {
    currentPage: number;
    pageSize: number;
    plural: string;
    singular: string;
    total: number;
}): jsx.JSX.Element;
export {};
//# sourceMappingURL=Pagination.d.ts.map