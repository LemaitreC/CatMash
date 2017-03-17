'use strict'

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Importation du model de chat
const chat = mongoose.model('chat')


//Renvoie la page de resultats
router.get('/', (req, res) => {
    res.render('votes',{
        titre:'Resultats des votes - CatMash' 
    })
})

//Renvoie la liste des score des chats 
router.get('/votes', (req, res) => {
    chat.find({}, function(err, data){
        if(err) throw err
        res.send(data)
    })
})

module.exports = router