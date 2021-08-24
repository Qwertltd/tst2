const createError = require('http-errors')
const {SubCategory} = require('../Models/SubCategory')
  
module.exports = {

    all: async (req, res, next) => {
        try {
            const category_id = await req.query.categoryId;
            await SubCategory.find({categoryId: category_id}, function(err, subCategories) {
                var SubCategoriesMap = {};
            
                subCategories.forEach(function(subCategory) {
                    SubCategoriesMap[subCategory._id] = subCategory;
                });
            
                res.send(SubCategoriesMap);  
            });

        }catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }

    },
    getOne: async (req, res, next) => {
        try {
            const subCategory_id = await req.query.id;
            const subCategory = await SubCategory.findById(subCategory_id);
            res.send({ subCategory })
        }catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }
    },
}