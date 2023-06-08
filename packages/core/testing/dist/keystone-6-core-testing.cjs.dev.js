'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var internals = require('@prisma/internals');
var migrations = require('../../dist/migrations-cf0b9530.cjs.dev.js');
require('@prisma/migrate');
require('chalk');
require('@sindresorhus/slugify');
require('../../dist/utils-a201374e.cjs.dev.js');
require('prompts');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefault(path);

async function resetDatabase(dbUrl, prismaSchemaPath) {
  await internals.createDatabase(dbUrl, path__default["default"].dirname(prismaSchemaPath));
  await migrations.withMigrate(prismaSchemaPath, async migrate => {
    await migrations.runMigrateWithDbUrl(dbUrl, undefined, () => migrate.reset());
    await migrations.runMigrateWithDbUrl(dbUrl, undefined, () => migrate.push({
      force: true
    }));
  });
}

exports.resetDatabase = resetDatabase;
