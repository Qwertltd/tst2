const AdminJs = require('adminjs')
const {Order} = require('../../Models/Order')

/** @type {AdminJs.ResourceOptions} */
const options = {
    properties: {
        pdf: {
            isVisible: false,
        },
        pdfDownload: {
          components: {
            edit: AdminJs.bundle('../components/button.tsx'),
            list: AdminJs.bundle('../components/button.tsx'),
          },
        },
    },
};

module.exports = {
    options,
    resource: Order,
};