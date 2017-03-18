'use strict'

/**
 * Méthode ajoutant deux chats au html
 */
function initTwoRamdomCats() {

    //on met l'icon vs par defaut
    $('#catImg').attr('src', 'images/vs.png');
    
    //On réinitialise les animations
	document.getElementById('plusG').className = 'plusOne'
	document.getElementById('plusD').className = 'plusOne'

    //On réinitialise les opacité des deux coté
	document.getElementById('droite').style.opacity = 1
	document.getElementById('gauche').style.opacity = 1

    //On utilise une requête ajax permettant de récupèrer deux images de chats et leurs id
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
                //                $('#gauche').attr('src', '../images/image_not_found.png')
                //                $('#gauche').attr('title', '000000')
				window.location.reload()
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
                //                $('#droite').attr('src', '../images/image_not_found.png')
                //                $('#droite').attr('title', '000000')
				window.location.reload()
			}
		})
	}).fail(function(req, text_status, err) {
        //Si il est impossible de récuperer les url des images on renvoi l'erreur et une alerte
		console.log(err)
		alert('Impossible d\'obtenir la liste des chats : ' + err)
	})
}

/**
 * Méthode ajoutant un vote au chat dans la BD
 * @param   {String} position - de l'image (Gauche ou Droite) pour svoir sur quel image a cliquer le votant.
 */
function voteChat(position) {
    //on récupère l'id et l'url du chat selectionné
	const idChat = document.getElementById(position).getAttribute('title')
	const urlChat = document.getElementById(position).getAttribute('src')

    //On change l'opacité du chat non selectionné
	if (position === 'droite') {
		document.getElementById('gauche').style.opacity = 0.1
		$('#plusD').toggleClass('plusOne-active')
	} else {
		document.getElementById('droite').style.opacity = 0.1
		$('#plusG').toggleClass('plusOne-active')
	}
    //On change l'icon du chat 
    $('#catImg').attr('src', 'images/cat.png');

    //On envoie ces données dans la BD
	$.ajax({
		type: 'GET',
		url: 'vote',
		data: {
			id: idChat,
			url: urlChat
		},
		success: function() {
            // On attend une seconde pour effectuer une animation, illustrant à l'utilisateur l'ajout du vote avant de re-générer deux chats
			setTimeout(function() {
				initTwoRamdomCats()
			}, 1000)
		}
	})
}

/**
 * Méthode Affichant les resultats des votes
 */
function displayVote() {

    //On utilise une methode ajax pour obtenir tout les resultats des votes.
	$.ajax({
		type: 'GET',
		url: '/resultats/votes',
		success: function(data) {
            //Calcul du nombre total de vote favorable pour ce chat
			const total = nombreTotalDeVote(data)

			for (const d in data) {

                //Calcul du pourcentage de vote favorable pour ce chat
				const pourcentage = Math.round(data[d].score / total * 100)

                //On affiche l'image  du chat et les réslutats
				document.getElementById('grid').innerHTML += '<div class="col-sm-3">' +
                    '<div class="thumbnail">' +
                    '<img src="' + data[d].url + '" title="' + data[d].id + '">' +
                    '<div class="caption">' +

                    '<p class="score">' + data[d].score + '</p>' +
                    '<p class="pourcentage">' + pourcentage + '%</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
			}
		},
		error: function(err) {
			console.log(err)
			alert(err)
		}
	})
}


/**
 * Methode calculant le nombre de total de vote dans la BD.
 * @param   {Object} data - L'ensemble des votes enregistrés dans la BD.
 * @returns {Number} total - Nombre total de vote dans la BD.
 */
function nombreTotalDeVote(data) {
	let total = 0

	for (const d in data) {
		total += data[d].score
	}

	return total
}

/**
 * Méthode appelant la methode voteChat() en fonction de la touche directionnelle utilisée par l'utilisateur.
 * @param   {object} event - l'évènement.
 */
function voteAvecKey(event) {

    //On récupère les code des touches directionnelles du clavier
	const key = event.keyCode
	const key_D = 68
	const key_Q = 81
	const key_fleche_gauche = 37
	const key_fleche_droite = 39

	switch (key) {
		case key_D:
		case key_fleche_droite:
			console.log('droite')
			voteChat('droite')
			break
		case key_Q:
		case key_fleche_gauche:
			console.log('gauche')
			voteChat('gauche')
			break
		default:
			break
	}
}
