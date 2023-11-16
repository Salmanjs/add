let {User}=require("../schema/userSchema");
let joi = require('joi');
async function create(params){
    let valid= await check(params).catch((err)=>{
        return {error:err}
    });
    if(!valid || (valid&&valid.error)){
        return {error:valid.error}
    }
    let userData={
        Name:params.userName,
        Email_id:params.Email,
        Contact:params.Phone,
        Password:params.Password
    }
    let data =await User.create(userData).catch((err)=>{
        return {error:err}
    });
    // console.log(data);
    if(!data || (data && data.error)){
        return {error:'internal server error'}
    }
    return {data : data};
}
// async function read(Userid){
//     let valid =await read(Userid).catch((err)=>{
//         return {error:err}
//     });
//     if(!valid || (valid && valid.error)){
//         return {error : valid.error}
//     }
// let data =await User.findOne(id).catch((err)=>{
//     return {error:err}
// });
// // console.log(data);
// if(!data || (data && data.error)){
//     return {error:'internal server error'}
// }
// return {data : data};
// // console.log(data);
// }

async function updateuser(params){
    let id = parseInt(req.params.id-1)
    if(typeof (id) != "number"){
        
        return {error :'not number'}
    }
    let valid = await updateuser(params).catch((err)=>{return {error :err}});
    if(!valid || (valid && valid.error)){return {error:valid.error}} 
    let newuser = user[id];
    if(typeof (req.body.Name) == "string"){
        newuser.Name = req.body.Name
    }
    if(typeof (req.body.Email) == "string"){
        newuser.Email = req.body.Email
    }
    if(typeof (req.body.Contact) == "number"){
        newuser.Contact = req.body.Contact
    }
    if(typeof (req.body.Password) == "string"){
        newuser.Password = req.body.Password
    }
    user[req.params.id-1]=newuser
    return {newuser}
    let data =await User.updateuser(newuser).catch((err)=>{
        return {error:err}
    })
    console.log(data);
    if(!data || (data && data.error)){
        return {error:'internal server error'}
    }
    return {data : data}
};


//  joi
async function check(data){
    let schema = joi.object({
        userName:joi.string().min(3).max(15).required(),
        Email:joi.string().min(5).max(25).required(),
        Phone:joi.string().required(),
        Password:joi.string().min(8).max(14).required(),
    });
    let valid =await schema.validateAsync(data).catch((err)=>{
        return {error:err}
    });
    if(!valid || (valid && valid.error)){
        let msg =[];
        for(let i of valid.error.details){
            msg.push(i.message);
        }
        return {error:msg}
    }
    return {data : valid}
}
module.exports={create,updateuser}