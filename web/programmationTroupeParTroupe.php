<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link href="css/styleDefault.css" rel="stylesheet" type="text/css">
    <link href="css/style2.css" rel="stylesheet" type="text/css">

    <title>Theatres de Bourdon</title>
</head>
<body>
    <div class="bandeau">
        <h1>Festival Théâtres de Bourdon : Dans chaque lieu</h1>
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

    </div>

    <main>
        <div class="decalage">
           
            <?php require_once('controleur/displayTroupeParTroupe.php');?>

        </div>
    </main>

    <footer>

    </footer>
</body>
</html>