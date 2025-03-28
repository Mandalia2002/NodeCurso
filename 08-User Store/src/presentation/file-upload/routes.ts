import { Router } from 'express';
import { FileUpController } from './controller';
import { FileUpService } from '../services/file.service';
import { FileMiddleware } from '../middleware/file.middleware';
import { TypeMiddleware } from '../middleware/type.middleware';

export class FileUpRoutes {

  static get routes(): Router {

    const router = Router();
    const controller= new FileUpController(new FileUpService())
    
    router.use([FileMiddleware.containFiles])

    // Definir las rutas
    router.post('/single/:type', controller.uploadFile);
    router.post('/multiple/:type',[TypeMiddleware.validTypes(['users', 'products', 'categories'])],controller.uploadMulti);

    
    return router;
  }

}