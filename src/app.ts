import fastify from 'fastify';
import { MongoEntityManager } from 'typeorm';
import { checkUserPermissionByFeatureName } from './routes/checkUserPermissionByFeatureName';
import { updateUserPermission } from './routes/updateUserPemission';

async function buildApp(manager: MongoEntityManager) {
  const app = fastify();

  app.route(checkUserPermissionByFeatureName(manager));
  app.route(updateUserPermission(manager));
  
  return app;
}

export default buildApp;