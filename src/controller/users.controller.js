import { UsersService} from "../service/users.service.js";
import { Router } from "express";
import {escape} from "querystring"
import passport from "passport";
import { initializePassport } from "../config/passport.config.js";
import { config } from "../config/config.js";
import { generateToken, validateToken } from "../utils.js";
import { createHash, inValidPassword } from "../utils.js";
import { CurrentUserDTO } from "../dao/DTOs/users.dto.js";
import { compareSync } from "bcrypt";
import { logger } from "../helpers/logger.js";
import { transporter } from "../config/gmail.js"
import {emailTemplate} from "../config/gmail.js"
import { CustomError } from "../service/customErrorService.js";
import {changeRolError} from '../service/changeRolErrorService.js'



export class UsersController{

    static getFailLogin = async(req,res)=>{

        
        res.render("login",{style: 'logIn.css',logError:true ,error:"Log in error. Check user or password"});
    };
   

    static getLogin = (req,res)=>{



        let  data={
            style: 'logIn.css'
        }
        res.render("login",data);}


    

    static getSignin = (req,res)=>{



            let  data={
                style: 'signIn.css'
            }
            res.render("signIn",data);}
        
     
static postLogin = async (req,res)=>{

    try {

        const loginForm = req.body;
  

        let userFin;
        if(loginForm.InputEmail.trim()==config.admin.email && loginForm.InputPassword.trim()===config.admin.password){
    
              userFin=

            {   first_name:'CoderAdmin',
                last_name:'CoderAdmin',
                age: 0,
                email:'admin@coder.com',
                cart: "1",
                role: 'admin',
                _id: "657c62b6e298e465d8cf73e0"
            }

           let  userId="657c62b6e298e465d8cf73e0"
            userFin= await UsersService.updateLastLogin(userId);
        }
        else  {
           
                let email={};       
                email.email=loginForm.InputEmail;
                let user  = await UsersService.getUserByMail(email);
               
                if(!user[0] ){
                     return res.render("login",{ style: 'logIn.css',logError:true,error:"User doesn't exist"});
                }
             //verificar contraseña
     
                  userFin=user[0];   
                     
                 let userId=userFin._id.toString()
                 userFin= await UsersService.updateCidToUser(userId);
                 let emailUser={};
               
                 emailUser.email=loginForm.InputEmail;
                  userFin=await UsersService.getUserByMail(emailUser);
                 userFin=userFin[0]
           
  
                 if(!inValidPassword(loginForm.InputPassword,userFin)){
                return res.render("login",{ style: 'logIn.css',logError:true,error:"Some data doesn't match"});
                }
                userFin= await UsersService.updateLastLogin(userId);
            }

        
        const token = generateToken(userFin);     
   
        res.cookie("cookieToken",token,{httpOnly:true}).cookie("cartId",userFin.cart?.toString()||null).clearCookie('products').redirect("/products");

        
    } catch (error) {
       logger.error(error.message);
    }
 
}




    static postSignin = async (req,res)=>{

        try {
                const loginForm = req.body;
                  
                const user = await UsersService.getUserByMail({ email:loginForm.InputEmail});
                if(user){
        
                 return res.render("login",{ style: 'logIn.css',logError:true,error:"User already exists"});
                
                }
                else{
                const newUser = await UsersService.createUser({first_name: loginForm.InputName,
                    last_name: loginForm.InputLastname,
                    age:loginForm.InputAge,
                     email:loginForm.InputEmail,
                     password: createHash(loginForm.InputPassword )    });
                
        
                let  data={
                    style: 'logIn.css',
                    logError:true,error:"User created succesfully. Please Login"
                }
                res.render("login",data);
            }
                
            } catch (error) {
       
               logger.error(error.message);   
            }
    }

    static getCurrent =    (req,res)=>{
        
        res.json({result: UsersService.sendCurrentUser(req) /*new CurrentUserDTO(req.user)*/});
    }

    static getLogout = async(req,res)=>{
        try {
            //const userFinId=req.user._id
            console.log('aca')
          //  let userFin= await UsersService.updateLastLogin(userFinId);
            res.clearCookie('cookieToken');
            res.clearCookie('products');
            res.clearCookie('cartId');
            res.render("login", {style:"logIn.css"});
            
        } catch (error) {
            res.render("login",{error:"Coudn't log out",style: "logIn.css"});
        }
 }


static postSignin = async (req,res)=>{

        try {
                const loginForm = req.body;
                  
                const user = await UsersService.getUserByMail({ email:loginForm.InputEmail});
      
                if(user[0]){
        
                 return res.render("login",{ style: 'logIn.css',logError:true,error:"User already exists"});
                
                }
                else{
                const newUser = await UsersService.createUser({first_name: loginForm.InputName,
                    last_name: loginForm.InputLastname,
                    age:loginForm.InputAge,
                     email:loginForm.InputEmail,
                     password: createHash(loginForm.InputPassword )    });
                
        
                let  data={
                    style: 'logIn.css',
                    logError:true,error:"User created succesfully. Please Login"
                }
                res.render("login",data);
            }
                
            } catch (error) {
               // console.log(error.message);
               logger.error(error.message);   
            }
    }

    static getCreateNewPassword =  (req,res)=>{

        res.render("createNewPassword",{style: 'logIn.css'});

    }

    static getCreateNewPasswordTokenExpired =  (req,res)=>{

        res.render("createNewPasswordTokenExpired",{style: 'logIn.css'});

    }
    


   



    static getCurrent =    (req,res)=>{
        
        res.json({result: UsersService.sendCurrentUser(req) /*new CurrentUserDTO(req.user)*/});
    }

    static getLogout = async(req,res)=>{
        try {
            
            res.clearCookie('cookieToken');
            res.clearCookie('products');
            res.clearCookie('cartId');
            res.render("login", {style:"logIn.css"});
            
        } catch (error) {
            res.render("login",{error:"Coudn't log out",style: "logIn.css"});
        }
 }

 static postsendMail = async (req,res)=>{

    try {
            const loginForm = req.body;
              
            const user = await UsersService.getUserByMail({ email:loginForm.InputEmail});
            if(!user){
    
                return res.render("login",{ style: 'logIn.css',logError:true,error:"User already doesn't exists"});
            }
            else{

                const result = await transporter.sendMail({
                    from:config.gmail.account,
                    to:loginForm.InputEmail,
                    subject:"Your Card password generation",
                    html: emailTemplate(`${loginForm.InputEmail}`)
                });
           
                res.json({status:"success", message:"Email already send, please check you inbox"});

                
        }
            
        } catch (error) {
       
           logger.error(error.message);   
        }
}

static getResetPassword = async(req,res)=>{

    res.render("resetPassword",{style: "logIn.css", user: req.user.user});

}
 static getGithub =(req,res)=>{
    
    const token = generateToken(req.user);
   res.cookie("cookieToken",token,{httpOnly:true}).cookie("cartId",req.user.cart.toString()).clearCookie('products').redirect("/products");
 

}
static postUpdatePassword = async(req,res)=>{
    try {

        const loginForm = req.body;
            const user = await UsersService.getUserByMail({ email:loginForm.InputEmail})

            if(!user){
                return res.render("login",{ style: 'logIn.css',logError:true,error:"User already doesn't exists"});
            }
            else{
                
                if(inValidPassword(loginForm.InputPassword,user[0])){
                    res.json({status:"success", message:"This password has been used. Plase choose another one."});
                
                }
                else{
                    let password= createHash(loginForm.InputPassword ) 
                    let updateUser= await UsersService.updatePasswordToUser(user[0]._id.toString(),password)
                   
                    res.json({status:"success", message:"Password generated succesfully"});
                    
                        
                }

            }
        
    } catch (error) {
        logger.error(error.message);  
        
    }



}
 

static putRole =async(req,res)=>{
    try {
        const userInfo=req.body

         let statusUser= await UsersService.getUserById(userInfo.id);
       

         if(statusUser.status != 'completo'){

               
            CustomError.createError({
                    name:"Change rol error",
                    cause: changeRolError(statusUser),
                    message:"User documents are incomplete",
                    errorCode: 400//EError.INVALID_BODY_JSO
                })
                    

         }

        const result = await UsersService.updateRoleToUser(userInfo.id,userInfo.role)

        res.json({status:"success", message:"User role changes succesfully"});

    } catch (error) {
        //logger.error(error.message);  
        res.status(200).send({
        
             
              message: error.message,
              cause: error.cause
        
          });
        
    }

}

static putPremiumUid =async(req,res)=>{
    try {
        const userInfo=req.body
        const id=req.params.uid;
    

        const result = await UsersService.updateRoleToUser(id,userInfo.role)

        res.json({status:"success", message:"User role changes succesfully"});

    } catch (error) {
        logger.error(error.message);  
        
    }

}


static uploadUserDocuments = async(req,res)=>{
    try {
        const userId = req.params.uid;
        const user = await UsersService.getUserById(userId);
        // console.log("documentos", req.files);
        const identificacion = req.files['identity']?.[0] || null;
        const domicilio = req.files['adress']?.[0] || null;
        const estadoDeCuenta = req.files['accountState']?.[0] || null;
        const docs = [];
        if(identificacion){
            docs.push({name:"identity", reference: identificacion.filename});
        }
        if(domicilio){
            docs.push({name:"adress", reference: domicilio.filename});
        }
        if(estadoDeCuenta){
            docs.push({name:"accountState", reference: estadoDeCuenta.filename});
        }
        // console.log("docs", docs);
        user.documents = docs;
        if(docs.length<3){
            user.status = "incompleto";
        } else {
            user.status = "completo";
        }
        //console.log("user", user);
        await UsersService.updateUser(user._id, user);
        res.json({status:"success", message:"updated doc"});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
};


static deleteIdleUsers = async(req,res)=>{

    try {
        let currentUsers= await UsersService.getUsers();

        let currentUserId=req.user.id;

        

        let today = new Date();
    
        currentUsers.forEach(async element => {
        
            if(!element.last_connection ||(today-element.last_connection )/(1000*60)>60*24*2 ){
                if(element.show= element._id.toString() !=currentUserId && element.role !='admin'){
                    await UsersService.deleteUser(element._id);
                }
            }
        });

        res.json({status:"success", message:"users idlers deleted"});
        
    } catch (error) {

        res.json({status:"error", message:error.message});
        
    }

   

};


};
