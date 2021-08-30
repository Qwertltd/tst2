const AdminJs = require('adminjs')
const {User} = require('../../Models/User')

/** @type {AdminJs.ResourceOptions} */
const options = {
    properties: {
        password: {
            type: 'password',
        },
    },
};

module.exports = {
    options,
    resource: User,
};