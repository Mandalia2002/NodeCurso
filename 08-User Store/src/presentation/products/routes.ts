import { Router } from 'express';
import { ProductController } from './controller';
import { ProductService } from '../services/product.service';
import { AuthMiddleware } from '../middleware/auth.middleware';

export class ProductsRoutes {

  static get routes(): Router {

    const router = Router();
    const product= new ProductService()
    const controller= new ProductController(product)
    
    // Definir las rutas
    router.get('/', controller.getProduct);
    router.post('/',[AuthMiddleware.validateJWT], controller.createProduct);
    
    return router;
  }

}
