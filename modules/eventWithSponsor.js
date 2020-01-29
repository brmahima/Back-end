sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')
var Event = require('./event')
const Sponsor = require("./sponsor")
module.exports = sequelize.define('event_with_sponsor', {
    eventId: {
        field:"event_id",
        type: Sequelize.INTEGER,
        references: {
          model: Event, 
         
          key: 'event_id'
        }
      },
      sponsorId: {
        field:'sponsor_id',
        type: Sequelize.INTEGER,
        references: {
          model: Sponsor, 
          key: 'sponsor_id'
        }
      }
},{ freezeTableName:true})