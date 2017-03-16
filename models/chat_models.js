let mongoose = require('mongoose')

Schema = mongoose.Schema; //Création du Schema d'un utilisateur
let chatSchema = new Schema({
    id: String,
    url: String,
    score: Number
})

let chat = mongoose.model('chat', chatSchema)

module.exports = chat