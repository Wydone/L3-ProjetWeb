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
        <h1>Festival Théâtres de Bourdon : mon panier</h1>
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
				<li>
					<a href="reservationBillets.php">Reserver vos billets</a>
				</li>
				<li>
					<a href="monPanier.php">Mon panier</a>
				</li>
				<li>
					<a href="graphiques.php">Les graphiques</a>
				</li>
	    	</ul>
		</div>
	</nav>

    <main>
        <div class="decalage">

			<?php
				session_start();
				// Msg de validation de panier ! 
				if(isset($_SESSION['msgValidation'])){
					echo "<p class=\"msgValidationErreurPanier\">".$_GET['msgValidation']."</p>";	
				}	
			?>

			<h1>Mon panier</h1>
			<form id="formValiderPanier" name="validationPanier" action="controleur/addBilletIntoCSV.php" method="POST">
			
				<?php 
					
					if(!isset($_SESSION["monPanier"])){
						echo "Votre panier est vide ! Rendez vous sur le formulaire de reservation de billet dans le menu";
						$cpt = 0;
					}else {
						//var_dump($_SESSION["monPanier"]);
						$cpt = 0;
						
						foreach($_SESSION["monPanier"] as $index=>$uneReservation){	
							
							foreach($uneReservation as $key => $value){
							
								list($name, $oldKey) = explode("-",$key); 
								if ($oldKey != $index){
									$newKey = $name.'-'.$index ;  
									$uneReservation[$newKey] = $value;
									 
									unset($uneReservation[$key]); 
								}
							}

							echo "<section id=\"id_panierSection-".$index."\" class=\"section-block\">";		
					
							echo "<titrespectacle>".$uneReservation["arrayAllTitreOption-".$index]."</titrespectacle>";
							echo "<input id=\"id_arrayAllTitreOption\" name=\"arrayAllTitreOption-".$index."\" type=\"hidden\" value=\"".$uneReservation["arrayAllTitreOption-".$index]."\">";
							
							echo ", <horaire>".$uneReservation["arrayAllDateOption-".$index]."</horaire>";
							echo "<input id=\"id_arrayAllDateOption\" name=\"arrayAllDateOption-".$index."\" type=\"hidden\" value=\"".$uneReservation["arrayAllDateOption-".$index]."\">";

							echo ", <horaire>".$uneReservation["arrayAllHoraireOption-".$index]."</horaire>";
							echo "<input id=\"id_arrayAllHoraireOption\" name=\"arrayAllHoraireOption-".$index."\" type=\"hidden\" value=\"".$uneReservation["arrayAllHoraireOption-".$index]."\">";

							echo ", <lieu>".$uneReservation["arrayAllLieuOption-".$index]."</lieu>";
							echo "<input id=\"id_arrayAllLieuOption\" name=\"arrayAllLieuOption-".$index."\" type=\"hidden\" value=\"".$uneReservation["arrayAllLieuOption-".$index]."\">";

							echo " à <village>".$uneReservation["arrayAllVillageOption-".$index]."</village>";
							echo "<input id=\"id_arrayAllVillageOption\" name=\"arrayAllVillageOption-".$index."\" type=\"hidden\" value=\"".$uneReservation["arrayAllVillageOption-".$index]."\">";

								
							echo "<br><br>Plein Tarif (15€) : <input class=\"inputInForm\" type=\"number\" id=\"id_P-".$index."\" name=\"P-".$index."\" min=\"0\" max=\"20\" value=".$uneReservation['P-'.$index].">";
							echo "<br>Tarif Réduit (10€) : <input class=\"inputInForm\" type=\"number\" id=\"id_R-".$index."\" name=\"R-".$index."\" min=\"0\" max=\"20\" value=".$uneReservation['R-'.$index].">";
							echo "<br>Gratuit (enfant) : <input class=\"inputInForm\" type=\"number\" id=\"id_E-".$index."\" name=\"E-".$index."\" min=\"0\" max=\"20\" value=".$uneReservation['E-'.$index].">";

							echo "<input type=\"hidden\" id=\"id_O-".$index."\" name=\"O-".$index."\" min=\"0\" max=\"20\" value=\"0\">";
						
							
							echo "<br><br><button class=\"btnSupprPanier\"  id=\"btnSupprimerDuPanier-".$index."\" type=\"button\">Supprimer du panier</button>";
								
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