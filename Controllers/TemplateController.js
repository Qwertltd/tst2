const createError = require('http-errors')
const {Template} = require('../Models/Template')
  
module.exports = {
    all: async (req, res, next) => {
        try {
            await Template.find({}, function(err, templates) {
                var TemplatesMap = {};
            
                templates.forEach(function(template) {
                    TemplatesMap[template._id] = template;
                });
            
                res.send(TemplatesMap);  
            });

        }catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }

    },
}