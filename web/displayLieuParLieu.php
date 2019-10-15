<?php
    require_once('parseCSVintoArray.php');
    require_once('parseCSVintoArrayLieu.php');

    $arrayLieu = array(); 
       
    foreach($arrayData as $prog){
        $temp = $prog['Lieu']; 
        //echo $temp; 

        if( !(in_array($temp, $arrayLieu))){
            array_push($arrayLieu, $temp);
        }
    }
    
    //print_r($arrayLieu);

    
    foreach($arrayLieu as $Lieu){
        echo "<div class=\"Lieu\">"; 
        foreach($arrayDataLieu as $dataLieu){

            if($dataLieu['Lieu'] == $Lieu){
                    
                //Affichage des specifications du lieu
                echo "<h2>".$dataLieu['Village']."</h2>" ;
                echo "<p>".$dataLieu['Distance']."</p>";
                echo "<h2>".$Lieu."</h2>";
                echo "<div> <figure class=\"lieu\"> <img src=\"".$dataLieu['ImageUrl']."\" alt=\"".$dataLieu['ImageALT']."\" width=\"100%\" height=\"100%\"> <figcaption>Photographe : ".$dataLieu['ImagePhotographe']."</figcaption></figure>"; 
                echo "<p>".$dataLieu['Description']."</p>";

                //Affichage du programme du lieu

                echo "<h2>".$dataLieu['Lieu']." à ".$dataLieu['Village'].",</h2>"; 
                echo "<h2>Le programme : </h2>";

                foreach($arrayData as $data) {
                    if($data['Lieu'] ==$Lieu){
                        echo "<p><horaire>".$data['Jour']."</horaire> à <horaire>".$data['Heure']."</horaire>, <troupe>".$data['Compagnie']."</troupe> présente <titrespectacle>".$data['TitreSpectacle']."</titrespectacle></p>";
                        // AUTEUR ?????
                    }
                }

            }    


        }
    }
?>