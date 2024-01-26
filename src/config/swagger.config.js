import{ __dirname} from "../utils.js";
import swaggerJsDoc from "swagger-jsdoc";
import path from "path";

const swaggerOptions = {
    definition:{
        openapi:"3.0.1",
        info:{
            title: "Documen",
            version:"1.0.0",
            description:"YourCar api's documentation"
        },
    },
    apis:[`${path.join(__dirname,"/docs/**/*.yaml")}`],//archivos que contienen la documentación de las rutas
};

//crear una variable que interpreta las opciones para trabajar con swagger
export const swaggerSpecs = swaggerJsDoc(swaggerOptions);