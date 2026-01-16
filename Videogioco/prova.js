let backimg;
let omino;
let omino2;
let x;
let y;
let ferm;

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
    y=550;
    ferm=0;
}

function draw(){//va in loop per il frame rate ridisegna tutto   
    background(backimg); 
    image(omino,x,y);
    if((x+omino.width)>=(backimg.width-1) &&ferm==0 ){
        ferm=1;
    }else{ 
        if(ferm==0){
            x=x+10;
        }else{
            if((x+omino.width)==5 &&ferm==1){
            ferm=0;
            }else{
                if(ferm==1){
                    x=x-10;     
                }
                
              
            }
            
        }
       
    }

    
}

function mouseClicked(){
    background('green');
}
