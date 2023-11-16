    // const { func } = require('joi');
    let auth =require('../model/authModel');


    async function resetUI(req,res){
        return res.render("resetp",{})
    }

    async function resetP(req,res) {
        let data = await auth.reset(req.body).catch((err)=>{
            return {error : err}
        });
        if(!data || (data &&data.error)){
            let error =(data && data.error)? data.error:'internal server error';
            return res.send({error})
    }
    return res.redirect("/login")
    }

    async function frogetPasswordUI(req,res){
        return res.render("forgetP",{})
    }

    // async function registerui(req,res){
    //     return res.render("regLog",{})
    // }
    async function frogetPassword(req,res){
        let data =await auth.Password(req.body).catch((err)=>{
            return {error : err}
        })
        if(!data || (data &&data.error)){
            let error =(data && data.error)? data.error:'internal server error';
            return res.send({error})
    }
            return res.redirect("resetp")
    }

    async function register(req,res){
        let data = await auth.create(req.body).catch((err)=>{
            return {error:err}
        });
        console.log(data)
        if(!data || (data &&data.error)){
            let error =(data && data.error)? data.error:'internal server error';
            return res.send({error})
        }
        // return res.send({data:data.data});
        return res.redirect("/?msg=success");
    }
    async function login(req,res){
        let data = await auth.userlogin(req.body).catch((err)=>{
            return {error : err}
        });
        console.log(data);
        if(!data || (data && data.error)){
            let error = (data && data.error) ? data.error : 'intre sdsf';
            return res.send({error})
        }
        // return res.send({data : data.data,Token:data.Token});
        req.session.token =data.Token
        return res.redirect('/dashboard');
    }
    async function index(req,res){
        return res.render("regLog",{})
    }
    module.exports={register,login,index,frogetPassword,frogetPasswordUI,resetUI,resetP}