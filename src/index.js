const express = require("express")
const bodyParser = require('body-parser');
const authRoutes=require('../src/Routes/authRoute')
const weatherRoutes=require('../src/Routes/weatherRoute')
const cors = require('cors');
const prisma =require( '../prisma/prismaClient');


const app= express()
app.use(bodyParser.json())

const PORT=process.env.PORT||3000

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
}));
 

app.listen(PORT,()=>{
    console.log(`server is running port ${PORT}`)
})

process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received. Closing HTTP server.');
    await prisma.$disconnect();
    process.exit(0);
  });

 
app.use('/auth', authRoutes);
app.use('/weather', weatherRoutes);
