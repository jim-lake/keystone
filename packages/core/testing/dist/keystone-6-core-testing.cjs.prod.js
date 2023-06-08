'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var internals = require('@prisma/internals');
var migrations = require('../../dist/migrations-f7efbcb7.cjs.prod.js');
require('@prisma/migrate');
require('chalk');
require('@sindresorhus/slugify');
require('../../dist/utils-efebac2d.cjs.prod.js');
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
