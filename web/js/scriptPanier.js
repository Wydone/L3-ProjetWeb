var nbSpectacleDiff ; 
//var arrayMonPanier = <?php echo json_encode($_SESSION["monPanier"]);?>

function main(nbSpectacleDifferent){
    
    nbSpectacleDiff = nbSpectacleDifferent;
    //console.log(nbSpectacleDiff)


    for(let i = 0; i<=nbSpectacleDiff; i++){
        var btnSupprimer = document.getElementById("btnSupprimerDuPanier-"+i);
        if(btnSupprimer != null){
            btnSupprimer.addEventListener('click', function(){
                console.log("Click sur supprimer")
                supprmierReservation(i); 
            });     
        }
    }
    getAllPrix() ; 
}


function getAllPrix() {
    
}

function supprmierReservation(numeroSpectacle) {
    var maSection = document.getElementById("id_panierSection-"+numeroSpectacle); 
    maSection.remove() ; 
    $.ajax({
        url: "controleur/removeFromPanier.php",
        type: "GET",
        data: {numeroSpectacle},
        success: function() {
          console.log("Successly removed !");
        }
    });

    console.log("Fin du remove from php array"); 

}