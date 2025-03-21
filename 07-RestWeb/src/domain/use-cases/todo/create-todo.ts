import { CreateDTOS } from "../../dtos";
import { TodoEntity } from "../../entities";
import { TodoRepository } from "../../repositories";

export interface CreateTodoUseCase {
    execute(dto: CreateDTOS): Promise<TodoEntity>
}

export class CreateTodo implements CreateTodoUseCase {
    constructor(
        private readonly repository: TodoRepository
    ) { }
    execute(dto: CreateDTOS): Promise<TodoEntity> {
        return this.repository.create(dto)
    }
}
