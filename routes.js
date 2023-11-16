let express=require('express')
let routes =express.Router();
let otp =require('otp-generator')
let auth = require ("./controller/authController");
let product = require("./controller/productController");
let category = require('./controller/categoryController')
// let {mail} = require('./helpers/nodemailer')
let Midauth= require ('./middelware/authmiddelware')
let dashboard = require('./controller/dashboardController')
// routes.post('/auth',auth.createUser);
// routes.get('/read',auth.readUser);
// routes.put('/update/:id',auth.updateUser);
// routes.post('/product',product.createProduct);


//User auth routes
routes.get('/',auth.index);
routes.get('/login',auth.index)
routes.post('/register',auth.register);
routes.post('/login',auth.login);
routes.get('/dashboard',Midauth.auth('user'),dashboard.index);
routes.get('/forget',auth.frogetPasswordUI)
routes.get('/resetp',auth.resetUI)
routes.post('/ForgetPassword',auth.frogetPassword)
routes.post('/reset',auth.resetP)
// routes.get('/register',user)

//product routes
routes.get('/product/create',Midauth.auth('product_create'),product.addUI);
routes.post('/product/create',Midauth.auth('product_create'),product.add);
routes.get('/product',Midauth.auth('product_view'),product.viewAll);
routes.get("/product/:id",Midauth.auth('product_view'),product.viewDetail)
routes.get("/product/update/:id",Midauth.auth('product_update'),product.updateUI);
routes.post("/product/:id",Midauth.auth('product_update'),product.update);
routes.post("/product/delete/:id",Midauth.auth('product_delete'),product.pDelete);
routes.post("/product/restore/:id",Midauth.auth('product_restore'),product.pRestore);

//category 
routes.get('/category/createUI',Midauth.auth('product_create'),category.createUI);
routes.post('/category/createUI',Midauth.auth('product_create'),category.createC);
routes.get('/category',Midauth.auth('product_view'),category.viewAll);
routes.get('/category/:id',Midauth.auth('product_view'),category.viewDetail);
routes.get("/category/update/:id",Midauth.auth('product_update'),category.updateUI);
routes.post("/category/:id",Midauth.auth('product_update'),category.update);
routes.post("/category/delete/:id",Midauth.auth('product_delete'),category.pDelete);
routes.post("/category/restore/:id",Midauth.auth('product_restore'),category.pRestore);

module.exports={routes}













































// routes.post('/register',user.register);
// routes.post('/product' ,product.createProduct);
// routes.post('/login',user.login);
// routes.get('/middle',auth('user'),(req,res)=>{
//     return res.send(req.userData)
// })
// routes.get('/dashboard',user.dashboard)
// routes.get('/product',product.viewAll)
// routes.get('/register',user.registerui)
// routes.get('/login',user.loginui)
// routes.get('/example1',(req,res)=>{
//     let user ={
//         name:'salman',
//         contact:'87878787',
//         email:'salman@'
//     }
//     return res.render('test',user);
// });

// routes.get('/sendmail',async(req,res)=>{
//     let generate =await otp.generate(6, {upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false})
//     let mailoption={
//         from:'salmanhashmi8452@gmail,com',
//         to:req.body.Email,
//         subject:'mail testing',
//         text:`this is your otp ${generate}`
//     }
//     let sendmail =await mail(mailoption).catch((err)=>{
//         return {error:err}
//     })
//     console.log(sendmail)
//     if(!sendmail || (sendmail && sendmail.error)){
//         return res.send(`mail is not send`)
//     }
//     return res.send(`mail is send to ${req.body.Email}`)
// })
// routes.get('/example',(req,res)=>{
//     if(req.session.view){
//         req.session.view +=1
//     }else{
//         req.session.view = 1
//     }
//     return res.send({view:req.session.view})
// })

