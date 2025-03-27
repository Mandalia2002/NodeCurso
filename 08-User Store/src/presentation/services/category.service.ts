import { categoryModel } from "../../data/mongo";
import { UserIdentity, CreateCatDTO, CustomError, PaginationDTO } from "../../domain";

export class CategoryService {
    constructor() { }

    async createCategory(createCategoryDto: CreateCatDTO, user: UserIdentity) {
        const exist = await categoryModel.findOne({ name: createCategoryDto.name })
        if (exist) throw CustomError.badrequest('Category already exists')
        try {

            const category = new categoryModel({
                ...createCategoryDto,
                user: user.id
            })

            await category.save()

            return {
                id: category.id,
                name: category.name,
                available: category.available
            }
        } catch (error) {
            throw CustomError.internalserver(`${error}`)
        }
    }

    // public getTodos = (req: Request, res: Response) => {
    //     new GetTodos(this.todorepository).execute().then(todos => res.json(todos))
    //     .catch(error => this.handleError(res,error))
    // }
    async getCategories(pagination : PaginationDTO) {
        const {page, limit}=pagination

        try {
            // const total = await categoryModel.countDocuments()
            // const exist = await categoryModel.find()
            //     .skip((page-1)*limit)
            //     .limit(limit)

            const[total, exist]=await Promise.all([
                categoryModel.countDocuments(),
                categoryModel.find()
                    .skip((page-1)*limit)
                    .limit(limit)
            ])

            
            return {
                page:page,
                limit:limit,
                total:total,
                next:`/api/categories?page=${page}&limit=${limit}`,
                prev:(page-1>0)?`/api/categories?page=${page}&limit=${limit}`:null,

                exist: exist.map(category => ({
                id: category.id,
                name: category.name,
                available: category.available
            }))
        } 
        } catch (error) {
            throw CustomError.internalserver(`${error}`)
        }
    }
}