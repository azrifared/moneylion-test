import * as env from 'env-var';

export const PORT = env.get('PORT').asPortNumber();