const {Router}=require('express');
const { createPost, allPosts, singlePost, updatePost, deletePost } = require('../controller/postController');
const router=Router()
const upload=require('../config/multer');
const { Protect } = require('../middleware/protect');

router.post('/posts',upload.single('post'),createPost)

router.get('/posts',allPosts)

router.get('/posts/:id',singlePost)

router.put('/posts/:id',upload.single('post'),updatePost)

router.delete('/posts/:id',deletePost)
module.exports=router;