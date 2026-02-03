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
let nemico;
let nemico2;
let nemico3;
const nemici=[];

function preload(){//carica le immagini del videogioco
    backimg=loadImage('./img/sfondo1.png');
    backimg2=loadImage('./img/sfondo2.jpg');
    pause=loadImage('./img/pausa.jpeg');
    imgF=loadImage('./img/gato.png');
    imgSx=loadImage('./img/gatosinistra.png');
    imgDx=loadImage('./img/gatodestra.png');
    start=loadImage('./img/start.png');
    imgN=loadImage('./img/gato2.png');
    imgNdx=loadImage('./img/gato2dx.png');
    imgNsx=loadImage('./img/gato2sx.png');

}

//setup code (schermata di caricamento)
function setup(){
    createCanvas(1700,900);
    frameRate(60);
    player=new Player(imgF,100,terra);
    nemico=new Player(imgN,700,terra);
    nemici.push(nemico);
    nemico2=new Player(imgNdx,900,terra);
    nemici.push(nemico2);
    nemico3=new Player(imgNsx,1200,terra);
    nemici.push(nemico3);
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
        for(let n of nemici){
            image(n.imgShow,n.x,n.y);
        }
        
    }else if(schema==3){
        background(backimg2);
        player.discesa();
        
        image(player.imgShow,player.x,player.y);
        
    }else if (schema == 0 ){
        background(pause);
    }else if (schema == 1){
        background(start);
    }
    if(player.x>=1700){
        schema++;
        player.x=10;
    }
   

}




