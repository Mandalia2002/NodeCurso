import { Create } from "../domain/use-cases/create-table.usecase";
import { Save } from "../domain/use-cases/save-file.usecase";

export interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    name: string;
    destination: string;
}

export class Server {
    static run({ base, limit, showTable, destination, name}: RunOptions) {
        console.log('Server is running...');
        const table = new Create().execute({ base, limit });
        if (showTable) {
            console.log(table);
        }
        const table2 =new Save().execute({content:table, destination, name});
    }
}