sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')

module.exports = sequelize.define('event_with_movies', {
    eventId: {
        field:"event_id",
        type: Sequelize.INTEGER,
        foreignKey: true,
        primaryKey: true
      },
      moviesId: {
        field:'movie_id',
        type: Sequelize.INTEGER,
        foreignKey: true,
        primaryKey: true
      }
},{ freezeTableName:true,timestamps:false})