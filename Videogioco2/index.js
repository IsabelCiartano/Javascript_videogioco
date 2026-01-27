let backimg;
let imgDx;
let imgSx;
let imgF;
let ferm;
let player;
let avatar;
let imgM;

function preload(){//carica le immagini del videogioco
    backimg=loadImage('./img/sfondo.jpg');
    imgF=loadImage('./img/gato.png');
    imgSx=loadImage('./img/gatosinistra.png');
    imgDx=loadImage('./img/gatodestra.png');
    imgM=loadImage('./img/morto.png');
}

//setup code (schermata di caricamento)
function setup(){
    createCanvas(backimg.width,backimg.height);
    frameRate(60);
    player=new Player(imgF,100,600);
    avatar=new Player(imgF,600,600);
   
    ferm=0;
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
  
     if(key == "i"){
        avatar.jump();
      }

    if(key=="j"){
        avatar.imgShow=imgSx;
        avatar.moveSx();
    }
    if(key=="l"){
        avatar.imgShow=imgDx;
        avatar.moveDx();
    }
   
}

function draw(){//va in loop per il frame rate ridisegna tutto   
    background(backimg); 
    player.discesa();
    avatar.discesa();
    image(player.imgShow,player.x,player.y);
    image(avatar.imgShow,avatar.x,avatar.y);
let d = dist(
  player.x + player.w / 2, player.y + player.h / 2,
  avatar.x + avatar.w / 2, avatar.y + avatar.h / 2);


    if (d < (player.w / 2 + avatar.w / 2)) {

        avatar.imgShow = imgM;

        player.collisione = true;
        avatar.collisione = true;
    } else {
        if (player.collisione) {  
            player.imgShow =imgF ;
            player.collisione = false;
        }

        if (avatar.collisione) {
            avatar.collisione = false;
        }
    }

}

//posso vedere un secondo la funzione dist coe si usa 



