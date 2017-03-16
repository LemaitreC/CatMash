let express = require('express')
let path = require('path')
let mongoose = require('mongoose')
let fs = require('fs')

let app = express()

//Connection avec la base de données mlab
mongoose.connect('mongodb://user1:password@ds131510.mlab.com:31510/catmash')

//On récupère le model pour les chats 
require('./models/chat_model')

// Moteur de Templates / modèles EJS 
app.set('view engine', 'ejs')

let index = require('./routes/index');


// Fixation des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.listen(3001)