const AdminJs = require('adminjs')
const {Template} = require('../../Models/Template')

/** @type {AdminJs.ResourceOptions} */
const options = {
};

module.exports = {
    options,
    resource: Template,
};