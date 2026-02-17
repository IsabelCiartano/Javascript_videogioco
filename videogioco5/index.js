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
let nemico4;
const nemici=[];
const nemici2=[];

// Variabili per il menu di selezione
let personaggioScelto = null;
let personaggio1Img;
let personaggio2Img;
let btnPersonaggio1 = { x: 0, y: 0, w: 300, h: 350 };
let btnPersonaggio2 = { x: 0, y: 0, w: 300, h: 350 };

// Immagini per i personaggi (destra e sinistra)
let pg1Dx, pg1Sx, pg1F;
let pg2Dx, pg2Sx, pg2F;

function preload(){//carica le immagini del videogioco
    backimg=loadImage('./img/sfondo1.png');
    backimg2=loadImage('./img/casa.png');
    pause=loadImage('./img/pausa.png');
    
    // Personaggio 1
    pg1F=loadImage('./img/gato.png');
    pg1Sx=loadImage('./img/gatosinistra.png');
    pg1Dx=loadImage('./img/gatodestra.png');
    
    // Personaggio 2
    pg2F=loadImage('./img/gato2.png');
    pg2Sx=loadImage('./img/gato2sx.png');
    pg2Dx=loadImage('./img/gato2dx.png');
    
    start=loadImage('./img/start.png');
  
    imgNdx=loadImage('./img/nemicoDX.png');
    imgNsx=loadImage('./img/nemicoSX.png');
    imgN2dx=loadImage('./img/lupodx.png');
    imgN2sx=loadImage('./img/luposx.png');
    
    // Assegna le immagini ai personaggi selezionabili
    personaggio1Img = pg1F;
    personaggio2Img = pg2F;
}

//setup code
function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(80);
    
    // Posiziona i bottoni al centro dello schermo
    btnPersonaggio1.x = width/2 - 350;
    btnPersonaggio1.y = height/2 - 125;
    
    btnPersonaggio2.x = width/2 + 50;
    btnPersonaggio2.y = height/2 - 125;
    
    ferm = 0;
    schema = 1;
}

function keyPressed(){
    if(key == "w"){
        player.jump();
    }
    if(key=="a"){
        // Usa le immagini corrette in base al personaggio scelto
        if(personaggioScelto == 1) {
            player.imgShow = pg1Sx;
        } else {
            player.imgShow = pg2Sx;
        }
        player.moveSx();//movimento personaggio a sinistra
    }
    if(key=="d"){
        if(personaggioScelto == 1) {
            player.imgShow = pg1Dx;
        } else {
            player.imgShow = pg2Dx;
        }
        player.moveDx();//movimento personaggio a destra 
    }
    if(key=="p" || key=="Escape"){
        schemaprec=schema;
        schema=0;
    }
    if(key == "q"){//quit dalla schermata di pausa 
        schema=schemaprec;
    }
    if(schema == 1 && (key == "s"  || key == " ")){
        schema=schema+1;
    }
}

function mouseClicked() {

    // Schema 2: selezione personaggio
    if(schema == 2) {
        // Controlla se il click è sul bottone personaggio 1
        if(mouseX >= btnPersonaggio1.x && mouseX <= btnPersonaggio1.x + btnPersonaggio1.w &&
           mouseY >= btnPersonaggio1.y && mouseY <= btnPersonaggio1.y + btnPersonaggio1.h) {
            personaggioScelto = 1;
            iniziaGioco(pg1F, pg1Dx, pg1Sx);//carica il gioco con il personaggio 1
        }
        // Controlla se il click è sul bottone personaggio 2
        if(mouseX >= btnPersonaggio2.x && mouseX <= btnPersonaggio2.x + btnPersonaggio2.w &&
           mouseY >= btnPersonaggio2.y && mouseY <= btnPersonaggio2.y + btnPersonaggio2.h) {
            personaggioScelto = 2;
            iniziaGioco(pg2F, pg2Dx, pg2Sx);//carica gioco con il pg 2
        }
    }
}

function iniziaGioco(immaginePG, imgDxPG, imgSxPG) {
    player = new Player(immaginePG, 100, terra);
    imgF = immaginePG;
    imgDx = imgDxPG;
    imgSx = imgSxPG;
    
    // Inizializza i nemici
    nemico = new Player(imgNdx, 900, terra-100);
    nemico.setupEnemy(700, 1400, imgNdx, imgNsx, 4);
    nemici.push(nemico);
    
    nemico2 = new Player(imgNsx, 1200, terra-100);
    nemico2.setupEnemy(1000, 1700, imgNdx, imgNsx, 2.5);
    nemici.push(nemico2);

    nemico3 = new Player(imgN2dx, 900, terra);
    nemico3.setupEnemy(700, 1400, imgN2dx, imgN2sx, 4);
    nemici2.push(nemico3);

    
    nemico4 = new Player(imgN2sx, 900, terra);
    nemico4.setupEnemy(700, 1400, imgN2dx, imgN2sx, 2.5);
    nemici2.push(nemico4);

    // Passa allo schema di gioco
    schema = 3;
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
    if (schema == 1) {
        background(start);//start
        
    } else if(schema == 2) {
        // Menu di selezione personaggio
        background("pink");
        
        // Titolo
        fill(0);
        stroke(255);
        strokeWeight(4);
        textSize(48);
        textAlign(CENTER);
        text("SCEGLI IL TUO PERSONAGGIO", width/2, height/2 - 200);
        strokeWeight(1);
        
        // Bottone Personaggio 1
        // Controlla se il mouse è sopra il bottone 1
        if(mouseX >= btnPersonaggio1.x && mouseX <= btnPersonaggio1.x + btnPersonaggio1.w &&
           mouseY >= btnPersonaggio1.y && mouseY <= btnPersonaggio1.y + btnPersonaggio1.h) {
            fill(100, 200, 255); // Colore hover
            cursor(HAND);
        } else {
            fill(150, 150, 255);
        }
        stroke(0);
        strokeWeight(3);
        rect(btnPersonaggio1.x, btnPersonaggio1.y, btnPersonaggio1.w, btnPersonaggio1.h, 10);
        
        // Immagine personaggio 1
        image(personaggio1Img, btnPersonaggio1.x + 50, btnPersonaggio1.y + 50, 200, 200);
        
        // Testo sotto l'immagine
        fill(255);
        stroke(0);
        strokeWeight(3);
        textSize(28);
        text("GATTO 1", btnPersonaggio1.x + btnPersonaggio1.w/2, btnPersonaggio1.y + 400);
        
        // Bottone Personaggio 2
        // Controlla se il mouse è sopra il bottone 2
        if(mouseX >= btnPersonaggio2.x && mouseX <= btnPersonaggio2.x + btnPersonaggio2.w &&
           mouseY >= btnPersonaggio2.y && mouseY <= btnPersonaggio2.y + btnPersonaggio2.h) {
            fill(255, 200, 100); // Colore hover
            cursor(HAND);
        } else {
            fill(255, 150, 150);
        }
        stroke(0);
        strokeWeight(3);
        rect(btnPersonaggio2.x, btnPersonaggio2.y, btnPersonaggio2.w, btnPersonaggio2.h, 10);
        
        // Immagine personaggio 2
        image(personaggio2Img, btnPersonaggio2.x + 50, btnPersonaggio2.y + 50, 200, 200);
        
        // Testo sotto l'immagine
        fill(255);
        stroke(0);
        strokeWeight(3);
        textSize(28);
        text("GATTO 2", btnPersonaggio2.x + btnPersonaggio2.w/2, btnPersonaggio2.y + 400);
        
        // Reset cursor se non sopra nessun bottone
        if(!(mouseX >= btnPersonaggio1.x && mouseX <= btnPersonaggio1.x + btnPersonaggio1.w &&
             mouseY >= btnPersonaggio1.y && mouseY <= btnPersonaggio1.y + btnPersonaggio1.h) &&
           !(mouseX >= btnPersonaggio2.x && mouseX <= btnPersonaggio2.x + btnPersonaggio2.w &&
             mouseY >= btnPersonaggio2.y && mouseY <= btnPersonaggio2.y + btnPersonaggio2.h)) {
            cursor(ARROW);
        }
        
    } else if (schema==3) {
        background(backimg); 
        fill(255);
        textSize(30);
        text("Livello 1",70,50);
        player.discesa();
     
        // Muovi e disegna i nemici
        for(let n of nemici){
            n.moveDXSX(); // Movimento automatico del nemico
            image(n.imgShow, n.x, n.y);
        }
        
        image(player.imgShow, player.x, player.y);
        
        // Gestisci collisioni
        for(let i = nemici.length - 1; i >= 0; i--){
            if(collisioneDallAlto(player, nemici[i])){
                player.speedY = -player.jumpHeight / 1.5;
                nemici.splice(i, 1);
            }
        }
        
        if(player.x>=1700){
            schema++;
            player.x=10;
        }
        
    } else if(schema==4){
        background(backimg2); 
        fill(255);
        textSize(30);
        text("Livello 2",80,40);
        player.discesa();
     
        // Muovi e disegna i nemici
        for(let n of nemici2){
            n.moveDXSX(); // Movimento automatico del nemico
            image(n.imgShow, n.x, n.y);
        }
        
        image(player.imgShow, player.x, player.y);
        
        // Gestisci collisioni
        for(let i = nemici2.length - 1; i >= 0; i--){
            if(collisioneDallAlto(player, nemici2[i])){
                player.speedY = -player.jumpHeight / 1.5;
                nemici2.splice(i, 1);
            }
        }
        
        if(player.x>=1700){
            schema++;
            player.x=10;
        }
        
    } else if (schema == 0){
        background(pause);
    }
}




