let backimg;
let imgDx;
let imgSx;
let imgF;
let ferm;
let ostacolo;
let xosta;
let player;

function preload(){//carica le immagini del videogioco
    backimg=loadImage('./img/sfondo.jpg');
    imgF=loadImage('./img/gato.png');
    imgSx=loadImage('./img/gatosinistra.png');
    imgDx=loadImage('./img/gatodestra.png');

}

//setup code (schermata di caricamento)
function setup(){
    createCanvas(backimg.width,backimg.height);
    frameRate(60);
    player=new Player(imgF);
    xosta=800;
    ferm=0;
}
function keyPressed(){
if(player.jumpReady == true){
      if(key == "w "){
        player.vy -= 20;
        player.jump();
      }
    }

    if(key=="a"){
        player.imgShow=imgSx;
        player.moveSx();
    }
    if(key=="d"){
        player.imgShow=imgDx;
        player.moveDx();
    }
    if(key=="s"){
        
    }
}

function draw(){//va in loop per il frame rate ridisegna tutto   
    background(backimg); 
    image(player.imgShow,player.x,player.y);

}

/*function mouseClicked(){
    background('green');
}*/


