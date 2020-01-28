sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')
//event_with_artist model
module.exports = sequelize.define('event_with_artist', {
        artistId: {
            field: "artist_id",
            type: Sequelize.INTEGER,
            primaryKey: true,
            foreignKey:true
        },

        EventId: {
            field: 'event_id',
            type: Sequelize.INTEGER,
            primaryKey: true,
            foreignKey:true

        }

    },
    //this is needed 
    {
        freezeTableName: true,
        timestamps: false
    })