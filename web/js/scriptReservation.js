var allSelectName =["arrayAllTitreOption", "arrayAllDateOption", "arrayAllHoraireOption","arrayAllVillageOption" , "arrayAllLieuOption"]; //Liste des nom des select dans mon formulaire

var sousFormulaireSelectedOption = new Array; 

var selectedOption = new Array;  // [Titre ="", Jour="", Heure="", Village="", Lieu=""]; //Array conenant les choix de l'utilisateur dans les différents select

var allLabel = ["Titre", "Date", "Horaire", "Village", "Lieu"]; //Tableau des labels
var allLabelName = ["labelTitreOption", "labelDateOption","labelHoraireOption", "labelVillageOption", "labelLieuOption"];


var allTarifsReservations = ["Plein Tarif (15€)", "Tarif Réduit (10€)", "Gratuit (enfant)"] // Tableau des != tarifs
var allTarifsReservationsValue = ["P", "R", "E"] //Le symbole des != tarifs

var SousFormulaire = 0; //Variables désigant dans quel sous formulaire on ce trouve

var arrayDefaultValue = ["Choisissez un titre", "Choisissez une date", "Choisissez un lieu", "Choisissez un village", "Choisissez un horaire"]; 

var time, distance; //Variable utilisé dans le checking des distances entre différents spectacles
var cible; //boolean pour determiner qui de cible ou source est le plus faible

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
            //console.log(sousFormulaireSelectedOption)
            SousFormulaire += 1; //Designe la creeation d'un nouveau sous formulaire 
            //nbForm +=1

            var newTitre = document.createElement("h2"); //Ajout d'un titre
            newTitre.innerHTML = "Choix d'un spectacle"; 
            oForm.insertBefore(newTitre, oSubmit)

            //Creation de label pour mon titre de spectacle
            var newlabel = document.createElement("Label");
            newlabel.setAttribute("for","id_"+allSelectName[0]+"-"+nbForm);
            newlabel.innerHTML = allLabel[0]+" : ";
            newlabel.id = "id_"+allLabelName[0]+"-"+nbForm; 
            oForm.insertBefore(newlabel,oSubmit); 

            //Creation du select "titre" et de ses options
            var newSelect = document.createElement("SELECT"); 
            newSelect.id =  "id_"+allSelectName[0]+"-"+nbForm; 
            newSelect.name = allSelectName[0]+"-"+nbForm ; 
            newSelect.setAttribute("onchange", "relaodList(this,"+(nbForm)+")");
            newSelect.required = true;

            for(let i = 0; i < arrayAllTitre.length ; i++){
                var newOption = document.createElement("option");
                
                if(i==0){
                    newOption.disabled = "disabled"; 
                    newOption.selected = "selected"; 
                    newOption.value = "value";
                }
                
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
                newlabel.id = "id_"+allLabelName[0]+"-"+nbForm;
                oForm.insertBefore(newlabel,oSubmit); 


                var newSelect = document.createElement("SELECT"); 
                newSelect.id =  "id_"+allSelectName[j]+"-"+nbForm; 
                newSelect.name = allSelectName[j]+"-"+nbForm ; 
                newSelect.setAttribute("onchange", "relaodList(this,"+(nbForm)+")");
                newSelect.required = true;
                  
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
                nbPlaceTarifInput.setAttribute('max', 20);
                nbPlaceTarifInput.required = true;

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
                    if(j==0){
                        newOption.disabled = "disabled"; 
                        newOption.selected = "selected"; 
                        newOption.value = "value";
                    }
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
                checkDistance(nbForm);
            }
          
            createForm(dataARRAY, arrayAllDate, arrayAllHoraire, arrayAllTitre, arrayAllLieu, arrayAllVillage, cpt, nbForm); 
        });
    }
}


//Fonction pour checker si l'utilisateur peut ce rendre à tout les spectacle qu'il a reservé, le check est appelé si a 2 != spectacle à la même Date et dans des ville != 
function checkDistance(nbForm) {
   
    var oForm = document.getElementById("formReservation"); //Get l'element formulaire sur lequel je travail. 

    var TitreSource = sousFormulaireSelectedOption[nbForm]['Titre']; //recuperer les infos des Select qui ont effectué l'action
    
    var JourSource = sousFormulaireSelectedOption[nbForm]['Jour']; //recuperer les infos des Select qui ont effectué l'action
    var VillageSource = sousFormulaireSelectedOption[nbForm]['Village']; //recuperer les infos des Select qui ont effectué l'action

    var tmp = sousFormulaireSelectedOption[nbForm]['Heure']; //recuperer les infos des Select qui ont effectué l'action
    var tmpHeureSource = tmp.split('h'); // ici on split afin que par la suite on puisse traiter les heures et les minutes séparément
    var HeureSource = tmpHeureSource[0] // On ne récupère que l'heure et non les minutes pour le moment 

    //Test pour suprimer un message d'erreur eventuelle si l'utilisateur change d'avis après avoir été prévenu.
    var msgError = document.getElementById("msgErrorForm"+"-"+nbForm)
    if(msgError != null){
        msgError.remove();
    }

    //Parcours de toutes les reservations en cours 
    for(let j=0; j<sousFormulaireSelectedOption.length; j++){

        if(j != nbForm){ //Seulement traiter les cases différents du notre

            var JourCible  = sousFormulaireSelectedOption[j]['Jour']; //Get les infos des select de la cible 

            var VillageCible = sousFormulaireSelectedOption[j]['Village']; //Get les infos des select de la cible 
            var TitreCible = sousFormulaireSelectedOption[j]['Titre'];//Get les infos des select de la cible 

            if(JourCible == JourSource && TitreCible != TitreSource){   //Seulement si les Jour sont égaux et titre != alors on va faire notre test de service web

                var tmp = sousFormulaireSelectedOption[j]['Heure']; 
                var tmpHeureCible = tmp.split('h'); //idem ici on split pour pouvoir travailler sur les heures et les minutes
                var HeureCible  = tmpHeureCible[0]; // ICI on ne recupère que l'heure et non les minutes pour les envoyer au service web
                

                if(HeureCible < HeureSource){   //Choix de l'horaire que l'on va envoyeer au service web. Je prends le plus petit des 2 afin d'addtionner le temps de trajet et ainsi voir si il est possible de ce rendre aux != spectacles
                    Horaire = HeureCible;
                    cible = true; 
                }else {
                    Horaire = HeureSource; 
                    cible = false;
                }

                $.ajax({    //ici on va utiliser ajax pour appeler notre service web 

                    url: "controleur/serviceWebDistance.php",
                    type: "GET",
                    data: {VillageSource ,VillageCible, Horaire}, //Data envoyé notre service web
                    success: function(result){

                        var tabRes = result.split(','); 
                        distance = tabRes[0]; 
                        time = tabRes[1]; 

                        nbHeure = parseInt(Math.trunc((time/60))); 
                        nbMinute = parseInt(time%60);

                        //console.log("nb Heure : "+nbHeure + " , nbMinute : "+nbMinute);
                        var totalMinute = 0;
                        var totalHeure = 0;
                        var nbHeureSup = 0; 
                        
                        console.log("nbMinute de cible : "+tmpHeureCible[1] + " , nbHeure de cible"+tmpHeureCible[0])
                        console.log("nbMinute de source : "+tmpHeureSource[1] + " , nbHeure de source"+tmpHeureSource[0])

                        //Traitement du temps total pour regarder le spectacle et ce rendre à l'autre.
                        if(cible){

                            totalMinute = parseInt(tmpHeureCible[1]) + nbMinute
                            if(totalMinute>=60){

                                nbHeureSup = Math.trunc(totalMinute/60);
                                totalMinute = time%60; 
                            }
                            totalHeure = nbHeureSup + nbHeure + parseInt(tmpHeureCible[0]);

                        }else{

                            totalMinute = parseInt(tmpHeureSource[1]) + nbMinute
                            if(totalMinute>=60){

                                nbHeureSup = Math.trunc(totalMinute/60);
                                totalMinute = time%60; 
                            }
                            totalHeure = nbHeureSup + nbHeure + parseInt(tmpHeureSource[0]);
                        }
                      
                        //Recupération des infos du DOM pour pouvoir afficher notre msg d'erreur
                        var spectacleLabelCible = document.getElementById("id_"+allLabelName[0]+"-"+j); //Get le label "titre" de la cible
                        var spectacleCible = document.getElementById("id_"+allSelectName[0]+"-"+j); //Get le select "titre" de la cible

                        var spectacleLabelSource = document.getElementById("id_"+allLabelName[0]+"-"+nbForm); //Get le label "titre" de la source
                        var spectacleSource = document.getElementById("id_"+allSelectName[0]+"-"+nbForm); //Get le select "titre" de la source
                        
                        var msgError = document.createElement("p");
                        msgError.classList = "msgErrorDistanceTimeForm";
                        msgError.id = "msgErrorForm"+"-"+nbForm;


                        //TEST pour voir si l'utilisateur peut ce rendre au spectacle 
                        if(!cible){ //Si le spectacle qui commence en 1er est la cible
                            if(totalHeure > parseInt(tmpHeureSource[0]) && totalMinute > parseInt(tmpHeureSource[1])){
                            
                                msgError.innerHTML = "ATTENTION vous ne pourrez pas vous rendre au spectacle : "+spectacleCible.value + " , en même temps que celui-ci"
                                oForm.insertBefore(msgError, spectacleLabelSource)         
                            }
                        }else{ //Si le spectacle qui commence en 1er est la source
                            if(totalHeure > parseInt(tmpHeureCible[0]) && totalMinute > parseInt(tmpHeureCible[1])){
                               
                                msgError.innerHTML = "ATTENTION vous ne pourrez pas vous rendre au spectacle : "+spectacleSource.value + " , en même temps que celui-ci"
                                oForm.insertBefore(msgError, spectacleLabelCible)
                            }
                        }

                    } // fin de success
                }); // fin de ajax
            }
        }
    }
}