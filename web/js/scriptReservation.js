
function loadList(){
    var dataARRAY
    $.get("controleur/parseCSVintoArrayJSON.php", function(data){
        var dataARRAY = jQuery.parseJSON(data);
       
       
        var arrayAllDate =  new Array; 
        var arrayAllHoraire =  new Array;
        var arrayAllTitre =  new Array;
        var arrayAllLieu =  new Array;
        var arrayAllVillage =  new Array;
        //console.log(dataARRAY[1]['Jour']);
        
        dataARRAY.forEach(element => {
            //Stocker la date
            var tempDate = element['Jour']
            if(! arrayAllDate.includes(tempDate)){
                arrayAllDate.push(tempDate); 
            }
            //Stocker les horaires
            var tempHoraire = element['Heure']
            if(! arrayAllHoraire.includes(tempHoraire)){
                arrayAllHoraire.push(tempHoraire); 
            }
            //Stocker les titres des spectacles
            var tempTitre = element['TitreSpectacle']
            if(! arrayAllTitre.includes(tempTitre)){
                arrayAllTitre.push(tempTitre); 
            }
            //Stockage des Lieux
            var tempLieu = element['Lieu']
            if(! arrayAllLieu.includes(tempLieu)){
                arrayAllLieu.push(tempLieu); 
            }
            //Stockage des villages
            var tempVillage = element['Village']
            if(! arrayAllVillage.includes(tempVillage)){
                arrayAllVillage.push(tempVillage); 
            }
        });
        console.log(dataARRAY);
        console.log(arrayAllDate); 
        console.log(arrayAllHoraire); 
        console.log(arrayAllTitre); 
        console.log(arrayAllLieu); 
        console.log(arrayAllVillage); 
    });

  

}