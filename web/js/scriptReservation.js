
function loadList() {

}

function createURL(){
    $(document).ready(function() {
        console.log("test avant get");
        $.get("controleur/parseCSVintoArrayJSON.php", function(data){
            var dataARRAY = jQuery.parseJSON(data);
            console.log(dataARRAY);
        });
        console.log("test apres get");
    }); 
    /*
    $.ajax({
        type: 'POST',
        url: "../controleur/parseCSVintoArray.php",
        dataType: "json",
        success: function (arrayData) {
            var arrayDataInJSON = JSON.parse(arrayData);
        }
    });
    console.log(arrayData);
    */

}