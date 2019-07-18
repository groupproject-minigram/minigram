const mongoose = require('mongoose')
const Schema = mongoose.Schema

let commentSchema= new Schema({
    comment:{
        type: String,
        required: [true, 'Comment required']
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    PostId:{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
})

let Comment= new mongoose.model('Comment',commentSchema)

module.exports = Comment