import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreateDTOS, UpdateDTOS } from "../../domain/dtos";


export class TodosController {
    constructor() { }

    // Read All
    //*---------------------------------------------
    public getTodos = async (req: Request, res: Response) => {
        const todo = await prisma.todo.findMany()
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

        const todo = await prisma.todo.findFirst({
            where: {
                id: id1
            }
        })

        if (!todo) {
            res.status(404).json({ error: `TODO with id ${id1} is not found` })
            return
        }

        res.json(todo)
    }

    //Create
    //*---------------------------------------------
    public createTodo = async (req: Request, res: Response) => {
        const [error, create] = CreateDTOS.create(req.body)
        if (error) return res.status(400).json({ error })

        const text = req.body
        const todo = await prisma.todo.create({
            data: {
                text: text,
            }
        })

        res.json(todo)
    }

    //Update
    //----------------------------------------------
    public UpdateTodo = async (req: Request, res: Response) => {
        const id = + req.params.id
        

        const [error, updated] = UpdateDTOS.create({...req.body, id})
        if (error) return res.status(400).json({ error })

        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        })

        if (!todo) {
            res.status(404).json({ error: `TODO with id ${id} is not found` })
            return
        }

        const { text, created } = req.body
        const uptodo = await prisma.todo.update({
            where: { id },
            data: {
                text: updated?.text,
                created: updated?.created
            }
        })

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

        const todo = await prisma.todo.delete({
            where: {
                id: id1,
            }
        })

        if (!todo) {
            res.status(404).json({ error: `TODO with id ${id1} is not found` })
            return
        }

        res.json(todo)

        // todo.id = id1
        // todo.text = text;
        // todo.created = created

        // res.json(todo)
        // const id = + req.params.id

        // todos.splice(todos.indexOf(todo), 1)
        // res.json(todo)
    }
}