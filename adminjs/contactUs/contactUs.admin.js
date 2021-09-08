const AdminJs = require('adminjs')
const {ContactUs} = require('../../Models/ContactUs')

/** @type {AdminJs.ResourceOptions} */
const options = {
};

module.exports = {
    options,
    resource: ContactUs,
};