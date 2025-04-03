import { UUIDAdapter } from "../../config/uuid";
import { Ticket } from "../../domain/interfaces/ticket";
import { wssService } from "./wss.service";

export class TicketService {

    constructor(
        private readonly wsss = wssService.instanceof
    ) { }

    public tickets: Ticket[] = [
        { id: UUIDAdapter.v4(), number: 1, createdAt: new Date(), done: false, handleAt: new Date() },
        { id: UUIDAdapter.v4(), number: 2, createdAt: new Date(), done: false, handleAt: new Date() },
        { id: UUIDAdapter.v4(), number: 3, createdAt: new Date(), done: false, handleAt: new Date() },
        { id: UUIDAdapter.v4(), number: 4, createdAt: new Date(), done: false, handleAt: new Date() },
        { id: UUIDAdapter.v4(), number: 5, createdAt: new Date(), done: false, handleAt: new Date() },
    ]

    private readonly working: Ticket[] = []

    public get pendingtick(): Ticket[] {
        return this.tickets.filter(ticket => !ticket.handleDesk)
    }

    public get lastick(): number {
        return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0
    }

    public createtick() {

        const ticket: Ticket = {
            id: UUIDAdapter.v4(),
            number: this.lastick + 1,
            createdAt: new Date(),
            done: false,
            handleAt: undefined,
            handleDesk: undefined
        }

        this.tickets.push(ticket)
        this.change()

        return ticket
    }

    public drawticket(desk: string) {
        const ticket = this.tickets.find(t => !t.handleDesk)
        if (!ticket) return { status: 'error', message: 'No hay :c' }

        ticket.handleDesk = desk
        ticket.handleAt = new Date()

        this.working.unshift({ ...ticket })

        this.change()
        this.desks

        return { status: 'ok', ticket }
    }

    public finished(id: string) {
        const ticket = this.tickets.find(t => t.id === id)
        if (!ticket) return { status: 'error', message: 'No esta :c' }

        this.tickets = this.tickets.map(ticket => {
            if (ticket.id === id) {
                ticket.done = true,
                    ticket.handleAt = new Date()
            }
            return ticket
        })
        return { status: 'ok' }
    }

    public get workingOn(): Ticket[] {
        return this.working.slice(0, 4)
    }

    private change() {
        this.wsss.send('ticket', this.pendingtick.length)
    }

    private desks(){
        this.wsss.send('ticket', this.lastick)
    }
}