'use strict';

var url = require('url');
var path = require('path');
var http = require('http');
var cors = require('cors');
var bodyParser = require('body-parser');
var express4 = require('@apollo/server/express4');
var express = require('express');
var server = require('@apollo/server');
var disabled = require('@apollo/server/plugin/disabled');
var _default = require('@apollo/server/plugin/landingPage/default');
var graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var url__default = /*#__PURE__*/_interopDefault(url);
var path__default = /*#__PURE__*/_interopDefault(path);
var cors__default = /*#__PURE__*/_interopDefault(cors);
var express__default = /*#__PURE__*/_interopDefault(express);
var graphqlUploadExpress__default = /*#__PURE__*/_interopDefault(graphqlUploadExpress);

const pkgDir = path__default["default"].dirname(__dirname);

const adminErrorHTMLFilepath = path__default["default"].join(pkgDir, 'static', 'admin-error.html');
function defaultIsAccessAllowed(_ref) {
  let {
    session,
    sessionStrategy
  } = _ref;
  if (!sessionStrategy) return true;
  return session !== undefined;
}
function createAdminUIMiddlewareWithNextApp(config, commonContext, nextApp) {
  const handle = nextApp.getRequestHandler();
  const {
    ui: {
      isAccessAllowed = defaultIsAccessAllowed,
      pageMiddleware,
      publicPages = []
    } = {}
  } = config;
  return async (req, res) => {
    const {
      pathname
    } = url__default["default"].parse(req.url);
    if (pathname !== null && pathname !== void 0 && pathname.startsWith('/_next') || pathname !== null && pathname !== void 0 && pathname.startsWith('/__next')) {
      return handle(req, res);
    }
    try {
      // do nothing if this is a public page
      const isPublicPage = publicPages.includes(pathname);
      const context = await commonContext.withRequest(req, res);
      const wasAccessAllowed = isPublicPage ? true : await isAccessAllowed(context);
      const shouldRedirect = await (pageMiddleware === null || pageMiddleware === void 0 ? void 0 : pageMiddleware({
        context,
        wasAccessAllowed
      }));
      if (shouldRedirect) {
        res.header('Cache-Control', 'no-cache, max-age=0');
        res.header('Location', shouldRedirect.to);
        res.status(302);
        res.send();
        return;
      }
      if (!wasAccessAllowed) return nextApp.render(req, res, '/no-access');
      handle(req, res);
    } catch (e) {
      console.error('An error occurred handling a request for the Admin UI:', e);
      res.status(500);
      res.format({
        'text/html': function () {
          res.sendFile(adminErrorHTMLFilepath);
        },
        'application/json': function () {
          res.send({
            error: true
          });
        },
        default: function () {
          res.send('An error occurred handling a request for the Admin UI.');
        }
      });
    }
  };
}

const healthCheckPath = '/_healthcheck';
const telemetryEndpoint = 'https://telemetry.keystonejs.com';

async function addHealthCheck(_ref) {
  var _config$server;
  let {
    config,
    server
  } = _ref;
  if (!((_config$server = config.server) !== null && _config$server !== void 0 && _config$server.healthCheck)) return;
  const healthCheck = config.server.healthCheck === true ? {} : config.server.healthCheck;
  const path = healthCheck.path || healthCheckPath;
  server.use(path, (req, res) => {
    const data = (typeof healthCheck.data === 'function' ? healthCheck.data() : healthCheck.data) || {
      status: 'pass',
      timestamp: Date.now()
    };
    res.json(data);
  });
}

/*
NOTE: This creates the main Keystone express server, including the
GraphQL API, but does NOT add the Admin UI middleware.

The Admin UI takes a while to build for dev, and is created separately
so the CLI can bring up the dev server early to handle GraphQL requests.
*/

const DEFAULT_MAX_FILE_SIZE = 200 * 1024 * 1024; // 200 MiB

const formatError = graphqlConfig => {
  return (formattedError, error) => {
    var _graphqlConfig$apollo;
    let debug = graphqlConfig === null || graphqlConfig === void 0 ? void 0 : graphqlConfig.debug;
    if (debug === undefined) {
      debug = process.env.NODE_ENV !== 'production';
    }
    if (!debug && formattedError.extensions) {
      // Strip out any `debug` extensions
      delete formattedError.extensions.debug;
      delete formattedError.extensions.exception;
    }
    if (graphqlConfig !== null && graphqlConfig !== void 0 && (_graphqlConfig$apollo = graphqlConfig.apolloConfig) !== null && _graphqlConfig$apollo !== void 0 && _graphqlConfig$apollo.formatError) {
      return graphqlConfig.apolloConfig.formatError(formattedError, error);
    } else {
      return formattedError;
    }
  };
};
const createExpressServer = async (config, graphQLSchema, context) => {
  var _config$server, _config$server2, _config$server3, _config$graphql, _config$graphql$playg, _config$graphql2, _config$graphql3, _config$server5, _config$graphql4, _config$graphql5;
  const expressServer = express__default["default"]();
  const httpServer = http.createServer(expressServer);
  if ((_config$server = config.server) !== null && _config$server !== void 0 && _config$server.cors) {
    // Setting config.server.cors = true will provide backwards compatible defaults
    // Otherwise, the user can provide their own config object to use
    const corsConfig = typeof config.server.cors === 'boolean' ? {
      origin: true,
      credentials: true
    } : config.server.cors;
    expressServer.use(cors__default["default"](corsConfig));
  }
  addHealthCheck({
    config,
    server: expressServer
  });
  if ((_config$server2 = config.server) !== null && _config$server2 !== void 0 && _config$server2.extendExpressApp) {
    await config.server.extendExpressApp(expressServer, context);
  }
  if ((_config$server3 = config.server) !== null && _config$server3 !== void 0 && _config$server3.extendHttpServer) {
    var _config$server4;
    (_config$server4 = config.server) === null || _config$server4 === void 0 ? void 0 : _config$server4.extendHttpServer(httpServer, context, graphQLSchema);
  }
  if (config.storage) {
    for (const val of Object.values(config.storage)) {
      if (val.kind !== 'local' || !val.serverRoute) continue;
      expressServer.use(val.serverRoute.path, express__default["default"].static(val.storagePath, {
        setHeaders(res) {
          if (val.type === 'file') {
            res.setHeader('Content-Type', 'application/octet-stream');
          }
        },
        index: false,
        redirect: false,
        lastModified: false
      }));
    }
  }
  const apolloConfig = (_config$graphql = config.graphql) === null || _config$graphql === void 0 ? void 0 : _config$graphql.apolloConfig;
  const playgroundOption = (_config$graphql$playg = (_config$graphql2 = config.graphql) === null || _config$graphql2 === void 0 ? void 0 : _config$graphql2.playground) !== null && _config$graphql$playg !== void 0 ? _config$graphql$playg : process.env.NODE_ENV !== 'production';
  const serverConfig = {
    formatError: formatError(config.graphql),
    includeStacktraceInErrorResponses: (_config$graphql3 = config.graphql) === null || _config$graphql3 === void 0 ? void 0 : _config$graphql3.debug,
    // If undefined, use Apollo default of NODE_ENV !== 'production'
    ...apolloConfig,
    schema: graphQLSchema,
    plugins: playgroundOption === 'apollo' ? apolloConfig === null || apolloConfig === void 0 ? void 0 : apolloConfig.plugins : [playgroundOption ? _default.ApolloServerPluginLandingPageLocalDefault() : disabled.ApolloServerPluginLandingPageDisabled(), ...((apolloConfig === null || apolloConfig === void 0 ? void 0 : apolloConfig.plugins) || [])]
  };
  const apolloServer = new server.ApolloServer({
    ...serverConfig
  });
  const maxFileSize = ((_config$server5 = config.server) === null || _config$server5 === void 0 ? void 0 : _config$server5.maxFileSize) || DEFAULT_MAX_FILE_SIZE;
  expressServer.use(graphqlUploadExpress__default["default"]({
    maxFileSize
  }));
  await apolloServer.start();
  expressServer.use(((_config$graphql4 = config.graphql) === null || _config$graphql4 === void 0 ? void 0 : _config$graphql4.path) || '/api/graphql', bodyParser.json((_config$graphql5 = config.graphql) === null || _config$graphql5 === void 0 ? void 0 : _config$graphql5.bodyParser), express4.expressMiddleware(apolloServer, {
    context: async _ref => {
      let {
        req,
        res
      } = _ref;
      return await context.withRequest(req, res);
    }
  }));
  return {
    expressServer,
    apolloServer,
    httpServer
  };
};

exports.createAdminUIMiddlewareWithNextApp = createAdminUIMiddlewareWithNextApp;
exports.createExpressServer = createExpressServer;
exports.healthCheckPath = healthCheckPath;
exports.pkgDir = pkgDir;
exports.telemetryEndpoint = telemetryEndpoint;
