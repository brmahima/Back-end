sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')
var Event = require('./event')
const Movies = require("./movies")
module.exports = sequelize.define('event_with_movies', {
    eventId: {
        field:"event_id",
        type: Sequelize.INTEGER,
        references: {
          model: Event, 
         
          key: 'event_id'
        }
      },
      moviesId: {
        field:'movie_id',
        type: Sequelize.INTEGER,
        references: {
          model: Sponsor, 
          key: 'movie_id'
        }
      }
},{ freezeTableName:true})