var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost/Gallery_Crud');

autoIncrement.initialize(connection);

var ImageSchema = new mongoose.Schema({
    ImgName:{
        type:String,
        required:true,
    },
    ImgURL:{
        type:String,
        required:true,
    },
    ImgDetails:{
        type: String,
        required: true,
    },
}, {
    versionKey: false 
});

ImageSchema.plugin(autoIncrement.plugin, 'image');
var image = mongoose.model('image', ImageSchema);
module.exports = image;
