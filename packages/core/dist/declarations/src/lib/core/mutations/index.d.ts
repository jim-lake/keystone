import { graphql } from '../../..';
import { InitialisedList } from '../types-for-lists';
export declare function getMutationsForList(list: InitialisedList): {
    mutations: {
        [x: string]: import("@graphql-ts/schema").Field<unknown, {
            data: graphql.Arg<graphql.NonNullType<{
                kind: "input";
                __fields: Record<string, graphql.Arg<graphql.InputType>>;
                __context: (context: unknown) => void;
                graphQLType: import("graphql").GraphQLInputObjectType;
            }>, false>;
        }, graphql.ObjectType<import("../../../types").BaseItem, import("../../../types").KeystoneContext>, string, import("../../../types").KeystoneContext<any>> | import("@graphql-ts/schema").Field<unknown, {
            data: graphql.Arg<graphql.NonNullType<graphql.ListType<graphql.NonNullType<{
                kind: "input";
                __fields: Record<string, graphql.Arg<graphql.InputType>>;
                __context: (context: unknown) => void;
                graphQLType: import("graphql").GraphQLInputObjectType;
            }>>>, false>;
        }, graphql.ListType<graphql.ObjectType<import("../../../types").BaseItem, import("../../../types").KeystoneContext>>, string, import("../../../types").KeystoneContext<any>> | import("@graphql-ts/schema").Field<unknown, {
            where: graphql.Arg<graphql.NonNullType<graphql.InputObjectType<{
                [key: string]: graphql.Arg<graphql.NullableInputType>;
                id: graphql.Arg<graphql.ScalarType<string>>;
            }>>, boolean>;
            data: graphql.Arg<graphql.NonNullType<{
                kind: "input";
                __fields: Record<string, graphql.Arg<graphql.InputType>>;
                __context: (context: unknown) => void;
                graphQLType: import("graphql").GraphQLInputObjectType;
            }>, false>;
        }, graphql.ObjectType<import("../../../types").BaseItem, import("../../../types").KeystoneContext>, string, import("../../../types").KeystoneContext<any>> | import("@graphql-ts/schema").Field<unknown, {
            data: graphql.Arg<graphql.NonNullType<graphql.ListType<graphql.NonNullType<graphql.InputObjectType<{
                where: graphql.Arg<graphql.NonNullType<graphql.InputObjectType<{
                    [key: string]: graphql.Arg<graphql.NullableInputType>;
                    id: graphql.Arg<graphql.ScalarType<string>>;
                }>>, boolean>;
                data: graphql.Arg<graphql.NonNullType<{
                    kind: "input";
                    __fields: Record<string, graphql.Arg<graphql.InputType>>;
                    __context: (context: unknown) => void;
                    graphQLType: import("graphql").GraphQLInputObjectType;
                }>, false>;
            }>>>>, false>;
        }, graphql.ListType<graphql.ObjectType<import("../../../types").BaseItem, import("../../../types").KeystoneContext>>, string, import("../../../types").KeystoneContext<any>> | import("@graphql-ts/schema").Field<unknown, {
            where: graphql.Arg<graphql.NonNullType<graphql.InputObjectType<{
                [key: string]: graphql.Arg<graphql.NullableInputType>;
                id: graphql.Arg<graphql.ScalarType<string>>;
            }>>, boolean>;
        }, graphql.ObjectType<import("../../../types").BaseItem, import("../../../types").KeystoneContext>, string, import("../../../types").KeystoneContext<any>> | import("@graphql-ts/schema").Field<unknown, {
            where: graphql.Arg<graphql.NonNullType<graphql.ListType<graphql.NonNullType<graphql.InputObjectType<{
                [key: string]: graphql.Arg<graphql.NullableInputType>;
                id: graphql.Arg<graphql.ScalarType<string>>;
            }>>>>, false>;
        }, graphql.ListType<graphql.ObjectType<import("../../../types").BaseItem, import("../../../types").KeystoneContext>>, string, import("../../../types").KeystoneContext<any>>;
    };
    updateManyInput: graphql.InputObjectType<{
        where: graphql.Arg<graphql.NonNullType<graphql.InputObjectType<{
            [key: string]: graphql.Arg<graphql.NullableInputType>;
            id: graphql.Arg<graphql.ScalarType<string>>;
        }>>, boolean>;
        data: graphql.Arg<graphql.NonNullType<{
            kind: "input";
            __fields: Record<string, graphql.Arg<graphql.InputType>>;
            __context: (context: unknown) => void;
            graphQLType: import("graphql").GraphQLInputObjectType;
        }>, false>;
    }>;
};
//# sourceMappingURL=index.d.ts.map