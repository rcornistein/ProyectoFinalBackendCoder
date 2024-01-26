import winston from "winston";
import {__dirname} from "../utils.js";
import path from "path";
import {config} from "../config/config.js";

const currentEnv = config.currentEnv;
// console.log(process.env);
//logger para dev
const devLogger = winston.createLogger({
    //definimos transportes: sistemas de muestra o almacenamiento de logs
    transports:[
        new winston.transports.Console({level:"debug"}),
    ]
});

//logger para prod
const prodLogger = winston.createLogger({
    transports:[
        new winston.transports.File({filename:path.join(__dirname,"/logs/prod.log"), level:"info"})
    ]
});

let logger;
if(currentEnv === "development"){
    logger = devLogger;
} else {
    logger = prodLogger;
}

export {logger};