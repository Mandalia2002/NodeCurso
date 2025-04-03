export interface Ticket{
    id: string
    number: number
    createdAt: Date
    handleDesk?: string
    handleAt?: Date
    done: boolean
}