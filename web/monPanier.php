<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link href="css/styleDefault.css" rel="stylesheet" type="text/css">
    <link href="css/style2.css" rel="stylesheet" type="text/css">

    <title>Theatres de Bourdon</title>

	<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="js/scriptPanier.js"></script>

</head>
<body>
    <div class="bandeau">
        <h1>Festival Théâtres de Bourdon</h1>
    </div>

    <nav class="nav-top">
		<div class="menu">
			<ul>
				<li>
					<a href="accueil.php">Accueil</a>
				</li>
				<li>
					<a href="programmationJourParJour.php">Jour par Jour</a>
				</li>
				<li>
					<a href="programmationLieuParLieu.php">Lieu par Lieu</a>
				</li>
				<li>
					<a href="programmationTroupeParTroupe.php">Troupe par Troupe</a>
				</li>
				<li>
					<a href="quiSommesNous.php">Qui sommes nous</a>
				</li>
				<li>
					<a href="tarifs.php">Tarif</a>
				</li>
	    	</ul>
		</div>
	</nav>

    <main>
        <div class="decalage">
			<h2>Mon panier</h2>
			<form id="formValiderPanier" name="validationPanier" action="controleur/addBilletIntoCSV.php" method="POST">
			
				<?php 
					session_start();
					
					if(!isset($_SESSION["monPanier"])){
						echo "error";
					}else {
						//var_dump($_SESSION["monPanier"]);
						$cpt = 0;
						
						foreach($_SESSION["monPanier"] as $index=>$uneReservation){	
							//echo "INDEX : ".$index."<br>";
							//var_dump($uneReservation);
							
							foreach($uneReservation as $key => $value){
							
								list($name, $oldKey) = explode("-",$key); 
								if ($oldKey != $index){
									
									$newKey = $name.'-'.$index ;  
									$uneReservation[$newKey] = $value;
									 
									unset($uneReservation[$key]); 
								}
								
							}
							//var_dump($uneReservation);
							//echo "THIS IS A TEST : ".$uneReservation["arrayAllTitreOption-".$index]; 

							echo "<section id=\"id_panierSection-".$index."\" class=\"section-block\">";		
					
							echo "<titrespectacle>".$uneReservation["arrayAllTitreOption-".$index]."</titrespectacle>";
							echo ", <horaire>".$uneReservation["arrayAllDateOption-".$index]."</horaire>";
							echo ", <horaire>".$uneReservation["arrayAllHoraireOption-".$index]."</horaire>";
							echo ", <lieu>".$uneReservation["arrayAllLieuOption-".$index]."</lieu>";
							echo " à <village>".$uneReservation["arrayAllVillageOption-".$index]."</village>";
							
								
							echo "<br><br>Plein Tarif (15€) : <input type=\"number\" id=\"id_P-".$index."\" name=\"P-".$index."\" min=\"0\" max=\"20\" value=".$uneReservation['P-'.$index].">";
							echo "<br>Tarif Réduit (10€) : <input type=\"number\" id=\"id_R-".$index."\" name=\"R-".$index."\" min=\"0\" max=\"20\" value=".$uneReservation['R-'.$index].">";
							echo "<br>Gratuit (enfant) : <input type=\"number\" id=\"id_O-".$index."\" name=\"O-".$index."\" min=\"0\" max=\"20\" value=".$uneReservation['O-'.$index].">";
						
							
							echo "<br><br><button id=\"btnSupprimerDuPanier-".$index."\" type=\"button\">Supprimer du panier</button>";
								
							$cpt = max($cpt, $index);
							echo "</section>"; 		
						}
					}
				?>
				
				<button type="button" id="btnAjouterSpectacleDansPanier">+</button>
				<input id ="idValiderPanier" type="submit" value="Valider mon panier">
            </form>
			


        </div>
    </main>

    <footer>

    </footer>
</body>
<script>
	var nbSpectacleDif = <?php echo $cpt;?> ; 
	main(nbSpectacleDif); 
</script>
</html>