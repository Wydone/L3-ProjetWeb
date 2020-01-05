<?php
    //controleur qui permet de supprimer une reservation du panier

    session_start(); 

    $param1 = $_GET['numeroSpectacle'];
    if(isset($_SESSION["monPanier"])){

        unset($_SESSION["monPanier"][$param1]);
    }
    
?>