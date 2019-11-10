//Global variables

var allArrayName =["arrayAllTitreOption", "arrayAllDateOption", "arrayAllHoraireOption","arrayAllVillageOption" , "arrayAllLieuOption"]; 
var selectedOption = [Titre, Jour, Heure, Village, Lieu];
var Titre, Jour, Heure, Village, Lieu;


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

        createForm(dataARRAY, arrayAllDate, arrayAllHoraire, arrayAllTitre, arrayAllLieu, arrayAllVillage, 0);
      //  console.log(dataARRAY);
      //  console.log(dataARRAY['Jour']);
      /*  console.log(arrayAllDate); 
        console.log(arrayAllHoraire); 
        console.log(arrayAllTitre); 
        console.log(arrayAllLieu); 
        console.log(arrayAllVillage);   */
        

    });
}


function createForm(dataARRAY, arrayAllDate, arrayAllHoraire, arrayAllTitre, arrayAllLieu, arrayAllVillage, cpt){
        console.log("Vazleur du compteur : " + cpt);
       
       
        /* Creation des listes */
        
        var allArray =[arrayAllTitre, arrayAllDate, arrayAllHoraire,arrayAllVillage , arrayAllLieu]; 

        var oForm = document.getElementById("formReservation"); 
        
        /* Creation de mes 5 liste déroulante */

        if (cpt == 0) {
            var newSelect = document.createElement("SELECT"); 
            newSelect.id =  "id_"+allArrayName[0]; 
            newSelect.name = allArrayName[0] ; 
            newSelect.setAttribute("onchange", "relaodList(this)");

            for(let i = 0; i < arrayAllTitre.length ; i++){
                var newOption = document.createElement("option"); 
                newOption.value = allArray[0][i];
                newOption.text = allArray[0][i];
                newSelect.add(newOption); 
            }
            oForm.prepend(newSelect);
            linebreak = document.createElement("br");
            oForm.prepend(linebreak);

            for(let j = 1 ; j <allArray.length; j++ ){
                var newSelect = document.createElement("SELECT"); 
                newSelect.id =  "id_"+allArrayName[j]; 
                newSelect.name = allArrayName[0] ; 
                newSelect.setAttribute("onchange", "relaodList(this)");
      
               /* var newOption = document.createElement("option"); 
                newOption.value = allArray[j][0];
                newOption.text = allArray[j][0];
                newSelect.add(newOption); */
                
                oForm.prepend(newSelect);
               
            }
           
        
        /* Si je callback la fonction create alors je n'est pas créer les selects mais simplement remplir les champs "option" de chaque select */
        }else {
            if(cpt < allArray.length) {
                var newSelect =  document.getElementById( "id_"+allArrayName[cpt]); 
                $(newSelect).empty();
    
                for(let j = 0; j < allArray[cpt].length; j++) {
                    var newOption = document.createElement("option"); 
                    newOption.value = allArray[cpt][j];
                    newOption.text = allArray[cpt][j];
                    newSelect.add(newOption);
                }
            }
        }   
}


function relaodList(myOption){  //Ne reloadera pas les Titres de spectacles
 
    var arrayDefaultValue = ["Choisissez un titre",  "Choisissez une date", "Choisissez un lieu", "Choisissez un village"]; 

    if(! arrayDefaultValue.includes(myOption.value)){
        $.get("controleur/parseCSVintoArrayJSON.php", function(data){
            var dataARRAY = jQuery.parseJSON(data);
           
            var arrayAllDate =  new Array; 
            var arrayAllHoraire =  new Array;
            var arrayAllTitre =  new Array;
            var arrayAllLieu =  new Array;
            var arrayAllVillage =  new Array;
    
            var cpt
    
            /* Ajout des tags */
            var tagSelectionDate = "Choisissez une date"; 
            var tagSelectionHoraire = "Choisissez un horaire"; 
            var tagSelectionLieu = "Choisissez un lieu"; 
            var tagSelectionVillage = "Choisissez un village"; 
    
            arrayAllDate.push(tagSelectionDate); 
            arrayAllHoraire.push(tagSelectionHoraire);
            arrayAllLieu.push(tagSelectionLieu); 
            arrayAllVillage.push(tagSelectionVillage); 
        
            dataARRAY.forEach(element => {
    
                if(myOption.value == element['TitreSpectacle']){
                    
                    selectedOption.Titre = myOption.value; 
                    cpt =1 ; 
                    //Stocker la date
                    var tempDate = element['Jour']
                    if(! arrayAllDate.includes(tempDate)){
                        arrayAllDate.push(tempDate); 
                    }

    
                }else if(myOption.value == element['Jour'] && element['TitreSpectacle']==selectedOption.Titre) {
                   
                    cpt = 2 ; 
                    selectedOption.Jour = myOption.value;
                   
                    //Stocker les horaires
                    var tempHoraire = element['Heure']
                    if(! arrayAllHoraire.includes(tempHoraire)){
                        arrayAllHoraire.push(tempHoraire); 
                    }

                }else if(myOption.value == element['Heure'] && element['TitreSpectacle']==selectedOption.Titre && element['Jour'] == selectedOption.Jour){
                   
                    cpt = 3 ; 
                    selectedOption.Heure =  myOption.value
                  
                    //Stockage des villages
                    var tempVillage = element['Village']
                    if(! arrayAllVillage.includes(tempVillage)){
                        arrayAllVillage.push(tempVillage); 
                    }
                 
                }else if(myOption.value == element['Village'] && element['TitreSpectacle']==selectedOption.Titre && element['Jour'] == selectedOption.Jour && element['Heure'] == selectedOption.Heure){
                    cpt = 4 ; 
                    selectedOption.Village =  myOption.value
                   
                    //Stockage des Lieux
                    var tempLieu = element['Lieu']
                    if(! arrayAllLieu.includes(tempLieu)){
                        arrayAllLieu.push(tempLieu); 
                    }
                }
    
            }); 

            createForm(dataARRAY, arrayAllDate, arrayAllHoraire, arrayAllTitre, arrayAllLieu, arrayAllVillage, cpt);
        });
    }

    
   
}