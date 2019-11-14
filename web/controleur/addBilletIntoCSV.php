<?php 
    
    $tmpCouple = array(); 
    $allTmpCouple = array (); 
    $reservationIntoCSV = array(); 

    $cpt = 0; 

    foreach ($_POST as $key => $val )  {

        array_push($tmpCouple,$val);

        array_push($allTmpCouple,$tmpCouple);

        if ($cpt == 7) {

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
                        echo "modification à la ligne : ".$row; 

                        

                        $line[6] += $element[5]; 
                       $line[7] += $element[6];
                       $line[8] += $element[7];

                       echo "nouvelle valeur de P : ".$line[6];
                       //fputcsv($file, $line);

                   }
               } 
            }
            $row++; 
        }
       // fclose($file);

    }else {
        echo "error ouverture file";
    }

    


?>