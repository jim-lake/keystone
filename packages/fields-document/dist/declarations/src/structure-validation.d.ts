import * as t from 'io-ts';
import { RelationshipData } from './DocumentEditor/component-blocks/api';
import { Mark } from './DocumentEditor/utils';
export type TextWithMarks = {
    type?: never;
    text: string;
} & {
    [Key in Mark | 'insertMenu']: true | undefined;
};
type Inline = TextWithMarks | Link | Relationship;
type Link = {
    type: 'link';
    href: string;
    children: Children;
};
type Relationship = {
    type: 'relationship';
    relationship: string;
    data: RelationshipData | null;
    children: Children;
};
type Children = (Block | Inline)[];
type Layout = {
    type: 'layout';
    layout: number[];
    children: Children;
};
type OnlyChildrenElements = {
    type: 'blockquote' | 'layout-area' | 'code' | 'divider' | 'list-item' | 'list-item-content' | 'ordered-list' | 'unordered-list';
    children: Children;
};
type Heading = {
    type: 'heading';
    level: 1 | 2 | 3 | 4 | 5 | 6;
    textAlign: 'center' | 'end' | undefined;
    children: Children;
};
type Paragraph = {
    type: 'paragraph';
    textAlign: 'center' | 'end' | undefined;
    children: Children;
};
type ComponentBlock = {
    type: 'component-block';
    component: string;
    props: Record<string, any>;
    children: Children;
};
type ComponentProp = {
    type: 'component-inline-prop' | 'component-block-prop';
    propPath: (string | number)[] | undefined;
    children: Children;
};
type Block = Layout | OnlyChildrenElements | Heading | ComponentBlock | ComponentProp | Paragraph;
export type ElementFromValidation = Block | Inline;
export declare const editorCodec: t.ArrayC<t.Type<Block, Block, unknown>>;
export declare function isRelationshipData(val: unknown): val is RelationshipData;
export declare function validateDocumentStructure(val: unknown): asserts val is ElementFromValidation[];
export {};
//# sourceMappingURL=structure-validation.d.ts.map