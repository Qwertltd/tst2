const AdminJs = require('adminjs')
const {ProductImage} = require('../../Models/ProductImage')

const {
    after: uploadAfterHook,
    before: uploadBeforeHook,
} = require('./actions/upload-image.hook');

/** @type {AdminJs.ResourceOptions} */
const options = {
    parent: {
        name: 'Products',
        icon: 'fa fa-users',
    },
    properties: {
      imageUrl: {
          isVisible: false,
      },
      uploadImage: {
        components: {
          edit: AdminJs.bundle('../components/upload-image.edit.tsx'),
          list: AdminJs.bundle('../components/upload-image.list.tsx'),
        },
      },
    },
    actions: {
      new: {
        after: async (response, request, context) => {
          return uploadAfterHook(response, request, context);
        },
        before: async (request, context) => {
          return uploadBeforeHook(request, context);
        },
      },
      edit: {
        after: async (response, request, context) => {
          return uploadAfterHook(response, request, context);
        },
        before: async (request, context) => {
          return uploadBeforeHook(request, context);
        },
      },
      show: {
        isVisible: false,
      },
    },
};

module.exports = {
    options,
    resource: ProductImage,
};