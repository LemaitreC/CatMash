let app = require('express')()

// Moteur de Templates / modèles EJS 
app.set('view engine', 'ejs')

// Test de l'app
app.get('/', (req, res) => {

    res.render('index', {
        title: 'Vote - CatMash'
    });

})

app.listen(3001)