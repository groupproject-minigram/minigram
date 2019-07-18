const Post= require('../models/post')

class postController{

    static allPost(req, res, next){
        Post.find({})
        .populate('userId')
        .sort({createdAt: -1})
        .then(allpost =>{
            res.status(200).json(allpost)
        })
        .catch(next)
    }

    static myPost(req, res, next){
        Post.find({userId: req.decode.id})
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(next)
    }

    static create(req, res, next){
        let newPost= {
            image: req.file.cloudStoragePublicUrl,
            caption: req.body.caption,
            likes:[],
            userId: req.decode.id
        }

        Post.create(newPost)
        .then(post =>{
            res.status(201).json(post)
        })
        .catch(next)
    }

    static updatelike(req, res, next){
        let postId= req.params.postId
        let userId= req.decode.id

        Post.findById(postId)
        .then(post =>{
            if(!post){
                throw {code: 404, message: 'Question not found'}
            }else{
                if(post.likes.includes(userId)){
                   return Post.findByIdAndUpdate(postId , {$pull : { likes: userId }})
                }else{
                   return Post.findByIdAndUpdate(postId, {$addToSet : { likes: userId }})
                }
            }
        })
        .then(post =>{

            res.status(200).json(post)
        })
        .catch(next)
    }

    static delete(req, res, next){
        Post.deleteOne({_id: req.params.postId})
        .then(post => {
            res.status(200).json(post)
        })
        .catch(next)
    }
}

module.exports= postController