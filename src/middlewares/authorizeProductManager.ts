import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken } from '../utils/jwt';

export function authorizeProductManager(jwtSecret: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { authorization } = request.headers;

    if (!authorization || typeof authorization !== 'string') {
      return reply.status(401).send({
        error: 'User is unauthorized. Missing access token.',
      });
    }

    const accessToken = authorization.split(' ')[1];
    let token;

    try {
      token = await verifyToken(accessToken, jwtSecret);
    } catch (error) {
      return reply.status(401).send({
        error: 'Invalid access token.',
      });
    }

    const { roleName } = token;

    if (!roleName || roleName !== 'Product Manager') {
      return reply.status(403).send({
        error: 'Forbidden',
      });
    }

    request.token = token;
  };
}
