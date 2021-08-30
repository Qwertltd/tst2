const AdminJs = require('adminjs')
const {Payment} = require('../../Models/Payment')

/** @type {AdminJs.ResourceOptions} */
const options = {
};

module.exports = {
    options,
    resource: Payment,
};