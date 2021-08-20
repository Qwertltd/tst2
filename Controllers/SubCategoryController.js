const createError = require('http-errors')
const {SubCategory} = require('../Models/SubCategory')
  
module.exports = {
    // create: async (req, res, next) => {
    //     try {
    //         const result = req.body

    //         const doesExist = await Category.findOne({ title: result.title })
    //         if (doesExist)
    //             throw createError.Conflict(`${result.title} has already been registered`)

    //         const category = new Category(result)
    //         const savedCategory = await category.save()
    //         res.send(savedCategory);
    //     } catch (error) {
    //         if (error.isJoi === true) error.status = 422
    //         next(error)
    //     }
    // },

    all: async (req, res, next) => {
        try {
            const category_id = req.query.categoryId;
            SubCategory.find({categoryId: category_id}, function(err, subCategories) {
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
    // getOne: async (req, res, next) => {
    //     try {
    //         const category_id = req.query.id;
    //         const category = await Category.findById(category_id);
    //         res.send({ category })
    //     }catch (error) {
    //         if (error.isJoi === true) error.status = 422
    //         next(error)
    //     }
    // },
}