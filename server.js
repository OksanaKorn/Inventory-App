const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())


app.use(function (req, res, next) {        
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
    res.setHeader('Access-Control-Allow-Credentials', true);       
    next();  
});  

// Configuring the database
const dbConfig = require('./config/mongo_db.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

var productSchema = mongoose.Schema({
    name: { type: String  },
    batches: { type: Array }
});

var product = mongoose.model('products', productSchema, "products");

var batchSchema = mongoose.Schema({
    name: { type: String },
    value: { type: Number }
});

var batch = mongoose.model('batches', batchSchema, "batches");

app.post("/api/batches", function(req, res){ 
      
    var bat = new batch(req.body);  
    bat.save(function(err,data){  
        if(err){  
           res.send(err);                
        }  
        else{        
            res.send({data:"Record has been Inserted..!!"});  
        }  
    })
})

app.post("/api/products", function(req, res){   
    var prod = new product(req.body);  
    prod.save(function(err,data){  
        if(err){  
           res.send(err);                
        }  
        else{        
            res.send({data:"Record has been Inserted..!!"});  
        }  
})  

app.put("/api/products", function(req, res){   
    var productToUpdate = product.findOneAndUpdate({_id:req.body._id}, req.body, function(err,data){  
        if(err){  
           res.send(err);                
        }  
        else{        
            res.send({data:"Record has been Updated..!!"});  
        }  
    })      
})

app.get("/api/products",function(req,res){  
    product.find({},function(err,data){  
              if(err){  
                  res.send(err);  
              }  
              else{                
                  res.send(data);  
                  }  
          });  
  })
}) 

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});