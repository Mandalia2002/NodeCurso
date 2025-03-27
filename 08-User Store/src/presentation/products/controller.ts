import { CustomError, PaginationDTO } from "../../domain"
import { Response, Request } from 'express'
import { CreateProDTO } from "../../domain"
import { ProductService } from "../services/product.service"

export class ProductController {
    constructor(
        private readonly catser: ProductService
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        console.log(`${error}`)
        return CustomError.internalserver('Internal Server Error')
    }

    createProduct = async (req: Request, res: Response) => {
        const [error, create] = CreateProDTO.create({
            ...req.body,
            user: req.body.user.id,
        })
        if (error) return res.status(400).json({ error })

        this.catser.createProduct(create!)
            .then(product => res.status(201).json(product))
            .catch((error) => this.handleError(error, res))
     }

    getProduct = async (req: Request, res: Response) => {
        const { page=1, limit=10} = req.query
        const [error, pagina] = PaginationDTO.create(+page, +limit)
        if (error) return res.status(400).json({ error })
        this.catser.getproducts(pagina!)
            .then(product => res.status(201).json(product))
            .catch((error) => this.handleError(error, res))
    }
}