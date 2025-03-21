import { CreateDTOS, UpdateDTOS } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDatasource{
    abstract create(createDtos: CreateDTOS):Promise<TodoEntity>

    abstract getAll(): Promise<TodoEntity[]>
    
    abstract findById(id:number): Promise<TodoEntity>
    abstract updateById(updateTodo: UpdateDTOS): Promise<TodoEntity>
    abstract deleteById(id: number): Promise<TodoEntity>
}