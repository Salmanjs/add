let {sequelizeCon,Model,DataTypes}=require("../init/dbconfig")
class Product extends Model{}
Product.init({
    id:{
        type : DataTypes.INTEGER,
        allowNull: false,
        autoIncrement :true,
        primaryKey:true
    },
    Name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Price:{
        type :DataTypes.INTEGER,
        allowNull:false,
    },
    Description:{
        type :DataTypes.STRING,
        allowNull:false,
    },
    is_active:{
        type :DataTypes.BOOLEAN,
        allowNull:true,
        defaultValue:true
    },
    is_deleted:{
        type :DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    }
},{tableName:'product',ModelName:'Product',sequelize:sequelizeCon})
module.exports ={Product}