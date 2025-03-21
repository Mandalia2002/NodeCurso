import { Router } from 'express'
import { TodosController } from './controller';
import { TodoDatasourceImpl } from '../../infractructure/datasources/todo.datasource.impl';
import { TodoRepositoryImpl } from '../../infractructure/repositories/todo.repository.impl';

export class TodosRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource = new TodoDatasourceImpl()

        const todorepo = new TodoRepositoryImpl(datasource)

        const todocontrol = new TodosController(todorepo);

        router.get('/:id', todocontrol.getToDoById);
        router.get('/', todocontrol.getTodos);
        router.post('/',todocontrol.createTodo)
        router.put('/:id', todocontrol.UpdateTodo)
        router.delete('/:id', todocontrol.DeleteTodo)

        return router;
    }
}