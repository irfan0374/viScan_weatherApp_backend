const express=require("express")
const {registerUser,userLogin}=require('../Controllers/authController')

const router=express.Router()

// auth Route

router.post('/register',registerUser)
router.post('/login',userLogin)

module.exports=router 