import {Create} from './create-table.usecase';

describe('CreateTable',()=>{
    test('should create a table with default settings', ()=>{
        const crea =new Create();
        const table1 = crea.execute({base:3, limit: 4});
        console.log(table1)
        expect(crea).toBeInstanceOf(Create);
    })

    test('should create a table with new settings', ()=>{
        const crea =new Create();
        const table1 = crea.execute({base:3, limit: 4});
        console.log(table1)
        expect(table1).toContain('3 x 2 = 6');
    })
})