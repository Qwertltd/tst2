const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title:{type: String,required: true},
    file:{type: Object,required: true},
},{
    timestamps: true,
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = {ProductSchema, Product};