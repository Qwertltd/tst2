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
    },
    numberofColumns: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    topMargin: {
        type: Number,
        required: true,
    },
    leftMargin: {
        type: Number,
        required: true,
    },
    verticalSpacing: {
        type: Number,
        required: true,
    },
    horizontalSpacing: {
        type: Number,
        required: true,
    },
    cornerRadius: {
        type: Number,
        required: true,
    },
},{
    timestamps: true,
});

const Template = mongoose.model('Template', TemplateSchema);

module.exports = {TemplateSchema, Template};