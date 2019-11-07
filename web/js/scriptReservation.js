
function loadList() {

}

function createURL(){
    $.get("controleur/parseCSVintoArrayJSON.php", function(data){
        var dataARRAY = jQuery.parseJSON(data);
        console.log(dataARRAY);
    });
}