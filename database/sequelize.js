const Sequelize = require('sequelize')

module.exports = new Sequelize('tickets','root','',{
    port:3306,
    host: 'localhost',
    dialect:'mysql',
    operatorsAliases: false,
    timestamps:true,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },

    
  
})