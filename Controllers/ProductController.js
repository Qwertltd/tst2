const createError = require('http-errors')
const {Product} = require('../Models/Product')
  
module.exports = {
    all: async (req, res, next) => {
        try {
            const subCategory_id = await req.query.subCategoryId;
            await Product.find({subCategoryId: subCategory_id}, function(err, products) {
                var ProductsMap = {};
            
                products.forEach(function(product) {
                    ProductsMap[product._id] = product;
                });
            
                res.send(ProductsMap);  
            });

        }catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }

    },
    getDetails: async (req, res, next) => {
        try {
            const product_id = await req.query.id;
            const product = await Product.findById(product_id);
            res.send({ product })
        }catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }
    },
}