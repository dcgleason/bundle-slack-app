require('dotenv').config({ path: require('find-config')('.env') })
const express = require('express')
const appExpress = express()
const mongoose = require('mongoose')
const axios = require('axios')
const { App } = require("@slack/bolt");

const app = new App({
    token: process.env.token, //Find in the Oauth  & Permissions tab
    signingSecret: process.env.singingSecret, // Find in Basic Information Tab
    socketMode:false,
    appToken: process.env.SLACK_APP_TOKEN // Token from the App-level Token that we created
  });
  

appExpress.use((req, res, next) => {
   
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
     res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
     console.log('origin' + origin);
     res.setHeader( 'Access-Control-Allow-Methods', '*')
     res.setHeader("Access-Control-Allow-Headers", "*");
     next();
   });
 
const users = require('./routes/users')

   //initialization of variables 
const port = process.env.PORT || 3001

//middleware
app.use(express.urlencoded({ extended: true }))

// db connection - mongo atlas
const connectDB = async ()=>{
    await mongoose.connect(
        process.env.DB_URL,
                { useUnifiedTopology: true, useNewUrlParser: true },
                (err)=> {
                    if (err) {
                        console.log("could not connect to mongodb atlas" + '\n' + err)
                    }else {
                        console.log("connected to mongo")
                    }
                    
                }
            )
            
            }
//execute connection
connectDB()


// app route controllers - app.use
appExpress.use("/users", users);



// app root route app.get
appExpress.get("/",(req,res)=>{
    console.log('root')
    res.send("APP ROOT")
 
})


//server initialization
appExpress.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})

export default app;