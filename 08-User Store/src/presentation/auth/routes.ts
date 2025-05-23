import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../services/auth.service';
import { EmailService } from '../services/email.service';
import { envs } from '../../config';

export class AuthRoutes {


  static get routes(): Router {

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY
    )
    const router = Router();
    const authService = new AuthService(emailService)
    
    const controller = new AuthController(authService)
    // Definir las rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );
    router.post('/login', controller.login)
    router.post('/register',controller.register)
    router.get('/validate-email:token', controller.validate)

    return router;
  }

}