/* Variables globales */
var Mycategories = new Array;  // = nb bar différentes dans le graphe
var MyNames = ["P", "R", "O", "SJ", "SA"]; // = nb rectangle différents dans chaque bar

var allData = new Array; // 

var seriesOptions = [];


//Fonction main called on load of the page

function main(){

    $(document).ready(function() {
      
        $.get('data/test.csv', function(csvFile) {
            parseDataCSV(csvFile);
            //setInterval(function(){ parseDataCSV(csvFile); }, 3000);
        });
        
        //Dernier traitement : ajout des prix ;
        /*for(let i=0; i<allData; i++){
            for(let j=0; j<Mycategories; j++){
                allData[i][j] = 
            }
        }*/
       


    });
}


function buildData() {
    for(let i = 0; i<MyNames.length; i++){
        console.log(MyNames[i])
        console.log(allData[i]); 
        seriesOptions[i] = {
            name : MyNames[i],
            data : allData[i]
        }
    }
    createChart(); 
}

function parseDataCSV(csvFile) {
    console.log("APPEL DE PARSECSVDATA"); 

    var data = []; 
    var lines = csvFile.split('\n'); 

    $.each(lines, function(lineNumero, line){
        
        if(lineNumero != 0 && line != ''){
            var items = line.split(','); 
            //toutes les colonnes du CSV
            var Jour = items[0];
            var Heure = items[1];
            var Titre = items[2];
            var Lieu = items[3];
            var Village = items[4];
            var Compagnie = items[5];
            var P = items[6];
            var R = items[7];
            var O = items[8];
            var SJ = items[9];
            var SA = items[10];
            var E = items[11];

            
            if(! Mycategories.includes(Compagnie)){
                Mycategories.push(Compagnie); 
            }
        }
    });


    //Initialisation des différentes listes
    for(let j = 0 ; j < MyNames.length; j++){
        
        var data = new Array; 
    
        for(let i = 0; i < Mycategories.length; i++ ){
            data[i] = 0; 
        }
        allData[j] = data;
    }   

    console.log(Mycategories); 
    console.log(MyNames); 
    console.log(allData);
    console.log(allData[0]);

    //Remplissage des différentes listes
   $.each(lines, function(lineNumero, line){

        if(lineNumero != 0 && line != null){
            var items = line.split(','); 
            
            //toutes les colonnes du CSV
            var Jour = items[0];
            var Heure = items[1];
            var Titre = items[2];
            var Lieu = items[3];
            var Village = items[4];
            var Compagnie = items[5];
            var P = items[6];
            var R = items[7];
            var O = items[8];
            var SJ = items[9];
            var SA = items[10];
            var E = items[11];

            for(let i = 0; i < Mycategories.length; i++){
                if(Mycategories[i] == Compagnie){
                    allData[0][i] += parseInt(P) ; // = P de la catégorie
                    allData[1][i] += parseInt(R) ; // = P de la catégorie
                    allData[2][i] += parseInt(O) ; // = P de la catégorie
                    allData[3][i] += parseInt(SJ) ; // = P de la catégorie
                    allData[4][i] += parseInt(SA) ; // = P de la catégorie
                }
                
            }
               
           
        }
    }); 
    buildData();  
}

function createChart(){
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Stacked column chart'
        },
        xAxis: {
            categories: Mycategories
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total billets'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: seriesOptions //spec
    });
}