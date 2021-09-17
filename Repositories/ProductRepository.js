const {Product} = require("../Models/Product");
const {Review} = require("../Models/Review");
exports.productsBySubCategoryId = async subCategory_id => {
    const products = await Product.find({subCategoryId: subCategory_id});
    return products;
};
exports.productById = async id => {
    const product = await Product.findById(id);
    return product;
};
exports.create = async payload => {
    const newProduct = await Product.create(payload);
    return newProduct
}
exports.createReview = async payload => {
    const newReview = await Review.create(payload);
    return newReview
}
exports.reviewsByProductId = async product_id => {
    const reviews = await Review.find({productId: product_id});
    
    return reviews;
};