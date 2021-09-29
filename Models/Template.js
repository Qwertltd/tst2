const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    width:{
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true,
    }
},{
    timestamps: true,
});

const Template = mongoose.model('Template', TemplateSchema);

module.exports = {TemplateSchema, Template};