const AdminJs = require('adminjs')
const {Category} = require('../../Models/Category')

const {
    after: uploadAfterHook,
    before: uploadBeforeHook,
} = require('./actions/upload-image.hook2');

/** @type {AdminJs.ResourceOptions} */
const options = {
    parent: {
        name: 'Admin Content',
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
    resource: Category,
};