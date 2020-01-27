sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')
//artist model
module.exports = sequelize.define('artist', {
    artistId:{
        field: "artist_id",
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
    
    
})