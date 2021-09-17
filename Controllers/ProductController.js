const createError = require('http-errors')
const {User} = require('../Models/User')
const {Product} = require('../Models/Product')
const {ProductImage} = require('../Models/ProductImage')
const productRepository = require('../Repositories/ProductRepository')
  
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
        const product_id = await req.query.id;
        const product = await Product.findById(product_id);
        res.send({ product })
    },
    getRelatedProducts: async (req, res, next) => {
        const id = await req.query.id;
        const products = await productRepository.relatedProducts(id);
        res.send({ products })
    },
    getImages: async (req, res, next) => {
        try {
            const product_id = await req.query.productId;
            await ProductImage.find({productId: product_id}, function(err, images) {
                var ImagesMap = {};
            
                images.forEach(function(image) {
                    ImagesMap[image._id] = image;
                });
                res.send(ImagesMap);  
            });

        }catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }
    },
    create: async(req,res,next) => {
        const {values} = req.body;
        try{
            const productData = {
                UserId: values.UserId,
                title: values.title,
                file: values.file,
                imageUrl: values.imageUrl,
                price: values.price,
                description: values.description,
                dimension: values.dimension,
                additional_info: values.additional_info,
            }
            let product = await productRepository.create(productData)

            res.json(product);
        }catch (err) {
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    },
    createReview: async(req,res,next) => {
        const {userId} = req.body;
        const {productId} = req.body;
        const {comment} = req.body;
        const {rating} = req.body;
        try{
            const user = await User.findById(userId)
            const ratingData = {
                userId: userId,
                first_name: user.first_name,
                last_name: user.last_name,
                productId: productId,
                comment: comment,
                rating: rating,
            }
            let review = await productRepository.createReview(ratingData)
            res.status(200).json({
                status: true,
                data: review
            })
        }catch (err) {
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    },
    getReviews: async (req, res, next) => {
        const product_id = await req.query.productId;
        const reviews = await productRepository.reviewsByProductId(product_id)
        const reviewCount = reviews.length;
        if(reviewCount>0){
            const reviewTotal = reviews.map(review => review.rating).reduce((acc, next) => acc + next);
            const reviewRating = Math.round(reviewTotal/reviewCount);
            const result = {
                reviews: reviews,
                reviewCount: reviewCount,
                rating: reviewRating,
            };
            res.send({ result })
        }else{
            const result = {
                reviews: {},
                reviewCount: 0,
                rating: 0,

            };
            res.send({ result })
        }
    },
}