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
</head>
<body onload="createURL()">
    <main>
        <div class="decalage">
            <form name="reservationBillet" action="addReservationIntoFile.php" method="POST">

                <h3>Choix du spectacle</h3>
				

                

                <input type="submit" value="Valider" />
            </form>
        </div>
    </main>

    <footer>

    </footer>
</body>
	<script src="js/scriptReservation.js"></script>
</html>