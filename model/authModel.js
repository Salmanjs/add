    // let joi = require('joi')
    // let  {User} = require('../schema/userSchema')
    // const security = require('../helpers/security')



    // async function create(params){
    //     let valid= await check(params).catch((err)=>{
    //         return {error:err}
    //     });
    //     if(!valid || (valid && valid.error)){
    //         return {error : valid.error}
    //     }
    //     let findUser =await User.findOne({where:{Email_id:params.Email}}).catch((err)=>{
    //         return {error:err}
    //     });
    //     if(findUser || (findUser && findUser.error)){
    //         return {error:'internal server error'}
    //     }
    //     let password = await security.hash(params.password).catch((err)=>{
    //         return {error:err}
    //     });
    //     if(!password || (password&&password.error)){
    //         return {error:"password not incrypted"}
    //     }    
    //     let userData={
    //         Name:params.userName,
    //         Email_id:params.Email,
    //         Contact:params.Phone,
    //         Password:password.data
    //     }
    //     let data =await User.create(userData).catch((err)=>{
    //         return {error:err}
    //     });
    //     console.log(data);
    //     if(!data || (data && data.error)){
    //         return {error:'internal server error'}
    //     }
    //     return {data : data};
    // }
    // async function check(data){
    //     let schema = joi.object({
    //         userName:joi.string().min(3).max(15).required(),
    //         Email:joi.string().min(5).max(25).required(),
    //         Phone:joi.string().required(),
    //         Password:joi.string().min(8).max(14).required(),
    //     });
    //     let valid =await schema.validateAsync(data).catch((err)=>{
    //         return {error:err}
    //     });
    //     if(!valid || (valid && valid.error)){
    //         let msg =[];
    //         for(let i of valid.error.details){
    //             msg.push(i.message);
    //         }
    //         return {error:msg}
    //     }
    //     return {data : valid}
    // }
    // module.exports={create}



    let joi = require('joi');
        let { User } = require('../schema/userSchema');
    let security = require('../helpers/security');
    let {UP} = require('../schema/UPSchema');
    let generate=require('otp-generator')
    let {mail} = require('../helpers/nodemailer')
    // const { hash } = require('bcrypt');
    // let bcrypt=require("bcrypt");



    async function check(data) {
        let schema = joi.object({
            userName: joi.string().min(3).max(50).required(),
            Email: joi.string().min(5).max(50).required(),
            Phone: joi.string().required(),
            Password: joi.string().min(8).max(14).required(),
        });
        let valid = await schema.validateAsync(data).catch((err) => {
            return { error: err };
        });
        if (!valid || (valid && valid.error)) {
            let msg = [];
            for (let i of valid.error.details) {
                msg.push(i.message);
            }
            return { error: msg };
        }
        return { data: valid };
    }


    async function create(params) {
        let valid = await check(params).catch((err) => {
            return { error: err };
        });
        if (!valid || (valid && valid.error)) {
            return { error: valid.error };
        }
        let findUser = await User.findOne({ where: { Email_id: params.Email } }).catch((err) => {
            return { error: err };
        });
        if (findUser || (findUser && findUser.error)) {
            return { error: 'user already exits' };
        }
        let hash_password = await security.hash(params.Password,10).catch((err) => {
            return { error: err };
        });
        console.log(hash_password )
        if (!hash_password  || (hash_password  && hash_password .error)) {
            return { error: "password not encrypted" };
        }
        let userData = {
            Name: params.userName,
            Email_id: params.Email,
            Contact: params.Phone,
            Password: hash_password.data // Store the hashed password
        };
        let data = await User.create(userData).catch((err) => {
            return { error: err };
        });
        console.log(data);
        if (!data || (data && data.error)) {
            return { error: 'internal server error2' };
        }

        let userPermission = {
            user_id: data.id,
            Permission_id : 1
        }
        let upData = await UP.create(userPermission).catch((err)=>{
            return {errro : err}
        });
        // console.log(upData)
        if(!upData || (upData && upData.error)){
            return {error : upData.error}
        }
        return { data: data };
    }

    async function usercheck(data){
        let schema= joi.object({
            Email :joi.string().min(8).max(50).required(),
            Password : joi.string().min(8).required()
            // OTP : joi.number().required()
        });
        let verify = await schema.validateAsync(data).catch((err) =>{
            return {error : err};
        });
        if(!verify || (verify && verify.error)){
            let msg =[];
            for(let i of verify.error.details) { 
                msg.push(i.message);
            }
            return {error :msg}
        }
        return { data : verify}
    }
    async function userlogin(params){
        let verify = await usercheck(params).catch((err)=>{
            return {error:err}
        });
        if(!verify || (verify && verify.error)){
            return {error : verify.error}
        }
        let findUser =await User.findOne({where : {Email_id : params.Email}}).catch((err)=>{
            return { error : err}
        });
        if(!findUser ){
            return {error : 'user not exists'}
        }
        // let generate =await otp.generate(6, {upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false})
        
        let compare = await security.compare(params.Password ,findUser.Password).catch((err)=>{
            return {error : err}
        });  
        if(!compare || (compare && compare.error)){
            return {error : 'incorrect password '}
        }
        let usertoken = await security.encrypt(findUser.id+"",'#@1230').catch((err)=>{
            return {error : err}
        });
        if(!usertoken || (usertoken && usertoken.error)){
            return {error : 'no token'}
        }
        let updatetoken = await User.update({Token : usertoken},{where : {id:findUser.id}}).catch((err)=>{
            return { error : err}
        });
        // console.log(updatetoken);
        if(!updatetoken || (updatetoken && updatetoken.error)){
            return {error : 'Token not created'}
        }
        return {Token :usertoken}
    }
    async function Password(params){
        let verify = await forget(params).catch((err)=>{
            return {error:err}
        });

        if(!verify || (verify && verify.error)){
            return {error : verify.error}
        }
        let findUser =await User.findOne({where : {Email_id : params.Email}}).catch((err)=>{
            return { error : err}
        });
        console.log("209",findUser);
        if(!findUser ){
            return {error : 'user not exists'}
        }
        let otp = generate.generate(6, {upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false})
        console.log(otp);
        if(!otp || (otp && otp.error)){
            return {error : "otp in not generated"}
        }
        let hashOtp = await security.hash(otp,10).catch((err) => {
            return { error: err };
        });
        console.log(hashOtp);
        if (!hashOtp  || (hashOtp  && hashOtp .error)) {
            return { error: "otp not encrypted" };
        }
        
        let Uotp = await User.update({OTP : hashOtp.data},{where:{id:findUser.id}}).catch((err)=>{
            return {error:err}
        })
        // console.log("Uotp",Uotp)
        if(!Uotp || (Uotp && Uotp.error)){
            return {error : Uotp.error}
        }
        let mailoption = {from:'salmanhashmi8452@gmail,com',
        to:params.Email,
        subject:'mail testing',
        text:`this is your otp is ${otp}`}
        
        let sendmail =await mail(mailoption).catch((err)=>{
            return {error:err}
        });
        console.log("runnign on line 202",sendmail)
        if(!sendmail || (sendmail && sendmail.error)){
            return {error : "mail is not send"}
        }

    
        return {data : `mail is send to ${params.Email}`}
        }


        async function resetP(data){
            let schema =joi.object({
                Email : joi.string().min(8).max(50).required(),
                otp:joi.number().required(),
                newPassword:joi.string().required()
            });
            let verify = await schema.validateAsync(data).catch((err) =>{
                return {error : err};
            });
            if(!verify || (verify && verify.error)){
                let msg =[];
                for(let i of verify.error.details) { 
                    msg.push(i.message);
                }
                return {error :msg}
            }
            return { data : verify}
        }
        async function reset(params) {
            let verify = await resetP(params).catch((err)=>{
                return {error:err}
            });
            if(!verify || (verify && verify.error)){
                return {error : verify.error}
            }
            let findUser =await User.findOne({where : {Email_id : params.Email}}).catch((err)=>{
                return { error : err}
            });
            console.log('278',findUser)
            if(!findUser ){
                // console.log(findUser);
                return {error : 'user not exists'}
            }
            
            let hashP = await security.hash(newPassword,10).catch((err)=>{
                return {error : err}
            });
            if(!hashP || (hashP && hashP.error)){
                return {error : "password is not encrypted"}
            }
            const compare = await security.compare(params.otp, findUser.otp).catch((err) => {
                return { error: err };
            });
        
            if (!compare || (compare && compare.error)) {
                return { error: 'OTP does not match' };
            }
            return {data :"Password change successfully"}
            }



    async function forget(data){
        let schema =joi.object({
            Email : joi.string().min(8).max(50).required()
        });
        let verify = await schema.validateAsync(data).catch((err) =>{
            return {error : err};
        });
        if(!verify || (verify && verify.error)){
            let msg =[];
            for(let i of verify.error.details) { 
                msg.push(i.message);
            }
            return {error :msg}
        }
        return { data : verify}
    }
    module.exports = { create , userlogin ,Password,reset};
