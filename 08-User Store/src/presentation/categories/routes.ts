import { Router } from 'express';
import { CategoryController } from './controller';
import { AuthMiddleware } from '../auth.middleware';
import { CategoryService } from '../services';

export class CategoryRoutes {

  static get routes(): Router {

    const router = Router();
    const catser= new CategoryService()
    const controller= new CategoryController(catser)
    
    // Definir las rutas
    router.get('/', controller.getcategories);
    router.post('/', AuthMiddleware.validateJWT, controller.createcategory);

    
    return router;
  }

}
