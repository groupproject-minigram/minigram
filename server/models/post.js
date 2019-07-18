const mongoose = require('mongoose')
const Schema = mongoose.Schema

let postSchema= new Schema({
    image:{
        type: String,
        required: [true, 'Image required']
    },
    caption:{
        type: String
    },
    likes:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

let Post= new mongoose.model('Post', postSchema)

module.exports= Post