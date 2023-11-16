    let jwt = require ('jsonwebtoken');
    let bcrypt =require('bcrypt');

    function encrypt(ptext,key){
        return new Promise((res,rej)=>{
            jwt.sign(ptext,key,(error,token)=>{
                if(error){return rej(error)}
                return res(token)
            });
        });
    }
    function decrypt(token ,key){
        return new Promise((res,rej)=>{
            jwt.verify(token,key,(error,decrypt)=>{
                if(error){return rej(error)}
                return res(decrypt)
            });
        });
    }
    async function hash(Pt,salt=10){
        let encrypt =await bcrypt.hash(Pt,salt).catch((err)=>{
            return {error:err}
        })
            if(!encrypt || (encrypt && encrypt.error)){
                return {error : encrypt.error}
            }
            return {data : encrypt}
    }
    async function compare(PT ,ET){
        let check = await bcrypt.compare(PT,ET).catch((err)=>{
            return {error :err}
        })
        if(!check || (check && check.error)){
            return {error : check && check.error ? check.error : ture};
        }
        return {data : true }
    }
    module.exports={encrypt , decrypt , hash , compare}