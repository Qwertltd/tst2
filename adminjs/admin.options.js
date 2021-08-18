const AdminJS = require('adminjs')
const AdminJSMongoose = require('@adminjs/mongoose')
const mongoose = require('mongoose');

AdminJS.registerAdapter(AdminJSMongoose)

const User = require('./users/users.admin')
const Category = require('./categories/category.admin')
const SubCategory = require('./subCategories/subCategory.admin')

/** @type {import('adminjs').AdminJsOptions} */
const options = {
    databases: [mongoose],
    resources: [Category,SubCategory,User],
    rootPath: '/admin',
    branding: {
        logo: false,
        companyName: 'ZooPrints',
        softwareBrothers: false,
    }
};

module.exports = options;