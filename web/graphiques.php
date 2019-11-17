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
    <script src="js/scriptGraphique.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>

    <script src="https://code.highcharts.com/highcharts.src.js"></script>


</head>
<body onload="main()">
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
            <h2> Mes graphiques</h2>
            <div id="container" style="height: 400px; min-width: 310px"></div>	
            
        </div>
    </main>

    <footer>

    </footer>
</body>
</html>