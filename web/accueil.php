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
				if(isset($_GET['msgValidation'])){
					echo "<p class=\"msgValidationErreurPanier\">".$_GET['msgValidation']."</p>";	
				}	
			?>

			<h1><a href="Festival2018ProgrammationVueGlobale.php">Du 2 au 6 août 2019</a></h1>
			<h2><a href="Festival2018ProgrammationParSpectacle.php">Une quinzaine de spectacles</a>, <a href="Festival2018ProgrammationParJour.php">une quarantaine de représentations</a></h2>
			<h2>Des plus grands auteurs 
					(<!--<a href="Festival2018ProgrammationParSpectacle.php#labelSpectacle_10371              z">-->
					Molière<!--</a>-->,					
					<!-- <a href="Festival2018ProgrammationParSpectacle.php#labelSpectacle_10372              z">-->Shakespeare
					<!--</a>-->...) 
					aux créations <a href="Festival2018ProgrammationParSpectacle.php#labelSpectacle_10402z">les plus originales</a>,
			</h2>
			<h2> En plein air, les pieds dans l'herbe mais dans <a href="Festival2018ProgrammationParLieu.php">des cadres exceptionnels</a>, </h2>
			<h2> <a href="Festival2019Tarifs.php">en toute simplicité</a>, chaleur et convivialité, <a href="Festival2018ProgrammationParLieu.php">au cœur de la France</a>.</h2>

			<h1><a href="Festival2018ProgrammationVueGlobale.php">Changeons quelque chose à notre vie&#8239;!</a></h1>
			<h2 class="adroite"><a href="presentation.php">Théâtres de bourbon</a></h2>
			<div class="adroite"><a href="index.php"><img class="petiteVignette"
							src="images/logo.jpg"
							alt="[logo de l'association vers l'accueil du site]"
							width=100%
							height=100%
							decoding=low
							>
							</a>
							
			</div><!--  adroite -->	

			information de derniere minute: à cause du spectacle de son et lumiere de Moulins, la représentation de Tartuffe ou l'imposteur au CNCS de Moulins le 6 août 2019 initialement prévu à 20h30 est avancé à 20h00. 
		
		<iframe src="images/PdfFlyerA4RectoVerso.pdf" width="640" height="480"></iframe>


		</div>
    </main>

    <footer>

    </footer>
</body>
</html>