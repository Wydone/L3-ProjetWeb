//Var that i need in draw/load graphe + draw tooltip
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
var typeCategorie ; 

var pleinTarif = 15; 
var tarifReduit = 10; 

//variable that i need in the tooltip draw function
var map ; 
var mapValue ;
var maxX ;
var maxY ;
var minX ;
var minY ;

//Main 
function main(){
    $(document).ready(function() {

        var btn_compagnie  = document.getElementById("btn_radio1");
        var btn_lieu  = document.getElementById("btn_radio2");
        var btn_representation  = document.getElementById("btn_radio3");

        //Default print 
        typeCategorie = "compagnie";  
        console.log(typeCategorie)
        $.get('data/ResultatsFestivalTEMP.csv', function(csvFile) {
            myCategories = new Array
            parseDataCSV(csvFile);
        });

        btn_compagnie.addEventListener('change', function(){
            typeCategorie = "compagnie";  
            console.log(typeCategorie)
            $.get('data/ResultatsFestivalTEMP.csv', function(csvFile) {
                myCategories = new Array
                parseDataCSV(csvFile);
            });
        }); 
        btn_lieu.addEventListener('change', function(){
            typeCategorie = "lieu";  
            console.log(typeCategorie)
            $.get('data/ResultatsFestivalTEMP.csv', function(csvFile) {
                myCategories = new Array
                parseDataCSV(csvFile);
            });
        }); 
        btn_representation.addEventListener('change', function(){
            typeCategorie = "representation"; 
            console.log(typeCategorie) 
            $.get('data/ResultatsFestivalTEMP.csv', function(csvFile) {
                myCategories = new Array
                parseDataCSV(csvFile);
            });
        }); 
    });
}

// parse la data du csv et initialise les différentes listes avec les data du csv
function parseDataCSV(csvFile) {
    console.log("APPEL DE PARSECSVDATA"); 

    var data = []; 
    var lines = csvFile.split('\n'); 
    var re = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/  //Regex expression
    
    $.each(lines, function(lineNumero, line){
        
        if(lineNumero != 0 && line != ''){
            var items = line.split(re); 
           
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

            if(typeCategorie == "compagnie"){
                if(! myCategories.includes(Compagnie)){
                    console.log(Compagnie + " à la ligne : "+(lineNumero+1))
                    myCategories.push(Compagnie); 
                }
            }else if (typeCategorie =="lieu"){
                if(! myCategories.includes(Lieu)){
                    myCategories.push(Lieu); 
                }
            }else{
                if(! myCategories.includes(Titre)){
                    myCategories.push(Titre); 
                }
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
                if(typeCategorie == "compagnie"){
                    if(myCategories[i] == Compagnie){
                        allData[0][i] += parseInt(P) ; // = P de la catégorie
                        allData[1][i] += parseInt(SA) ; // = P de la catégorie
                        allData[2][i] += parseInt(R) ; // = P de la catégorie
                        allData[3][i] += parseInt(SJ) ; // = P de la catégorie
                    }
                }else if(typeCategorie == "lieu"){
                    if(myCategories[i] == Lieu){
                        allData[0][i] += parseInt(P) ; // = P de la catégorie
                        allData[1][i] += parseInt(SA) ; // = P de la catégorie
                        allData[2][i] += parseInt(R) ; // = P de la catégorie
                        allData[3][i] += parseInt(SJ) ; // = P de la catégorie
                    }
                }else {
                    if(myCategories[i] == Titre){
                        allData[0][i] += parseInt(P) ; // = P de la catégorie
                        allData[1][i] += parseInt(SA) ; // = P de la catégorie
                        allData[2][i] += parseInt(R) ; // = P de la catégorie
                        allData[3][i] += parseInt(SJ) ; // = P de la catégorie
                    }
                }
               
                
            }
        }
    });


    /*
    console.log(myCategories); 
    console.log(myItemNames); 
    console.log(allData);
    console.log(allData[]);
    */

    drawChart();  // call function -> draw graphe   
    drawTooltip(); // call function -> draw tooltip
     
}

function drawChart(){
   		
    canvas = document.getElementById("myCanvas");
    canvas.width = 800;
    canvas.height = 800;
	ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000;"
    
    maxX = canvas.width -70;
	maxY = canvas.height -370;
	minX = 70;
    minY = 70;

    map = new Array; 
    mapValue = new Array;


    //Initialisation de la val max de notre graphe pour déterminer l'echelle du graphe
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
    //Horizontal Axis -> DRAW
        ctx.lineWidth=2.0;
        ctx.lineCap = 'round';
        ctx.moveTo(minX,maxY);
        ctx.lineTo(maxX,maxY);

    //Horizontal Axis Arrow -> DRAW
        ctx.moveTo(maxX-10,maxY-5);
        ctx.lineTo(maxX,maxY);
        ctx.lineTo(maxX-10,maxY+5);

    //Vertical Axis -> DRAW
        ctx.moveTo(minX,maxY+160); 
        ctx.lineTo(minX,minY);

    //Vertical Axis Arrow -> DRAW
        ctx.moveTo(minX-5,minY+10);
        ctx.lineTo(minX,minY);
        ctx.lineTo(minX+5,minY+10);
    ctx.stroke();
    

    //Min Ticks DRAW lines
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

    var space = Math.trunc(maxX / (2*((myCategories.length) +2)) ); 

    //ADD valeurs dans mon map qui permet de stoker toutes les valuers des positions de tout mes rectangles de mon chart
    map.push({x : 0, y : 0, w : 0, h : 0})
    var mapValueTmp = {}
    mapValue.push(mapValueTmp)

    //ADD legende   
    ctx.save();
        ctx.strokeRect(maxX-200, 0, 210, 62);
        ctx.fillStyle = "red"
        ctx.fillRect(maxX-190, 6, 20, 20)
        ctx.fillStyle = "black"
        ctx.fillText("Recette/Depenses Plein tarifs",  maxX-190 +26, 20, 200);

        ctx.fillStyle = "blue"
        ctx.fillRect(maxX-190, 36, 20, 20)
        ctx.fillStyle = "black"
        ctx.fillText("Recette/Depenses tarifs Réduit",  maxX-190 +26, 50, 200);
    ctx.restore();



    for (let i =0; i<myCategories.length; i++){

        var valuePleinTarif = (allData[0][i]*15*0.1) - (allData[1][i]*15);
        var valueTarifReduit = (allData[2][i]*15*0.1) - (allData[3][i]*15); 

    //Add the lablel for the X Axis
        ctx.save();
            ctx.fillStyle = "black"
            ctx.textAlign = 'right';
            ctx.translate(minX+(space*i*2),maxY+270);
            ctx.rotate(-Math.PI / 2.8);
            ctx.fillText(myCategories[i],120, 0);
        ctx.restore();
    
    
        //console.log("P = "+valuePleinTarif+", R = "+valueTarifReduit+"value total : "+(valuePleinTarif+valueTarifReduit));
       
        // ajout des différent rectangle en fonction de mes données
        ctx.fillStyle = "red"
        ctx.fillRect(minX+(space*i*2)+space,maxY-((valuePleinTarif/maximumYValue)*maxHeight),space,(valuePleinTarif/maximumYValue)*maxHeight-1);
        
        //Ajout des coordonnées dans ma MAP array (coordonnées de mes rectangles) et des valeurs dans mapValue (stocker les valeurs de chaque rectngles)
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
        if(valueTarifReduit < 0 && valuePleinTarif > 0){ //Test pour avoir un affichage propre

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
    }
}

function drawTooltip() {
    console.log(map)
    canvas.onmousemove = function(e) {
        // Get the current mouse position
        var r = canvas.getBoundingClientRect(),
            x = e.clientX - r.left, y = e.clientY - r.top;
            
    
        for(var i = 0; i < map.length; i++) {
            b = map[i];
            if((x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) ||
                (x >= b.x && x <= b.x + b.w && y <= b.y && y >= b.y + b.h) ) {
                // The mouse honestly hits the rect then creat the tooltip

                if(i % 2 != 0){

                    //  ctx.beginPath();
                      ctx.strokeStyle = "balck";
                      ctx.fillStyle = "#DCDCDC";
                      
                      ctx.lineWidth = 2;
                      ctx.fillRect(x+10, y, 190, -100);
                      ctx.strokeRect(x+10, y, 190, -100);
  
                      ctx.font="12px Helvetica";
                      ctx.fillStyle = "black";
  
                      if(mapValue[i]['Total']> 0){

                        ctx.fillText("RECETTES PLEIN TARIF",  x+10 +6, y-80);
                        ctx.fillText("Nombre de ticket plein tarif : "+mapValue[i]['P'],  x+10+6, y-60);
                        ctx.fillText("Nombre de ticket SA : "+mapValue[i]['SA'],  x+10+6, y-45);
                        ctx.fillText("Prix des tickets : "+mapValue[i]['TarifP'],  x+10+6, y-30);
                      
                        ctx.fillText("Recette total : "+mapValue[i]['Total']+" €",  x+10+6, y-10);
                    }else {

                          ctx.fillText("DEPENSES PLEIN TARIF",  x+10 +6, y-80);
                          ctx.fillText("Nombre de ticket plein tarif : "+mapValue[i]['P'],  x+10+6,y-60);
                          ctx.fillText("Nombre de ticket SA : "+mapValue[i]['SA'],  x+10+6, y-45);
                          ctx.fillText("Prix des tickets : "+mapValue[i]['TarifP'],  x+10+6, y-30);
                      
                          ctx.fillText("Depense total : "+mapValue[i]['Total']+" €",  x+10+6, y-10);
                      
                    } 
                }else{
                    ctx.strokeStyle = "balck";
                    ctx.fillStyle = "#DCDCDC";
                    
                        
                    ctx.lineWidth = 2;
                    ctx.fillRect(x+10, y, 190, -100);
                    ctx.strokeRect(x+10, y, 190, -100);

                    ctx.font="12px Helvetica";
                    ctx.fillStyle = "black";
                   
                    if(mapValue[i]['Total']> 0){
                          ctx.fillText("RECETTES TARIF REDUIT",  x+10 +6, y-80);
                          ctx.fillText("Nombre de ticket tarif reduit : "+mapValue[i]['R'],  x+10+6, y-60);
                          ctx.fillText("Nombre de ticket SJ : "+mapValue[i]['SJ'],  x+10+6, y-45);
                          ctx.fillText("Prix des tickets : "+mapValue[i]['TarifR'],  x+10+6, y-30);
                      
                          ctx.fillText("Recette total : "+mapValue[i]['Total']+" €",  x+10+6, y-10);
                      }else {
                          ctx.fillText("DEPENSES TARIF REDUIT", x+10+6, y-80);
                          ctx.fillText("Nombre de ticket tarif reduit : "+mapValue[i]['R'],  x+10+6, y-60);
                          ctx.fillText("Nombre de ticket SJ : "+mapValue[i]['SJ'],  x+10+6, y-45);
                          ctx.fillText("Prix des tickets : "+mapValue[i]['TarifR'],  x+10+6, y-30);
                      
                          ctx.fillText("Depense total : "+mapValue[i]['Total']+" €",  x+10+6, y-10);
                      
                      }
                  }
                  
                
                break;
            }else {
                tooltip = false;
                ctx.clearRect(0,0, canvas.width, canvas.height);
                drawChart();
                
              
            }

        }
        
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

