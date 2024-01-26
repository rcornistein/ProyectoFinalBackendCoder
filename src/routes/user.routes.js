import { Router } from "express";
import {escape} from "querystring"
import passport from "passport";
import { initializePassport } from "../config/passport.config.js";
import { config } from "../config/config.js";
import { generateToken, validateToken } from "../utils.js";
import { createHash, inValidPassword } from "../utils.js";
import { uploadDocuments } from "../utils.js";

import {isAuth,checkRole} from "../middlewares/auth.js"

//import { productsModel } from "../dao/models/product.model.js";


import { UsersController } from "../controller/users.controller.js";

initializePassport();

const userRouter = Router();




userRouter.get("/fail-login",UsersController.getFailLogin);


userRouter.get("/login", UsersController.getLogin );
 

 userRouter.get("/signin", UsersController.getSignin);



userRouter.post("/signin",UsersController.postSignin);




 userRouter.post("/login" ,UsersController.postLogin);


userRouter.get("/current" , passport.authenticate("jwtAuth",{session:false}), UsersController.getCurrent);



userRouter.get("/logout",passport.authenticate("jwtAuth",{session:false}) ,UsersController.getLogout);




 userRouter.get("/github", passport.authenticate("signupGithubStrategy",{scope:['user:mail']}),async(req,res)=>{
    });
 //ruta del callback con github
 
 userRouter.get(config.github.callbackUrl, passport.authenticate("signupGithubStrategy",{session:false,
     failureRedirect:"/api/users/fail-login"
 }), UsersController.getGithub);    


userRouter.get("/generatePassword",UsersController.getCreateNewPassword)

userRouter.get("/createNewPasswordTokenExpired",UsersController.getCreateNewPasswordTokenExpired)

userRouter.post("/sendEmail",UsersController.postsendMail)

userRouter.post("/updatePassword",UsersController.postUpdatePassword)

userRouter.get("/resetPassword/:token",passport.authenticate("jwtPassAuth",{session:false,
    failureRedirect:"/api/users/createNewPasswordTokenExpired"
}),UsersController.getResetPassword)

userRouter.put('/',passport.authenticate("jwtAuth",{session:false}),isAuth, checkRole(["admin"]), UsersController.putRole)


userRouter.put('/premium/:uid', UsersController.putPremiumUid)

userRouter.delete('/', passport.authenticate("jwtAuth",{session:false}),isAuth, checkRole(["admin"]),UsersController.deleteIdleUsers)


userRouter.post("/:uid/documents", /* passport.authenticate("jwtAuth",{session:false}),*/ uploadDocuments.fields([
    {name:"identity", maxCount:1},
    {name:"adress", maxCount:1},
    {name:"accountState", maxCount:1},
]),  UsersController.uploadUserDocuments );

 export default userRouter;
