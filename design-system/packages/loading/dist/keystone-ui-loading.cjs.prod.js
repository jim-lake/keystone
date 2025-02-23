'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var core = require('@keystone-ui/core');

const loadingSizeValues = ['large', 'medium', 'small'];
const loadingToneValues = ['active', 'passive', 'positive', 'warning', 'negative', 'help'];

// NOTE: a more accurate implementation might use `aria-busy="true|false"` on
// the wrapping element, but it's difficult to abstract
// TODO: Should this be a box, to support margin etc?

const LoadingDots = _ref => {
  let {
    label,
    tone: toneKey,
    size: sizeKey = 'medium',
    ...props
  } = _ref;
  const {
    controlSizes,
    tones
  } = core.useTheme();
  const size = controlSizes[sizeKey];
  const tone = toneKey ? tones[toneKey] : null;
  const color = tone ? tone.fill[0] : 'currentColor';
  return core.jsx("div", _extends({
    "aria-live": "polite",
    "aria-label": label,
    css: {
      color,
      display: 'inline-flex',
      fontSize: size.indicatorFontSize
    }
  }, props), core.jsx(Dot, {
    delay: 0
  }), core.jsx(Dot, {
    delay: 160
  }), core.jsx(Dot, {
    delay: 320
  }));
};
const fadeAnimation = core.keyframes({
  '0%, 80%, 100%': {
    opacity: 0
  },
  '40%': {
    opacity: 1
  }
});
const Dot = _ref2 => {
  let {
    delay
  } = _ref2;
  return core.jsx("div", {
    css: {
      animation: `${fadeAnimation} 1s ease-in-out infinite`,
      animationDelay: `${delay}ms`,
      backgroundColor: 'currentColor',
      borderRadius: '50%',
      display: 'block',
      height: '1em',
      width: '1em',
      '&:not(:first-of-type)': {
        marginLeft: '1em'
      }
    }
  });
};

exports.LoadingDots = LoadingDots;
exports.loadingSizeValues = loadingSizeValues;
exports.loadingToneValues = loadingToneValues;
