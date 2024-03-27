import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  DATABASE_URL: string;
}

const envVarsSchema = joi
  .object({
    DATABASE_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

console.log(envVars.DATABASE_URL);

export const envs = {
  databaseUrl: envVars.DATABASE_URL,
};
