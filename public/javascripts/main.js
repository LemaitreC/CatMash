'use strict'

//Méthode récupérant les images si elles existent
function initTwoRamdomCats() {

    //On réinitialise les animations
    document.getElementById('plusG').className = "plusOne"
    document.getElementById('plusD').className = "plusOne"

    //On réinitialise les opacité des deux coté
    document.getElementById('droite').style.opacity = 1
    document.getElementById('gauche').style.opacity = 1



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
    //on récupère l'id et l'url du chat selectionné
    const idChat = document.getElementById(position).getAttribute('title')
    const urlChat = document.getElementById(position).getAttribute('src')

    //On change l'opacité du chat non selectionné
    if (position === 'droite') {
        document.getElementById('gauche').style.opacity = 0.1
        $("#plusD").toggleClass("plusOne-active")
    } else {
        document.getElementById('droite').style.opacity = 0.1
        $("#plusG").toggleClass("plusOne-active")
    }

    //On envoie ces données dans la BD
    $.ajax({
        type: 'GET',
        url: 'vote',
        data: {
            id: idChat,
            url: urlChat
        },
        success: function () {
            setTimeout(function () {
                initTwoRamdomCats()
            }, 1000)
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
    const key = event.keyCode
    const key_D = 68
    const key_Q = 81
    const key_fleche_gauche = 37
    const key_fleche_droite = 39

    console.log(key)
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