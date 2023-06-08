'use client';
import { Editor, Text } from 'slate';
import { c as createDocumentEditor } from './index-67e4f074.esm.js';
import { a as assertNever } from './utils-fd96e70b.esm.js';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import * as t from 'io-ts';
import excess from 'io-ts-excess';
import { i as isValidURL } from './api-48d8135e.esm.js';
import '@babel/runtime/helpers/extends';
import '@keystone-ui/core';
import 'react';
import 'is-hotkey';
import 'slate-react';
import 'slate-history';
import '@keystone-ui/popover';
import '@keystone-ui/tooltip';
import '@keystone-ui/icons/icons/LinkIcon';
import '@keystone-ui/icons/icons/Trash2Icon';
import '@keystone-ui/icons/icons/ExternalLinkIcon';
import './toolbar-9160784d.esm.js';
import './orderable-ff385078.esm.js';
import '@dnd-kit/core';
import '@dnd-kit/sortable';
import '@dnd-kit/modifiers';
import '@keystone-ui/button';
import './utils-82ff6be8.esm.js';
import './form-from-preview-37959860.esm.js';
import '@keystone-6/core/admin-ui/context';
import '@keystone-6/core/fields/types/relationship/views/RelationshipSelect';
import '@keystone-ui/fields';
import '@keystone-ui/icons/icons/PlusCircleIcon';
import '@keystone-ui/modals';
import '@emotion/weak-memoize';
import '@keystone-ui/icons/icons/ColumnsIcon';
import 'apply-ref';
import '@keystone-ui/icons/icons/BoldIcon';
import '@keystone-ui/icons/icons/ItalicIcon';
import '@keystone-ui/icons/icons/PlusIcon';
import '@keystone-ui/icons/icons/ChevronDownIcon';
import '@keystone-ui/icons/icons/Maximize2Icon';
import '@keystone-ui/icons/icons/Minimize2Icon';
import '@keystone-ui/icons/icons/MoreHorizontalIcon';
import '@keystone-ui/icons/icons/CodeIcon';
import '@keystone-ui/icons/icons/AlignLeftIcon';
import '@keystone-ui/icons/icons/AlignRightIcon';
import '@keystone-ui/icons/icons/AlignCenterIcon';
import '@keystone-ui/icons/icons/MinusIcon';
import 'match-sorter';
import 'scroll-into-view-if-needed';
import 'mdast-util-from-markdown';
import 'mdast-util-gfm-autolink-literal/from-markdown';
import 'micromark-extension-gfm-autolink-literal';
import 'mdast-util-gfm-strikethrough/from-markdown';
import 'micromark-extension-gfm-strikethrough';
import '@keystone-6/core';
import '@braintree/sanitize-url';

// note that this validation isn't about ensuring that a document has nodes in the right positions and things
// it's just about validating that it's a valid slate structure
// we'll then run normalize on it which will enforce more things
const markValue = t.union([t.undefined, t.literal(true)]);
const text = excess(t.type({
  text: t.string,
  bold: markValue,
  italic: markValue,
  underline: markValue,
  strikethrough: markValue,
  code: markValue,
  superscript: markValue,
  subscript: markValue,
  keyboard: markValue,
  insertMenu: markValue
}));
class URLType extends t.Type {
  constructor() {
    super('string', u => typeof u === 'string' && isValidURL(u), (u, c) => this.is(u) ? t.success(u) : t.failure(u, c), t.identity);
    _defineProperty(this, "_tag", 'URLType');
  }
}
const urlType = new URLType();
const link = t.recursion('Link', () => excess(t.type({
  type: t.literal('link'),
  href: urlType,
  children
})));
const relationship = t.recursion('Relationship', () => excess(t.type({
  type: t.literal('relationship'),
  relationship: t.string,
  data: t.union([t.null, relationshipData]),
  children
})));
const inline = t.union([text, link, relationship]);
const layoutArea = t.recursion('Layout', () => excess(t.type({
  type: t.literal('layout'),
  layout: t.array(t.number),
  children
})));
const onlyChildrenElements = t.recursion('OnlyChildrenElements', () => excess(t.type({
  type: t.union([t.literal('blockquote'), t.literal('layout-area'), t.literal('code'), t.literal('divider'), t.literal('list-item'), t.literal('list-item-content'), t.literal('ordered-list'), t.literal('unordered-list')]),
  children
})));
const textAlign = t.union([t.undefined, t.literal('center'), t.literal('end')]);
const heading = t.recursion('Heading', () => excess(t.type({
  type: t.literal('heading'),
  textAlign,
  level: t.union([t.literal(1), t.literal(2), t.literal(3), t.literal(4), t.literal(5), t.literal(6)]),
  children
})));
const paragraph = t.recursion('Paragraph', () => excess(t.type({
  type: t.literal('paragraph'),
  textAlign,
  children
})));
const relationshipData = excess(t.type({
  id: t.string,
  label: t.union([t.undefined, t.string]),
  data: t.union([t.undefined, t.record(t.string, t.any)])
}));
const componentBlock = t.recursion('ComponentBlock', () => excess(t.type({
  type: t.literal('component-block'),
  component: t.string,
  props: t.record(t.string, t.any),
  children
})));
const componentProp = t.recursion('ComponentProp', () => excess(t.type({
  type: t.union([t.literal('component-inline-prop'), t.literal('component-block-prop')]),
  propPath: t.union([t.array(t.union([t.string, t.number])), t.undefined]),
  children
})));
const block = t.recursion('Element', () => t.union([layoutArea, onlyChildrenElements, heading, componentBlock, componentProp, paragraph]));
const children = t.recursion('Children', () => t.array(t.union([block, inline])));
const editorCodec = t.array(block);
function isRelationshipData(val) {
  return relationshipData.validate(val, [])._tag === 'Right';
}
function validateDocumentStructure(val) {
  const result = editorCodec.validate(val, []);
  if (result._tag === 'Left') {
    throw new Error('Invalid document structure');
  }
}

class PropValidationError extends Error {
  constructor(message, path) {
    super(message);
    this.path = path;
  }
}
function validateComponentBlockProps(schema, value, relationships, path) {
  if (schema.kind === 'form') {
    if (schema.validate(value)) {
      return value;
    }
    throw new PropValidationError('Invalid form prop value', path);
  }
  if (schema.kind === 'child') {
    return null;
  }
  if (schema.kind === 'relationship') {
    if (schema.many) {
      if (Array.isArray(value) && value.every(isRelationshipData)) {
        // yes, ts understands this completely correctly, i'm as suprised as you are
        return value.map(x => ({
          id: x.id
        }));
      } else {
        throw new PropValidationError(`Invalid relationship value`, path);
      }
    }
    if (value === null || isRelationshipData(value)) {
      return value === null ? null : {
        id: value.id
      };
    } else {
      throw new PropValidationError(`Invalid relationship value`, path);
    }
  }
  if (schema.kind === 'conditional') {
    if (typeof value !== 'object' || value === null) {
      throw new PropValidationError('Conditional value must be an object', path);
    }
    for (const key of Object.keys(value)) {
      if (key !== 'discriminant' && key !== 'value') {
        throw new PropValidationError(`Conditional value only allows keys named "discriminant" and "value", not "${key}"`, path);
      }
    }
    const discriminant = value.discriminant;
    const val = value.value;
    // for some reason mongo or mongoose or something is saving undefined as null
    // so we're doing this so that we avoid setting undefined on objects
    const obj = {};
    const discriminantVal = validateComponentBlockProps(schema.discriminant, discriminant, relationships, path.concat('discriminant'));
    if (discriminantVal !== undefined) {
      obj.discriminant = discriminantVal;
    }
    const conditionalFieldValue = validateComponentBlockProps(schema.values[discriminant], val, relationships, path.concat('value'));
    if (conditionalFieldValue !== undefined) {
      obj.value = conditionalFieldValue;
    }
    return obj;
  }
  if (schema.kind === 'object') {
    if (typeof value !== 'object' || value === null) {
      throw new PropValidationError('Object value must be an object', path);
    }
    const allowedKeysSet = new Set(Object.keys(schema.fields));
    for (const key of Object.keys(value)) {
      if (!allowedKeysSet.has(key)) {
        throw new PropValidationError(`Key on object value "${key}" is not allowed`, path);
      }
    }
    let val = {};
    for (const key of Object.keys(schema.fields)) {
      const propVal = validateComponentBlockProps(schema.fields[key], value[key], relationships, path.concat(key));
      // for some reason mongo or mongoose or something is saving undefined as null
      // so we're doing this so that we avoid setting undefined on objects
      if (propVal !== undefined) {
        val[key] = propVal;
      }
    }
    return val;
  }
  if (schema.kind === 'array') {
    if (!Array.isArray(value)) {
      throw new PropValidationError('Array field value must be an array', path);
    }
    return value.map((innerVal, i) => {
      return validateComponentBlockProps(schema.element, innerVal, relationships, path.concat(i));
    });
  }
  assertNever(schema);
}
function isText(node) {
  return Text.isText(node);
}

// note that the errors thrown from here will only be exposed
// as internal server error from the graphql api in prod
// this is fine because these cases are pretty much all about
// malicious content being inserted, not valid content
function getValidatedNodeWithNormalizedComponentFormProps(node, componentBlocks, relationships) {
  if (isText(node)) {
    return node;
  }
  if (node.type === 'component-block') {
    if (componentBlocks.hasOwnProperty(node.component)) {
      const componentBlock = componentBlocks[node.component];
      node = {
        ...node,
        props: validateComponentBlockProps({
          kind: 'object',
          fields: componentBlock.schema
        }, node.props, relationships, [])
      };
    }
  }
  if (node.type === 'relationship') {
    var _node$data;
    node = {
      type: 'relationship',
      data: ((_node$data = node.data) === null || _node$data === void 0 ? void 0 : _node$data.id) !== undefined ? {
        id: node.data.id,
        data: undefined,
        label: undefined
      } : null,
      relationship: node.relationship,
      children: node.children
    };
  }
  return {
    ...node,
    children: node.children.map(x => getValidatedNodeWithNormalizedComponentFormProps(x, componentBlocks, relationships))
  };
}
function validateAndNormalizeDocument(value, documentFeatures, componentBlocks, relationships) {
  validateDocumentStructure(value);
  const children = value.map(x => getValidatedNodeWithNormalizedComponentFormProps(x, componentBlocks, relationships));
  const editor = createDocumentEditor(documentFeatures, componentBlocks, relationships);
  editor.children = children;
  Editor.normalize(editor, {
    force: true
  });
  return editor.children;
}

export { PropValidationError, getValidatedNodeWithNormalizedComponentFormProps, validateAndNormalizeDocument };
