'use strict';

var React = require('react');
var router = require('next/router');
require('next/link');
require('next/head');
var core = require('@keystone-ui/core');
var notice = require('@keystone-ui/notice');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

function usePreventNavigation(shouldPreventNavigationRef) {
  const router$1 = router.useRouter();
  React.useEffect(() => {
    const clientSideRouteChangeHandler = () => {
      if (shouldPreventNavigationRef.current && !window.confirm('There are unsaved changes, are you sure you want to exit?')) {
        // throwing from here seems to be the only way to prevent the navigation
        // we're throwing just a string here rather than an error because throwing an error
        // causes Next to show an error overlay in dev but it doesn't show the overlay when we throw a string
        throw 'Navigation cancelled by user';
      }
    };
    router$1.events.on('routeChangeStart', clientSideRouteChangeHandler);
    const beforeUnloadHandler = event => {
      if (shouldPreventNavigationRef.current) {
        event.preventDefault();
      }
    };
    window.addEventListener('beforeunload', beforeUnloadHandler);
    return () => {
      router$1.events.off('routeChangeStart', clientSideRouteChangeHandler);
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  }, [shouldPreventNavigationRef, router$1.events]);
}

function GraphQLErrorNotice(_ref) {
  let {
    errors,
    networkError
  } = _ref;
  if (networkError) {
    return /*#__PURE__*/React__default["default"].createElement(notice.Notice, {
      tone: "negative",
      marginBottom: "large"
    }, networkError.message);
  }
  if (errors !== null && errors !== void 0 && errors.length) {
    return /*#__PURE__*/React__default["default"].createElement(core.Stack, {
      gap: "small",
      marginBottom: "large"
    }, errors.map((err, idx) => /*#__PURE__*/React__default["default"].createElement(notice.Notice, {
      tone: "negative",
      key: idx
    }, err.message)));
  }
  return null;
}

exports.GraphQLErrorNotice = GraphQLErrorNotice;
exports.usePreventNavigation = usePreventNavigation;
