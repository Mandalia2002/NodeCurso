import yargs, { options, parseSync } from 'yargs';
import { hideBin } from 'yargs/helpers';

export const mu = (argv: { [key: string]: any }) => {
    if (argv.b < 1 || argv.a < 1) {
        throw ('Error, numero negativo detectado');
    }
}

export const yarg = yargs(hideBin(process.argv))
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Base'
    })
    .option('a', {
        alias: 'limit',
        type: 'number',
        default: 10,
        describe: 'Limite'
    })
    .option('s', {
        alias: 'show',
        type: 'boolean',
        default: false,
        describe: 'Mostrar'
    })
    .option('n', {
        alias: 'name',
        type: 'string',
        default: 'table',
        describe: 'nombre'
    })
    .option('d', {
        alias: 'destination',
        type: 'string',
        default: './outputs',
        describe: 'destinacion'
    })
    .check((argv, options) => {
        mu(argv);
        return true;
    })
    .parseSync()