'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var slate = require('slate');
var slateReact = require('slate-react');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const allMarks = ['bold', 'italic', 'underline', 'strikethrough', 'code', 'superscript', 'subscript', 'keyboard'];
const isElementActive = (editor, format) => {
  const [match] = slate.Editor.nodes(editor, {
    match: n => n.type === format
  });
  return !!match;
};
function clearFormatting(editor) {
  slate.Transforms.unwrapNodes(editor, {
    match: node => node.type === 'heading' || node.type === 'blockquote' || node.type === 'code'
  });
  slate.Transforms.unsetNodes(editor, allMarks, {
    match: slate.Text.isText
  });
}
function moveChildren(editor, parent, to) {
  let shouldMoveNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : () => true;
  const parentPath = slate.Path.isPath(parent) ? parent : parent[1];
  const parentNode = slate.Path.isPath(parent) ? slate.Node.get(editor, parentPath) : parent[0];
  if (!slate.Editor.isBlock(editor, parentNode)) return;
  for (let i = parentNode.children.length - 1; i >= 0; i--) {
    if (shouldMoveNode(parentNode.children[i])) {
      const childPath = [...parentPath, i];
      slate.Transforms.moveNodes(editor, {
        at: childPath,
        to
      });
    }
  }
}

// this ensures that when changes happen, they are immediately shown
// this stops the problem of a cursor resetting to the end when a change is made
// because the changes are applied asynchronously
function useElementWithSetNodes(editor, element) {
  const [state, setState] = React.useState({
    element,
    elementWithChanges: element
  });
  if (state.element !== element) {
    setState({
      element,
      elementWithChanges: element
    });
  }
  const elementRef = React.useRef(element);
  React.useEffect(() => {
    elementRef.current = element;
  });
  const setNodes = React.useCallback(changesOrCallback => {
    const currentElement = elementRef.current;
    const changes = typeof changesOrCallback === 'function' ? changesOrCallback(currentElement) : changesOrCallback;
    slate.Transforms.setNodes(editor, changes, {
      at: slateReact.ReactEditor.findPath(editor, currentElement)
    });
    setState({
      element: currentElement,
      elementWithChanges: {
        ...currentElement,
        ...changes
      }
    });
  }, [editor]);
  return [state.elementWithChanges, setNodes];
}
function useEventCallback(callback) {
  const callbackRef = React.useRef(callback);
  const cb = React.useCallback(function () {
    return callbackRef.current(...arguments);
  }, []);
  React.useEffect(() => {
    callbackRef.current = callback;
  });
  return cb;
}
const IS_MAC = typeof window != 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
const modifierKeyText = IS_MAC ? '⌘' : 'Ctrl';
const ForceValidationContext = /*#__PURE__*/React__default["default"].createContext(false);
const ForceValidationProvider = ForceValidationContext.Provider;
function useForceValidation() {
  return React.useContext(ForceValidationContext);
}
function insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading(editor, nodes) {
  var _pathRefForEmptyNodeA;
  let pathRefForEmptyNodeAtCursor;
  const entry = slate.Editor.above(editor, {
    match: node => node.type === 'heading' || node.type === 'paragraph'
  });
  if (entry && slate.Node.string(entry[0]) === '') {
    pathRefForEmptyNodeAtCursor = slate.Editor.pathRef(editor, entry[1]);
  }
  slate.Transforms.insertNodes(editor, nodes);
  let path = (_pathRefForEmptyNodeA = pathRefForEmptyNodeAtCursor) === null || _pathRefForEmptyNodeA === void 0 ? void 0 : _pathRefForEmptyNodeA.unref();
  if (path) {
    slate.Transforms.removeNodes(editor, {
      at: path
    });
    // even though the selection is in the right place after the removeNodes
    // for some reason the editor blurs so we need to focus it again
    slateReact.ReactEditor.focus(editor);
  }
}

/**
 * This is equivalent to Editor.after except that it ignores points that have no content
 * like the point in a void text node, an empty text node and the last point in a text node
 */
// TODO: this would probably break if you were trying to get the last point in the editor?
function EditorAfterButIgnoringingPointsWithNoContent(editor, at) {
  let {
    distance = 1
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const anchor = slate.Editor.point(editor, at, {
    edge: 'end'
  });
  const focus = slate.Editor.end(editor, []);
  const range = {
    anchor,
    focus
  };
  let d = 0;
  let target;
  for (const p of slate.Editor.positions(editor, {
    at: range
  })) {
    if (d > distance) {
      break;
    }

    // this is the important change
    const node = slate.Node.get(editor, p.path);
    if (node.text.length === p.offset) {
      continue;
    }
    if (d !== 0) {
      target = p;
    }
    d++;
  }
  return target;
}
function nodeTypeMatcher() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (args.length === 1) {
    const type = args[0];
    return node => node.type === type;
  }
  const set = new Set(args);
  return node => typeof node.type === 'string' && set.has(node.type);
}
function assert(condition) {
  if (!condition) {
    throw new Error('failed assert');
  }
}

Object.defineProperty(exports, 'useStaticEditor', {
  enumerable: true,
  get: function () { return slateReact.useSlateStatic; }
});
exports.EditorAfterButIgnoringingPointsWithNoContent = EditorAfterButIgnoringingPointsWithNoContent;
exports.ForceValidationProvider = ForceValidationProvider;
exports.allMarks = allMarks;
exports.assert = assert;
exports.clearFormatting = clearFormatting;
exports.insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading = insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading;
exports.isElementActive = isElementActive;
exports.modifierKeyText = modifierKeyText;
exports.moveChildren = moveChildren;
exports.nodeTypeMatcher = nodeTypeMatcher;
exports.useElementWithSetNodes = useElementWithSetNodes;
exports.useEventCallback = useEventCallback;
exports.useForceValidation = useForceValidation;
