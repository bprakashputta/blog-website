const express = require('express');
const posts = express.Router();
const _ = require("lodash");
const {postSchema, Post, validatePost} = require('../models/post')

posts.get('/', async (request, response)=>{
    let Posts = await Post.find();
    return response.render('posts', {posts: Posts});
});


posts.get('/compose', (request, response)=>{
    return response.render('compose');
});

posts.post('/compose', async (request, response)=>{
    // console.log(request.body.postTitle);
    const {error} = await validatePost(request.body);
    if(error){
        return response.status(400).send(error.message)
    }


    const post = new Post({
        postTitle: request.body.postTitle,
        postData: request.body.postData
    })
    console.log(post);
    await post.save()
    return response.redirect("/posts/compose");
})

posts.get('/:postId', async (request, response)=>{
    let requestedPost = {};
    let boolcheck = false;
    let posts = await Post.find();
    posts.forEach(post=>{
        if(_.lowerCase(post.postTitle) === _.lowerCase(request.params.postId)){
            console.log("Match Found!");
            boolcheck = true;
            return response.render('post', {post: post});
        }
    });
    if(boolcheck===false){
        return response.status(401).send("Post doesn't exist");
    }
    // let post = await Post.findById({id: request.body.id})
    // if(!post){
    //     return response.status(400).send('Post with given ID does not exist')
    // }else{
    //     return response.render('post', {post: post})
    // }
})

module.exports = posts;