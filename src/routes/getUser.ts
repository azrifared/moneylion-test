import { MongoEntityManager } from 'typeorm';
import { User } from '../entities/User';
import { authorizeProductManager } from '../middlewares/authorizeProductManager';
import { JWT_SECRET } from '../config';
import { Route } from '../types/Route';

interface Params {
  email: string;
}

export function getUser(
  manager: MongoEntityManager
): Route<{ Params: Params }> {
  return {
    method: 'GET',
    url: '/users/:email',
    schema: {
      params: {
        type: 'object',
        properties: {
          email: { type: 'string' },
        },
      },
    },
    preHandler: authorizeProductManager(JWT_SECRET),
    handler: async (request, reply) => {
      const { email } = request.params;
      try {
        const usersRecord = await manager.findOne(User, { email });

        if (!usersRecord) {
          return reply.status(404).send({
            error: `${email} not found`,
          });
        }

        reply.status(200).send(usersRecord);
      } catch (error) {
        return reply.status(500).send({
          error: `Error! Failed to get users. ${error.message}`,
        });
      }
    },
  };
}
