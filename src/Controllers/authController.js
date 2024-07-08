const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

const JWT_SECRET = process.env.JWT_SECRET;

// User Registration

const registerUser = async (req, res) => {

   
    const { email, password,name, } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        
        const user = await prisma.user.create({
            data: {
                name:name,
                email,
                password: hashedPassword
            }
        })
        res.status(201).json({ message: "User registerd successfully" })

    } catch (error) {
        res.status(400).json({ error: "User registration failed" })

    }
}

// User Login 

const userLogin = async (req, res) => {

    const { email, password } = req.body
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(400).json({ error: "Please check the email" })

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).json({ error: "Incorrect Password try again" })
    const token = jwt.sign({ id: user.id }, JWT_SECRET)
    res.json({ token,message:`Sucess` })
}

module.exports = { registerUser,userLogin } 