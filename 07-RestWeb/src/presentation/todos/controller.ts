import { Request, Response } from "express"
import { CreateDTOS, UpdateDTOS } from "../../domain/dtos";
import { GetTodos, GetTodo, UpdateTodo, DeleteTodo, CreateTodo, TodoRepository } from "../../domain";


export class TodosController {
    constructor(
        private readonly todorepository: TodoRepository,
    ) { }

    // Read All
    //*---------------------------------------------
    public getTodos = (req: Request, res: Response) => {
        new GetTodos(this.todorepository).execute().then(todos => res.json(todos)).catch(error => res.status(400).json({ error }))
    }

    //Read One
    //*----------------------------------------------
    public getToDoById = (req: Request, res: Response) => {
        const id1 = + req.params.id;

        if (isNaN(id1)) {
            res.status(400).json({ error: 'ID Argument is not an number' })
            return
        }

        //{
        //const todo = todos.find(todo => todo.id === id);
        // try {
        //     const todo = await this.todorepository.findById(id1)
        //     res.json(todo)

        // } catch (error) {
        //     res.status(404).json({ error: `TODO with id ${id1} is not found` })
        //     return
        // }
        //}

        new GetTodo(this.todorepository).execute(id1).then(todo => res.json(todo)).catch(error => res.status(400).json({ error }))
    }

    //Create
    //*---------------------------------------------
    public createTodo = (req: Request, res: Response) => {
        const [error, create] = CreateDTOS.create(req.body)
        if (error) {
            res.status(400).json({ error })
            return
        }

        new CreateTodo(this.todorepository).execute(create!).then(todo => res.json(todo)).catch(error => res.status(400).json({ error }))

        // const todo = await this.todorepository.create(create!)
        // res.json(todo)
    }

    //Update
    //----------------------------------------------
    public UpdateTodo = (req: Request, res: Response) => {
        const id = + req.params.id

        const [error, updated] = UpdateDTOS.create({ ...req.body, id })
        if (error) {
            res.status(400).json({ error })
            return
        }

        new GetTodo(this.todorepository).execute(id).then(todo => res.json(todo)).catch(error => res.status(404).json({ error }))

        new UpdateTodo(this.todorepository).execute(updated!).then(todo => res.json(todo)).catch(error => res.status(400).json({ error }))

        //{
        // try {
        //     await this.todorepository.findById(id)

        // } catch (error) {
        //     res.status(404).json({ error: `TODO with id ${id} is not found` })
        //     return
        // }

        // const uptodo = await this.todorepository.updateById(updated!)

        // res.json(uptodo)
        // const todo = todos.find(todo => todo.id === id);
        //}
    }

    //Delete
    //*-------------------------------------------
    public DeleteTodo = (req: Request, res: Response) => {
        const id1 = + req.params.id
        if (isNaN(id1)) {
            res.status(400).json({ error: 'ID Argument is not an number' })
            return
        }

        new DeleteTodo(this.todorepository).execute(id1).then(todo => res.json(todo)).catch(error => res.status(404).json({ error }))

        //{
        // const todo = todos.find(todo => todo.id === id);
        // if (!todo) {
        //     res.status(404).json({ error: `TODO with id ${id} is not found` })
        //     return
        // }
        // try {
        //     const todo = await this.todorepository.deleteById(id1)
        //     res.json(todo)
        //     return
        // } catch (error) {
        //     res.status(404).json({ error: `TODO with id ${id1} is not found` })
        //     return
        // }
        // todo.id = id1
        // todo.text = text;
        // todo.created = created

        // res.json(todo)
        // const id = + req.params.id

        // todos.splice(todos.indexOf(todo), 1)
        // res.json(todo)
        //}
    }
}