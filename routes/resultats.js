'use strict'

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Importation du model de chat
const chat = mongoose.model('chat')

//Initialisation des status
const statusHTTP = {
	ok: 200,
	serverError: 500
}

//Renvoie la page de resultats
router.get('/', (req, res) => {
	res.status(statusHTTP.ok).render('votes',{
		titre: 'Resultats des votes - CatMash'
	})
})

//Renvoie la liste des score des chats
router.get('/votes', (req, res) => {
	chat.find({},function(err, data){
		if(err) res.send(statusHTTP.serverError).send(err)
		res.status(statusHTTP.ok).send(data)
	}).sort({score: -1})
})

module.exports = router
