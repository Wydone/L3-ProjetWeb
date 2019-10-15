<?php
    //This controleur is used for parse the CSV file into an multidimensional array

    $row = 1; 
    $file = fopen("data/ResultatsFestival.csv", "r"); 

    $arrayInfoCSV = array()  ;  //contain the head of the CSV file
    $arrayData = array() ; // The csv data convert into a multidiùensional array
    
     // temp array used to create arrayData
    $arrayDataTemp = array();  
    $Jour = "Jour";

    while(($line = fgetcsv($file, 1024, ",")) !== FALSE){
        if($row == 1){
          
            foreach($line as $elt){
                array_push($arrayInfoCSV, $elt);
            }
            array_push($arrayInfoCSV, $Jour);

            $nbChamps = sizeof($arrayInfoCSV);
            // echo "Nombres de champs : $nbChamps" ;
          
        }else {
            $arrayDataTemp[$arrayInfoCSV[$nbChamps-1]] = $line[0] ;
            for($i=1; $i<$nbChamps-1; $i++){  
                $arrayDataTemp[$arrayInfoCSV[$i]] = $line[$i];
            }   
            array_push($arrayData,$arrayDataTemp) ;
        }
        $row++; 
    }

    //print_r($arrayData);

    /* 
        //Test pour l'existance de du tableau    
    
      
        echo "".$arrayData[1]['Jour'] ;
        print_r($arrayData[1]); 
        // echo "".$arrayData[1]['jour'] ;
        //echo "".$arrayData[0]['Compagnie'] ;
        //echo "".$arrayData[0]['jour'] ;
        if(array_key_exists('Jour', $arrayData[0])){
            echo "La clef existe";
        }else {
            echo "La clef n'existe pas ";
        }

    */
    //echo "".$arrayData[0]['Jour'] ;


?>