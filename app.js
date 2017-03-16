let express = require('express')
let path = require('path')
var mongoose = require('mongoose')
let fs = require('fs')

let app = express()

//Connection avec la base de données mlab
mongoose.connect('mongodb://user1:password@ds131510.mlab.com:31510/catmash')

// Moteur de Templates / modèles EJS 
app.set('view engine', 'ejs')


// Fixation des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Test de l'app
app.get('/', (req, res) => {

    res.render('index', {
        titre: 'Vote - CatMash'
    });

})

//Obtenir deux chats aléatoire.
app.get('/chats',(req,res)=>{
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


app.listen(3001)