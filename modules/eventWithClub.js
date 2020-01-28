sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')
//event_with_artist model
module.exports = sequelize.define('event_with_club', {
        eventId: {
            field: "event_id",
            type: Sequelize.INTEGER,
            primaryKey: true,
            foreignKey:true
        },

        clubId: {
            field: 'club_id',
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