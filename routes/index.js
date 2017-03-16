let express = require('express')
let router = express.Router()
let fs = require('fs')

// Renvoie la page de vote / page d'accueil
router.get('/', (req, res) => {

    res.render('index', {
        titre: 'Vote - CatMash'
    });

})

//Obtenir deux chats aléatoirement.
router.get('/chats',(req,res)=>{
    let chats=[]
    const listeChats = JSON.parse(fs.readFileSync('public/data/chat.json', 'utf8'))
    let chatUn = getRandomIntInclusive(1,95)
    let chatDeux= getRandomIntInclusive(1,95)
    
    while(chatDeux==chatUn){
        chatDeux = getRandomIntInclusive(1,95)
    }
    
    chats.push(listeChats.images[chatUn],listeChats.images[chatDeux])
    
    res.send(chats)
})

//Retourne un nombre entier aléatoire dans un intervalle fermé
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

module.exports = router;