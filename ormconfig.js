const { DB_URL, isProduction } = require('./src/config');

const entitiesPath = isProduction
  ? 'build/entities/*.js'
  : 'src/entities/*.{js,ts}'

module.exports = {
  type: 'mongodb',
  url: DB_URL,
  useNewUrlParser: true,
  synchronize: true,
  logging: true,
  entities: [entitiesPath],
};
