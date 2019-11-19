
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
	var maxY = canvas.height -170;
	var minX = 70;
    var minY = 70;

    var map = new Array; 
    var mapValue = new Array;

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
	ctx.moveTo(minX,maxY+170); 
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
    for (let i=-2; i<noOfGrids;i++){
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
        
        map.push({x : minX+(space*i*2)+space, y : maxY-((valuePleinTarif/maximumYValue)*maxHeight), w : space, h : (valuePleinTarif/maximumYValue)*maxHeight-1 })
        var mapValueTmp = {
            "P" : allData[0][i],
            "SA" : allData[1][i], 
            "TarifP" : 15,
            "TarifSA" : 15,
            "Total" : valuePleinTarif
        }

        mapValue.push(mapValueTmp)
        
        ctx.fillStyle = "blue"
        if(valueTarifReduit < 0 && valuePleinTarif > 0){
            ctx.fillRect(minX+(space*i*2)+space,maxY-(((valueTarifReduit)/maximumYValue)*maxHeight),space,(valueTarifReduit/maximumYValue)*maxHeight-1);
            map.push({x : minX+(space*i*2)+space, y : maxY-(((valueTarifReduit)/maximumYValue)*maxHeight), w : space, h : (valueTarifReduit/maximumYValue)*maxHeight-1 })
            var mapValueTmp = {
                "R" : allData[2][i],
                "SJ" : allData[3][i], 
                "TarifR" : 10,
                "TarifSJ" : 10,
                "Total" : valueTarifReduit
            }
            mapValue.push(mapValueTmp)
        
        }else{
            ctx.fillRect(minX+(space*i*2)+space,maxY-(((valuePleinTarif+valueTarifReduit)/maximumYValue)*maxHeight),space,(valueTarifReduit/maximumYValue)*maxHeight-1);
            map.push({x : minX+(space*i*2)+space, y : maxY-(((valuePleinTarif+valueTarifReduit)/maximumYValue)*maxHeight), w : space, h : (valueTarifReduit/maximumYValue)*maxHeight-1 })
            var mapValueTmp = {
                "R" : allData[2][i],
                "SJ" : allData[3][i], 
                "TarifR" : 15,
                "TarifSJ" : 15,
                "Total" : valueTarifReduit
            }
            mapValue.push(mapValueTmp)
        
        }

//Test tooltip 
    
        
       
       // ctx.globalAlpha = 1;
      //  ctx.fillText(""+(valuePleinTarif+valueTarifReduit), (minX+(space*i*2)) + 2*space, maxY-(((valuePleinTarif+valueTarifReduit)/maximumYValue)*maxHeight));

    }
    console.log(map)
    console.log(mapValue)

    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    canvas.onmousemove = function(e) {
        // Get the current mouse position
        var r = canvas.getBoundingClientRect(),
            x = e.clientX - r.left, y = e.clientY - r.top;
            
    
        for(var i = 0; i < map.length; i++) {
            b = map[i];
            if((x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) ||
                (x >= b.x && x <= b.x + b.w && y <= b.y && y >= b.y + b.h) ) {
                // The mouse honestly hits the rect then creat the tooltip
                if(i % 2 == 0){
                    ctx.beginPath();
                    ctx.strokeStyle = "balck";
                    ctx.stroke();
                    ctx.lineWidth = 2;
                    ctx.strokeRect(maxX/2, 0, 200, 100);

                    ctx.fillText("RECETTE/DEPENCE PLEIN TARIF : ",  maxX/2 +6, 20, 200);
                    ctx.fillText("Nombre de ticket plein tarif : "+mapValue[i]['P'],  maxX/2+6, 40, 200);
                    ctx.fillText("Nombre de ticket SA : "+mapValue[i]['SA'],  maxX/2+6, 55, 200);
                    ctx.fillText("Prix des tickets : "+mapValue[i]['TarifP'],  maxX/2+6, 70, 200);
                    if(mapValue[i]['Total']> 0){
                        ctx.fillText("Recette total : "+mapValue[i]['Total']+" €",  maxX/2 +6, 90, 200);
                    }else {
                        ctx.fillText("Depense total : "+mapValue[i]['Total']+" €",  maxX/2 +6, 90, 200);
                    
                    } 
                }else{
                    ctx.beginPath();
                    ctx.strokeStyle = "balck";
                    ctx.stroke();
                    ctx.lineWidth = 2;
                    ctx.strokeRect(maxX/2, 0, 200, 100);

                    ctx.fillText("RECETTE/DEPENCE TARIF REDUIT : ",  maxX/2 +6, 20, 200);
                    ctx.fillText("Nombre de ticket tarif reduit : "+mapValue[i]['R'],  maxX/2+6, 40, 200);
                    ctx.fillText("Nombre de ticket SJ : "+mapValue[i]['SJ'],  maxX/2+6, 55, 200);
                    ctx.fillText("Prix des tickets : "+mapValue[i]['TarifR'],  maxX/2+6, 70, 200);
                    if(mapValue[i]['Total']> 0){
                        ctx.fillText("Recette total : "+mapValue[i]['Total']+" €",  maxX/2 +6, 90, 200);
                    }else {
                        ctx.fillText("Depense total : "+mapValue[i]['Total']+" €",  maxX/2 +6, 90, 200);
                    
                    }
                }
                
                

                break;
            }else {
                ctx.clearRect(maxX/2 -8, 0, 210, 110);
            }
        }
    }

}

