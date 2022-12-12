const express = require("express");
const bodyParser = require('body-parser');
const ejs = require('ejs');
const cookieParser = require('cookie-parser')
const fs = require('fs')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require("path")
const session = require('express-session')
const passport = require("passport")
const {connection} = require('./config/db')
const webSocketserver = require('websocket').server;
const http = require('http');
const {Server} = require('socket.io');
const { isObject } = require("lodash");


require('dotenv').config()


const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:'http://localhost:3000'
    }
})
app.set('socketio', io);
connection()
app.use(cors())

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true,
    cookie: {maxAge: 60 * 60 * 24 * 1000}
}))
app.use(cookieParser('secret'))
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

//app.use('/public', express.static(path.join(__dirname,'../client/build')));
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use('/public',express.static(path.join(__dirname,'../client/public')))




app.use('/users',require('./Routes/users'))
app.use('/msg', require('./Routes/messagesA'))
app.use('/template',require('./Routes/template'))
app.use('/contacts',require('./Routes/contacts'))
app.use('/drafts',require('./Routes/draft'))
app.use('/report',require('./Routes/reports')(io))
app.use('/invoice',require('./Routes/invoice'))
app.use('/whatsapp',require('./Routes/whatsapp'))

app.get('/',(req,res)=>{
    res.send('app file')
})

// app.get('/', function (req, res) {
//     res.render(path.resolve(__dirname, '../client/build/index.html'));
//   });
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

const PORT = process.env.PORT  || 3002





server.listen(PORT,()=>console.log('app started'));


io.on('connection',(socket)=>{
console.log(socket.id)
socket.on('disconnect',()=>{
        console.log('user disconnected')
    })

})


