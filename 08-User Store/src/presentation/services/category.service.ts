import { categoryModel } from "../../data/mongo";
import { UserIdentity, CreateCatDTO, CustomError } from "../../domain";

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
    async getCategories() {
        try {
            const exist = await categoryModel.find()
            return exist.map(category => ({
                id: category.id,
                name: category.name,
                available: category.available
            }))

        } catch (error) {
            throw CustomError.internalserver(`${error}`)
        }
    }
}