let {sequelizeCon,QueryTypes} =require ('../init/dbconfig')
let security = require('../helpers/security')

function auth(permission){
    return async (req,res,next)=>{
        if(typeof permission !== 'string'){
            return res.status(401).send('unauthorize')
        }
        let token =req.session.token
        console.log(req.session);

        if(typeof token !== 'string'){
            // return res.status(201).send('internal server error')
            return res.redirect('/login?msg=Unauthorized')
        }
        let decrypt = await security.decrypt(token,'#@1230').catch((err)=>{
            return {error : err}
        });
        // console.log("19",decrypt,typeof(decrypt))
        if(!decrypt || (decrypt && decrypt.error)){
            // return res.status(403).send('forbidden')
            return res.redirect('/login?msg=forbidden')
        }
        let query =`select user.id,user.Name,permission.Name as permission
        from user
        left join up on user.id =up.user_id
        left join permission on up.permission_id =permission.id
        where user.id = ${decrypt}
        and token ='${token}'`;
        let user =await sequelizeCon.query(query,{type:QueryTypes.SELECT}).catch((err)=>{
            return {error:err}
        });
        if(!user || (user && user.error)||user.length===0){
            // return res.status(401).send('internal server 2')
            return res.redirect('/login?msg=internal server 2')
        }
        

        let permissions ={}
        for(let i of user){
            if(i.permission){
                permissions[i.permission] =true
            }
        }
        // console.log("45",permissions);
            console.log(permission)
            if(permissions.length<=0 || !permissions[permission]){
                // return res.status(401).send('chala ja')
                return res.redirect('/login?msg=chala ja')
            }
            req.userData= {
                Name :user[0].Name,
                id : user[0].id,
                permissions
            }
        next();
    }
}

module.exports ={auth}