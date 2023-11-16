let {Category} = require("../schema/categorySchema");
let joi = require ('joi');


    async function check(data){
        let schema = joi.object({
            CategoryName : joi.string().min(10).max(30).required(),
            photo : joi.string().required(),
           
        });
        let valid = await schema.validateAsync(data).catch((err)=>{
            return {error : err}
        });
        if(!valid || (valid && valid.error)){
            let msg =[];
            for(let i of valid.error.details){
                msg.push(i.message);
            }
            return {error:msg}
        }
        return {data : valid}
    };


    async function createCategory(params,userData) {
        let verify = await check(params).catch((err)=>{
            return {error : err}
        });
        if(!verify || (verify && verify.error)){
            return {error : verify.error}
        };
        let categoryData={
            Name:params.CategoryName,
            img : params.photo,
            created_by :userData.id,
            updated_by : userData.id,
        }
        let existingCategory = await Category.findOne({where:{Name:params.CategoryName} }).catch((err)=>{
            return {error : err}
        })
        if(existingCategory || (existingCategory&&existingCategory.error)){
            return {error : 'Category already exists'}
        }
        let data =await Category.create(categoryData).catch((err)=>{
            return {error:err}
        });
        console.log(data.error);
        if(!data || (data && data.error)){
            return {error:'internal server error'}
        }
        return {data : data};
    }

    async function viewAll(params){
        let limit = (params.limit) ? parseInt(params.limit) : 10;
        let page = (params.page) ? parseInt(params.page) : 1;
        let offset = (page-1) * limit;
        let counter =await Category.count().catch((err)=>{
            return {error:err}
        })
        // console.log(counter)
        if(!counter || (counter && counter.error)){
            return {error :counter.error}
        }
        if(counter<=0){
            return {error :'record is not find'}
        }
        let data = await Category.findAll({limit,offset}).catch((err)=>{
            return {error : err}
        });
        if(!data || (data && data.error)){
            return {error : 'product not found',status:500}
        }
        return {data : data ,total : counter , page,limit}
    }
    async function viewDetail(id){
        let data = await Category.findOne({where:{id}}).catch((err)=>{
            return {error : err}
        })
        console.log(data)
        if(!data || (data && data.error)){
            return {error : "Internal server error", status : 500}
        }
        return {data};
    }

    async function checkUpdate(data){
        let schema = joi.object({
            id:joi.number().required(),
            CategoryName: joi.string().min(3).max(50).required()
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
        let data = await Category.findOne({where:{id},raw:true}).catch((err)=>{
            return {error : err}
        })
        if(!data || (data && data.error)){
            return {error : "Internal server error", status : 500}
        }
    
        //format product data
        data.Name = params.CategoryName;
        
        //update record in db
        let updateProduct = await Category.update(data,{where:{id}}).catch((error)=>{ return {error} });
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
    async function pDelete(id,decision) {
        let valid = await checkDelete({id}).catch((error)=>{ return {error}; });
        if(!valid || (valid && valid.error)){
            return {error : valid.error}
        }
        let data =await Category.findOne({where :{id},raw:true}).catch((err)=>{
            return {error : err}
        })
        if(data.is_deleted == decision){
            return {error : "Product is already deleted"}
        }
        let updateProduct = await Category.update({is_deleted :decision},{where : {id}}).catch((err)=>{
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
    // async function pRestore(id,decision) {
    //     let valid = await checkDelete({id}).catch((error)=>{ return {error}; });
    //     if(!valid || (valid && valid.error)){
    //         return {error : valid.error}
    //     }
    //     let data =await Product.findOne({where :{id},raw:true}).catch((err)=>{
    //         return {error : err}
    //     })
    //     if(!data || (data && data.error)){ 
    //         return {error : "Inrternal server error" ,status:500}
    //     }
    //     if(data.is_deleted == false){
    //         return {error : "Product is not deleted"}
    //     }
    //     let updateProduct = await Product.update({is_deleted :decision},{where : {id}}).catch((err)=>{
    //         return {error : err}
    //     });
    //     if(!updateProduct || (updateProduct && updateProduct.error)){
    //         return {error : "Internal server error" , status : 500}
    //     }
    //     if(updateProduct<=0){
    //         return {error : "record not deleted"}
    //     }
    //       return {data :"record successfully restore"}    
    // }

    module.exports = {createCategory,viewAll,viewDetail,update,pDelete}

