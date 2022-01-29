const mongoose = require('mongoose')
const Joi = require('joi')
const {func} = require("joi");
const {model} = require("mongoose");
const JoiobjectId = require('joi-objectid')(Joi)

const postSchema = new mongoose.Schema({
    postTitle:{
        type: String,
        required: true
    },
    postData:{
        type: String,
        required: true
    }
});

const Post = mongoose.model('Post', postSchema)

async function validate(post){
    const schema = Joi.object({
        postTitle: Joi.string().required(),
        postData: Joi.string().required()
    })
    return schema.validate(post)
}

module.exports.postSchema = postSchema;
module.exports.Post = Post;
module.exports.validatePost = validate;