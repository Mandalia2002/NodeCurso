export interface CreateUseCase {
    execute: (options: CreateOptions) => string;
}

export interface CreateOptions {
    base: number;
    limit: number;
}

export class Create implements CreateUseCase {
    constructor(
        /**
         * DI - Dependency Injection
         */
    ) { }

    execute({ base, limit }: CreateOptions) {
        var b = 0, a = 0
        const as: Array<String> = []
        while (b <= limit) {
            a = base * b
            as.push(`${base} x ${b} = ${a}\n`)
            b++;
        }
        return as.join('')
    }
} 