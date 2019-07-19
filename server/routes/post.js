const router= require('express').Router()
const postController= require('../controllers/postController')
const {authentication}= require('../middlewares/authenticate')
const {authorizationPost}= require('../middlewares/authorize')
const {sendUploadToGCS, multer}= require('../helpers/image')

router.use(authentication)
router.get('/', postController.allPost)
router.get('/mypost', postController.myPost)
router.get('/one/:id', postController.findOne)
router.post('/', multer.single('image'), sendUploadToGCS, postController.create)
router.patch('/:postId', postController.updatelike )
router.delete('/:postId', authorizationPost,postController.delete)


module.exports= router