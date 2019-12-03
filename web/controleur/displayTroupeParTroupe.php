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
       
        echo "<section class=\"section-block\">";
        echo "<h2>".$Troupe."</h2>" ; //Affichage du nom de la troupe

        foreach($arrayData as $data){


            if($data['Compagnie'] == $Troupe){
                //Affichage de tous les spectacles qui sont joué par la troupe
                
                echo "<p> <span class=\"horaire\"><horaire>".$data['Jour']."</horaire></span>, <span class=\"horaire\"><horaire>".$data['Heure']."</horaire></span>, <span class=\"lieu\"><lieu>".$data['Lieu']."</lieu></span> à <span class=\"lieu\"><lieu>".$data['Village']."</lieu></span>, <span class=\"titrespectacle\"><titrespectacle>".$data['TitreSpectacle']."</titrespectacle></span></p>" ;

            }
        }
        echo "</section>";
    }
?>