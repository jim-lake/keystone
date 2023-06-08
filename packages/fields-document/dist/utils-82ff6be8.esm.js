'use client';
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { Editor, Transforms, Text, Path, Node } from 'slate';
import { ReactEditor } from 'slate-react';
export { useSlateStatic as useStaticEditor } from 'slate-react';

const allMarks = ['bold', 'italic', 'underline', 'strikethrough', 'code', 'superscript', 'subscript', 'keyboard'];
const isElementActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format
  });
  return !!match;
};
function clearFormatting(editor) {
  Transforms.unwrapNodes(editor, {
    match: node => node.type === 'heading' || node.type === 'blockquote' || node.type === 'code'
  });
  Transforms.unsetNodes(editor, allMarks, {
    match: Text.isText
  });
}
function moveChildren(editor, parent, to) {
  let shouldMoveNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : () => true;
  const parentPath = Path.isPath(parent) ? parent : parent[1];
  const parentNode = Path.isPath(parent) ? Node.get(editor, parentPath) : parent[0];
  if (!Editor.isBlock(editor, parentNode)) return;
  for (let i = parentNode.children.length - 1; i >= 0; i--) {
    if (shouldMoveNode(parentNode.children[i])) {
      const childPath = [...parentPath, i];
      Transforms.moveNodes(editor, {
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
  const [state, setState] = useState({
    element,
    elementWithChanges: element
  });
  if (state.element !== element) {
    setState({
      element,
      elementWithChanges: element
    });
  }
  const elementRef = useRef(element);
  useEffect(() => {
    elementRef.current = element;
  });
  const setNodes = useCallback(changesOrCallback => {
    const currentElement = elementRef.current;
    const changes = typeof changesOrCallback === 'function' ? changesOrCallback(currentElement) : changesOrCallback;
    Transforms.setNodes(editor, changes, {
      at: ReactEditor.findPath(editor, currentElement)
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
  const callbackRef = useRef(callback);
  const cb = useCallback(function () {
    return callbackRef.current(...arguments);
  }, []);
  useEffect(() => {
    callbackRef.current = callback;
  });
  return cb;
}
const IS_MAC = typeof window != 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
const modifierKeyText = IS_MAC ? '⌘' : 'Ctrl';
const ForceValidationContext = /*#__PURE__*/React.createContext(false);
const ForceValidationProvider = ForceValidationContext.Provider;
function useForceValidation() {
  return useContext(ForceValidationContext);
}
function insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading(editor, nodes) {
  var _pathRefForEmptyNodeA;
  let pathRefForEmptyNodeAtCursor;
  const entry = Editor.above(editor, {
    match: node => node.type === 'heading' || node.type === 'paragraph'
  });
  if (entry && Node.string(entry[0]) === '') {
    pathRefForEmptyNodeAtCursor = Editor.pathRef(editor, entry[1]);
  }
  Transforms.insertNodes(editor, nodes);
  let path = (_pathRefForEmptyNodeA = pathRefForEmptyNodeAtCursor) === null || _pathRefForEmptyNodeA === void 0 ? void 0 : _pathRefForEmptyNodeA.unref();
  if (path) {
    Transforms.removeNodes(editor, {
      at: path
    });
    // even though the selection is in the right place after the removeNodes
    // for some reason the editor blurs so we need to focus it again
    ReactEditor.focus(editor);
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
  const anchor = Editor.point(editor, at, {
    edge: 'end'
  });
  const focus = Editor.end(editor, []);
  const range = {
    anchor,
    focus
  };
  let d = 0;
  let target;
  for (const p of Editor.positions(editor, {
    at: range
  })) {
    if (d > distance) {
      break;
    }

    // this is the important change
    const node = Node.get(editor, p.path);
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

export { EditorAfterButIgnoringingPointsWithNoContent, ForceValidationProvider, allMarks, assert, clearFormatting, insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading, isElementActive, modifierKeyText, moveChildren, nodeTypeMatcher, useElementWithSetNodes, useEventCallback, useForceValidation };
