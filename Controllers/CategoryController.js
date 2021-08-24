const createError = require('http-errors')
const {Category} = require('../Models/Category')
  
module.exports = {

    all: async (req, res, next) => {
        try {
            // const cats = await Category.find({})
            await Category.find({}, function(err, categories) {
                var CategoriesMap = {};
            
                categories.forEach(function(category) {
                    CategoriesMap[category._id] = category;
                });
            
                res.send(CategoriesMap);  
            });

        }catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }

    },
    getOne: async (req, res, next) => {
        try {
            const category_id = await req.query.id;
            const category = await Category.findById(category_id);
            res.send({ category })
        }catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }
    },
}