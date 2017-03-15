let express = require('express')
let path = require('path')
var mongoose = require('mongoose')

let app = express()

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

//Connection avec la base de données mlab
mongoose.connect('mongodb://user1:password@ds131510.mlab.com:31510/catmash');



app.listen(3001)