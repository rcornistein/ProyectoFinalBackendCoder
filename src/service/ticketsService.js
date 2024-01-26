import { ticketsService } from "../dao/factory.js";


export class TicketsService{

    static createTicket(purchase){
        return ticketsService.createTicket(purchase)
    };

        
    
}