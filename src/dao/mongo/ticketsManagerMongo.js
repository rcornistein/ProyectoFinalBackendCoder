import mongoose from "mongoose";
import {ticketsModel}  from  "../models/tickets.mongo.js"


export class TicketManagerMongo{

    constructor(){
        this.model= ticketsModel;
    };


    async createTicket(newTicket){
        try {
            const resultado= await this.model.create(newTicket);
            return resultado;
             
         } catch (error) {
             console.log("Create Cart",error.message);
             throw  new Error(`Could not create cart ${error.message}`);
         }


    }



}