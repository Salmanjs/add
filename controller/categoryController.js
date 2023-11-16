let category = require('../model/categoryModel')


    async function createUI(req,res){
        return res.render('Category/category',{})
    };



    async function createC(req,res) {
    let data = await category.createCategory(req.body,req.userData).catch((err)=>{
        return { error : err}
    });
    console.log(data);
        if(!data || (data && data.error)){
            let error = (data && data.error) ?  data.error :"cat1";
            return res.redirect("/catgory/createUI")
        }
        return res.redirect('/category');
    }
    async function viewAll(req,res){
        let product =await category.viewAll(req.query,req.userData.permissions).catch((err)=>{
            return {error : err}
        });
        if(!product || (product && product.error)){
            let error = (product && product.error)?product.error : 'internal server error2';
            return res.render("Category/view" ,{error: product.error})
        }
      console.log(req.userData);
        return res.render("Category/view" , {category : product.data, total : product.total,page : product.page,limit : product.limit,permissions:req.userData.permissions})
    }
    async function viewDetail(req,res){
        let categorys = await category.viewDetail(req.params.id).catch((err)=>{
            return {error : err}
        }) 
        
        console.log("product",categorys);
        if(!categorys || (categorys && categorys.error)){
            return res.render("category/view",{error : categorys.error})
        }
        
        return res.render("category/details",{category : categorys.data})
    }
    async function updateUI(req,res){
        let categorys = await category.viewDetail(req.params.id).catch((err)=>{
            return {error : err}
        }) 
        
        console.log("product",categorys);
        if(!categorys || (categorys && categorys.error)){
            let url = (category && category.data && category.data.id) ? '/category/'+category.data.id:'/category';
            return res.redirect(url);
        }
    
        return res.render('category/update',{category:categorys.data})
    }
    
    async function update(req,res){
        let categorys = await category.update(req.params.id,req.body).catch((err)=>{
            return {error : err}
        }) 
        console.log("62",categorys);
        if(!categorys || (categorys && categorys.error)){
            let url = (category && category.data && category.data.id) ? '/category/'+category.data.id:'/category';
            return res.redirect(url);
        }
    
        let url = (category && category.data && category.data.id) ? '/category/'+category.data.id:'/category';
        // console.log("url",url)
        return res.redirect(url);
    }
    
    async function pDelete(req,res){
        let categorys = await category.pDelete(req.params.id,true).catch((err)=>{
            return {error : err}
        }) 
        // console.log("pro",categorys)
        if(!categorys || (categorys && categorys.error)){
            let url = (req.params && req.params.id) ? '/category/'+req.params.id:'/category';
            return res.redirect(url);
        }
    
        
        return res.redirect("/category");
    }
    


    async function pRestore(req,res){
        let categorys = await category.pDelete(req.params.id,false).catch((err)=>{
            return {error : err}
        }) 
        // console.log("pro",categorys)
        if(!categorys || (categorys && categorys.error)){
            let url = (req.params && req.params.id) ? '/category/'+req.params.id:'/category';
            return res.redirect(url);
        }   
        
        return res.redirect("/category");
    }
    
    module.exports = { createUI,createC,viewAll,viewDetail,pRestore,update,updateUI,pDelete,}