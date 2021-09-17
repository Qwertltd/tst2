const AdminJs = require('adminjs')
const {Review} = require('../../Models/Review')

/** @type {AdminJs.ResourceOptions} */
const options = {
  parent: {
    name: 'Products',
    icon: 'fa fa-user',
  },
};

module.exports = {
    options,
    resource: Review,
};