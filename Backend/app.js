const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var routesImage = require('./api/image');
var cors = require("cors");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect('mongodb://localhost/Gallery_Crud',{
    useCreateIndex: true,
    useNewUrlParser: true ,
    useUnifiedTopology: true
});
var db = mongoose.connection;


//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});


app.use(cors());


// include routes
app.use('/',routesImage);


app.get("/",(req,res)=>{
    res.end("hi this is a Gallery crud app");
})

const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log('server listening on port 4000');
})