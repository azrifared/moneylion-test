import { createConnection, getMongoManager } from 'typeorm';
import { PORT } from './config';
import buildApp from './app';
import getIpAddress from './utils/getIpAddress';

 createConnection()
  .then(async () => {
    const manager = getMongoManager();
    const app = await buildApp(manager);

    app.listen(PORT ?? 3000, getIpAddress(), (err, address) => {
      if (err) {
        console.error('Error during starting server: ', err);
        process.exit(1);
      }
  
      console.info(`Server listening on ${address}`);
    })
  })
  .catch(error => console.error('Error! Failed to start server', error));
  