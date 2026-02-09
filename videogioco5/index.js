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
    pause=loadImage('./img/pausa.png');
    imgF=loadImage('./img/gato.png');
    imgSx=loadImage('./img/gatosinistra.png');
    imgDx=loadImage('./img/gatodestra.png');
    start=loadImage('./img/start.png');
    imgN=loadImage('./img/gato2.png');
    imgNdx=loadImage('./img/nemicoDX.png');
    imgNsx=loadImage('./img/nemicoSX.png');

}

//setup code (schermata di caricamento)
function setup(){
    createCanvas(1710,900);
    frameRate(60);
    player=new Player(imgF,100,terra);
    nemico=new Player(imgN,700,terra);
    nemici.push(nemico);
    nemico2=new Player(imgNdx,900,terra-100);
    nemici.push(nemico2);
    nemico3=new Player(imgNsx,1200,terra-100);
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
function collisioneDallAlto(player, nemico){
    let pw = player.imgShow.width;
    let ph = player.imgShow.height;
    let nw = nemico.imgShow.width;
    let nh = nemico.imgShow.height;

    let playerBottom = player.y + ph;
    let nemicoTop = nemico.y;

    return (
        player.x < nemico.x + nw &&
        player.x + pw > nemico.x &&
        playerBottom >= nemicoTop &&
        playerBottom <= nemicoTop + 20 && // margine
        player.speedY > 0               // STA CADENDO
    );
}



function draw(){//va in loop per il frame rate ridisegna tutto 
    if (schema==2)  {
        background(backimg);  
        player.discesa();
     
        image(player.imgShow,player.x,player.y);
        for(let n of nemici){
            image(n.imgShow,n.x,n.y);
        }
     for(let i = nemici.length - 1; i >= 0; i--){
    if(collisioneDallAlto(player, nemici[i])){
        player.speedY = -player.jumpHeight / 1.5; // rimbalzo
        nemici.splice(i, 1);
    }
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




