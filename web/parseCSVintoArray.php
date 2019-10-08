<?php
    //This controleur is used for parse the CSV file into an multidimensional array

    $row = 1; 
    $file = fopen("data/ResultatsFestival.csv", "r"); 

    $arrayInfoCSV = array() ;  //contain the head of the CSV file
    $arrayData = array() ; // The csv data convert into a multidiùensional array
    
    
     // temp array used to create arrayData
    $arrayDataTemp = array();   

    while(($line = fgetcsv($file, 1024, ",")) !== FALSE){
        if($row == 1){
            foreach($line as $elt){
                array_push($arrayInfoCSV, $elt);
            }
            $nbChamps = sizeof($arrayInfoCSV);
            //echo "Nombres de champs : $nbChamps"    ;
            //print_r($arrayInfoCSV);
            //echo "".$arrayInfoCSV[0];

        }else {
            
            for($i=0; $i<$nbChamps; $i++){  
                $arrayDataTemp[$arrayInfoCSV[$i]] = $line[$i];
            }   
            array_push($arrayData,$arrayDataTemp) ;
        }
        $row++; 
    }
    print_r($arrayData[0]);
    echo "".$arrayData[0]['jour'] ; 
    //echo "".$arrayData[0]['TitreSpectacle'] ;
    //echo "".$arrayData[0]['Compagnie'] ;
    //echo "".$arrayData[0]['jour'] ;
    


  //  print_r($arrayData[0]);

    if(array_key_exists('jour', $arrayDataTemp[0])){
        echo "La clef existe";
    }else {
        echo "La clef n'existe pas ";
    }
    


?>