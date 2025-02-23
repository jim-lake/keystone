import { GraphQLSchema } from 'graphql';
import { KeystoneContext } from '../../types';
export declare function executeGraphQLFieldWithSelection(schema: GraphQLSchema, operation: 'query' | 'mutation', fieldName: string): (args: Record<string, any>, query: string, context: KeystoneContext) => Promise<unknown>;
//# sourceMappingURL=executeGraphQLFieldWithSelection.d.ts.map