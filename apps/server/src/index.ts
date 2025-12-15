import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app.js';
import { connectDb } from './lib/db.js';
import { env } from './lib/env.js';

async function main() {
  await connectDb();
  const app = createApp();
  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`[server] listening on http://localhost:${env.PORT}`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('[server] fatal', err);
  process.exit(1);
});


