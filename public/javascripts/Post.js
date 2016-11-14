/**
 * Created by kumars on 14/11/16.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var schema = mongoose.Schema;
var blogSchema = new schema({
    title : String,
    content : String,
    DOC : Date
});

// Create a model object consttructor that will have functionality like save, find etc.
var Blog = mongoose.model('blog',blogSchema);

module.exports = Blog;

