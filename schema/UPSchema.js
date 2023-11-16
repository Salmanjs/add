let {sequelizeCon,Model,DataTypes}=require("../init/dbconfig")
class UP extends Model{}
UP.init({
    id:{
        type : DataTypes.INTEGER,
        allowNull: false,
        autoIncrement :true,
        primaryKey:true
    },
    user_id:{
        type :DataTypes.INTEGER,
        allowNull : false,
    },
    Permission_id : {
        type : DataTypes.INTEGER,
        allowNull :false
    }
},{tableName:'up',ModelName:'UP',sequelize:sequelizeCon})
module.exports ={UP}