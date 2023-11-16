let userModel=require("../model/userModel");
async function createUser(req,res){
    let modelData =await userModel.create(req.body).catch((err)=>{
        return {error:err}
    });
    if(!modelData || (modelData &&modelData.error)){
        let error =(modelData && modelData.error)?modelData.error:'internal server error';
        return res.send({error})
    }
    return res.send({data:modelData.data});
}
// async function readUser(req,res){
//     let readData =await userModel.read(req.body).catch((err)=>{
//         return {error:err}
//     });
//     console.log(readData)
//     if(!readData || (readData &&readData.error)){
//         let error =(readData && readData.error)?readData.error:'internal server error';
//         return res.send({error})
//     }
//     return res.send({data:readData.data});
// }
async function updateUser(req,res){
    let updateData =await userModel.updateuser(req.body).catch((err)=>{
        return {error : err}
    });
    if(!updateData || (updateData && updateData.error)){
        let error =(updateData && updateData.error)?updateData.error : 'internal servre error';
        return res.send({error})
    }
    return res.send({data : updateData.data});
} 

module.exports={createUser,updateUser};