import { AdminMeta, FieldViews } from '../../types';
export declare function useAdminMeta(adminMetaHash: string, fieldViews: FieldViews): {
    state: "loading";
    value?: undefined;
    error?: undefined;
    refetch?: undefined;
} | {
    state: "loaded";
    value: AdminMeta;
    error?: undefined;
    refetch?: undefined;
} | {
    state: "error";
    error: import("@apollo/client/errors").ApolloError;
    refetch: () => Promise<void>;
    value?: undefined;
};
//# sourceMappingURL=useAdminMeta.d.ts.map