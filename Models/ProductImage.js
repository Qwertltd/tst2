const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductImageSchema = new Schema({
    productId:{type: Schema.Types.ObjectId,ref: 'Product'},
    imageUrl:{type: String},

},{
    timestamps: true,
});

const ProductImage = mongoose.model('ProductImage', ProductImageSchema);

module.exports = {ProductImageSchema, ProductImage};