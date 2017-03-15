let express = require('express')
let path = require('path')

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

app.listen(3001)