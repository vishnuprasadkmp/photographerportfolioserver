const {Router}=require('express');
const { createUser, loginUser } = require('../controller/userController');
const router=Router()

router.post('/user',createUser)
router.post('/login',loginUser)



module.exports=router;