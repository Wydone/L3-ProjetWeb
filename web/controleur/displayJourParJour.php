<?php
    require_once('parseCSVintoArray.php');

    $arrayJour = array(); 
       
    foreach($arrayData as $prog){
        $temp = $prog['Jour']; 

        if( !(in_array($temp, $arrayJour))){
            array_push($arrayJour, $temp);
        }
    }

   // print_r($arrayJour);
    foreach($arrayJour as $Jour){
        
        echo "<h2>".$Jour."</h2>" ; 
        foreach($arrayData as $data) {
           
            if($data['Jour'] == $Jour){
                echo "<p><horaire>".$data['Heure']."</horaire>, <lieu>".$data['Lieu']."</lieu> à <village>".$data['Village']."</village>, <titrespectacle>".$data['TitreSpectacle']."</titrespectacle>, <troupe>".$data['Compagnie']."</troupe></p>" ; 
            }

            //Affichage de l'auteur ????
        }
        echo "<br>";
    }

    //header('Location: programmationJourParJour.php');

?>