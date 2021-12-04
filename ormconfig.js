const isProduction = process.env['NODE_ENV'] === 'production';
const DB_URL = process.env['DB_URL'];
const entitiesPath = isProduction
  ? 'build/entities/*.js'
  : 'src/entities/*.{js,ts}';

if (isProduction) {
  if (!DB_URL) {
    console.error('Failed to start server. Missing env DB_URL');
    process.exit(1);
  }
}

module.exports = {
  type: 'mongodb',
  url: DB_URL,
  useNewUrlParser: true,
  synchronize: true,
  logging: true,
  entities: [entitiesPath],
};
