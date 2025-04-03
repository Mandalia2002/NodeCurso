import { Request, Response } from "express";
import { TicketService } from "../services/ticket.service";

export class TicketController{
    constructor(
        private readonly tick= new TicketService()
    ){}

    public getTickets=async(req: Request, res: Response)=>{
        res.json(this.tick.tickets)
    }

    public getLastTicket = async (req:Request, res: Response)=>{
        res.json(this.tick.lastick)
    }

    public pendingTicket = async (req:Request, res: Response)=>{
        res.json(this.tick.pendingtick)
    }

    public createTicket = async (req:Request, res: Response)=>{
        res.status(201).json(this.tick.createtick())
    }

    public drawTicket = async (req:Request, res: Response)=>{
        const {desk} = req.params

        res.json(this.tick.drawticket(desk))
    }

    public TicketFinished = async (req:Request, res: Response)=>{
        const {ticketId}= req.params

        res.json(this.tick.finished(ticketId))
    }

    public workingOn = async (req:Request, res: Response)=>{
        res.json(this.tick.workingOn)
    }
}