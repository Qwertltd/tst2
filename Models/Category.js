const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title:{type: String,required: true},
    coverImage:{type: String},
    description:{type: String},
},{
    timestamps: true,
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = {CategorySchema, Category};