import Router from "express";
import { MockingController } from "../controller/mocking.controller.js";


const mockingRouter= Router();




mockingRouter.get('/',MockingController.getMockingProducts);


export default mockingRouter;