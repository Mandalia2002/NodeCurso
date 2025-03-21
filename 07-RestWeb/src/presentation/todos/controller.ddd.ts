import { Request, Response } from "express"
import { CreateDTOS, UpdateDTOS } from "../../domain/dtos";
import { TodoRepository } from "../../domain";


export class TodosController {
    constructor(
        private readonly todorepository: TodoRepository,
    ) { }

    // Read All
    //*---------------------------------------------
    public getTodos = async (req: Request, res: Response) => {
        const todo = await this.todorepository.getAll()
        res.json(todo);
        return
    }

    //Read One
    //*----------------------------------------------
    public getToDoById = async (req: Request, res: Response) => {
        const id1 = + req.params.id;

        if (isNaN(id1)) {
            res.status(400).json({ error: 'ID Argument is not an number' })
            return
        }

        //const todo = todos.find(todo => todo.id === id);
        try {
            const todo = await this.todorepository.findById(id1)
            res.json(todo)

        } catch (error) {
            res.status(404).json({ error: `TODO with id ${id1} is not found` })
            return
        }
    }

    //Create
    //*---------------------------------------------
    public createTodo = async (req: Request, res: Response) => {
        const [error, create] = CreateDTOS.create(req.body)
        if (error){ res.status(400).json({ error }) 
            return}

        const todo = await this.todorepository.create(create!)

        res.json(todo)
    }

    //Update
    //----------------------------------------------
    public UpdateTodo = async (req: Request, res: Response) => {
        const id = + req.params.id


        const [error, updated] = UpdateDTOS.create({ ...req.body, id })
        if (error){res.status(400).json({ error })
            return
        }

        try {
            await this.todorepository.findById(id)

        } catch (error) {
            res.status(404).json({ error: `TODO with id ${id} is not found` })
            return
        }

        const uptodo = await this.todorepository.updateById(updated!)

        res.json(uptodo)

        // const todo = todos.find(todo => todo.id === id);
    }

    //Delete
    //*-------------------------------------------
    public DeleteTodo = async (req: Request, res: Response) => {
        const id1 = + req.params.id
        if (isNaN(id1)) {
            res.status(400).json({ error: 'ID Argument is not an number' })
            return
        }

        // const todo = todos.find(todo => todo.id === id);
        // if (!todo) {
        //     res.status(404).json({ error: `TODO with id ${id} is not found` })
        //     return
        // }
        try {
            const todo = await this.todorepository.deleteById(id1)
            res.json(todo)
            return
        } catch (error) {
            res.status(404).json({ error: `TODO with id ${id1} is not found` })
            return
        }

        // todo.id = id1
        // todo.text = text;
        // todo.created = created

        // res.json(todo)
        // const id = + req.params.id

        // todos.splice(todos.indexOf(todo), 1)
        // res.json(todo)
    }
}