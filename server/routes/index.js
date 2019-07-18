const router= require('express').Router()
const userRoute= require('./user')
const commentRoute= require('./comment')
const postRoute= require('./post')

router.use('/users', userRoute)
router.use('/posts', postRoute)
router.use('/comments', commentRoute)

module.exports= router