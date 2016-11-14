var express = require('express');
var mongoose = require('mongoose');
var app = express();
app.use(express.static(__dirname + '/public'));
app.set('views','./views');
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/test');

var schema = mongoose.Schema;

var blogSchema = new schema({
  title : String,
  content : String,
  DOC : Date
});


// Create a model
var Blog = mongoose.model('blog',blogSchema);

var createblogPost = function(blogTitle, blogContent, blogDate) {

  // create document

    var blogInstance  = new Blog({
      title : blogTitle,
      content : blogContent,
      DOC : blogDate
    });

    blogInstance.save(function(err,savedDate){
      if (err) {
        console.log('Error is :: '+err);
        return null;
      } else {
        console.log('Blog details saved in DB:: '+ blogInstance);
      }
    });
};


// Writing a middleware function that gives date.

var getDate = function(req,res,next){
  req.date = new Date();
  next();
};

app.get('/', getDate, function(req,res){
  // Get data from DB.
  Blog.find({}, function(err, data){
    if (err) {
      console.log('Error is :: '+err);
    } else {
      res.render('index',{name:data});
      res.end();
    }
  });
});

// retrieve all blog post data from mongo db and show them to the client
app.get('/showAll',getDate, function(req,res){
  Blog.find({}, function(err, data){
    if (err) {
      console.log('Error is :: '+err);
    } else {
      res.send(data);
      res.end();
    }
  });
});


app.get('/new',getDate, function(req,res){
  res.render('new');
  res.end();
});

/**
 *  Creats a blog content with title and save that to DB.
 */

app.get('/createBlog',getDate, function(req,res){
  console.log("Date is "+req.date);
  var blogTitle = req.query.blogTitle,
      blogContent = req.query.blogContent,
      blogDate = req.date;
  console.log('Blog Date is ::: '+blogDate);

  createblogPost(blogTitle, blogContent, blogDate);
  res.redirect('/');
  res.end();
});


app.listen('8080');
