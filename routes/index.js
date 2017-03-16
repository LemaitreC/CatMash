let express = require('express')
let router = express.Router()
let fs = require('fs')
let mongoose = require('mongoose')

//Ajout du model de chat 
//Ajout des différents modeles 
let chat = mongoose.model('chat')

// Renvoie la page de vote / page d'accueil
router.get('/', (req, res) => {

    res.render('index', {
        titre: 'Vote - CatMash'
    });

})

//Obtenir deux chats aléatoirement.
router.get('/chats', (req, res) => {
    let chats = []
    const listeChats = JSON.parse(fs.readFileSync('public/data/chat.json', 'utf8'))
    let chatUn = getRandomIntInclusive(1, 95)
    let chatDeux = getRandomIntInclusive(1, 95)

    while (chatDeux == chatUn) {
        chatDeux = getRandomIntInclusive(1, 95)
    }

    chats.push(listeChats.images[chatUn], listeChats.images[chatDeux])

    res.send(chats)
})

//Publier un vote dans la base de données 
router.get('/vote', function (req, res) {
    // On récupère l'id
    let idChat = req.query.id
    let url = req.query.url
    
        //On regarde tout d'abord si le chat exist dans la base de données
    chat.findOne({
        id: idChat
    }, function (err, data) {
        if (err) {
            console.log(err)
            return res.status(500).send();
        } else if (!data) {
            //Si le chat n'existe pas on le creer dans la base de données avec un vote.

            //On créer un nouveau  chat  
            let newChat = new chat()
            newChat.id = idChat
            newChat.url = url
            newChat.score = 1

            //On enregistre le chat 
            newChat.save(function (err, savedChat) {
                if (err) {
                    console.log(err)
                    return res.status(500).send(err);
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
            }, function (err, affected, rep) {
                if (err) {
                    console.log(err)
                    return res.status(500).send(err);
                }
                return res.redirect('/')
            })
        }
    })
})

//Retourne un nombre entier aléatoire dans un intervalle fermé
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = router;