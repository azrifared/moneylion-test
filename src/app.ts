import fastify from 'fastify';
import { MongoEntityManager } from 'typeorm';
import { checkUserPermissionByFeatureName } from './routes/checkUserPermissionByFeatureName';

async function buildApp(manager: MongoEntityManager) {
  const app = fastify();

  app.route(checkUserPermissionByFeatureName(manager));
  
  return app;
}

export default buildApp;