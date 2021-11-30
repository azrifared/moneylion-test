import { MongoEntityManager } from 'typeorm';
import fastify from 'fastify';
import { User } from './entities/User'

async function buildApp(manager: MongoEntityManager) {
  const app = fastify();
  
  return app;
}

export default buildApp;