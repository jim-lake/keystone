/// <reference types="react" />
import { GraphQLError } from 'graphql';
type GraphQLErrorNoticeProps = {
    networkError: Error | null | undefined;
    errors: readonly GraphQLError[] | undefined;
};
export declare function GraphQLErrorNotice({ errors, networkError }: GraphQLErrorNoticeProps): JSX.Element | null;
export {};
//# sourceMappingURL=GraphQLErrorNotice.d.ts.map