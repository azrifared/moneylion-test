module.exports = {
  type: 'mongodb',
  host: 'localhost',
  database: 'development',
  port: 27017,
  useNewUrlParser: true,
  synchronize: true,
  logging: true,
  entities: ['src/entities/*.{js,ts}'],
};
