import * as R from 'ramda';
import { MongoEntityManager } from 'typeorm';
import { User } from '../entities/User';
import { Route } from '../types/Route';
import { authorizeProductManager } from '../middlewares/authorizeProductManager';
import { JWT_SECRET } from '../config';

interface Query {
  email: string;
  featureName: string;
};

export function checkUserPermissionByFeatureName(
  manager: MongoEntityManager
): Route<{ Querystring: Query }> {
  return ({
    method: 'GET',
    url: '/feature',
    schema: {
      params: {
        type: 'object',
        properties: {
          email: 'string',
          featureName: 'string'
        }
      }
    },
    preHandler: authorizeProductManager(JWT_SECRET),
    handler: async (request, reply) => {
      const { email, featureName } = request.query;
      let user: User;

      try {
        user = await manager.findOne(User, { email })
      } catch (error) {
        return reply.status(500).send({
          error: `Error! Failed to find user ${email}: ${error.message}`
        });
      }

      if (!user) {
        return reply.status(404).send({
          error: `Error! ${email} not found`
        })
      }

      const { featuresPermission } = user;

      if (!featuresPermission || !featuresPermission) {
        return reply.status(200).send({
          canAccess: false
        });
      }

      const permissionByFeatureName = R.indexBy(
        R.prop('featureName'), featuresPermission
      );
      const checkPermission = permissionByFeatureName[featureName];

      if (!checkPermission || checkPermission.isAllowed === false) {
        return reply.status(200).send({
          canAccess: false
        });
      }

      reply.status(200).send({
        canAccess: checkPermission.isAllowed
      });
    }
  })
}
