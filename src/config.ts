import * as env from 'env-var';

export const PORT = env.get('PORT').default(3000).asPortNumber();

export const JWT_SECRET = env.get('JWT_SECRET').required().asString();
