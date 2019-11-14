<?php
    session_start(); 

    $param1 = $_GET['numeroSpectacle'];
   // print_r($_SESSION["monPanier"]);
    if(isset($_SESSION["monPanier"])){


        unset($_SESSION["monPanier"][$param1]);
        //array_splice($_SESSION["monPanier"],$param1,1); 
        //$_SESSION["monPanier"] = array_diff($_SESSION["monPanier"], array($param1));
    }
    //echo "<br><br>APRES LE DELETE <br><br>";
    //print_r($_SESSION["monPanier"]);
?>