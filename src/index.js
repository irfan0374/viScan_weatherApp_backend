const express = require("express")
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const prisma=new PrismaClient()
const app= express()
app.use(bodyParser.json())

const PORT=process.env.PORT||3000
const JWT_SECRET =process.env.JWT_SECRET

app.listen(PORT,()=>{
    console.log(`server is running port ${PORT}`)
})

//middleware to authenticat the jwt

const authenticationToken=(req,res,next)=>{
    const token=req.header("Autherization").replace('Bearer ',"");
    if(!token) return res.status(401).json({error:"Access denied, no token provided"})

        try {
            const verified=jwt.verify(token,JWT_SECRET)
            req.user=verified;
            next()
            
        } catch (error) {
            res.status(400).json({  error:"invalid token"})
            console.log(error)
            
        }
}


// Registration Route
app.post('register',async(req,res)=>{
    
})