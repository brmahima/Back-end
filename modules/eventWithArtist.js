sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')
var Event = require('./event')
const Artist = require("./artist")
module.exports = sequelize.define('event_with_artist', {
    eventId: {
        field:"event_id",
        type: Sequelize.INTEGER,
        references: {
          model: Event, 
         
          key: 'event_id'
        }
      },
      artistId: {
        field:'artist_id',
        type: Sequelize.INTEGER,
        references: {
          model: Artist, 
          key: 'artist_id'
        }
      }
},{ freezeTableName:true})