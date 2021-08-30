const AdminJs = require('adminjs')
const {Product} = require('../../Models/Product')

const {
    after: uploadAfterHook,
    before: uploadBeforeHook,
} = require('../categories/actions/upload-image.hook2');

/** @type {AdminJs.ResourceOptions} */
const options = {
  parent: {
    name: 'Products',
    icon: 'fa fa-user',
  },
};

module.exports = {
    options,
    resource: Product,
};