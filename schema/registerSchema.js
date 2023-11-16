// const { date } = require('joi')
// let {sequelizeCon,Model,DataTypes}= require ('../init/dbconfig')
// const { Sequelize } = require('sequelize')
// class Register extends Model{}
// Register.init({
//     id : { 
//         type : DataTypes.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     Name:{
//         type : DataTypes.STRING,
//         allowNull : false
//     },
//     Email : {
//        type: DataTypes.STRING,
//        allowNull : false
//     },
//     Password : {
//         type : DataTypes.STRING,
//         allowNull : false
//     },
//     is_active : {
//         type : DataTypes.BOOLEAN,
//         allowNull : false,
//         defaultValue : true
//     },
//     is_deleted : {
//         type : DataTypes.BOOLEAN,
//         allowNull : false,
//         defaultValue : false
//     }
// },{tableName : 'register' ,ModelName : 'Register', Sequelize : sequelizeCon})
// module.exports = { Register}