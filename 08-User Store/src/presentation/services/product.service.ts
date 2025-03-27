import { productModel } from "../../data/mongo";
import {CreateProDTO, CustomError, PaginationDTO } from "../../domain";

export class ProductService {
    constructor() { }

    async createProduct(createProductDto: CreateProDTO) {
        const exist = await productModel.findOne({ name: createProductDto.name })
        if (exist) throw CustomError.badrequest('Product already exists')
        try {

            const Product = new productModel(createProductDto)

            await Product.save()

            return Product
                // id: Product.id,
                // name: Product.name,
                // available: Product.available,
                // price: Product.price,
                // description: Product.description
            
        } catch (error) {
            throw CustomError.internalserver(`${error}`)
        }
    }

    // public getTodos = (req: Request, res: Response) => {
    //     new GetTodos(this.todorepository).execute().then(todos => res.json(todos))
    //     .catch(error => this.handleError(res,error))
    // }
    async getproducts(pagination : PaginationDTO) {
        const {page, limit}=pagination

        try {
            // const total = await productModel.countDocuments()
            // const exist = await productModel.find()
            //     .skip((page-1)*limit)
            //     .limit(limit)
            //     .populate('user')

            const[total, exist]=await Promise.all([
                productModel.countDocuments(),
                productModel.find()
                    .skip((page-1)*limit)
                    .limit(limit)
                    .populate('user')
            ])

            
            return {
                page:page,
                limit:limit,
                total:total,
                next:`/api/products?page=${page}&limit=${limit}`,
                prev:(page-1>0)?`/api/products?page=${page}&limit=${limit}`:null,

                exist:exist

                // exist: exist.map(Product => ({
                // id: Product.id,
                // name: Product.name,
                // available: Product.available,
                // price: Product.price,
                // description: Product.description

            // }))
        } 
        } catch (error) {
            throw CustomError.internalserver(`${error}`)
        }
    }
}