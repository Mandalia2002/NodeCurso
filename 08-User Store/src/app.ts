import { envs } from './config/envs';
import { MongoDB } from './data/mongo';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';


(async()=> {
  main();
})();


async function main() {

  await MongoDB.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoURL: envs.MONGO_URL
  })

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}