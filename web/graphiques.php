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
    <script src="js/scriptCanvas.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>


</head>
<body onload="main()">
    <div class="bandeau">
        <h1>Festival Théâtres de Bourdon : graphes</h1>
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
            <h2> Mes graphiques</h2>
			
			<form id="grapheSelector">
				<h3>Choisir un type de representation de grpahe</h3>
				<input type="radio" id="btn_radio1" name="grapheType" value="compagnie" checked><label for="btn_radio1">Par compagnie</label><br>
				<input type="radio" id="btn_radio2" name="grapheType" value="Lieu"><label for="btn_radio2">Par lieu</label><br>
				<input type="radio" id="btn_radio3" name="grapheType" value="representation"><label for="btn_radio3">Par representation</label><br>
			</form>
            
			<canvas id="myCanvas"></canvas>
            
        </div>
    </main>

    <footer>

    </footer>
</body>
</html>