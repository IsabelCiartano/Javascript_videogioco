let backimg;
let backimg2;
let pause;
let imgDx;
let imgSx;
let imgF;
let ferm;
let player;
let schemaprec;
let schema;
let start;
let terra=680;

function preload(){//carica le immagini del videogioco
    backimg=loadImage('./img/sfondo1.png');
    backimg2=loadImage('./img/sfondo2.jpg');
    pause=loadImage('./img/pausa.jpeg');
    imgF=loadImage('./img/gato.png');
    imgSx=loadImage('./img/gatosinistra.png');
    imgDx=loadImage('./img/gatodestra.png');
    start=loadImage('./img/start.jpg');

}

//setup code (schermata di caricamento)
function setup(){
    createCanvas(1700,900);
    frameRate(60);
    player=new Player(imgF,100,terra);
   
    ferm=0;
    schema=1;
}
function keyPressed(){

    if(key == "w"){
        player.jump();
      }

    if(key=="a"){
        player.imgShow=imgSx;
        player.moveSx();
    }
    if(key=="d"){
        player.imgShow=imgDx;
        player.moveDx();
    }
 
    if(key=="p" ||key=="Escape"){
        schemaprec=schema;
        schema=0;
    }
    if(key == "q"){
        schema=schemaprec;
    }
    if( schema == 1 &&(key == "s"  || key == " " )){
        schema=schema+1;
    }else{
        schema=schema;
    }
   
}
function mouseClicked() {
    if(schema==1){
        schema=schema+1;
    }
}

function draw(){//va in loop per il frame rate ridisegna tutto 
    if (schema==2)  {
        background(backimg);  
        player.discesa();
     
        image(player.imgShow,player.x,player.y);
        
    }else if(schema==3){
        background(backimg2);
        player.discesa();
        
        image(player.imgShow,player.x,player.y);
        
    }else if (schema == 0 ){
        background(pause);
    }else if (schema == 1){
        background(start);
    }
    if(player.x==1700){
        schema=schema+1;
        player.x=10;
    }
   

}




