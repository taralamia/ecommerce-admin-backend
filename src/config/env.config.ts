import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),

  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number(),
  DB_USERNAME: z.string().min(1),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string().min(1),

  JWT_ACCESS_SECRET: z.string().min(1),
  JWT_REFRESH_SECRET: z.string().min(1),

  ACCESS_TOKEN_EXPIRES: z.string().min(1),
  REFRESH_TOKEN_EXPIRES: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    z.treeifyError(parsedEnv.error)
  );

  process.exit(1);
}

export const env = parsedEnv.data;
/*
using safeParse() does not throw an error if the validation fails. Instead, it returns an object with a success property indicating whether the validation was successful or not.
*/