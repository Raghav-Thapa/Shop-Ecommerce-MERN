const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config()

class mailService{
    connection;
    constructor(){
        this.connection = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.SMTP_USER, // generated ethereal user
              pass: process.env.SMTP_PWD, // generated ethereal password
            },
          });
    }

    sendMail =  async (to, subject, content, attachments = null, cc= null, bcc= null) =>{
        try{
            let msg = {
                from: '"Admin User" no-reply@test.com', // sender address
                to: to, // list of receivers
                subject: subject, // Subject line
                html: content,
                // attachments: filepath
            }
            if(attachments){
                msg.attachments = attachments
            }
            if(cc){
                msg.cc = cc;
            }
            if(bcc){
                msg.bcc= bcc;
            }

            let response = await this.connection.sendMail(msg)
            console.log(response)
            return true

        } catch(except){
            console.log("EmailException");
        }

    }

}

const mailSvc = new mailService()
module.exports = mailSvc