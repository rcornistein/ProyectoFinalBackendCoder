import passport from "passport";

import { createHash, inValidPassword } from "../utils.js";

import {config} from "./config.js";
import GithubStrategy from "passport-github2";
import { UsersService } from "../service/users.service.js";



import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt; //Extraer el token (cookie,query params, body, headers)

export const initializePassport = ()=>{



    passport.use("jwtPassAuth", new JWTStrategy(
        {
            //Extraer la informacion del token
            
            jwtFromRequest:extractJwt.fromExtractors([cookieExtractorPass]),
            secretOrKey:config.token.privateKey
        },
        async (jwtPayload,done)=>{
            try {
                
                return done(null,jwtPayload); //req.user = info del token
            } catch (error) {
                return done(error);
            }
        }
    ));

    
    passport.use("jwtAuth", new JWTStrategy(
        {
            //Extraer la informacion del token
            
            jwtFromRequest:extractJwt.fromExtractors([cookieExtractor]),
            secretOrKey:config.token.privateKey
        },
        async (jwtPayload,done)=>{
            try {
    
                return done(null,jwtPayload); //req.user = info del token
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use("signupGithubStrategy", new GithubStrategy(
      
        {
            clientID: config.github.clientId,
            clientSecret: config.github.clientSecret,
            callbackURL: `/api/users${config.github.callbackUrl}`
           
        },
        async(accessToken,refreshToken,profile,done)=>{
            try {
         
        
                let user = await UsersService.getUserByMail({email:profile.username});
                let userFin;
              
               
                if(user[0]){
                    //el usuario ya esta registrado

       
            
                    const userId=user[0]._id.toString();
                    userFin= await UsersService.updateCidToUser(userId);
                   let userFin2= await UsersService.getUserByMail({email:profile.username});
                   let actualiza = await UsersService.updateLastLogin(userId)
         
                    return done(null,userFin2[0]);
                }
                //El usuario no esta registrado
                const newUser = {
                    first_name: profile.username,
                    last_name: '',
                    age:0,
                    email:profile.username,
                    password:'github'
                };
            
                 user = await UsersService.createUser(newUser);
                 const userId=user._id.toString()
           
                userFin= await UsersService.updateCidToUser(userId);
                 let userFin2= await UsersService.getUserByMail(newUser.email)[0];
                 let actualiza = await UsersService.updateLastLogin(userId)
                return done(null,userFin2);
            } catch (error) {
                return done(error)
            }
        }
    ));

}

//funcion para extraer el token de la cookie
const cookieExtractor = (req)=>{
    let token;
    if(req && req.cookies){ //req?.cookies
        token = req.cookies["cookieToken"];
    } else {
        token = null;
    }
    return token;
};

//funcion para extraer el token del req.params

const cookieExtractorPass = (req)=>{
    let token;
    if(req ){ 
        token = req.params.token;
    } else {
        token = null;
    }
  
    return token;
};