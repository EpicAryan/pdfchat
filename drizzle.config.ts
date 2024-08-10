import {defineConfig} from 'drizzle-kit'
import * as dotenv from 'dotenv';
dotenv.config({path: '.env'})
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set.');
}

export default defineConfig({
    schema: "./src/lib/db/schema.ts",
    dialect: 'postgresql',
    dbCredentials: {
        url: databaseUrl,
    },

    verbose: true,
    strict: true,
})