<?php 

    //Controleur qui permet d'ajouter les billets reservé dans le fichier CSV


    session_start();


    $tmpCouple = array(); 
    $allTmpCouple = array (); 
    $reservationIntoCSV = array(); 

    $cpt = 0; 

    $update = ""; 
    $separator = ",";
    $ligneModifie = false; 



    foreach ($_POST as $key => $val )  {

        array_push($tmpCouple,$val);

        array_push($allTmpCouple,$tmpCouple);

        if ($cpt == 8) {

            array_push($reservationIntoCSV,$tmpCouple);
            $tmpCouple = array (); 
            $cpt = -1; 
        }
      
        $cpt += 1; 
    }

    //var_dump($reservationIntoCSV); 
    
    $row = 1; 
    if($file = fopen("../data/ResultatsFestival.csv", "r")){

        while(($line = fgetcsv($file, 1024, ",")) !== FALSE){
            if($row != 1){
               foreach ($reservationIntoCSV as $element){

                    //Stocker dans une varialbe l'intergralité des changements
                   if($element[0] == $line[2] && $element[1] == $line[0] && $element[2] == $line[1] && $element[3] == $line[3] && $element[4] == $line[4]){
                        echo "modification à la ligne : ".$row."\n"; 

                        

                        $line[6] += $element[5]; // champ P colone 6
                        $line[7] += $element[6]; //champ R colonne 7
                        $line[11] += $element[7]; //champ E colonne 11
                        $line[8] += $element[8]; //Champ O colonne 8

                       //fwrite($file,$line);
                      
                        $line[2] = "\"".$line[2]."\"";
                        $update	.= implode($separator,$line)."\r\n";
                        $ligneModifie = true ; 
                   }
               } 
               if (!$ligneModifie){
                $line[2] = "\"".$line[2]."\"";
                    $update .= implode($separator,$line)."\r\n"; 
               }else {
                   $ligneModifie = false ;
               }
               
            }else {
                $line[2] = "\"".$line[2]."\"";
                $update .= implode($separator,$line)."\r\n"; 
            }
            $row++; 
        }
        fclose($file);


        //Mettre à jour le fichier 
        if( $edit = fopen("../data/ResultatsFestival.csv", "w")){
            echo "Modification du CSV file"; 
            fwrite($edit, $update);
            fclose($edit);
        }else {
            echo "Erreur d'ouverture du fichier pour la modification";
        }
        

        $msg = "Votre panier a été validé";

    }else {
        echo "error ouverture csv file";
        $msg = "Une erreur détecté, panier non validé";
    }

    $_SESSION["monPanier"] = NULL; 
   

    header('Location:../accueil.php?msgValidation='.$msg);



?>