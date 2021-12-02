import fastify from 'fastify';
import { MongoEntityManager } from 'typeorm';
import { getUserPermissionByFeatureName } from './routes/getUserPermissionByFeatureName';
import { updateUserPermission } from './routes/updateUserPemission';
import { getUsers } from './routes/getUsers';

async function buildApp(manager: MongoEntityManager) {
  const app = fastify({
    ajv: {
      customOptions: {
        allErrors: true,
        coerceTypes: false
      }
    }
  });

  app.route(getUsers(manager));
  app.route(getUserPermissionByFeatureName(manager));
  app.route(updateUserPermission(manager));
  
  return app;
}

export default buildApp;