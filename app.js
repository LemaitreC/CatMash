'use strict'

const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

const port = 3001
const app = express()

//Connection avec la base de données mlab
mongoose.Promise = global.Promise
mongoose.connect('mongodb://user1:password@ds131510.mlab.com:31510/catmash')

//On récupère le model pour les chats
require('./models/chat_model')

// Moteur de Templates / modèles EJS
app.set('view engine', 'ejs')

const index = require('./routes/index')


// Fixation des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)

app.listen(port)
