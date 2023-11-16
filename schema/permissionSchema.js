let {sequelizeCon,Model,DataTypes}=require("../init/dbconfig")
class Permission extends Model{}
Permission.init({
    id:{
        type : DataTypes.INTEGER,
        allowNull: false,
        autoIncrement :true,
        primaryKey:true
    },
    Name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{tableName:'permission',ModelName:'Permission',sequelize:sequelizeCon})
module.exports ={Permission}