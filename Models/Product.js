const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    subCategoryId:{type: Schema.Types.ObjectId,ref: 'SubCategory'},
    UserId:{type: Schema.Types.ObjectId,ref: 'User'},
    title:{type: String,required: true},
    file:{type: Object},
    imageUrl:{type: String},
    price:{type: String, required: true},
    description:{type: String},
    dimension:{type: String},
    additional_info:{type: String},

},{
    timestamps: true,
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = {ProductSchema, Product};