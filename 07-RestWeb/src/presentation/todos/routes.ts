import { Router } from 'express'
import { TodosController } from './controller';

export class TodosRoutes {

    static get routes(): Router {

        const router = Router();

        const todocontrol = new TodosController();

        router.get('/:id', todocontrol.getToDoById);
        router.get('/', todocontrol.getTodos);
        router.post('/',todocontrol.createTodo)
        router.put('/:id', todocontrol.UpdateTodo)
        router.delete('/:id', todocontrol.DeleteTodo)

        return router;
    }
}