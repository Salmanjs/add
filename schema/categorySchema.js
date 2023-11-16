let {sequelizeCon,Model,DataTypes}= require("../init/dbconfig");
class Category extends Model{}
Category.init({
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
    img:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    is_active : { 
        type : DataTypes.BOOLEAN(5),
        defaultValue:true,
        allowNull : false
    },
    is_deleted : {
        type : DataTypes.BOOLEAN(5),
        defaultValue : false,
        allowNull : false
    },
    created_by :{
        type : DataTypes.INTEGER,
        allowNull : false
    },
    updated_by :{
        type : DataTypes.INTEGER,
        allowNull: false
    }
},{tableName : 'category' ,modelName : "Category" , sequelize : sequelizeCon})
module.exports = {Category}