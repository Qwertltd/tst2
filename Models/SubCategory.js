const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
    categoryId:{type: Schema.Types.ObjectId,ref: 'Category'},
    title:{type: String,required: true},
    coverImage:{type: String},
    file:{type: Object}
},{
    timestamps: true,
});

const SubCategory = mongoose.model('SubCategory', SubCategorySchema);

module.exports = {SubCategorySchema, SubCategory};