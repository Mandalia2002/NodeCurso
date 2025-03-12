import {httpClient} from '../../src/public';

describe('http-client', () => { 
    test('get', async () => { //Solamente verifica que si tiene informacion sin importar como esta
        const data = await httpClient.get('https://jsonplaceholder.typicode.com/todos/1');
        expect(data).toEqual({
            userId: 1,
            id: 1,
            title: 'delectus aut autem',
            completed: expect.any(Boolean),
        });
    });

    test('post, delete, put exists', async () => { 
        const a= httpClient.post('https://jsonplaceholder.typicode.com/todos/1', {});
        const b= httpClient.put('https://jsonplaceholder.typicode.com/todos/1', {});
        const c= httpClient.delete('https://jsonplaceholder.typicode.com/todos/1');

        expect(httpClient.post).toBeDefined();
        expect(httpClient.put).toBeDefined();
        expect(httpClient.delete).toBeDefined();
    });
});
