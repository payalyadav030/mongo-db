const chalk = require('chalk');
const fs = require('fs')
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const PORT = 6788;
app.use(express.json());
app.use('/static', express.static('public'));

// format for a session 
app.use(session({
    name: 'pay-session',
    secret : 'abcdefgh1234$$$###',
    resave : true,
    saveUninitialized : true,
    //rolling: false,
    cookie : {
        httpOnly : true,
        maxAge : 15000,
        path : '/',
        sameSite : true,
        secure : false,

    }
}));


const hbs = exphbs.create({
    extname : '.hbs'
})


// database connection
var db = null;
var url ='mongodb://localhost:27017';  //127.0.0.1 === localhost, here mongodb is protocol; localhost is our machine; 27017 is the port
MongoClient.connect(url, function(error, client){
    if(error){
        throw error;    
    }
   // console.log(client);
     db = client.db('eagle-db'); // getting access to the database

   
    // db.listCollections().toArray(function(error, collections){
    //     console.log(collections);
    // })

    //var collection = db.collection('students'); // get access to the collection in the database
    // collection.find({
    //     //name : "Payal Yadav"
    //     age : 21
    // }).toArray(function(error, response){

    //     console.error(error);
    //     console.log(response)
    // });
});



app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');



// adding route
app.post('/student/create', function(req, res){
    //console.log("data",req.body)
    var data = req.body;
    var collection = db.collection('students');

    collection.insertOne(data, function(error, response){
        console.log(error , response)
        if(error){
            return res.send({
                status : false,
                message : "failed to create a student"
            })
        }
        return res.send({
            status : true,
            message : "successfully created student"
        })
    })
});
app.get('/student/retrieve', function(req, res){
    var collection = db.collection('students');
    collection.find({}).toArray(function(error, response){
        if(error){
            return res.send({
                status : false,
                message : "failed to retrieve the student"
            })
        }
        return res.send({
            status : true,
            message : "successfully retrieved studen-list",
            data : response
        })
    })
});
app.put('/student/update', function(req, res){
    var updateData = req.body.updateData;
    var identifier = req.body.identifier;
    var collection = db.collection('students');

    collection.update({
        name : identifier
    },{
        "$set": updateData
    },   function(error, response){
            //console.log(error , response)
        if(error){
            return res.send({
                status : false,
                message : "failed to update a student"
            })
        }
        return res.send({
            status : true,
            message : "successfully updated student"
        }); 
    });
});


app.listen(PORT, function(){
    console.log("aplication is started on port:", PORT)
})