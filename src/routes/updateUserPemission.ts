import * as R from 'ramda';
import { MongoEntityManager } from 'typeorm';
import { Route } from '../types/Route';
import { authorizeProductManager } from '../middlewares/authorizeProductManager';
import { User } from '../entities/User';
import { JWT_SECRET } from '../config';

interface Body {
  featureName: string;
  email: string;
  enable: boolean;
};

export function updateUserPermission(
  manager: MongoEntityManager
): Route<{ Body: Body }> {
  return ({
    method: 'POST',
    url: '/feature',
    schema: {
      body: {
        type: 'object',
        properties: {
          featureName: { type: 'string' },
          email: { type: 'string' },
          enable: { type: 'boolean' }
        }
      }
    },
    preHandler: authorizeProductManager(JWT_SECRET),
    handler: async (request, reply) => {
      const { featureName, email, enable } = request.body;
      let error;

      if (!featureName) {
        error = 'Missing featureName';
      }

      if (!email) {
        error = 'Missing user email';
      }

      if (enable === undefined) {
        error = 'Missing enable permission'
      }

      if (error) {
        return reply.status(500).send({
          error: `Error! Invalid request. ${error}`
        })
      }

      let user: User;

      try {
        user = await manager.findOne(User, { email });
      } catch (error) {
        return reply.status(500).send({
          error: `Error! Failed to find user ${email}: ${error.message}`
        });
      }

      if (!user) {
        return reply.status(404).send({
          error: `Error! ${email} not found`
        });
      }

      const { featuresPermission } = user;
      const permissionByFeatureName = R.indexBy(
        R.prop('featureName'), featuresPermission ?? []
      );
      const permission = permissionByFeatureName[featureName];

      if (!permission) {
        user.featuresPermission = [
          ...user.featuresPermission ?? [],
          { featureName, canAccess: enable }
        ]
      } else {
        const filteredPermission = user.featuresPermission.filter(
          ({ featureName: dbFeatureName }) => dbFeatureName !== featureName
        );
        user.featuresPermission = [
          ...filteredPermission,
          { featureName, canAccess: enable }
        ];
      }

      let updatedUser: User;

      try {
        updatedUser = await manager.save(user);
      } catch (error) {
        return reply.status(500).send({
          error: `Error! Failed while updating user ${email}. ${error.message}`
        })
      }
      
      if (!updatedUser) {
        return reply.status(304).send({
          error: 'Error! Failed to modified'
        })
      }

      reply.status(200).send({
        message: `Successfully update user ${email}`
      });
    }
  })
}
