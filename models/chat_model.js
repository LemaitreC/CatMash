'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema //Création du Schema d'un chat
const chatSchema = new Schema({
	id: String,
	url: String,
	score: Number
})

const chat = mongoose.model('chat', chatSchema)

module.exports = chat
