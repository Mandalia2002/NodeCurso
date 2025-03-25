import { CustomError } from "../../domain"
import { Response, Request } from 'express'

export class ProductController {
    constructor(
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        console.log(`${error}`)
        return CustomError.internalserver('Internal Server Error')
    }

    createproduct = async (req: Request, res: Response) => {
        res.json('Create Category')
    }

    getproduct = async (req: Request, res: Response) => {
        res.json('Get Category')
    }

    getproducts = async (req: Request, res: Response) => {
        res.json('Get Category')
    }
}