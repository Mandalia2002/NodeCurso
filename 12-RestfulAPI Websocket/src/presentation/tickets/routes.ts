import { Router } from "express";
import { TicketController } from "./controller";

export class TicketRoutes {
    static get routes() {
        const router = Router()
        const ticketCon = new TicketController()

        router.get('/', ticketCon.getTickets)
        router.get('/last', ticketCon.getLastTicket)
        router.get('/pending', ticketCon.pendingTicket)

        router.post('/', ticketCon.createTicket)

        router.get('/draw/:desk', ticketCon.drawTicket)
        router.put('/done/:ticketId', ticketCon.TicketFinished)

        router.get('/working-on', ticketCon.workingOn)

        return router;
    }
}