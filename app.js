var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.set('views','./views');
app.set('view engine', 'ejs');
var Blog = require('./blog.js');

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
      res.render('index',{blogData:data});
      res.end();
    }
  });
});

// Render new form to enter new blog.
app.get('/new',getDate, function(req,res){
  res.render('new');
  res.end();
});

/**
 *  Creats a blog content with title and save that to DB.
 */
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

// Remaining  task :- remove some unwanted CSS from html files
