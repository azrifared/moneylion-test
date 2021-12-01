require('dotenv').config();
import { createConnection } from 'typeorm';
import { PORT } from './config';
import buildApp from './app';
import getIpAddress from './utils/getIpAddress';

 createConnection()
  .then(async (connection) => {
    const manager = connection.mongoManager;
    const app = await buildApp(manager);

    app.listen(PORT, getIpAddress(), (err, address) => {
      if (err) {
        console.error('Error during starting server: ', err);
        process.exit(1);
      }
  
      console.info(`Server listening on ${address}`);
    })
  })
  .catch(error => console.error('Error! Failed to start server', error));
  