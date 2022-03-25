import nodemailer from 'nodemailer';

import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASSWORD
  }
})

const sendWelcomeEmail = (email, name) => transporter.sendMail({
  from: process.env.EMAIL_ACCOUNT,
  to: email,
  subject: "Welcome!",
  text: `Thanks for joining us, ${name}. 
  
  Regards.`
}, (err, info) => {
  if(err){
    return console.log(err)
  }
  console.log("Message sent: %s", info.messageId);
})

export {
  sendWelcomeEmail,
}
