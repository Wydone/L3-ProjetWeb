<?php
    // Controleur qui simule le service web temps/distance qui prent 2 noms de ville en paramètre et retourne le temps de trajet entre les 2 villes.

    $arrayVille = array("Moulins","Monétay","Vichy","Monteignet","Veauce","Clermont-Ferrand");
    $nbVilles = sizeof($arrayVille);
    $arrayTemp = array() ; 

    //Data 
    $arrayVilleTempsDistance = array( 

        "Moulins" => array(
                        "Moulins" => array(0,0) ,  //This is an array Lenght in KM / Time in Minut
                        "Monétay sur Allier" => array(25, 30),
                        "Vichy" => array(69, 70), 
                        "Monteignet sur l'Andelot" => array(91, 65), 
                        "Veauce" => array(91, 68), 
                        "Clermont-Ferrand" => array(98, 97)
                    ) ,
        "Monétay sur Allier" => array(
                        "Moulins" => array(25, 30) ,  //This is an array Lenght in KM / Time in Minut
                        "Monétay" => array(0, 0),
                        "Vichy" => array(39, 45), 
                        "Monteignet sur l'Andelot" => array(33, 36), 
                        "Veauce" => array(45, 42), 
                        "Clermont-Ferrand" => array(107, 65)
                    ) ,
        "Vichy" => array(
                        "Moulins" => array(69, 70) ,  //This is an array Lenght in KM / Time in Minut
                        "Monétay sur Allier" => array(39, 45),
                        "Vichy" => array(0, 0), 
                        "Monteignet sur l'Andelot" => array(18, 26), 
                        "Veauce" => array(54, 58), 
                        "Clermont-Ferrand" => array(56, 65)
                    ) ,
        "Monteignet sur l'Andelot" => array(
                        "Moulins" => array(91, 65) ,  //This is an array Lenght in KM / Time in Minut
                        "Monétay sur Allier" => array(33, 36),
                        "Vichy" => array(18, 26), 
                        "Monteignet sur l'Andelot" => array(0, 0), 
                        "Veauce" => array(22, 26), 
                        "Clermont-Ferrand" => array(50, 55)
                    ),
        "Veauce" => array(
                        "Moulins" => array(91, 68) ,  //This is an array Lenght in KM / Time in Minut
                        "Monétay sur Allier" => array(45, 42),
                        "Vichy" => array(54, 58), 
                        "Monteignet sur l'Andelot" => array(22, 26), 
                        "Veauce" => array(0, 0), 
                        "Clermont-Ferrand" => array(54, 45)
                    ),
        "Clermont-Ferrand" => array(
                        "Moulins" => array(98, 97) ,  //This is an array Lenght in KM / Time in Minut
                        "Monétay sur Allier" => array(107, 80),
                        "Vichy" => array(56, 65), 
                        "Monteignet sur l'Andelot" => array(50, 55), 
                        "Veauce" => array(54, 45), 
                        "Clermont-Ferrand" => array(0, 0)
                    )
    ); 

    //Recupération des paramètres

    $param1 = $_GET['VillageSource'];
    $param2 = $_GET['VillageCible'];
    $horaire = $_GET['horaire'];

   
    //Calcul du temps de trajet
    $distance = $arrayVilleTempsDistance[$param1][$param2][0];
    $time = $arrayVilleTempsDistance[$param1][$param2][1];

    if(17<=$horaire && $horaire<=19) {
        $time = $time * 1.1 ; 
    }    
    echo $distance.",".$time;
?>