import { CreateDTOS, TodoDatasource, TodoEntity, TodoRepository, UpdateDTOS } from "../../domain";

export class TodoRepositoryImpl implements TodoRepository{

    constructor(
        private readonly datasource: TodoDatasource
    ){}

    create(createDtos: CreateDTOS): Promise<TodoEntity> {
        return this.datasource.create(createDtos)
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll()
    }
    findById(id: number): Promise<TodoEntity> {
        return this.datasource.findById(id)
    }
    updateById(updateTodo: UpdateDTOS): Promise<TodoEntity> {
        return this.datasource.updateById(updateTodo)
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.datasource.deleteById(id)
    }
}
