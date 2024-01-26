import e from "express";
import mongoose from "mongoose";
import { config } from "./config.js";


export const mongoConnect = async() =>{
    try {

        await mongoose.connect(config.mongo.url);
        console.log("Connected to Mongo Database");
        
    } catch (error) {

        console.log("Cannot connect to database" +error)
        
    }

}