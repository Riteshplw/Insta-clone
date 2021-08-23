const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000//heroku will choose whatever port 
const {MONGOURL} = require('./config/keys');




//mongoose is used here for executing queries in mongodb
//connecting to keys
mongoose.connect(MONGOURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true            //with this two :warning will be gone
});

//connection with mongodb
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo");
}) 

mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err);
})
//after connection established below stuff wiil be executed
require('./models/user')
require('./models/post')

app.use(express.json())                //first u need to pass this //create this in postman

app.use(require('./routes/auth'))      //and after that use this handler
app.use(require('./routes/post')) 
app.use(require('./routes/user')) 

//listening to port:5000
//heroku
if(process.env.NODE_ENV=="production"){  //when its on production side
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{//* means any req
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log('Server Is Running',PORT);
})

