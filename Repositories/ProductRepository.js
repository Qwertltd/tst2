const {Product} = require("../Models/Product");
exports.productsBySubCategoryId = async subCategory_id => {
    const products = await Product.find({subCategoryId: subCategory_id});
    return products;
};
exports.productById = async id => {
    const product = await Product.findById(id);
    return product;
}