'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cookie = require('cookie');
var Iron = require('@hapi/iron');
var uidSafe = require('uid-safe');

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

var cookie__namespace = /*#__PURE__*/_interopNamespace(cookie);
var Iron__default = /*#__PURE__*/_interopDefault(Iron);

// should we also accept httpOnly?

const MAX_AGE = 60 * 60 * 8; // 8 hours

function statelessSessions(_ref) {
  let {
    secret,
    maxAge = MAX_AGE,
    cookieName = 'keystonejs-session',
    path = '/',
    secure = process.env.NODE_ENV === 'production',
    ironOptions = Iron__default["default"].defaults,
    domain,
    sameSite = 'lax'
  } = _ref;
  if (!secret) {
    throw new Error('You must specify a session secret to use sessions');
  }
  if (secret.length < 32) {
    throw new Error('The session secret must be at least 32 characters long');
  }
  return {
    async get(_ref2) {
      var _context$req$headers$;
      let {
        context
      } = _ref2;
      if (!(context !== null && context !== void 0 && context.req)) return;
      const cookies = cookie__namespace.parse(context.req.headers.cookie || '');
      const bearer = (_context$req$headers$ = context.req.headers.authorization) === null || _context$req$headers$ === void 0 ? void 0 : _context$req$headers$.replace('Bearer ', '');
      const token = bearer || cookies[cookieName];
      if (!token) return;
      try {
        return await Iron__default["default"].unseal(token, secret, ironOptions);
      } catch (err) {}
    },
    async end(_ref3) {
      let {
        context
      } = _ref3;
      if (!(context !== null && context !== void 0 && context.res)) return;
      context.res.setHeader('Set-Cookie', cookie__namespace.serialize(cookieName, '', {
        maxAge: 0,
        expires: new Date(),
        httpOnly: true,
        secure,
        path,
        sameSite,
        domain
      }));
    },
    async start(_ref4) {
      let {
        context,
        data
      } = _ref4;
      if (!(context !== null && context !== void 0 && context.res)) return;
      const sealedData = await Iron__default["default"].seal(data, secret, {
        ...ironOptions,
        ttl: maxAge * 1000
      });
      context.res.setHeader('Set-Cookie', cookie__namespace.serialize(cookieName, sealedData, {
        maxAge,
        expires: new Date(Date.now() + maxAge * 1000),
        httpOnly: true,
        secure,
        path,
        sameSite,
        domain
      }));
      return sealedData;
    }
  };
}

/** @deprecated */
function storedSessions(_ref5) {
  let {
    store: storeFn,
    maxAge = MAX_AGE,
    ...statelessSessionsOptions
  } = _ref5;
  const stateless = statelessSessions({
    ...statelessSessionsOptions,
    maxAge
  });
  const store = storeFn({
    maxAge
  });
  return {
    async get(_ref6) {
      let {
        context
      } = _ref6;
      const sessionId = await stateless.get({
        context
      });
      if (!sessionId) return;
      return store.get(sessionId);
    },
    async start(_ref7) {
      let {
        context,
        data
      } = _ref7;
      const sessionId = uidSafe.sync(24);
      await store.set(sessionId, data);
      return stateless.start({
        context,
        data: sessionId
      }) || '';
    },
    async end(_ref8) {
      let {
        context
      } = _ref8;
      const sessionId = await stateless.get({
        context
      });
      if (!sessionId) return;
      await store.delete(sessionId);
      await stateless.end({
        context
      });
    }
  };
}

exports.statelessSessions = statelessSessions;
exports.storedSessions = storedSessions;
