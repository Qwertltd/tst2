const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
    title:{type: String,required: true},
    file:{type: String,required: true},
},{
    timestamps: true,
});

const Template = mongoose.model('Template', TemplateSchema);

module.exports = Template;