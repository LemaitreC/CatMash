'use strict'

//Méthode récupérant les images si elles existent
function initTwoRamdomCats() {
    $.ajax({
        type: 'GET',
        url: '/chats'
    }).done(function (data) {

        //On vérifie si la 1er image possède un url valid
        $.ajax({
            type: 'GET',
            url: data[0].url,
            success: function () {
                //Si l'image a un url valid alors on l'affiche
                $('#gauche').attr('src', data[0].url)
                $('#gauche').attr('title', data[0].id)
            },
            error: function () {
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
            success: function () {
                //Si l'image a un url valid alors on l'affiche
                $('#droite').attr('src', data[1].url)
                $('#droite').attr('title', data[1].id)
            },
            error: function () {
                //Sinon on affiche l'image indiquant que l'image n'a pas été trouvé
                //                $('#droite').attr('src', '../images/image_not_found.png')
                //                $('#droite').attr('title', '000000')
                window.location.reload()
            }
        })
    }).fail(function (req, text_status, err) {
        //Si il est impossible de récuperer les url des images on renvoi l'erreur et une alerte
        console.log(err)
        alert('Impossible d\'obtenir la liste des chats : ' + err)
    })
}

//Méthode ajoutant un vote au chat
function voteChat(position) {
    const idChat = document.getElementById(position).getAttribute('title')
    const urlChat = document.getElementById(position).getAttribute('src')

    $.ajax({
        type: 'GET',
        url: 'vote',
        data: {
            id: idChat,
            url: urlChat
        },
        success: function () {
            initTwoRamdomCats()
        }
    })
}

//Affiche les resultats des votes
function displayVote() {
    $.ajax({
        type: 'GET',
        url: '/resultats/votes',
        success: function (data) {
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
        error: function (err) {
            console.log(err)
            alert(err)
        }
    })
}


//Retourne le nombre total de vote
function nombreTotalDeVote(data) {
    let total = 0

    for (const d in data) {
        total += data[d].score
    }

    return total
}

//Ajout d'un vote lorque l'utilisateur clique sur une des touches directionnelles du clavier 
function voteAvecKey(event) {

    //On récupère les code des touches directionnelles du clavier
    var key = event.keyCode;
    console.log(key)
    switch (key) {
        case 68:
        case 39: // D
            console.log("droite")
            voteChat("droite")
            break;
        case 81:
        case 37: // G
            console.log("gauche")
            voteChat("gauche")
            break;
        default:
            return
            break;
    }
}
