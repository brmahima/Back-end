sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')
//vendor model
module.exports = sequelize.define('vendor', {
    vendorId: {
        field: 'vendor_id',
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true

    },
    fullName: {
        field: 'full_name',
        type: Sequelize.STRING

    },
    companyName: {
        field: 'company_name',
        type: Sequelize.STRING

    },
    bankName: {
        field: 'bank_name',
        type: Sequelize.STRING
    },
    //Banck account number because it can't accpet long names
    bAN: {
        field: 'bank_account_number',
        type: Sequelize.INTEGER
    },
    bankBranch: {
        field: 'bank_branch',
        type: Sequelize.STRING
    },

    password: {
        type: Sequelize.STRING
    },

    phone: {
        type: Sequelize.INTEGER
    },
    logo: {
        type: Sequelize.STRING
    },
    vendorType: {
        field: 'vendor_type',
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.INTEGER
    },

    createAt: {
        field: 'createdAt',
        type: Sequelize.DATE
    },
    updateAt: {
        field: 'updatedAt',
        type: Sequelize.DATE
    }



}, {
    freezeTableName: true
})