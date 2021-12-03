import { RouteOptions } from 'fastify';
import { MongoEntityManager } from 'typeorm';
import { User } from '../entities/User';
import { authorizeProductManager } from '../middlewares/authorizeProductManager';
import { JWT_SECRET } from '../config';

export function getUsers(manager: MongoEntityManager): RouteOptions {
  return {
    method: 'GET',
    url: '/users',
    preHandler: authorizeProductManager(JWT_SECRET),
    handler: async (request, reply) => {
      try {
        const usersRecord = await manager.find(User, {
          order: {
            name: 'ASC',
          },
        });
        reply.status(200).send(usersRecord);
      } catch (error) {
        return reply.status(500).send({
          error: `Error! Failed to get users. ${error.message}`,
        });
      }
    },
  };
}
