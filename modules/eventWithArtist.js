sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')

module.exports = sequelize.define('event_with_artist', {
  eventId: {
    field: "event_id",
    type: Sequelize.INTEGER,
    foreignKey: true,
    primaryKey: true
  },
  artistId: {
    field: 'artist_id',
    type: Sequelize.INTEGER,
    foreignKey: true,
    primaryKey: true
  }
}, {
  freezeTableName: true,
  timestamps: false
})