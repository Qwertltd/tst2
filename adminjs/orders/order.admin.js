const AdminJs = require('adminjs')
const {Order} = require('../../Models/Order')

/** @type {AdminJs.ResourceOptions} */
const options = {
};

module.exports = {
    options,
    resource: Order,
};