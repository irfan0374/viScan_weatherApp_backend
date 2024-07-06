const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET ;

const registerUser=async(req,res)=>{
    const {email,password}=req.body
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    try {
        const user=await prisma.user.create({
            data:{
                email,
                password:hashedPassword
            }
        })
        res.json({message:"User registerd successfully"})
        
    } catch (error) {
        res.status(400).json({error:"User registration failed"})
        
    }
}