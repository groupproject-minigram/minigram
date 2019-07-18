const router= require('express').Router()
const postController= require('../controllers/postController')
const {authentication}= require('../middlewares/authenticate')
const {authorizationPost}= require('../middlewares/authorize')
const {sendUploadToGCS, multer}= require('../helpers/image')

router.use(authentication)
router.get('/allpost', postController.allPost)
router.get('/mypost', postController.myPost)
router.post('/', multer.single('image'), sendUploadToGCS, postController.create)
router.patch('/:postId', postController.updatelike )
router.delete('/:postId', authorizationPost,postController.delete)


module.exports= router