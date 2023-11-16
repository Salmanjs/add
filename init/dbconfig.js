let {Sequelize,Model,DataTypes,Op,QueryTypes}=require('sequelize')
let sequelizeCon =new Sequelize("Mysql://root:@localhost/e-commerce")
sequelizeCon.authenticate().then(()=>{
    console.log('activate')
}).catch((err)=>{
    console.log('error',err)
});
module.exports ={sequelizeCon,Model,DataTypes,Op,QueryTypes};