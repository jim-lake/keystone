import { graphql } from '../../../types/schema';
type StringNullableFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.String>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.String>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.String>>>;
    lt: graphql.Arg<typeof graphql.String>;
    lte: graphql.Arg<typeof graphql.String>;
    gt: graphql.Arg<typeof graphql.String>;
    gte: graphql.Arg<typeof graphql.String>;
    contains: graphql.Arg<typeof graphql.String>;
    startsWith: graphql.Arg<typeof graphql.String>;
    endsWith: graphql.Arg<typeof graphql.String>;
    not: graphql.Arg<StringNullableFilterType>;
}>;
type StringFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.String>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.String>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.String>>>;
    lt: graphql.Arg<typeof graphql.String>;
    lte: graphql.Arg<typeof graphql.String>;
    gt: graphql.Arg<typeof graphql.String>;
    gte: graphql.Arg<typeof graphql.String>;
    contains: graphql.Arg<typeof graphql.String>;
    startsWith: graphql.Arg<typeof graphql.String>;
    endsWith: graphql.Arg<typeof graphql.String>;
    not: graphql.Arg<NestedStringFilterType>;
}>;
type NestedStringFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.String>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.String>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.String>>>;
    lt: graphql.Arg<typeof graphql.String>;
    lte: graphql.Arg<typeof graphql.String>;
    gt: graphql.Arg<typeof graphql.String>;
    gte: graphql.Arg<typeof graphql.String>;
    contains: graphql.Arg<typeof graphql.String>;
    startsWith: graphql.Arg<typeof graphql.String>;
    endsWith: graphql.Arg<typeof graphql.String>;
    not: graphql.Arg<NestedStringFilterType>;
}>;
type BooleanNullableFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.Boolean>;
    not: graphql.Arg<BooleanNullableFilterType>;
}>;
type BooleanFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.Boolean>;
    not: graphql.Arg<BooleanFilterType>;
}>;
type IntFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.Int>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Int>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Int>>>;
    lt: graphql.Arg<typeof graphql.Int>;
    lte: graphql.Arg<typeof graphql.Int>;
    gt: graphql.Arg<typeof graphql.Int>;
    gte: graphql.Arg<typeof graphql.Int>;
    not: graphql.Arg<IntFilterType>;
}>;
type IntNullableFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.Int>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Int>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Int>>>;
    lt: graphql.Arg<typeof graphql.Int>;
    lte: graphql.Arg<typeof graphql.Int>;
    gt: graphql.Arg<typeof graphql.Int>;
    gte: graphql.Arg<typeof graphql.Int>;
    not: graphql.Arg<IntNullableFilterType>;
}>;
type FloatNullableFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.Float>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Float>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Float>>>;
    lt: graphql.Arg<typeof graphql.Float>;
    lte: graphql.Arg<typeof graphql.Float>;
    gt: graphql.Arg<typeof graphql.Float>;
    gte: graphql.Arg<typeof graphql.Float>;
    not: graphql.Arg<FloatNullableFilterType>;
}>;
type FloatFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.Float>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Float>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Float>>>;
    lt: graphql.Arg<typeof graphql.Float>;
    lte: graphql.Arg<typeof graphql.Float>;
    gt: graphql.Arg<typeof graphql.Float>;
    gte: graphql.Arg<typeof graphql.Float>;
    not: graphql.Arg<FloatFilterType>;
}>;
type DateTimeNullableFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.DateTime>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.DateTime>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.DateTime>>>;
    lt: graphql.Arg<typeof graphql.DateTime>;
    lte: graphql.Arg<typeof graphql.DateTime>;
    gt: graphql.Arg<typeof graphql.DateTime>;
    gte: graphql.Arg<typeof graphql.DateTime>;
    not: graphql.Arg<DateTimeNullableFilterType>;
}>;
type DateTimeFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.DateTime>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.DateTime>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.DateTime>>>;
    lt: graphql.Arg<typeof graphql.DateTime>;
    lte: graphql.Arg<typeof graphql.DateTime>;
    gt: graphql.Arg<typeof graphql.DateTime>;
    gte: graphql.Arg<typeof graphql.DateTime>;
    not: graphql.Arg<DateTimeFilterType>;
}>;
type DecimalNullableFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.Decimal>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Decimal>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Decimal>>>;
    lt: graphql.Arg<typeof graphql.Decimal>;
    lte: graphql.Arg<typeof graphql.Decimal>;
    gt: graphql.Arg<typeof graphql.Decimal>;
    gte: graphql.Arg<typeof graphql.Decimal>;
    not: graphql.Arg<DecimalNullableFilterType>;
}>;
type DecimalFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.Decimal>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Decimal>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Decimal>>>;
    lt: graphql.Arg<typeof graphql.Decimal>;
    lte: graphql.Arg<typeof graphql.Decimal>;
    gt: graphql.Arg<typeof graphql.Decimal>;
    gte: graphql.Arg<typeof graphql.Decimal>;
    not: graphql.Arg<DecimalFilterType>;
}>;
type BigIntNullableFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.BigInt>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.BigInt>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.BigInt>>>;
    lt: graphql.Arg<typeof graphql.BigInt>;
    lte: graphql.Arg<typeof graphql.BigInt>;
    gt: graphql.Arg<typeof graphql.BigInt>;
    gte: graphql.Arg<typeof graphql.BigInt>;
    not: graphql.Arg<BigIntNullableFilterType>;
}>;
type BigIntFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.BigInt>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.BigInt>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.BigInt>>>;
    lt: graphql.Arg<typeof graphql.BigInt>;
    lte: graphql.Arg<typeof graphql.BigInt>;
    gt: graphql.Arg<typeof graphql.BigInt>;
    gte: graphql.Arg<typeof graphql.BigInt>;
    not: graphql.Arg<BigIntFilterType>;
}>;
export declare const String: {
    optional: StringNullableFilterType;
    required: StringFilterType;
};
export declare const Boolean: {
    optional: BooleanNullableFilterType;
    required: BooleanFilterType;
};
export declare const Int: {
    optional: IntNullableFilterType;
    required: IntFilterType;
};
export declare const Float: {
    optional: FloatNullableFilterType;
    required: FloatFilterType;
};
export declare const DateTime: {
    optional: DateTimeNullableFilterType;
    required: DateTimeFilterType;
};
export declare const Decimal: {
    optional: DecimalNullableFilterType;
    required: DecimalFilterType;
};
export declare const BigInt: {
    optional: BigIntNullableFilterType;
    required: BigIntFilterType;
};
export { enumFilters as enum } from '../enum-filter';
//# sourceMappingURL=sqlite.d.ts.map