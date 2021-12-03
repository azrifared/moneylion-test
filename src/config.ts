import * as env from 'env-var';

const isProduction = process.env['NODE_ENV'] === 'production';

if (isProduction) {
  if (!process.env['JWT_SECRET']) {
    console.error('Failed to start server. Missing env JWT_SECRET');
    process.exit(1);
  }
}

export const PORT = env.get('PORT').default(3000).asPortNumber();

export const JWT_SECRET = env.get('JWT_SECRET').asString();
