const {Product} = require("../Models/Product");
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