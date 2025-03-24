
export class CreateDTOS {

    private constructor(
        public readonly text: string,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateDTOS?] {

        const { text } = props;
        if (!text || text.length === 0) return ['Text property is required', undefined];

        return [undefined, new CreateDTOS(text)]
    }
}