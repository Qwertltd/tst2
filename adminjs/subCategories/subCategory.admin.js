const AdminJs = require('adminjs')
const {SubCategory} = require('../../Models/SubCategory')

const {
    after: uploadAfterHook,
    before: uploadBeforeHook,
} = require('../categories/actions/upload-image.hook2');

/** @type {AdminJs.ResourceOptions} */
const options = {
    parent: {
        name: 'Admin Content',
        icon: 'fa fa-users',
    },
    properties: {
      coverImage: {
          isVisible: false,
      },
      uploadImage: {
        components: {
          edit: AdminJs.bundle('../categories/components/upload-image.edit.tsx'),
          list: AdminJs.bundle('../categories/components/upload-image.list.tsx'),
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
    resource: SubCategory,
};