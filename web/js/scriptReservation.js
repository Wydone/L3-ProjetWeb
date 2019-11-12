var allSelectName =["arrayAllTitreOption", "arrayAllDateOption", "arrayAllHoraireOption","arrayAllVillageOption" , "arrayAllLieuOption"]; //Liste des nom des select dans mon formulaire

var sousFormulaireSelectedOption = new Array; 

var selectedOption = new Array;  // [Titre ="", Jour="", Heure="", Village="", Lieu=""]; //Array conenant les choix de l'utilisateur dans les différents select

var allLabel = ["Titre", "Date", "Horaire", "Village", "Lieu"]; //Tableau des labels

var allTarifsReservations = ["Plein Tarif", "Tarif Réduit", "Gratuit (enfant)"] // Tableau des != tarifs
var allTarifsReservationsValue = ["P", "R", "O"] //Le symbole des != tarifs

var SousFormulaire = 0; //Variables désigant dans quel sous formulaire on ce trouve

var arrayDefaultValue = ["Choisissez un titre", "Choisissez une date", "Choisissez un lieu", "Choisissez un village", "Choisissez un horaire"]; 




// FONCTION MAIN EXECUTE AU CHARGEMENT DE LA PAGE WEB
function main() {
    var btnNewReservation = document.getElementById("btnNewReservation"); 
    btnNewReservation.addEventListener('click', function(){
        console.log("Click sur +")
        loadList(SousFormulaire);
    }); 
   
    loadList(0); 

}

// FONCTION QUI PERMET DE LIRE LES DONNEES DE MON CSV, PRENANT EN ARGUMENT UN NUMERO INDIQUANT DANS QUELLE SOUS FORMULAIRE ON CE TROUVE
function loadList(nbForm){

    $.get("controleur/parseCSVintoArrayJSON.php", function(data){
        var dataARRAY = jQuery.parseJSON(data);
       
        var arrayAllDate =  new Array; 
        var arrayAllHoraire =  new Array;
        var arrayAllTitre =  new Array;
        var arrayAllLieu =  new Array;
        var arrayAllVillage =  new Array;

        /* Ajout des tags dans mes liste de choix */
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
        
        //Parcour de toutes mes données 
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
        
        //appel de la fonction createForm qui va ajouter mes elements dans mon formulaire.
        createForm(dataARRAY, arrayAllDate, arrayAllHoraire, arrayAllTitre, arrayAllLieu, arrayAllVillage, 0, nbForm);
    });
}


function createForm(dataARRAY, arrayAllDate, arrayAllHoraire, arrayAllTitre, arrayAllLieu, arrayAllVillage, cpt, nbForm){
       
        /* Creation des listes */ 
        var allArray =[arrayAllTitre, arrayAllDate, arrayAllHoraire,arrayAllVillage , arrayAllLieu]; 

        var oForm = document.getElementById("formReservation"); //Get l'element formulaire sur lequel je travail. 

        var oSubmit = document.getElementById("inputSubmitFormReservation"); 

       
       // console.log(sousFormulaireSelectedOption[nbForm])

        /* Creation de mes 5 liste déroulante */

        //CPT designe le fait que le formulaire soit dans l'état de base (cad toutes les select sont vide sauf le choix du titre du spectacle)
        if (cpt == 0) {
            console.log("Test creation du formulaire n° "+nbForm)
            sousFormulaireSelectedOption[nbForm] = new Array;
            console.log(sousFormulaireSelectedOption)
            SousFormulaire += 1; //Designe la creeation d'un nouveau sous formulaire 
            //nbForm +=1

            //Creation de label pour mon titre de spectacle
            var newlabel = document.createElement("Label");
            newlabel.setAttribute("for","id_"+allSelectName[0]+"-"+nbForm);
            newlabel.innerHTML = allLabel[0]+" : ";
            oForm.insertBefore(newlabel,oSubmit); 

            //Creation du select "titre" et de ses options
            var newSelect = document.createElement("SELECT"); 
            newSelect.id =  "id_"+allSelectName[0]+"-"+nbForm; 
            newSelect.name = allSelectName[0] ; 
            newSelect.setAttribute("onchange", "relaodList(this,"+(nbForm)+")");

            for(let i = 0; i < arrayAllTitre.length ; i++){
                var newOption = document.createElement("option"); 
                newOption.value = allArray[0][i];
                newOption.text = allArray[0][i];
                newSelect.add(newOption); 
            }
            oForm.insertBefore(newSelect,oSubmit);

            linebreak = document.createElement("br");
            oForm.insertBefore(linebreak, oSubmit);

            //Creation des autres select MAIS avec des options vide
            for(let j = 1 ; j <allArray.length; j++ ){
                var newlabel = document.createElement("Label");
                newlabel.setAttribute("for","id_"+allSelectName[j]+"-"+nbForm);
                newlabel.innerHTML = allLabel[j]+" : ";
                oForm.insertBefore(newlabel,oSubmit); 


                var newSelect = document.createElement("SELECT"); 
                newSelect.id =  "id_"+allSelectName[j]+"-"+nbForm; 
                newSelect.name = allSelectName[j] ; 
                newSelect.setAttribute("onchange", "relaodList(this,"+(nbForm)+")");
                  
                oForm.insertBefore(newSelect, oSubmit);
                linebreak = document.createElement("br");
                oForm.insertBefore(linebreak, oSubmit);
            }


        /* Ajout input pour choisir le type de billets et le nombre de place */
            linebreak = document.createElement("br");
            oForm.insertBefore(linebreak, oSubmit);
            
            titreTarif = document.createElement("h3")
            titreTarif.innerHTML = "Nombre de places : "
            oForm.insertBefore(titreTarif, oSubmit);
            for(let i = 0; i < allTarifsReservations.length; i++){

                var newlabel = document.createElement("Label");
                newlabel.setAttribute("for",allTarifsReservationsValue[i]+"-"+nbForm);
                newlabel.innerHTML =allTarifsReservations[i]+" : ";
                oForm.insertBefore(newlabel, oSubmit); 

                var nbPlaceTarifInput = document.createElement('input');
                nbPlaceTarifInput.setAttribute('type', 'number');
                nbPlaceTarifInput.setAttribute('name', allTarifsReservationsValue[i]+"-"+nbForm);
                nbPlaceTarifInput.setAttribute('min', 0);
                nbPlaceTarifInput.setAttribute('max', 20); // ATTENTION QUESTION A POSER !!!

                oForm.insertBefore(nbPlaceTarifInput, oSubmit);
                linebreak = document.createElement("br");
                oForm.insertBefore(linebreak, oSubmit);
            }

            
            oForm.insertBefore(btnNewReservation, oSubmit)
            linebreak = document.createElement("br");
            oForm.insertBefore(linebreak, oSubmit);
            linebreak = document.createElement("br");
            oForm.insertBefore(linebreak, oSubmit);

    /* Si je callback la fonction create alors je n'est pas créer les selects mais simplement remplir les champs "option" de chaque select */
        //Si CPT!=0 implique que l'utilisateur à fait un choix dans les options et donc j'actualise les otpions des autres select
        }else {
            if(cpt < allArray.length) {
                var newSelect =  document.getElementById( "id_"+allSelectName[cpt]+"-"+nbForm); 
                //console.log("id_"+allSelectName[cpt]+nbForm)
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


//FONCTION QUI PERMET D'ACTUALISER LES LISTE D'OPTION DES SELECT EN FONCTION DES RESULATS DE L'UTLISATEUR
function relaodList(myOption, nbForm){  //Ne reloadera pas les Titres de spectacles
    //console.log("Reload form sur : "+nbForm)
   
    //console.log(sousFormulaireSelectedOption[nbForm+1])


    //ICI nbForm donne le numero de sous formulaire sur lequel on est entrain d'agire (la variable gloabal "sousFormulaire" est pour indicer les id)

    //Valeur des tags
  
    if(! arrayDefaultValue.includes(myOption.value)){   //Si le choix de l'utilisateur est différent d'un TAG

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

            var checking = false ; 
        
            dataARRAY.forEach(element => { //Parcours de mes données pour les filtrer selon les choix de l'utilisateur
                
                if(myOption.value == element['TitreSpectacle']){    //Si mon option est un titre 
                    
                    cpt =1 ; //Permet de prevenir la fonction createForm que c'est un reload et non une creation 
                    sousFormulaireSelectedOption[nbForm]['Titre'] = myOption.value;//Stockage le l'option choisi dans une ARRAY 2D
                   
                    //Stocker la date
                    var tempDate = element['Jour']
                    if(! arrayAllDate.includes(tempDate)){
                        arrayAllDate.push(tempDate); 
                    }

    
                }else if(myOption.value == element['Jour'] && element['TitreSpectacle']==sousFormulaireSelectedOption[nbForm]['Titre']) { // si mon option est un Jour
                   
                    cpt = 2 ; 
                    sousFormulaireSelectedOption[nbForm]['Jour'] = myOption.value; //Stockage le l'option choisi dans une ARRAY 2D
                   
                    //Stocker les horaires
                    var tempHoraire = element['Heure']
                    if(! arrayAllHoraire.includes(tempHoraire)){
                        arrayAllHoraire.push(tempHoraire); 
                    }

                }else if(myOption.value == element['Heure'] && element['TitreSpectacle']==sousFormulaireSelectedOption[nbForm]['Titre'] && element['Jour'] == sousFormulaireSelectedOption[nbForm]['Jour']){ //Si mon option est une Heure
                   
                    cpt = 3 ; 
                    sousFormulaireSelectedOption[nbForm]['Heure'] = myOption.value; //Stockage le l'option choisi dans une ARRAY 2D
                   
                    //Stockage des villages
                    var tempVillage = element['Village']
                    if(! arrayAllVillage.includes(tempVillage)){
                        arrayAllVillage.push(tempVillage); 
                    }
                 
                }else if(myOption.value == element['Village'] && element['TitreSpectacle']==sousFormulaireSelectedOption[nbForm]['Titre'] && element['Jour'] == sousFormulaireSelectedOption[nbForm]['Jour'] && element['Heure'] == sousFormulaireSelectedOption[nbForm]['Heure']){ //Si mon option est un village
                    checking = true ; 
                    
                    cpt = 4 ; 
                    sousFormulaireSelectedOption[nbForm]['Village'] = myOption.value; //Stockage le l'option choisi dans une ARRAY 2D
                    
                    //Stockage des Lieux
                    var tempLieu = element['Lieu']
                    if(! arrayAllLieu.includes(tempLieu)){
                        arrayAllLieu.push(tempLieu); 
                    }
                }
    
            });
            //var arrayDefaultValue = ["Choisissez un titre", "Choisissez une date", "Choisissez un lieu", "Choisissez un village", "Choisissez un horaire"]; 

            if(checking && (sousFormulaireSelectedOption[nbForm]['Titre'] != arrayDefaultValue[0]) && (sousFormulaireSelectedOption[nbForm]['Jour'] != arrayDefaultValue[1]) && (sousFormulaireSelectedOption[nbForm]['Heure'] != arrayDefaultValue[4]) && (sousFormulaireSelectedOption[nbForm]['Village'] != arrayDefaultValue[3]) ){
                console.log("APPEL DU CHEKING")
                console.log("numero de sous formulaire : "+nbForm)
                //checkDistance(nbForm);
            }
          
            createForm(dataARRAY, arrayAllDate, arrayAllHoraire, arrayAllTitre, arrayAllLieu, arrayAllVillage, cpt, nbForm); 
        });
    }
}


//Fonction pour checker si l'utilisateur peut ce rendre à tout les spectacle qu'il a reservé, le check est appelé si a 2 != spectacle à la même Date et dans des ville != 
function checkDistance(nbForm) {
    console.log("FONCTION CHECKING NEW APPEL")
   
    for(let i=0; i< sousFormulaireSelectedOption.length; i++ ){
        
    }
   
    var couple = [ville, heure]; 

            var param1  = element[0]; 
            var param2 = couple[0]; 
            var horaire = heure; 

            console.log("param1 : "+ param1 + " , param2 : "+ param2 + "horaire : " + horaire)

    
        $.ajax({
            url: "controleur/serviceWebDistance.php",
            type: "GET",
            data: {param1 : "Veauce" , param2 : "Moulins", horaire : "18"},
            success: function(result){
                var tabRes = result.split(','); 
                var distance = tabRes[0]; 
                var time = tabRes[1]; 
            } 
        });


   
}