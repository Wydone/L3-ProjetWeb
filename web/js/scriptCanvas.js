
var canvas ;
var context ;
var Val_Max;
var Val_Min;
var sections;
var xScale;
var yScale;
var y;

var myCategories = new Array ; // contient les différents item de la bar de l'axe x
var myItemNames = ["P","SA", "R","SJ"];
var allData = new Array;

var pleinTarif = 15; 
var tarifReduit = 10; 

function main(){
    $(document).ready(function() {
      
        $.get('data/test.csv', function(csvFile) {
            parseDataCSV(csvFile);
        });
    });
}

// parse la data du csv et initialise les différentes listes avec les data du csv
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

            
            if(! myCategories.includes(Compagnie)){
                myCategories.push(Compagnie); 
            }
        }
    });


    //Initialisation des différentes listes
    for(let j = 0 ; j < myItemNames.length; j++){
        
        var data = new Array; 
    
        for(let i = 0; i < myCategories.length; i++ ){
            data[i] = 0; 
        }
        allData[j] = data;
    }   

   
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

        

            for(let i = 0; i < myCategories.length; i++){
                if(myCategories[i] == Compagnie){
                    allData[0][i] += parseInt(P) ; // = P de la catégorie
                    allData[1][i] += parseInt(SA) ; // = P de la catégorie
                    allData[2][i] += parseInt(R) ; // = P de la catégorie
                    allData[3][i] += parseInt(SJ) ; // = P de la catégorie
                }
                
            }
        }
    });


    console.log(myCategories); 
    console.log(myItemNames); 
    console.log(allData);
   // console.log(allData[]);
   
    


    loadChart();  
     
}

function loadChart(){
   		
    canvas = document.getElementById("myCanvas");
    canvas.width = 800;
    canvas.height = 600;
	ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000;"
    
    var maxX = canvas.width -70;
	var maxY = canvas.height -70;
	var minX = 70;
    var minY = 70;

    var maximumYValue = 0;
    for (let i=0; i<myCategories.length; i++){

        var valuePleinTarif = (allData[0][i]*15*0.1) - (allData[1][i]*15);
        var valueTarifReduit = (allData[2][i]*15*0.1) - (allData[3][i]*15); 

        if (maximumYValue < parseInt(valuePleinTarif + valueTarifReduit)){
            maximumYValue = parseInt(valuePleinTarif+valueTarifReduit);
        }
    }
    maximumYValue = (Math.trunc(maximumYValue/100) + 1) * 100;    
    
ctx.beginPath();
//Horizontal Axis
	ctx.lineWidth=2.0;
	ctx.lineCap = 'round';
	ctx.moveTo(minX,maxY);
	ctx.lineTo(maxX,maxY);

//Horizontal Axis Arrow
	ctx.moveTo(maxX-10,maxY-5);
	ctx.lineTo(maxX,maxY);
	ctx.lineTo(maxX-10,maxY+5);

//Vertical Axis
	ctx.moveTo(minX,maxY);
	ctx.lineTo(minX,minY);

//Vertical Axis Arrow
	ctx.moveTo(minX-5,minY+10);
	ctx.lineTo(minX,minY);
	ctx.lineTo(minX+5,minY+10);
ctx.stroke();
    

    //Min Ticks DRaw lines
    ctx.lineWidth = 0.5;
    var noOfGrids = 5;
    var vGridDiff = (maxY - minY)/noOfGrids;
    ctx.font="12px Helvetica";
    for (var i =1; i<noOfGrids;i++){
        ctx.moveTo(minX,maxY-i*vGridDiff);
        ctx.lineTo(maxX,maxY-i*vGridDiff);
        ctx.fillText((i*maximumYValue/noOfGrids),20,maxY-i*vGridDiff);
    }
    ctx.stroke();

    var padding = 20;
    var maxHeight = Math.round((maxY - minY)*1.0);
   
    ctx.beginPath();

    var space = Math.trunc(maxX / (2*((myCategories.length) + 1)) ); 
    //console.log(Math.trunc(space));

    for (let i =0; i<myCategories.length; i++){

        var valuePleinTarif = (allData[0][i]*15*0.1) - (allData[1][i]*15);
        var valueTarifReduit = (allData[2][i]*15*0.1) - (allData[3][i]*15); 

        
        console.log("P = "+valuePleinTarif+", R = "+valueTarifReduit+"value total : "+(valuePleinTarif+valueTarifReduit));

        ctx.fillStyle = "red"
        ctx.fillRect(minX+(space*i*2)+space,maxY-((valuePleinTarif/maximumYValue)*maxHeight),space,(valuePleinTarif/maximumYValue)*maxHeight-1);
        
       
        ctx.fillStyle = "blue"
        ctx.fillRect(minX+(space*i*2)+space,maxY-(((valuePleinTarif+valueTarifReduit)/maximumYValue)*maxHeight),space,(valueTarifReduit/maximumYValue)*maxHeight-1);
      
        ctx.fillStyle = "black"
        ctx.globalAlpha = 1;
        ctx.fillText(""+(valuePleinTarif+valueTarifReduit), (minX+(space*i*2)) + 2*space, maxY-(((valuePleinTarif+valueTarifReduit)/maximumYValue)*maxHeight));

    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

}

