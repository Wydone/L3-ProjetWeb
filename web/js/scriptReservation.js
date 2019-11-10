var allArrayName = ["arrayAllDateOption", "arrayAllHoraireOption", "arrayAllTitreOption", "arrayAllLieuOption", "arrayAllVillageOption"]; 

function loadList(){
    
    $.get("controleur/parseCSVintoArrayJSON.php", function(data){
        var dataARRAY = jQuery.parseJSON(data);
       
        var arrayAllDate =  new Array; 
        var arrayAllHoraire =  new Array;
        var arrayAllTitre =  new Array;
        var arrayAllLieu =  new Array;
        var arrayAllVillage =  new Array;

        /* Ajout des tags */
        var tagSelectionTitre = "Choisissez un titre"; 
        var tagSelectionDate = "Choisissez une date"; 
        var tagSelectionHoraire = "Choisissez un horaire"; 
        var tagSelectionLieu = "Choisissez un lieu"; 
        var tagSelectionVillage = "Choisissez un village"; 

        arrayAllDate.push(tagSelectionDate); 
        arrayAllHoraire.push(tagSelectionHoraire);
        arrayAllTitre.push(tagSelectionTitre); 
        arrayAllLieu.push(tagSelectionLieu); 
        arrayAllVillage.push(tagSelectionVillage); 


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

        createForm(dataARRAY, arrayAllDate, arrayAllHoraire, arrayAllTitre, arrayAllLieu, arrayAllVillage);
      //  console.log(dataARRAY);
      //  console.log(dataARRAY['Jour']);
      /*  console.log(arrayAllDate); 
        console.log(arrayAllHoraire); 
        console.log(arrayAllTitre); 
        console.log(arrayAllLieu); 
        console.log(arrayAllVillage);   */
        

    });
}


function createForm(dataARRAY, arrayAllDate, arrayAllHoraire, arrayAllTitre, arrayAllLieu, arrayAllVillage ){
    /*console.log(dataARRAY);
    console.log(arrayAllDate); 
    console.log(arrayAllHoraire); 
    console.log(arrayAllTitre); 
    console.log(arrayAllLieu); 
    console.log(arrayAllVillage);
    */

    /* Creation des listes */
    var allArray =[arrayAllDate, arrayAllHoraire, arrayAllTitre, arrayAllLieu, arrayAllVillage]; 
   // var allArrayName = ["arrayAllDateOption", "arrayAllHoraireOption", "arrayAllTitreOption", "arrayAllLieuOption", "arrayAllVillageOption"]; 
    
    var oForm = document.getElementById("formReservation"); 
    
    for (let i = 0; i < allArray.length; i++){
       //console.log('test');

        linebreak = document.createElement("br");
        oForm.prepend(linebreak);
        
        var newSelect = document.createElement("SELECT"); 
        newSelect.id =  i + "_" +allArrayName[i]; 
        newSelect.name = allArrayName[i] ; 
        newSelect.setAttribute("onchange", "Choix(this)");
        // newSelect.onchange = Choix(this.value);   -> cette definition ne fonctionne pas !! Il faut utiliser celle ci-dessus
        var length = allArray[i].length ;
        
        for(let j = 0; j < length; j++){
            //console.log(allArray[i][j]);

            var newOption = document.createElement("option"); 
            newOption.value = allArray[i][j];
            newOption.text = allArray[i][j];
            newSelect.add(newOption); 
        }
        oForm.prepend(newSelect);
    }

    var oSubmit = document.createElement("input"); 
    oSubmit.type = "submit"; 
    oSubmit.value = "Valider";
    oForm.appendChild(oSubmit);
}

function Choix(myOption) {
    console.log("This is a test");
   // console.log(document.getElementById(myOption.name).selectedIndex);
    console.log(myOption.value);
    console.log(myOption.id);



}