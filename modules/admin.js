sequelize = require('./../database/sequelize')
const Sequelize = require('sequelize')
module.exports = sequelize.define('admin', {
adminId:{
    field:'admin_id',
    type: Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true

},
full_Name:{
    field:'full_name',
    type:Sequelize.STRING,
    defaultValue:""
},
userName:{
    field:'user_name',
    type:Sequelize.STRING
},
email:{
    type:Sequelize.STRING
},

password:{
    type:Sequelize.STRING
},

permission:{
    type:Sequelize.INTEGER
},

jobTilte:{
    field:'job_title',
    type:Sequelize.STRING
},
createAt:{
    field:'createdAt',
    type:Sequelize.DATE
},
updateAt:{
    field:'updatedAt',
    type:Sequelize.DATE
}

   

},{ freezeTableName:true})