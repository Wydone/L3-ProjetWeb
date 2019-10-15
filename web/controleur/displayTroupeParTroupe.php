<?php
    require_once('parseCSVintoArray.php');
   // require_once('parseCSVintoArray.php');

    $arrayTroupe = array(); 
       
    foreach($arrayData as $prog){
        $temp = $prog['Compagnie']; 
    
        if( !(in_array($temp, $arrayTroupe))){
            array_push($arrayTroupe, $temp);
        }
    }

    //print_r($arrayTroupe); 

    foreach($arrayTroupe as $Troupe){
       
        echo "<div class=\"Troupe\">"; 
        echo "<h2>".$Troupe."</h2>" ; //Affichage du nom de la troupe

        foreach($arrayData as $data){


            if($data['Compagnie'] == $Troupe){
                //Affichage de tous les spectacles qui sont joué par la troupe
                
                echo "<p><horaire>".$data['Jour']."</horaire>, <horaire>".$data['Heure']."</horaire>, <lieu>".$data['Lieu']."</lieu> à <village>".$data['Village']."</village>, <titrespectacle>".$data['TitreSpectacle']."</titrespectacle></p>" ;

            }
        }
    }
?>