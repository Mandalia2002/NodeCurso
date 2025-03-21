import { UpdateDTOS } from "../../dtos";
import { TodoEntity } from "../../entities";
import { TodoRepository } from "../../repositories";

export interface UpdateTodoUseCase {
    execute(dto: UpdateDTOS): Promise<TodoEntity>
}

export class UpdateTodo implements UpdateTodoUseCase {
    constructor(
        private readonly repository: TodoRepository
    ) { }
    execute(dto: UpdateDTOS): Promise<TodoEntity> {
        return this.repository.updateById(dto)
    }
}
