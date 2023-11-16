let {Product}=require("../schema/productSchema");
let joi = require('joi');


async function check(data){
    let schema = joi.object({
        userName:joi.string().min(3).max(15).required(),
        Price:joi.number().required(),
        Description:joi.string().min(8).max(14).required(),
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
async function createproduct(params){
    let valid= await check(params).catch((err)=>{
        return {error:err}
    });
    if(!valid || (valid&&valid.error)){
        return {error:valid.error}
    }
    let productData={
        Name:params.userName,
        Price:params.Price,
        Description:params.Description,
    }
    let data =await Product.create(productData).catch((err)=>{
        return {error:err}
    });
    console.log(data);
    if(!data || (data && data.error)){
        return {error:'internal server error'}
    }
    return {data : data};
}


async function viewAll(params){
    let limit = (params.limit) ? parseInt(params.limit) : 10;
    let page = (params.page) ? parseInt(params.page) : 1;
    let offset = (page-1) * limit;
    let counter =await Product.count().catch((err)=>{
        return {error:err}
    })
    // console.log(counter)
    if(!counter || (counter && counter.error)){
        return {error :counter.error}
    }
    if(counter<=0){
        return {error :'record is not find'}
    }
    let data = await Product.findAll({limit,offset}).catch((err)=>{
        return {error : err}
    });
    console.log("dat",data)
    if(!data || (data && data.error)){
        return {error : 'product not found',status:500}
    }
    return {data : data ,total : counter , page,limit}
}

async function viewDetail(id){
    let data = await Product.findOne({where:{id}}).catch((err)=>{
        return {error : err}
    })
    if(!data || (data && data.error)){
        return {error : "Internal server error", status : 500}
    }
    return {data};
}


//  joi
async function checkUpdate(data){
    let schema = joi.object({
        id:joi.number().required(),
        userName: joi.string().min(3).max(20),
        Price: joi.number(),
        Description: joi.string().min(10).max(50),
    })
    let valid = await schema.validateAsync(data).catch((err)=>{
        return {error : err}
    })
    if(!valid || (valid && valid.error)){
        let errMsg = []
        for(let i of valid.error.details){
            errMsg.push(i.message)
        }
        return {error : errMsg}
    }
    return {data : valid}
}


async function update(id,params){
    params.id = id;
    //user data validation
    let valid = await checkUpdate(params).catch((error)=>{ return {error}; });
    if(!valid || (valid && valid.error)){
        return {error : valid.error}
    }
    //check product in db
    let data = await Product.findOne({where:{id},raw:true}).catch((err)=>{
        return {error : err}
    })
    if(!data || (data && data.error)){
        return {error : "Internal server error", status : 500}
    }

    //format product data
    data.Name = params.userName;
    data.Price = params.Price;
    data.Description = params.Description;
    
    //update record in db
    let updateProduct = await Product.update(data,{where:{id}}).catch((error)=>{ return {error} });
    if(!updateProduct || (updateProduct && updateProduct.error)){
        return {error : "Internal server error", status : 500}
    }
    
    return {data:data}
}

async function checkDelete(data){
    let schema = joi.object({
        id:joi.number().required()
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
async function pDelete(id) {
    let valid = await checkDelete({id}).catch((error)=>{ return {error}; });
    if(!valid || (valid && valid.error)){
        return {error : valid.error}
    }
    let data =await Product.findOne({where :{id},raw:true}).catch((err)=>{
        return {error : err}
    })
    if(data.is_deleted == true){
        return {error : "Product is already deleted"}
    }
    let updateProduct = await Product.update({is_deleted :true},{where : {id}}).catch((err)=>{
        return {error : err}
    });
    if(!updateProduct || (updateProduct && updateProduct.error)){
        return {error : "Internal server error" , status : 500}
    }
    if(updateProduct<=0){
        return {error : "record not deleted"}
    }
      return {data :"record successfully deleted"}    
}
async function pRestore(id) {
    let valid = await checkDelete({id}).catch((error)=>{ return {error}; });
    if(!valid || (valid && valid.error)){
        return {error : valid.error}
    }
    let data =await Product.findOne({where :{id},raw:true}).catch((err)=>{
        return {error : err}
    })
    if(!data || (data && data.error)){ 
        return {error : "Inrternal server error" ,status:500}
    }
    if(data.is_deleted == false){
        return {error : "Product is not deleted"}
    }
    let updateProduct = await Product.update({is_deleted :false},{where : {id}}).catch((err)=>{
        return {error : err}
    });
    if(!updateProduct || (updateProduct && updateProduct.error)){
        return {error : "Internal server error" , status : 500}
    }
    if(updateProduct<=0){
        return {error : "record not deleted"}
    }
      return {data :"record successfully restore"}    
}

module.exports={createproduct , pRestore,viewAll,viewDetail,update,pDelete}

