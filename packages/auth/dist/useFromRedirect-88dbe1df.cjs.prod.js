'use strict';

var core = require('@keystone-ui/core');
var router = require('@keystone-6/core/admin-ui/router');
var react = require('react');

/** @jsxRuntime classic */
const SigninContainer = _ref => {
  let {
    children,
    title
  } = _ref;
  const {
    colors,
    shadow
  } = core.useTheme();
  return core.jsx("div", null, core.jsx(router.Head, null, core.jsx("title", null, title || 'Keystone')), core.jsx(core.Center, {
    css: {
      minWidth: '100vw',
      minHeight: '100vh',
      backgroundColor: colors.backgroundMuted
    },
    rounding: "medium"
  }, core.jsx(core.Box, {
    css: {
      background: colors.background,
      width: 600,
      boxShadow: shadow.s100
    },
    margin: "medium",
    padding: "xlarge",
    rounding: "medium"
  }, children)));
};

const useRedirect = () => {
  const router$1 = router.useRouter();
  const redirect = react.useMemo(() => {
    const {
      from
    } = router$1.query;
    if (typeof from !== 'string') return '/';
    if (!from.startsWith('/')) return '/';
    if (from === '/no-access') return '/';
    return from;
  }, [router$1]);
  return redirect;
};

exports.SigninContainer = SigninContainer;
exports.useRedirect = useRedirect;
