<?php
    //This controleur is used for parse the CSV file into an multidimensional array

    $row = 1; 
    $file = fopen("data/LieuParLieu.csv", "r"); 

    $arrayInfoCSVLieu = array()  ;  //contain the head of the CSV file
    $arrayDataLieu = array() ; // The csv data convert into a multidimensional array
    
     // temp array used to create arrayData
    $arrayDataTempLieu = array();  
    $Village = "Village";

    while(($line = fgetcsv($file, 0, ";")) !== FALSE){
        if($row == 1){
          
            foreach($line as $elt){
                array_push($arrayInfoCSVLieu, $elt);
            }
            array_push($arrayInfoCSVLieu, $Village);

            $nbChampsLieu = sizeof($arrayInfoCSVLieu);
            //echo "Nombres de champs : $nbChampsLieu" ;
            //print_r($arrayInfoCSVLieu);
          
        }else {
            $arrayDataTempLieu[$arrayInfoCSVLieu[$nbChampsLieu-1]] = $line[0] ;
            for($i=1; $i<$nbChampsLieu-1; $i++){  
                $arrayDataTempLieu[$arrayInfoCSVLieu[$i]] = $line[$i];
            }   
            array_push($arrayDataLieu,$arrayDataTempLieu) ;
        }
        $row++; 

       
    }
   // print_r($arrayDataLieu);
  //  echo "<br>Test : ".$arrayDataLieu[1]['Village'] ;
  // print_r($arrayDataLieu)
?>