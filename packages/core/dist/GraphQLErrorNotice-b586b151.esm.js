import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import 'next/link';
import 'next/head';
import { Stack } from '@keystone-ui/core';
import { Notice } from '@keystone-ui/notice';

function usePreventNavigation(shouldPreventNavigationRef) {
  const router = useRouter();
  useEffect(() => {
    const clientSideRouteChangeHandler = () => {
      if (shouldPreventNavigationRef.current && !window.confirm('There are unsaved changes, are you sure you want to exit?')) {
        // throwing from here seems to be the only way to prevent the navigation
        // we're throwing just a string here rather than an error because throwing an error
        // causes Next to show an error overlay in dev but it doesn't show the overlay when we throw a string
        throw 'Navigation cancelled by user';
      }
    };
    router.events.on('routeChangeStart', clientSideRouteChangeHandler);
    const beforeUnloadHandler = event => {
      if (shouldPreventNavigationRef.current) {
        event.preventDefault();
      }
    };
    window.addEventListener('beforeunload', beforeUnloadHandler);
    return () => {
      router.events.off('routeChangeStart', clientSideRouteChangeHandler);
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  }, [shouldPreventNavigationRef, router.events]);
}

function GraphQLErrorNotice(_ref) {
  let {
    errors,
    networkError
  } = _ref;
  if (networkError) {
    return /*#__PURE__*/React.createElement(Notice, {
      tone: "negative",
      marginBottom: "large"
    }, networkError.message);
  }
  if (errors !== null && errors !== void 0 && errors.length) {
    return /*#__PURE__*/React.createElement(Stack, {
      gap: "small",
      marginBottom: "large"
    }, errors.map((err, idx) => /*#__PURE__*/React.createElement(Notice, {
      tone: "negative",
      key: idx
    }, err.message)));
  }
  return null;
}

export { GraphQLErrorNotice as G, usePreventNavigation as u };
