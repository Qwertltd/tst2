const AdminJs = require('adminjs')
const {User} = require('../../Models/User')

/** @type {AdminJs.ResourceOptions} */
const options = {
    parent: {
        name: 'Admin Content',
        icon: 'fa fa-users',
    },
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