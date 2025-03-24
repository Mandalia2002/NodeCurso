import { prisma } from "../../data/postgres";
import { CreateDTOS, TodoDatasource, TodoEntity, UpdateDTOS } from "../../domain";
import { CustomError } from "../../domain/errors/custom.error";

export class TodoDatasourceImpl implements TodoDatasource{
    async create(createDtos: CreateDTOS): Promise<TodoEntity> {
        const todo = await prisma.todo.create({data: {text: createDtos.text}})
        return TodoEntity.from(todo)
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany()
        return todos.map(todo => TodoEntity.from(todo))
    }

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({where: {id}})
        if(!todo) throw new CustomError (`Todo with id ${id} not found`, 404)
        return TodoEntity.from(todo)
    }

    async updateById(updateTodo: UpdateDTOS): Promise<TodoEntity> {
        await this.findById(updateTodo.id)
        const uptodo = await prisma.todo.update({
            where: { id: updateTodo.id },
            data: {
                text: updateTodo.text,
                created: updateTodo.created
            }
        })

        return TodoEntity.from(uptodo)
    }

    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id)
        const todo = await prisma.todo.delete({
            where: {
                id
            }
        })
        return TodoEntity.from(todo)
    }
}