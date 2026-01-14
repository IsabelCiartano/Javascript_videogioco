let backimg;
let omino;
let omino2;
let x;

function preload(){//carica le immagini del videogioco
    backimg=loadImage('./img/sfondo.jpg');
    omino=loadImage('./img/gato.png');
    omino2=loadImage('./img/gatosinistra.png')

}

//setup code (schermata di caricamento)
function setup(){
    createCanvas(backimg.width,backimg.height);
   // createCanvas(800,600);grandezza schermo videogioco (lunghezza, altezza)
    frameRate(20);//numero fotogrammi al secondo
    x=5;
}

function draw(){
    background(backimg);
    image(omino,x,400);
    x=x+10;
}

function mouseClicked(){
    background('green');
}
