'use strict'

const express = require('express')
const router = express.Router()
const fs = require('fs')
const mongoose = require('mongoose')

//Importation du model de chat
const chat = mongoose.model('chat')

// Renvoie la page de vote / page d'accueil
router.get('/', (req, res) => {

    res.status(200).render('index', {
        titre: 'Vote - CatMash'
    })

})

//Obtenir deux chats aléatoirement.
router.get('/chats', (req, res) => {
    const maxChat = 95
    const minChat = 1
    const chats = []
    const listeChats = JSON.parse(fs.readFileSync('public/data/chat.json', 'utf8'))
    const chatUn = getRandomIntInclusive(minChat, maxChat)
    let chatDeux = getRandomIntInclusive(minChat, maxChat)

    while (chatDeux === chatUn) {
        chatDeux = getRandomIntInclusive(minChat, maxChat)
    }

    chats.push(listeChats.images[chatUn], listeChats.images[chatDeux])

    res.status(200).send(chats)
})

//Publier un vote dans la base de données
router.get('/vote', (req, res) => {
    // On récupère l'id
    const idChat = req.query.id
    const url = req.query.url

    //Si l'url correspond  à une image  non trouvée on rafriachit la page sans rien enregistrer  
    if(url==='../images/image_not_found.png'){
        return res.status(500).redirect('/')
    }
    
    //Si l'url du chat est valide  
    //On regarde si le chat exist dans la base de données
    chat.findOne({
        id: idChat
    }, function (err, data) {
        if (err) {
            console.log(err)
            return res.status(500).send()
        } else if (!data) {
            //Si le chat n'existe pas on le creer dans la base de données avec un vote.

            //On créer un nouveau  chat
            const newChat = new chat()

            newChat.id = idChat
            newChat.url = url
            newChat.score = 1

            //On enregistre le chat
            newChat.save(function (err, savedChat) {
                if (err) {
                    console.log(err)
                    return res.status(500).send(err)
                }
                console.log(savedChat)
                return res.redirect('/')
            })

        } else {
            //Si le chat exist dans la base de données on rajoute son vote.
            chat.updateOne({
                id: idChat
            }, {
                score: data.score + 1
            }, function (err) {
                if (err) {
                    console.log(err)
                    return res.status(500).send(err)
                }
                return res.redirect('/')
            })
        }
    })
})

//Retourne un nombre entier aléatoire dans un intervalle fermé
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = router