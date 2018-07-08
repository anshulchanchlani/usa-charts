const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser')
const csvjson = require('csvjson')
const PORT = 4000;
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
if(process.env.NODE_ENV==='production'){
    app.use(express.static('build'))
    app.get('/',function(req,res){
        res.sendFile('index.html',{root:'./build'})
    })
}
app.get('/getFileData',function(req,res){
    if (!req.body) return res.sendStatus(400);
    var data = fs.readFileSync(path.join(__dirname, '.././data/population.csv'), { encoding : 'utf8'});
    var options = {
        delimiter : ',', 
       
      };
      
     res.json( csvjson.toObject(data, options));

})


app.listen(PORT,'0.0.0.0',function(){
    console.log('Server listening on 0.0.0.0:',PORT)
})