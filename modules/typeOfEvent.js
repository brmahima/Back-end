sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')
//atypeOfEvent  model
module.exports = sequelize.define('type_of_event', {
    typOfEventId:{
        field: "type_of_event_id",
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nameAr:{
        field:"name_ar",
        type:Sequelize.STRING
    },
    nameEn:{
        field:"name_en",
        type:Sequelize.STRING
    },
    image:{
        type:Sequelize.STRING
    }
    
    
},{ freezeTableName:true,
    timestamps:false})