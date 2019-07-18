const Post= require('../models/post')
const Comment= require('../models/comment')


module.exports={
     authorizationPost(req, res, next){
        console.log('masuk authorize')
        Post.findById(req.params.postId)
        .then(post=>{
            if(!post){
                res.status(404).json('Not found')
            }else{
                if(req.decode.id == post.userId){
                    next()
                }else{
                    res.status(403).json('Not Authorized')
                }
            }
        })
        .catch(next)
    },
    authorizationComment(req, res, next){
        console.log('masuk authorize')
        Comment.findById(req.params.commentId)
        .then(comment=>{
            if(!comment){
                res.status(404).json('Not found')
            }else{
                if(req.decode.id == comment.userId){
                    next()
                }else{
                    res.status(403).json('Not Authorized')
                }
            }
        })
        .catch(next)
    },
}

