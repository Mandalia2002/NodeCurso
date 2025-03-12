import { Save } from './save-file.usecase';
import fs, { mkdir } from 'fs'

describe('SaveFile', () => {
    test('should save a file with default settings', () => {
        const crea = new Save();
        const save = crea.execute({ content: 'sandia', destination: './outputs', name: '' });
        expect(save).toBe(true);
    })

    test('should save a file with custom settings', () => {
        const crea = new Save();
        const save = crea.execute({ content: 'custom content', destination: './custom-output/file-destination', name: 'custom-table-name' });
        expect(fs.readFileSync('./custom-output/file-destination/custom-table-name.txt', {encoding:'utf-8'})).toContain('custom content')
    })

    test('should return error if file not created', () => {
        const crea = new Save();
        const save = crea.execute({ content: 'custom¿¿¿¿¿', destination: './cus/n', name: 'custom/table+name' });
        expect(save).toBe(false);
    })

    test('should return error if dir not created', () => {
        const crea = new Save();
        const save = crea.execute({ content: 'custom¿¿¿¿¿', destination: '|||||||||a', name: 'customname' });
        expect(save).toBe(false);
    })
})