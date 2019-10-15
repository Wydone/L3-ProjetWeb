<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link href="css/styleDefault.css" rel="stylesheet" type="text/css">

    <title>Theatres de Bourdon</title>
</head>
<body>
    <div class="bandeau">
        <h1>Festival Théâtres de Bourdon : Dans chaque lieu</h1>
    </div>

    <div class="menu">

    </div>

    </div>

    <main>
        <div class="decalage">
            <h2>Quatres demeures de l'Allier, un musée et une église vous ouvrent leurs grilles pour assister aux représentations théâtrales.</h2>
        
            <p>Choissisez un lieu en cliquant sur son bouton (dans le menu de la page) pour voir la programmation qu'il accueille puis selectionnez les spectacles qui s'y jouent et vous intéresse. </p>

            <figure>
						<img  	src="images/kje.jpg"                                                                                                                   
								alt=" Infographie Pour Situer les châteaux sur la carte du département "
							width=100%
							height=100%
							id="localisation"
						>
						<figcaption>Photocomposition:Edmée Deusy</figcaption>
			</figure>

            <?php require_once('displayLieuParLieu.php');?>

        </div>
    </main>

    <footer>

    </footer>
</body>
</html>