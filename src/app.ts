import * as swagger from 'swagger-ui-dist';
import fastify from 'fastify';
import { MongoEntityManager } from 'typeorm';
import { getUserPermissionByFeatureName } from './routes/getUserPermissionByFeatureName';
import { updateUserPermission } from './routes/updateUserPemission';
import { getUsers } from './routes/getUsers';
import { getUser } from './routes/getUser';
import { getSwaggerIndex } from './utils/getSwaggerIndex'
import { createReadStream } from 'fs';

async function buildApp(manager: MongoEntityManager) {

  // validate schema
  const app = fastify({
    ajv: {
      customOptions: {
        allErrors: true,
        coerceTypes: false
      }
    }
  });

  // api routes
  app.route(getUsers(manager));
  app.route(getUser(manager));
  app.route(getUserPermissionByFeatureName(manager));
  app.route(updateUserPermission(manager));

  // swagger documentation
  const swaggerPath = swagger.absolutePath();
  const swaggerIndex = getSwaggerIndex(swaggerPath);
  app.register(require('fastify-static'), { root: swaggerPath })
  app.get('/swagger.yaml', (request, reply) =>{
    reply.send(createReadStream(`${__dirname}/../swagger.yaml`))
  });
  app.get('/', (request, reply) => {
    reply.type('text/html').send(swaggerIndex)
  });
  
  return app;
}

export default buildApp;