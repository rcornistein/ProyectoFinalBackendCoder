import nodemailer from "nodemailer";
import { config } from "./config.js";
import { generateTokenMail } from "../utils.js";

export const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    auth:{
        user:config.gmail.account,
        pass:config.gmail.passgoogle
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
});

export const emailTemplate = (user)=> {
    
    const token = generateTokenMail(user);
    return `


    <div>
        <h1> Hello ${user}!!</h1>

        <p style="padding: 5px"> You have 1 hour to use the following link </p>
       
        <br>
        <br>


     
        <div style=" font-size: 18px; color: #333; line-height: 1; margin: 0; padding: 0; mso-table-lspace:0; mso-table-rspace:0;">
        <a href="http://localhost:8080/api/users/resetPassword/${token}" style="text-align:center; padding:10px 10px 10px 10px; background-color:grey; text-decoration: none; color: #333;  font-family: Arial, arial, sans-serif;" border="1"> RESET PASSWORD</a>
        <br>
        <br>
        </div>

    </div>
`;}