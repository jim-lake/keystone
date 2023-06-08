'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var slate = require('slate');
var index = require('./index-a755d3be.cjs.dev.js');
var utils = require('./utils-5e00927a.cjs.dev.js');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var t = require('io-ts');
var excess = require('io-ts-excess');
var api = require('./api-b802cd1a.cjs.dev.js');
require('@babel/runtime/helpers/extends');
require('@keystone-ui/core');
require('react');
require('is-hotkey');
require('slate-react');
require('slate-history');
require('@keystone-ui/popover');
require('@keystone-ui/tooltip');
require('@keystone-ui/icons/icons/LinkIcon');
require('@keystone-ui/icons/icons/Trash2Icon');
require('@keystone-ui/icons/icons/ExternalLinkIcon');
require('./toolbar-2ef10b46.cjs.dev.js');
require('./orderable-eb77c396.cjs.dev.js');
require('@dnd-kit/core');
require('@dnd-kit/sortable');
require('@dnd-kit/modifiers');
require('@keystone-ui/button');
require('./utils-c93d66aa.cjs.dev.js');
require('./form-from-preview-cab3e412.cjs.dev.js');
require('@keystone-6/core/admin-ui/context');
require('@keystone-6/core/fields/types/relationship/views/RelationshipSelect');
require('@keystone-ui/fields');
require('@keystone-ui/icons/icons/PlusCircleIcon');
require('@keystone-ui/modals');
require('@emotion/weak-memoize');
require('@keystone-ui/icons/icons/ColumnsIcon');
require('apply-ref');
require('@keystone-ui/icons/icons/BoldIcon');
require('@keystone-ui/icons/icons/ItalicIcon');
require('@keystone-ui/icons/icons/PlusIcon');
require('@keystone-ui/icons/icons/ChevronDownIcon');
require('@keystone-ui/icons/icons/Maximize2Icon');
require('@keystone-ui/icons/icons/Minimize2Icon');
require('@keystone-ui/icons/icons/MoreHorizontalIcon');
require('@keystone-ui/icons/icons/CodeIcon');
require('@keystone-ui/icons/icons/AlignLeftIcon');
require('@keystone-ui/icons/icons/AlignRightIcon');
require('@keystone-ui/icons/icons/AlignCenterIcon');
require('@keystone-ui/icons/icons/MinusIcon');
require('match-sorter');
require('scroll-into-view-if-needed');
require('mdast-util-from-markdown');
require('mdast-util-gfm-autolink-literal/from-markdown');
require('micromark-extension-gfm-autolink-literal');
require('mdast-util-gfm-strikethrough/from-markdown');
require('micromark-extension-gfm-strikethrough');
require('@keystone-6/core');
require('@braintree/sanitize-url');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var t__namespace = /*#__PURE__*/_interopNamespace(t);
var excess__default = /*#__PURE__*/_interopDefault(excess);

// note that this validation isn't about ensuring that a document has nodes in the right positions and things
// it's just about validating that it's a valid slate structure
// we'll then run normalize on it which will enforce more things
const markValue = t__namespace.union([t__namespace.undefined, t__namespace.literal(true)]);
const text = excess__default["default"](t__namespace.type({
  text: t__namespace.string,
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
class URLType extends t__namespace.Type {
  constructor() {
    super('string', u => typeof u === 'string' && api.isValidURL(u), (u, c) => this.is(u) ? t__namespace.success(u) : t__namespace.failure(u, c), t__namespace.identity);
    _defineProperty(this, "_tag", 'URLType');
  }
}
const urlType = new URLType();
const link = t__namespace.recursion('Link', () => excess__default["default"](t__namespace.type({
  type: t__namespace.literal('link'),
  href: urlType,
  children
})));
const relationship = t__namespace.recursion('Relationship', () => excess__default["default"](t__namespace.type({
  type: t__namespace.literal('relationship'),
  relationship: t__namespace.string,
  data: t__namespace.union([t__namespace.null, relationshipData]),
  children
})));
const inline = t__namespace.union([text, link, relationship]);
const layoutArea = t__namespace.recursion('Layout', () => excess__default["default"](t__namespace.type({
  type: t__namespace.literal('layout'),
  layout: t__namespace.array(t__namespace.number),
  children
})));
const onlyChildrenElements = t__namespace.recursion('OnlyChildrenElements', () => excess__default["default"](t__namespace.type({
  type: t__namespace.union([t__namespace.literal('blockquote'), t__namespace.literal('layout-area'), t__namespace.literal('code'), t__namespace.literal('divider'), t__namespace.literal('list-item'), t__namespace.literal('list-item-content'), t__namespace.literal('ordered-list'), t__namespace.literal('unordered-list')]),
  children
})));
const textAlign = t__namespace.union([t__namespace.undefined, t__namespace.literal('center'), t__namespace.literal('end')]);
const heading = t__namespace.recursion('Heading', () => excess__default["default"](t__namespace.type({
  type: t__namespace.literal('heading'),
  textAlign,
  level: t__namespace.union([t__namespace.literal(1), t__namespace.literal(2), t__namespace.literal(3), t__namespace.literal(4), t__namespace.literal(5), t__namespace.literal(6)]),
  children
})));
const paragraph = t__namespace.recursion('Paragraph', () => excess__default["default"](t__namespace.type({
  type: t__namespace.literal('paragraph'),
  textAlign,
  children
})));
const relationshipData = excess__default["default"](t__namespace.type({
  id: t__namespace.string,
  label: t__namespace.union([t__namespace.undefined, t__namespace.string]),
  data: t__namespace.union([t__namespace.undefined, t__namespace.record(t__namespace.string, t__namespace.any)])
}));
const componentBlock = t__namespace.recursion('ComponentBlock', () => excess__default["default"](t__namespace.type({
  type: t__namespace.literal('component-block'),
  component: t__namespace.string,
  props: t__namespace.record(t__namespace.string, t__namespace.any),
  children
})));
const componentProp = t__namespace.recursion('ComponentProp', () => excess__default["default"](t__namespace.type({
  type: t__namespace.union([t__namespace.literal('component-inline-prop'), t__namespace.literal('component-block-prop')]),
  propPath: t__namespace.union([t__namespace.array(t__namespace.union([t__namespace.string, t__namespace.number])), t__namespace.undefined]),
  children
})));
const block = t__namespace.recursion('Element', () => t__namespace.union([layoutArea, onlyChildrenElements, heading, componentBlock, componentProp, paragraph]));
const children = t__namespace.recursion('Children', () => t__namespace.array(t__namespace.union([block, inline])));
const editorCodec = t__namespace.array(block);
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
  utils.assertNever(schema);
}
function isText(node) {
  return slate.Text.isText(node);
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
  const editor = index.createDocumentEditor(documentFeatures, componentBlocks, relationships);
  editor.children = children;
  slate.Editor.normalize(editor, {
    force: true
  });
  return editor.children;
}

exports.PropValidationError = PropValidationError;
exports.getValidatedNodeWithNormalizedComponentFormProps = getValidatedNodeWithNormalizedComponentFormProps;
exports.validateAndNormalizeDocument = validateAndNormalizeDocument;
