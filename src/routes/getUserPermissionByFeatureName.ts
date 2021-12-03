import * as R from 'ramda';
import { MongoEntityManager } from 'typeorm';
import { User } from '../entities/User';
import { Route } from '../types/Route';
import { authorizeProductManager } from '../middlewares/authorizeProductManager';
import { JWT_SECRET } from '../config';

interface Query {
  email: string;
  featureName: string;
}

export function getUserPermissionByFeatureName(
  manager: MongoEntityManager
): Route<{ Querystring: Query }> {
  return {
    method: 'GET',
    url: '/feature',
    schema: {
      querystring: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          featureName: { type: 'string' },
        },
      },
    },
    preHandler: authorizeProductManager(JWT_SECRET),
    handler: async (request, reply) => {
      const { email, featureName } = request.query;
      let error;

      if (!email) {
        error = 'Missing user email.';
      }

      if (!featureName) {
        error = 'Missing feature name.';
      }

      if (error) {
        return reply.status(500).send({
          error: `Error! Invalid request. ${error}`,
        });
      }

      let user: User;

      try {
        user = await manager.findOne(User, { email });
      } catch (error) {
        return reply.status(500).send({
          error: `Error! Failed to find user ${email}: ${error.message}`,
        });
      }

      if (!user) {
        return reply.status(404).send({
          error: `Error! ${email} not found`,
        });
      }

      const { featuresPermission } = user;
      const permissionByFeatureName = R.indexBy(
        R.prop('featureName'),
        featuresPermission ?? []
      );
      const permission = permissionByFeatureName[featureName];

      if (!permission) {
        return reply.status(404).send({
          error: `Error! Feature name '${featureName}' doesn't exist`,
        });
      }

      reply.status(200).send({
        canAccess: permission.canAccess,
      });
    },
  };
}
