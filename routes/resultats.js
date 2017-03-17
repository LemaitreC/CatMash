'use strict'

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Importation du model de chat
const chat = mongoose.model('chat')


//Renvoie la page de resultats
router.get('/', (req, res) => {
    res.status(200).render('votes',{
        titre:'Resultats des votes - CatMash' 
    })
})

//Renvoie la liste des score des chats 
router.get('/votes', (req, res) => {
    chat.find({},function(err, data){
        if(err) res.send(500).send(err)
        res.status(200).send(data)
    }).sort({score:-1})
})

module.exports = router