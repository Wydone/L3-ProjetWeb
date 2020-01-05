<?php
    //controleur qui permet un affichage jour par jour en utilisant les balises dans le css.

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
        echo "<section class=\"section-block\">";
        echo "<h2>".$Jour."</h2>" ; 
        foreach($arrayData as $data) {
           
            if($data['Jour'] == $Jour){
                echo "<p> <span class=\"horaire\"><horaire>".$data['Heure']."</horaire></span>, <span class=\"lieu\"><lieu>".$data['Lieu']."</lieu></span> à <span class=\"lieu\"><lieu>".$data['Village']."</lieu></span>, <span class=\"titrespectacle\"><titrespectacle>".$data['TitreSpectacle']."</titrespectacle></span>, <span class=\"troupe\"><troupe>".$data['Compagnie']."</troupe></span> </p>" ; 
            }

        }
        echo "</section>";
        echo "<br>";
    }

?>