import request from 'supertest'
import { testServer } from '../../test-server'
import { prisma } from '../../../src/data/postgres'

describe('Route', () => {

    beforeAll(async () => {
        await testServer.start()
    })

    afterAll(() => {
        testServer.close()
    })

    beforeEach(async () => {
        await prisma.todo.deleteMany()
    })

    const todo1 = { text: 'Sandia 1' }
    const todo2 = { id: 1, text: 'Sandia 2', created: null }
    const todo3 = { id: 5, text: 'Update', created: '2027-10-08T00:00:00.000Z' }

    //Create y Get Todos
    test('return todos', async () => {
        await prisma.todo.deleteMany()
        await prisma.todo.createMany({
            data: [todo1, todo2]
        })

        const { body } = await request(testServer.app).get('/api/todos').expect(200)
        expect(body).toBeInstanceOf(Array)
        expect(body.length).toBe(2)
        expect(body[0].text).toBe(todo1.text)
        expect(body[1].text).toBe(todo2.text)
    })

    test('return new api/todos/', async () => {
        const { body } = await request(testServer.app).post(`/api/todos/`).send(todo1).expect(201)

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            created: null
        })
    })

    test('return Error Required api/todos/', async () => {
        const as = ''
        const { body } = await request(testServer.app).post(`/api/todos/`).send({
            id: as,
            text: '',
            created: null
        }).expect(400)

        expect(body).toEqual({ error: `Text property is required` })
    })

    //Get Todo by ID
    test('return api/todos/:id', async () => {
        const todo = await prisma.todo.create({ data: todo1 })

        const { body } = await request(testServer.app).get(`/api/todos/${todo.id}`).expect(200)

        expect(body).toEqual({
            id: todo.id,
            text: todo.text,
            created: todo.created
        })
    })

    test('return 404 error api/todos/:id', async () => {
        const id = 999
        const { body } = await request(testServer.app).get(`/api/todos/${id}`).expect(404)

        expect(body).toEqual({ error: `Todo with id ${id} not found` })
    })

    test('return Invalid ID api/todos/:id', async () => {
        const id = null
        const { body } = await request(testServer.app).get(`/api/todos/${id}`).expect(400)

        expect(body).toEqual({ error: 'ID Argument is not an number' })
    })

    //Update
    test('return update api/todos/:id', async () => {
        const todo = await prisma.todo.create({ data: todo1 })

        const { body } = await request(testServer.app).put(`/api/todos/${todo.id}`).send({
            text: todo2.text,
            created: todo2.created
        }).expect(200)

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo2.text,
            created: todo2.created
        })
    })

    test('return error update not found api/todos/:id', async () => {
        const as = 555555
        const { body } = await request(testServer.app).put(`/api/todos/${as}`).expect(404)

        expect(body).toEqual({ error: `Todo with id ${as} not found` })
    })

    test('return update only date', async () => {
        const todo = await prisma.todo.create({ data: todo1 })

        const { body } = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({ created: todo3.created })
            .expect(200)

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            created: todo3.created
        })
    })

    //Delete
    test('show and then delete', async () => {
        const todo = await prisma.todo.create({ data: todo3 })

        const { body } = await request(testServer.app)
            .delete(`/api/todos/${todo.id}`)
            .expect(200)

        expect(body).toEqual({
            id: 5, 
            text: 'Update', 
            created: '2027-10-08T00:00:00.000Z' 
        })
    })

    test('return Invalid ID delete api/todos/:id', async () => {
        const id = null
        const { body } = await request(testServer.app).delete(`/api/todos/${id}`).expect(400)

        expect(body).toEqual({ error: 'ID Argument is not an number' })
    })
})
