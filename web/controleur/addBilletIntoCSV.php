<?php 
    
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

    var_dump($reservationIntoCSV); 
    
    $row = 1; 
    if($file = fopen("../data/test.csv", "r+")){
        //echo $file;
        while(($line = fgetcsv($file, 1024, ",")) !== FALSE){
            if($row != 1){
               foreach ($reservationIntoCSV as $element){
                   if($element[0] == $line[2] && $element[1] == $line[0] && $element[2] == $line[1] && $element[3] == $line[3] && $element[4] == $line[4]){
                        echo "modification à la ligne : ".$row."\n"; 

                        

                        $line[6] += $element[5]; // champ P colone 6
                        $line[7] += $element[6]; //champ R colonne 7
                        $line[11] += $element[7]; //champ E colonne 11
                        $line[8] += $element[8]; //Champ O colonne 8

                       //fwrite($file,$line);
                      
                        $update	.= implode($separator,$line)."\r\n";
                        $ligneModifie = true ; 
                   }
               } 
               if (!$ligneModifie){
                    $update .= implode($separator,$line)."\r\n"; 
               }else {
                   $ligneModifie = false ;
               }
               
            }else {
                $update .= implode($separator,$line)."\r\n"; 
            }
            $row++; 
        }
        fclose($file);

        $edit = fopen("../data/test.csv", "w+"); 
        fwrite($edit, $update);
        fclose($edit);

    }else {
        echo "error ouverture file";
    }




?>