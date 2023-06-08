import path__default from 'path';
import { createDatabase } from '@prisma/internals';
import { w as withMigrate, r as runMigrateWithDbUrl } from '../../dist/migrations-87c66232.esm.js';
import '@prisma/migrate';
import 'chalk';
import '@sindresorhus/slugify';
import '../../dist/utils-b5eeaa17.esm.js';
import 'prompts';

async function resetDatabase(dbUrl, prismaSchemaPath) {
  await createDatabase(dbUrl, path__default.dirname(prismaSchemaPath));
  await withMigrate(prismaSchemaPath, async migrate => {
    await runMigrateWithDbUrl(dbUrl, undefined, () => migrate.reset());
    await runMigrateWithDbUrl(dbUrl, undefined, () => migrate.push({
      force: true
    }));
  });
}

export { resetDatabase };
