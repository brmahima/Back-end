sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')
//movies model
module.exports = sequelize.define('movies', {
        movieId: {
            field: "movie_id",
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        nameAr: {
            field: "name_ar",
            type: Sequelize.STRING
        },
        nameEn: {
            field: "name_en",
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        }


    },

    //this is needed 
    {
        freezeTableName: true,
        timestamps: false
    })