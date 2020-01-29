sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')

module.exports = sequelize.define('event_with_club', {
  eventId: {
    field: "event_id",
    type: Sequelize.INTEGER,
    foreignKey: true,
    primaryKey: true
  },
  clubId: {
    field: 'club_id',
    type: Sequelize.INTEGER,
    foreignKey: true,
    primaryKey: true
  }
}, {
  freezeTableName: true,
  timestamps: false
})