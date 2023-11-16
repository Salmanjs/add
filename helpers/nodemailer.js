let mailer = require ('nodemailer');


function mail(mailoption){
    return new Promise((res,rej)=>{
        let transporter=mailer.createTransport({
            pool :true,
            host:"smtp.gmail.com",
            port:465,
            secure:true,
            auth:{
                user:'salmanhashmi8452@gmail.com',
                pass:'ielx urjh kmhn xqiv'
            }
        })
        transporter.sendMail(mailoption,(error,info)=>{
            if(error){
                return rej(error);
            }
            return res(`mail is send to ${mailoption.to}`)
        })
    })
}



module.exports={mail}
