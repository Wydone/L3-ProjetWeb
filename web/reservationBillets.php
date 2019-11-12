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
    <script src="js/scriptReservation.js"></script>
</head>
<body onload="main()">
    <div class="bandeau">
        <h1>Festival Théâtres de Bourdon : Réservation de billets</h1>
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
			<p>
				ANNONCE IMPORTANTE : Pour 5 billets payants, le 6ème est offert !
			<p>

			<form id="formReservation" name="reservationBillet" action="controleur/addReservationIntoPanier.php" method="POST">
				
				<button id="btnNewReservation" type="button">+</button>
				<input id ="inputSubmitFormReservation" type="submit" value="Ajouter au panier">
            </form>
        </div>
    </main>

    <footer>

    </footer>
</body>
	
</html>