const express = require("express");
const app = express();

const dotenv = require('dotenv').config({
    path: "../.env"
});

const path=require('path')
const ejs = require('ejs')
const routes = require("../src/app/routes/routes");
const bodyParser = require('body-parser')

const environment = require('../enviornment');
const env = process.env.NODE_ENV;
const envconfig = environment[env];
const port = envconfig.port || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views/'));


const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

var redis = require("redis");
var client = redis.createClient();

io.on('connection', (socket) => {
    
    console.log('User connected');
    client.incr('counter' , (err , counter)=>{
            io.emit('userCounter', counter);
    })

    socket.on('color', (value) => {

        if(value=="red"){
            client.incr("counterRed",  (err , data)=>{
                io.emit('colorRed', data)
              })
        }else if(value=="blue"){
            client.incr("counterBlue",  (err , data)=>{
                io.emit('colorBlue', data )
              })
        }else if(value=="green"){

            client.incr("counterGreen",  (err , data)=>{
                io.emit('colorGreen', data )
              })
        }
      
       
      });
      
   
    socket.on('disconnect', () => {

      console.log('User disconnected');
      client.decr('counter' , (err , counter)=>{

         client.get('counter', (err , data)=>{
                io.emit('userCounter', data);
            })
        
    })
    });
  });

server.listen(port, () => {
  console.log('Server Listening on :'+port);
});