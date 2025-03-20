import { Request, Response } from "express"

const todos = [
    { id: 1, text: 'Sandia', created: new Date() },
    { id: 2, text: 'Melon', created: null },
    { id: 3, text: 'Uvas', created: new Date() },
    { id: 4, text: 'Pera', created: new Date() },
]

export class TodosController {
    constructor() { }

    //Read
    //---------------------------------------------
    public getTodos = (req: Request, res: Response) => {
        res.json(todos);
        return
    }

    public getToDoById = (req: Request, res: Response) => {
        const id = + req.params.id;

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID Argument is not an number' })
            return
        }

        const todo = todos.find(todo => todo.id === id);

        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `TODO with id ${id} is not found` })
    }

    //Create
    //---------------------------------------------
    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body
        if (!text) {
            res.status(400).json({ error: 'Text property is required' })
            return
        }
        const body = {
            id: todos.length + 1,
            text: text,
            created: null
        }

        todos.push(body)

        res.json(body)
    }
    //Update
    //----------------------------------------------
    public UpdateTodo = (req: Request, res: Response) => {
        const id = + req.params.id
        if (isNaN(id)) {
            res.status(400).json({ error: 'ID Argument is not an number' })
            return
        }

        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            res.status(404).json({ error: `TODO with id ${id} is not found` })
            return
        }

        const { text, created } = req.body;

        todo.text = text || todo.text;
        (created === 'null')
            ? todo.created = null
            : todo.created = new Date(created || todo.created)

        res.json(todo)
    }

    //Delete
    //-------------------------------------------
    public DeleteTodo = (req: Request, res: Response) => {
        // const id = + req.params.id
        // if (isNaN(id)) {
        //     res.status(400).json({ error: 'ID Argument is not an number' })
        //     return
        // }

        // const todo = todos.find(todo => todo.id === id);
        // if (!todo) {
        //     res.status(404).json({ error: `TODO with id ${id} is not found` })
        //     return
        // }

        // const { id1, text , created } = req.body;

        // todo.id = id1
        // todo.text = text;
        // todo.created = created
            
        // res.json(todo)

        const id = + req.params.id
        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            res.status(404).json({ error: `TODO with id ${id} is not found` })
            return
        }
        todos.splice(todos.indexOf(todo),1)
        res.json(todo)
    }
}