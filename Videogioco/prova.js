let backimg;
let omino=[];
let omino2;
let x;
let y;
let ferm;
let indice=0;
let ostacolo;
let xosta;

function preload(){//carica le immagini del videogioco
    backimg=loadImage('./img/sfondo.jpg');
    omino[0]=loadImage('./img/gato.png');
    omino[1]=loadImage('./img/gatosinistra.png');
    omino[2]=loadImage('./img/gatodestra.png');
    ostacolo=loadImage('./img/gato2.png');

}

//setup code (schermata di caricamento)
function setup(){
    createCanvas(backimg.width,backimg.height);
   // createCanvas(800,600);grandezza schermo videogioco (lunghezza, altezza)
    frameRate(20);//numero fotogrammi al secondo
    x=5;
    y=550;
    xosta=800;

    ferm=0;
}

function draw(){//va in loop per il frame rate ridisegna tutto   
    background(backimg); 
    image(omino[indice],x,y);
    
   
    if((x+omino[indice].width)>=(backimg.width-1) &&ferm==0 ){ferm=1;}else{ 
        if(ferm==0){x=x+10;indice=2; 
        }else{if((x+omino[indice].width)==5 &&ferm==1){ferm=0;}else{
                if(ferm==1){
                    x=x-10; 
                    indice=1;
                    if(x<=10){ x=x+10; ferm=0;}}}}}
}

function mouseClicked(){
    background('green');
}
