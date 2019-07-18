const Comment= require('../models/comment')

class commentController{

    static allComment(req, res, next){
        Comment.find({projectId: req.params.projectId})
        .then(comment => {
            res.status(200).json(comment)
        })
        .catch(next)
    }

    static create(req, res, next){
        let newComment={
            comment: req.body.comment,
            userId: req.decode.id,
            postId: req.params.postId
        }

        Comment.create(newComment)
        .then(comment => {
            res.status(201).json(comment)
        })
        .catch(next)
    }

    static delete(req, res, next){
        Comment.deleteOne({_id: req.params.id})
        .then(comment => {
            res.status(comment)
        })
        .catch(next)
    }
}

module.exports= commentController