import { CustomError, CreateCatDTO } from "../../domain"
import { Response, Request } from 'express'
import { CategoryService } from "../services"
import { PaginationDTO } from "../../domain/dtos/shared/pagination.dto"

export class CategoryController {
    constructor(
        private readonly catser: CategoryService
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        console.log(`${error}`)
        return CustomError.internalserver('Internal Server Error')
    }

    createcategory = async (req: Request, res: Response) => {
        const [error, create] = CreateCatDTO.create(req.body)
        if (error) return res.status(400).json({ error })
        this.catser.createCategory(create!, req.body.user)
            .then(category => res.status(201).json(category))
            .catch((error) => this.handleError(error, res))
    }

    getcategories = async (req: Request, res: Response) => {
        const {page=1, limit=10} = req.query
        const[error, pagina] =PaginationDTO.create(+page,+limit)
        if (error) return res.status(400).json({ error })
        this.catser.getCategories(pagina!)
            .then(category => res.status(201).json(category))
            .catch((error) => this.handleError(error, res))
    }
}