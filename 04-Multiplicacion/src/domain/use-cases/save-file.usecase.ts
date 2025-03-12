import fs from 'fs';

export interface SaveUseCase {
    execute: (options: SaveOptions) => boolean;
}

export interface SaveOptions {
    content: string;
    destination: string;
    name: string;
}

export class Save implements SaveUseCase {
    constructor(
        /**
         * DI - Dependency Injection
         */
    ) { }


    execute({ content, destination = 'outputs', name = 'table' }: SaveOptions): boolean {
        try {
            fs.mkdirSync(`./${destination}`, {recursive:true})
            fs.writeFileSync(`./${destination}/${name}.txt`, content, { flag: 'a+' });
            console.log('Archivo creado');
            return true;
        } catch (err) {
            return false;
        }
    }
} 