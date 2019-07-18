const router= require('express').Router()
const commentController= require('../controllers/commentController')
const {authentication}= require('../middlewares/authenticate')
const {authorizationComment}= require('../middlewares/authorize')

router.use(authentication)
router.get('/:projectId', commentController.allComment)
router.post('/:postId', commentController.create)
router.delete('/:commentId', authorizationComment, commentController.delete)


module.exports= router