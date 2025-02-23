'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const defaultRenderers = {
  inline: {
    bold: 'strong',
    code: 'code',
    keyboard: 'kbd',
    strikethrough: 's',
    italic: 'em',
    link: 'a',
    subscript: 'sub',
    superscript: 'sup',
    underline: 'u',
    relationship: _ref => {
      let {
        data
      } = _ref;
      return /*#__PURE__*/React__default["default"].createElement("span", null, (data === null || data === void 0 ? void 0 : data.label) || (data === null || data === void 0 ? void 0 : data.id));
    }
  },
  block: {
    block: 'div',
    blockquote: 'blockquote',
    paragraph: _ref2 => {
      let {
        children,
        textAlign
      } = _ref2;
      return /*#__PURE__*/React__default["default"].createElement("p", {
        style: {
          textAlign
        }
      }, children);
    },
    divider: 'hr',
    heading: _ref3 => {
      let {
        level,
        children,
        textAlign
      } = _ref3;
      let Heading = `h${level}`;
      return /*#__PURE__*/React__default["default"].createElement(Heading, {
        style: {
          textAlign
        },
        children: children
      });
    },
    code: 'pre',
    list: _ref4 => {
      let {
        children,
        type
      } = _ref4;
      const List = type === 'ordered' ? 'ol' : 'ul';
      return /*#__PURE__*/React__default["default"].createElement(List, null, children.map((x, i) => /*#__PURE__*/React__default["default"].createElement("li", {
        key: i
      }, x)));
    },
    layout: _ref5 => {
      let {
        children,
        layout
      } = _ref5;
      return /*#__PURE__*/React__default["default"].createElement("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: layout.map(x => `${x}fr`).join(' ')
        }
      }, children.map((element, i) => /*#__PURE__*/React__default["default"].createElement("div", {
        key: i
      }, element)));
    }
  }
};
function DocumentNode(_ref6) {
  let {
    node: _node,
    componentBlocks,
    renderers
  } = _ref6;
  if (typeof _node.text === 'string') {
    let child = /*#__PURE__*/React__default["default"].createElement(React.Fragment, null, _node.text);
    Object.keys(renderers.inline).forEach(markName => {
      if (markName !== 'link' && markName !== 'relationship' && _node[markName]) {
        const Mark = renderers.inline[markName];
        child = /*#__PURE__*/React__default["default"].createElement(Mark, null, child);
      }
    });
    return child;
  }
  const node = _node;
  const children = node.children.map((x, i) => /*#__PURE__*/React__default["default"].createElement(DocumentNode, {
    node: x,
    componentBlocks: componentBlocks,
    renderers: renderers,
    key: i
  }));
  switch (node.type) {
    case 'blockquote':
      {
        return /*#__PURE__*/React__default["default"].createElement(renderers.block.blockquote, {
          children: children
        });
      }
    case 'paragraph':
      {
        return /*#__PURE__*/React__default["default"].createElement(renderers.block.paragraph, {
          textAlign: node.textAlign,
          children: children
        });
      }
    case 'code':
      {
        if (node.children.length === 1 && node.children[0] && typeof node.children[0].text === 'string') {
          return /*#__PURE__*/React__default["default"].createElement(renderers.block.code, null, node.children[0].text);
        }
        break;
      }
    case 'layout':
      {
        return /*#__PURE__*/React__default["default"].createElement(renderers.block.layout, {
          layout: node.layout,
          children: children
        });
      }
    case 'divider':
      {
        return /*#__PURE__*/React__default["default"].createElement(renderers.block.divider, null);
      }
    case 'heading':
      {
        return /*#__PURE__*/React__default["default"].createElement(renderers.block.heading, {
          textAlign: node.textAlign,
          level: node.level,
          children: children
        });
      }
    case 'component-block':
      {
        const Comp = componentBlocks[node.component];
        if (Comp) {
          const props = createComponentBlockProps(node, children);
          return /*#__PURE__*/React__default["default"].createElement(renderers.block.block, null, /*#__PURE__*/React__default["default"].createElement(Comp, props));
        }
        break;
      }
    case 'ordered-list':
    case 'unordered-list':
      {
        return /*#__PURE__*/React__default["default"].createElement(renderers.block.list, {
          children: children,
          type: node.type === 'ordered-list' ? 'ordered' : 'unordered'
        });
      }
    case 'relationship':
      {
        const data = node.data;
        return /*#__PURE__*/React__default["default"].createElement(renderers.inline.relationship, {
          relationship: node.relationship,
          data: data ? {
            id: data.id,
            label: data.label,
            data: data.data
          } : null
        });
      }
    case 'link':
      {
        return /*#__PURE__*/React__default["default"].createElement(renderers.inline.link, {
          href: node.href
        }, children);
      }
  }
  return /*#__PURE__*/React__default["default"].createElement(React.Fragment, null, children);
}
function set(obj, propPath, value) {
  if (propPath.length === 1) {
    obj[propPath[0]] = value;
  } else {
    let firstElement = propPath.shift();
    set(obj[firstElement], propPath, value);
  }
}
function createComponentBlockProps(node, children) {
  const formProps = JSON.parse(JSON.stringify(node.props));
  node.children.forEach((child, i) => {
    if (child.propPath) {
      const propPath = [...child.propPath];
      set(formProps, propPath, children[i]);
    }
  });
  return formProps;
}
function DocumentRenderer(props) {
  var _props$renderers, _props$renderers2;
  const renderers = {
    inline: {
      ...defaultRenderers.inline,
      ...((_props$renderers = props.renderers) === null || _props$renderers === void 0 ? void 0 : _props$renderers.inline)
    },
    block: {
      ...defaultRenderers.block,
      ...((_props$renderers2 = props.renderers) === null || _props$renderers2 === void 0 ? void 0 : _props$renderers2.block)
    }
  };
  const componentBlocks = props.componentBlocks || {};
  return /*#__PURE__*/React__default["default"].createElement(React.Fragment, null, props.document.map((x, i) => /*#__PURE__*/React__default["default"].createElement(DocumentNode, {
    node: x,
    componentBlocks: componentBlocks,
    renderers: renderers,
    key: i
  })));
}

exports.DocumentRenderer = DocumentRenderer;
exports.defaultRenderers = defaultRenderers;
