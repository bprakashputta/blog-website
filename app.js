const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const {request, response} = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const _ = require('lodash');
const mongoose = require('mongoose');
const {postSchema, Post, validatePost} = require('./models/post')


mongoose.connect('mongodb://localhost/blog-website')
    .then(()=>{
      console.log("Connected to MongoDB")
    })
    .catch((err)=>{
      console.log(err.message)
    })




// routes
const about = require('./routes/about')
const contact = require('./routes/contact')
const posts = require('./routes/post')

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// middlewares
app.use('/about', about);
app.use('/contact-us', contact);
app.use('/posts', posts);


app.get('/', async (request, response)=>{
    let posts = await Post.find();
    return response.render('home', {homeStartingContent: homeStartingContent, posts: posts});
});


app.listen(PORT, function() {
  console.log("Server started on port", PORT);
});
