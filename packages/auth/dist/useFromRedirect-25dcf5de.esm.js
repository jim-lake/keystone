import { useTheme, jsx, Center, Box } from '@keystone-ui/core';
import { Head, useRouter } from '@keystone-6/core/admin-ui/router';
import { useMemo } from 'react';

/** @jsxRuntime classic */
const SigninContainer = _ref => {
  let {
    children,
    title
  } = _ref;
  const {
    colors,
    shadow
  } = useTheme();
  return jsx("div", null, jsx(Head, null, jsx("title", null, title || 'Keystone')), jsx(Center, {
    css: {
      minWidth: '100vw',
      minHeight: '100vh',
      backgroundColor: colors.backgroundMuted
    },
    rounding: "medium"
  }, jsx(Box, {
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
  const router = useRouter();
  const redirect = useMemo(() => {
    const {
      from
    } = router.query;
    if (typeof from !== 'string') return '/';
    if (!from.startsWith('/')) return '/';
    if (from === '/no-access') return '/';
    return from;
  }, [router]);
  return redirect;
};

export { SigninContainer as S, useRedirect as u };
