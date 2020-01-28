sequelize = require('./../database/sequelize')
const Sequelize = require('sequelize')
module.exports = sequelize.define('event', {
adminId:{
    field:'event_id',
    type: Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true

},
eventNameEn:{
    field:'name_en',
    type:Sequelize.STRING,
    
},
eventNameAr:{
    field:'name_ar',
    type:Sequelize.STRING,
   
},
locationLat:{
    field:'location_lat',
    type:Sequelize.STRING
},
locationLong:{
    field:'location_long',
    type:Sequelize.STRING
},
descriptionAr:{
    field:'description_ar',
    type:Sequelize.STRING
},
descriptionEn:{
    field:'descripion_en',
    type:Sequelize.STRING
},
time:{
    type:Sequelize.DATE
},

state:{
    type:Sequelize.INTEGER
},

locationDescriptionAr:{
    field:'location_description_ar',
    type:Sequelize.STRING
},
locatoinDescriptionEn:{
    field:'location_description_en',
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

,vendorId: {
    field: 'vendor_id',
    type: Sequelize.INTEGER
}
,typOfEventId:{
    field: "type_of_event_id",
    type: Sequelize.INTEGER,
    
}


},{ freezeTableName:true})