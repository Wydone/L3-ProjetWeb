<?php

    //Controleur php qui affiche le contenu des mes différentes array en utilisant les balises du css d'origine

    require_once('parseCSVintoArray.php');
    require_once('parseCSVintoArrayLieu.php');

    $arrayLieu = array(); 
       
    foreach($arrayData as $prog){
        $temp = $prog['Lieu']; 
    
        if( !(in_array($temp, $arrayLieu))){
            array_push($arrayLieu, $temp);
        }
    }
        
    foreach($arrayLieu as $Lieu){

       
        foreach($arrayDataLieu as $dataLieu){

            if($dataLieu['Lieu'] == $Lieu){
                    
                //Affichage des specifications du 
                echo "<div class=\"Lieu\">"; 
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
                        echo "<p><span class=\"horaire\"><horaire>".$data['Jour']."</horaire></span> à <span class=\"horaire\"><horaire>".$data['Heure']."</horaire></span>, <span class=\"troupe\"><troupe>".$data['Compagnie']."</troupe></span> présente <span class=\"titrespectacle\"><titrespectacle>".$data['TitreSpectacle']."</titrespectacle></span></p>";
                        // AUTEUR ?????
                    }
                }
                echo "</div>";
                echo "</div>";
                echo "<br>";

            }    


        }
       
    }
?>