let {sequelizeCon,Model,DataTypes}=require("../init/dbconfig")
class User extends Model{}
User.init({
    id:{
        type : DataTypes.INTEGER,
        allowNull: false,
        autoIncrement :true,
        primaryKey:true
    },
    Name:{
        type :DataTypes.STRING,
        allowNull:false,
    },
    Email_id:{
        type :DataTypes.STRING,
        allowNull:false,
    },
    Contact:{
        type :DataTypes.STRING,
        allowNull:false,
    },
    Password:{
        type :DataTypes.STRING,
        allowNull:false,
    },
    Token : {
        type : DataTypes.STRING,
        allowNull:true
    },
    OTP : {
        type : DataTypes.INTEGER,
        allowNull : true
    },
    is_active:{
        type :DataTypes.STRING,
        allowNull:false,
        defaultValue:true
    },
    is_deleted:{
        type :DataTypes.STRING,
        allowNull:false,
        defaultValue:false
    }
},{tableName:'user',ModelName:'User',sequelize:sequelizeCon})
module.exports ={User}