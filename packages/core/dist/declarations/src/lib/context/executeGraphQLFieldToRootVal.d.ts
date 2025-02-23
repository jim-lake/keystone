import { GraphQLField, VariableDefinitionNode, TypeNode, GraphQLType, ArgumentNode } from 'graphql';
import { KeystoneContext } from '../../types';
export declare function getTypeNodeForType(type: GraphQLType): TypeNode;
export declare function getVariablesForGraphQLField(field: GraphQLField<any, any>): {
    variableDefinitions: VariableDefinitionNode[];
    argumentNodes: ArgumentNode[];
};
export declare function executeGraphQLFieldToRootVal(field: GraphQLField<any, any>): (args: Record<string, any>, context: KeystoneContext, rootValue?: Record<string, string>) => Promise<any>;
//# sourceMappingURL=executeGraphQLFieldToRootVal.d.ts.map