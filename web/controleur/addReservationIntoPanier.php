<?php
    session_start();

    $allChampsNamePOST = array(); 
    $allChampsValuePOST = array() ; 

    $allListeReservation = array() ; 
    $listeReservationParSpectacle = array() ; 

    $cpt = 0; 

    // Recuppération de tout les champs qui sont envoyé en post par le formulaire
    foreach ( $_POST as $post => $val )  {            
        
        array_push($allChampsNamePOST,$post); 
        array_push($allChampsValuePOST,$val); 

        //array_push($allListeReservation,array($post => $val)); 
        array_push($listeReservationParSpectacle,array($post => $val));

        if($cpt == 7){ //car il y a 7 champs dans mon formulaire par spectacle 

            array_push($allListeReservation, $listeReservationParSpectacle); 
            $listeReservationParSpectacle = array(); 
            $cpt = 0;
        }

        $cpt +=1;

    }

    $_SESSION["monPanier"]=$allListeReservation;

    header('Location: ../monPanier.php');

    //print_r($allChampsNamePOST);
    //print_r($allChampsValuePOST);
    // print_r($allListeReservation);
?>