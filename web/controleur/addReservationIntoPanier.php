<?php
    session_start();

    $allChampsNamePOST = array(); 
    $allChampsValuePOST = array() ; 

    $allListeReservation = array() ; 
    $listeReservationParSpectacle = array() ; 

    $cpt = 0; 
    $row = 0; 

   

    if($_SESSION["monPanier"] == NULL){
        $_SESSION["monPanier"] = array(); 
    }

    // Recuppération de tout les champs qui sont envoyé en post par le formulaire
    foreach ( $_POST as $post => $val )  {            
        
        array_push($allChampsNamePOST,$post); 
        array_push($allChampsValuePOST,$val); 

        //array_push($allListeReservation,array($post => $val)); 
        //array_push($listeReservationParSpectacle,array($post => $val));

        $listeReservationParSpectacle[$post] = $val; 

        if($cpt == 7){ //car il y a 7 champs dans mon formulaire par spectacle 
            

            array_push($_SESSION["monPanier"], $listeReservationParSpectacle); 

            $listeReservationParSpectacle = array(); 
            $cpt = -1;
        }

        $cpt +=1;
    }

    header('Location: ../monPanier.php');

?>