var allIndexInPanier = new Array;  

var prixTotalPanier = 0; 
var nbTotalPlacePayante = 0 ; 
var pasEncoreReduc = true;

function main(nbSpectacleDifferent){

    for(let i = 0; i<nbSpectacleDifferent+1; i++){
        
        allIndexInPanier.push(i); 
       
        var btnSupprimer = document.getElementById("btnSupprimerDuPanier-"+i);
        if(btnSupprimer != null){
            btnSupprimer.addEventListener('click', function(){
                supprmierReservation(i); 
            });     
        }
    }
    console.log(allIndexInPanier); 

    

    var btnAjouterSpectacleDansPanier = document.getElementById("btnAjouterSpectacleDansPanier"); 
    btnAjouterSpectacleDansPanier.addEventListener('click', function(){
        window.location='reservationBillets.php';
    });   

    var oForm = document.getElementById("formValiderPanier"); 

    var labelPrixPanier = document.createElement("p"); 
    labelPrixPanier.id = "labelPrixPanier"; 
    labelPrixPanier.innerHTML = "Prix total du panier : "+prixTotalPanier+" €"; 



    oForm.insertBefore(labelPrixPanier, btnAjouterSpectacleDansPanier);
  
    for(let i=0; i<allIndexInPanier.length; i++){
        
        let index = allIndexInPanier[i]; 
        var nbPleinTarif = document.getElementById(['id_P-'+index]); 
        var nbTarifReduit =  document.getElementById(['id_R-'+index]);
        var nbGratuit =  document.getElementById(['id_O-'+index]); //ne comporate pas la 6 eme place offerte

        if(nbPleinTarif != null){
            nbPleinTarif.addEventListener('input', function(){
                getAllPrix(); 
            });
        }
        if(nbTarifReduit != null){
            nbTarifReduit.addEventListener('input', function(){
                getAllPrix(); 
            });
        }
        if(nbGratuit != null){
            nbGratuit.addEventListener('input', function(){
                getAllPrix(); 
            });
        }


    }
    getAllPrix() ; 
}


function getAllPrix() {
    for(let i=0; i<allIndexInPanier.length; i++){
        
        let index = allIndexInPanier[i]; 
        var nbPleinTarif = document.getElementById(['id_P-'+index]); 
        var nbTarifReduit =  document.getElementById(['id_R-'+index]);
        var nbGratuit =  document.getElementById(['id_E-'+index]); //ne comporate pas la 6 eme place offerte

        var nbOffert =  document.getElementById(['id_O-'+index]);

        if(nbPleinTarif != null && nbTarifReduit != null && nbGratuit !=null){
        
            prixTotalPanier += (15*nbPleinTarif.value) + (10*nbTarifReduit.value); 
          
            nbTotalPlacePayante += parseInt(nbPleinTarif.value) + parseInt(nbTarifReduit.value);
           
            if(nbTotalPlacePayante >= 6 && pasEncoreReduc){
                
                pasEncoreReduc = false;
                if(nbTarifReduit.value != 0){
                    prixTotalPanier -= 10; 
                    nbOffert.value = 1; 
                }else{
                    prixTotalPanier -= 15; 
                    nbOffert.value = 1;
                }
            }
        }  
    }

    var prix = document.getElementById("labelPrixPanier"); 
  
    prix.innerHTML = "Prix total du panier : "+prixTotalPanier+" €"; 

    prixTotalPanier = 0; 
    nbTotalPlacePayante = 0; 
    pasEncoreReduc = true; 

}

function supprmierReservation(numeroSpectacle) {
    var maSection = document.getElementById("id_panierSection-"+numeroSpectacle); 
    maSection.remove() ; 
    $.ajax({
        url: "controleur/removeFromPanier.php",
        type: "GET",
        data: {numeroSpectacle},
        success: function() {
        }
    });

    allIndexInPanier.splice(numeroSpectacle, 1);

}