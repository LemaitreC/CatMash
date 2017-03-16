'use strict'

//Méthode récupérant les images si elles existent
function initTwoRamdomCats() {
	$.ajax({
		type: 'GET',
		url: '/chats'
	}).done(function(data) {

        //On vérifie si la 1er image possède un url valid
		$.ajax({
			type: 'GET',
			url: data[0].url,
			success: function() {
                //Si l'image a un url valid alors on l'affiche
				$('#gauche').attr('src', data[0].url)
				$('#gauche').attr('title', data[0].id)
			},
			error: function() {
                //Sinon on affiche l'image indiquant que l'image n'a pas été trouvé
				$('#gauche').attr('src', '../images/image_not_found.png')
				$('#gauche').attr('title', '000000')
			}
		})

        //On vérifie si la 2e image possède un url valid
		$.ajax({
			type: 'GET',
			url: data[1].url,
			success: function() {
                //Si l'image a un url valid alors on l'affiche
				$('#droite').attr('src', data[1].url)
				$('#droite').attr('title', data[1].id)
			},
			error: function() {
                //Sinon on affiche l'image indiquant que l'image n'a pas été trouvé
				$('#droite').attr('src', '../images/image_not_found.png')
				$('#droite').attr('title', '000000')
			}
		})
	}).fail(function(req, text_status, err) {
        //Si il est impossible de récuperer les url des images on renvoi l'erreur et une alerte
		console.log(err)
		alert('Impossible d\'obtenir la liste des chats : ' + err)
	})
}

//Méthode ajoutant un vote au cat
function voteCat(position) {
	const idChat = document.getElementById(position).getAttribute('title')
	const urlChat = document.getElementById(position).getAttribute('src')

	$.ajax({
		type: 'GET',
		url: 'vote',
		data: {id: idChat, url: urlChat},
		success: function(){
			initTwoRamdomCats()
		},
		error: function(){
			console.log('error')
		}
	})
}
