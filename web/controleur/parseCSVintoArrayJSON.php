<?php
    //This controleur is used for parse the CSV file into an multidimensional array JSON

    $row = 1; 
    $file = fopen("../data/ResultatsFestival.csv", "r"); 
    
    $arrayInfoCSV = array()  ;  //contain the head of the CSV file
    $arrayData = array() ; // The csv data convert into a multidimensional array
    
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
    echo json_encode($arrayData);

?>