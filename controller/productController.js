    const { func } = require("joi");
let productModel=require("../model/productModel");


async function addUI(req,res){
    return res.render("product/add")
}

    async function add(req,res){
        let modelData =await productModel.createproduct(req.body).catch((err)=>{
            return {error:err}
        });
        console.log("14",modelData)
        if(!modelData || (modelData &&modelData.error)){
            let error =(modelData && modelData.error)?modelData.error:'internal server error';
            return res.render("product/create",{error})
        }
        return res.redirect("/product");
    }
    async function viewAll(req,res){
        let product =await productModel.viewAll(req.query,req.userData.permissions).catch((err)=>{
            return {error : err}
        });
        console.log("25",product);
        if(!product || (product && product.error)){
            let error = (product && product.error)?product.error : 'internal server error2';
            return res.render("product/view" ,{error: product.error})
        }
        // console.log(product.total)
        return res.render("product/view" , {product : product.data, total : product.total,page : product.page,limit : product.limit , permissions : req.userData.permissions})
    }
    async function viewDetail(req,res){
        let products = await productModel.viewDetail(req.params.id).catch((err)=>{
            return {error : err}
        }) 
        
        console.log("product",products);
        if(!products || (products && products.error)){
            return res.render("product/view",{error : products.error})
        }
        
        return res.render("product/details",{product : products.data})
    }


    async function updateUI(req,res){
        let products = await productModel.viewDetail(req.params.id).catch((err)=>{
            return {error : err}
        }) 
        
        console.log("product",products);
        if(!products || (products && products.error)){
            let url = (products && products.data && products.data.id) ? '/product/'+products.data.id:'/product';
            return res.redirect(url);
        }
    
        return res.render('product/update',{product:products.data})
    }
    
    async function update(req,res){
        let products = await productModel.update(req.params.id,req.body).catch((err)=>{
            return {error : err}
        }) 
        console.log("pro",products)
        if(!products || (products && products.error)){
            let url = (products && products.data && products.data.id) ? '/product/'+products.data.id:'/product';
            return res.redirect(url);
        }
    
        let url = (products && products.data && products.data.id) ? '/product/'+products.data.id:'/product';
        // console.log("url",url)
        return res.redirect(url);
    }
    
    async function pDelete(req,res){
        let products = await productModel.pDelete(req.params.id).catch((err)=>{
            return {error : err}
        }) 
        // console.log("pro",products)
        if(!products || (products && products.error)){
            let url = (req.params && req.params.id) ? '/product/'+req.params.id:'/product';
            return res.redirect(url);
        }
    
        
        return res.redirect("/product");
    }
    


    async function pRestore(req,res){
        let products = await productModel.pRestore(req.params.id).catch((err)=>{
            return {error : err}
        }) 
        // console.log("pro",products)
        if(!products || (products && products.error)){
            let url = (req.params && req.params.id) ? '/product/'+req.params.id:'/product';
            return res.redirect(url);
        }   
        
        return res.redirect("/product");
    }
    

    module.exports={add , viewAll,addUI,update,updateUI,viewDetail,pDelete,pRestore};