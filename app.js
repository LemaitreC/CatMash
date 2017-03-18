'use strict'

const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

//Connection avec la base de données mlab
mongoose.Promise = global.Promise
mongoose.connect('mongodb://user1:password@ds131510.mlab.com:31510/catmash')

//On récupère le model pour les chats
require('./models/chat_model')

// Moteur de Templates / modèles EJS
app.set('view engine', 'ejs')

//On récupère les différents chemins /routes
const index = require('./routes/index')
const resultats= require('./routes/resultats')


// Fixation des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/resultats', resultats)

const port = process.env.PORT || 3001

app.listen(port, err => {
	if (err) {
		console.error(err)
	} else {
		console.log('App is ready at : ' + port)
	}
})
