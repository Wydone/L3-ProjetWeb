<?php
    require_once('parseCSVintoArray.php');

    $arrayJour = array(); 

    echo "Jour : ".$arrayData[41]['jour']; 

    foreach($arrayData as $prog){
        $temp = $prog['jour']; 
        echo $temp; 


        if( !(in_array($temp, $arrayJour))){
            echo "test validated";
            array_push($arrayJour, $temp);
        }
    }

    print_r($arrayJour);



    //header('Location: programmationJourParJour.php');

?>