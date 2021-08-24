const AdminJS = require('adminjs')
const AdminJSMongoose = require('@adminjs/mongoose')
const mongoose = require('mongoose');

AdminJS.registerAdapter(AdminJSMongoose)

const User = require('./users/users.admin')
const Category = require('./categories/category.admin')
const SubCategory = require('./subCategories/subCategory.admin')
const Product = require('./products/product.admin')
const ProductImage = require('./products/productImage.admin')

/** @type {import('adminjs').AdminJsOptions} */
const options = {
    databases: [mongoose],
    resources: [Category,SubCategory,User,Product,ProductImage],
    rootPath: '/admin',
    branding: {
        logo: false,
        companyName: 'ZooPrints',
        softwareBrothers: false,
    }
};

module.exports = options;