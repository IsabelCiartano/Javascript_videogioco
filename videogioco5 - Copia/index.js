let backimg;
let backimg2;
let backimg3;
let gameover;
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
let nemico5;
const nemici=[];
const nemici2=[];
const nemici3=[];

//  Vite e invincibilità ----
let vite = 3;
let invincibile = false;
let invincibileTimer = 0;
const INVINCIBILE_DURATA = 90; // frame (~1 secondo a 80fps)


// Variabili per il menu di selezione
let personaggioScelto = null;
let personaggio1Img;
let personaggio2Img;
let btnPersonaggio1 = { x: 0, y: 0, w: 300, h: 350 };
let btnPersonaggio2 = { x: 0, y: 0, w: 300, h: 350 };

// Immagini per i personaggi (destra e sinistra)
let pg1Dx, pg1Sx, pg1F;
let pg2Dx, pg2Sx, pg2F;

//piattaforme
const piattaformeLv2 = [
  { x: 400, y: terra - 100, w: 450, h: 20 },  // piattaforma 1, raggiungibile da terra
  { x: 800, y: terra - 200, w: 250, h: 20 }   // piattaforma 2, raggiungibile solo dalla 1
];
const piattaformeLv2_2 = [
  { x: 900, y: terra - 100, w: 400, h: 20 },  // piattaforma 1, raggiungibile da terra
  { x: 1400, y: terra - 200, w: 240, h: 20 }   // piattaforma 2, raggiungibile solo dalla 1
];

function preload(){
    backimg=loadImage('./img/sfondo1.png');
    backimg2=loadImage('./img/casa.png');
    backimg3=loadImage('./img/casa2.png');
    pause=loadImage('./img/pausa.png');
    gameover=loadImage('./img/gameover.png');
    
    pg1F=loadImage('./img/gato.png');
    pg1Sx=loadImage('./img/gatosinistra.png');
    pg1Dx=loadImage('./img/gatodestra.png');
    
    pg2F=loadImage('./img/gato2.png');
    pg2Sx=loadImage('./img/gato2sx.png');
    pg2Dx=loadImage('./img/gato2dx.png');
    
    start=loadImage('./img/start.png');
  
    imgNdx=loadImage('./img/nemicoDX.png');
    imgNsx=loadImage('./img/nemicoSX.png');
    imgN2dx=loadImage('./img/lupodx.png');
    imgN2sx=loadImage('./img/luposx.png');
    
    personaggio1Img = pg1F;
    personaggio2Img = pg2F;
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(80);
    
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
        if(personaggioScelto == 1) {
            player.imgShow = pg1Sx;
        } else {
            player.imgShow = pg2Sx;
        }
        player.moveSx();
    }
    if(key=="d"){
        if(personaggioScelto == 1) {
            player.imgShow = pg1Dx;
        } else {
            player.imgShow = pg2Dx;
        }
        player.moveDx();
    }
    if(key=="p" || key=="Escape"){
        schemaprec=schema;
        schema=0;
    }
    if(key == "q"){
        schema=schemaprec;
    }
    if(schema == 1 && (key == "s" || key == " ")){
        schema=schema+1;
    }
    if(key == "r" || key == "R"){
    if(schema == 99){
        nemici.length = 0;
        nemici2.length = 0;
        schema = 1;
    }
}
}

function mouseClicked() {
    if(schema == 2) {
        if(mouseX >= btnPersonaggio1.x && mouseX <= btnPersonaggio1.x + btnPersonaggio1.w &&
           mouseY >= btnPersonaggio1.y && mouseY <= btnPersonaggio1.y + btnPersonaggio1.h) {
            personaggioScelto = 1;
            iniziaGioco(pg1F, pg1Dx, pg1Sx);
        }
        if(mouseX >= btnPersonaggio2.x && mouseX <= btnPersonaggio2.x + btnPersonaggio2.w &&
           mouseY >= btnPersonaggio2.y && mouseY <= btnPersonaggio2.y + btnPersonaggio2.h) {
            personaggioScelto = 2;
            iniziaGioco(pg2F, pg2Dx, pg2Sx);
        }
    }
}

function iniziaGioco(immaginePG, imgDxPG, imgSxPG) {
    player = new Player(immaginePG, 100, terra);
    imgF = immaginePG;
    imgDx = imgDxPG;
    imgSx = imgSxPG;
    
    //  reset vite all'inizio ----
    vite = 3;
    invincibile = false;
    invincibileTimer = 0;
    
    
    nemico = new Player(imgNdx, 900, terra-100);
    nemico.setupEnemy(700, 1400, imgNdx, imgNsx, 4);
    nemici.push(nemico);
    
    nemico2 = new Player(imgNsx, 1200, terra-100);
    nemico2.setupEnemy(1000, 1700, imgNdx, imgNsx, 2.5);
    nemici.push(nemico2);

    nemico3 = new Player(imgN2dx, 900, terra);
    nemico3.setupEnemy(600, 1100, imgN2dx, imgN2sx, 4);
    nemici2.push(nemico3);

    nemico4 = new Player(imgN2sx, 300, terra);
    nemico4.setupEnemy(200, 700, imgN2dx, imgN2sx, 2.5);
    nemici3.push(nemico4);

    nemico5=new Player(imgN2dx,300,terra);
    nemico5.setupEnemy(300,900,imgN2dx,imgN2sx,5);
    nemici3.push(nemico5);

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
        playerBottom <= nemicoTop + 20 &&
        player.speedY > 0
    );
}

// Collisione laterale ----
function collisioneLaterale(player, nemico){
    // Se c'è già collisione dall'alto, non conta come laterale
    if(collisioneDallAlto(player, nemico)) return false;

    let pw = player.imgShow.width;
    let ph = player.imgShow.height;
    let nw = nemico.imgShow.width;
    let nh = nemico.imgShow.height;

    // Semplice AABB (rettangoli che si sovrappongono)
    return (
        player.x < nemico.x + nw &&
        player.x + pw > nemico.x &&
        player.y < nemico.y + nh &&
        player.y + ph > nemico.y
    );
}

// Disegna i cuori delle vite ----
function disegnaVite(){
    let cuoreSize = 35;
    let marginX = 20;
    let marginY = 20;
    
    for(let i = 0; i < 3; i++){
        if(i < vite){
            fill(255, 0, 0);   // cuore pieno = vita rimasta
        } else {
            fill(80, 80, 80);  // cuore grigio = vita persa
        }
        noStroke();
        // Disegna un cuore semplice con una cerchio + testo ♥
        textSize(cuoreSize);
        textAlign(LEFT);
        text("♥", marginX + i * (cuoreSize + 10), marginY + cuoreSize);
    }
    
    // Ripristina allineamento testo
    textAlign(LEFT);
    stroke(0);
}

function draw(){
    if (schema == 1) {
        background(start);
        
    } else if(schema == 2) {
        background("pink");
        
        fill(0);
        stroke(255);
        strokeWeight(4);
        textSize(48);
        textAlign(CENTER);
        text("SCEGLI IL TUO PERSONAGGIO", width/2, height/2 - 200);
        strokeWeight(1);
        
        if(mouseX >= btnPersonaggio1.x && mouseX <= btnPersonaggio1.x + btnPersonaggio1.w &&
           mouseY >= btnPersonaggio1.y && mouseY <= btnPersonaggio1.y + btnPersonaggio1.h) {
            fill(100, 200, 255);
            cursor(HAND);
        } else {
            fill(150, 150, 255);
        }
        stroke(0);
        strokeWeight(3);
        rect(btnPersonaggio1.x, btnPersonaggio1.y, btnPersonaggio1.w, btnPersonaggio1.h, 10);
        image(personaggio1Img, btnPersonaggio1.x + 50, btnPersonaggio1.y + 50, 200, 200);
        fill(255);
        stroke(0);
        strokeWeight(3);
        textSize(28);
        text("GATTO 1", btnPersonaggio1.x + btnPersonaggio1.w/2, btnPersonaggio1.y + 400);
        
        if(mouseX >= btnPersonaggio2.x && mouseX <= btnPersonaggio2.x + btnPersonaggio2.w &&
           mouseY >= btnPersonaggio2.y && mouseY <= btnPersonaggio2.y + btnPersonaggio2.h) {
            fill(255, 200, 100);
            cursor(HAND);
        } else {
            fill(255, 150, 150);
        }
        stroke(0);
        strokeWeight(3);
        rect(btnPersonaggio2.x, btnPersonaggio2.y, btnPersonaggio2.w, btnPersonaggio2.h, 10);
        image(personaggio2Img, btnPersonaggio2.x + 50, btnPersonaggio2.y + 50, 200, 200);
        fill(255);
        stroke(0);
        strokeWeight(3);
        textSize(28);
        text("GATTO 2", btnPersonaggio2.x + btnPersonaggio2.w/2, btnPersonaggio2.y + 400);
        
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
        text("Livello 1",300,50);
        player.discesa();
     
        for(let n of nemici){
            n.moveDXSX();
            image(n.imgShow, n.x, n.y);
        }
        
        // effetto lampeggio quando invincibile ----
        if(!invincibile || frameCount % 8 < 4){
            image(player.imgShow, player.x, player.y);
        }
        
        // Collisione dall'alto (elimina nemico)
        for(let i = nemici.length - 1; i >= 0; i--){
            if(collisioneDallAlto(player, nemici[i])){
                player.speedY = -player.jumpHeight / 1.5;
                nemici.splice(i, 1);
            }
        }
        
        // Collisione laterale (perde vita) ----
        if(!invincibile){
            for(let i = 0; i < nemici.length; i++){
                if(collisioneLaterale(player, nemici[i])){
                    vite--;
                    invincibile = true;
                    invincibileTimer = INVINCIBILE_DURATA;
                    if(vite <= 0){
                        schema = 99; // Game Over
                    }
                    break; // Un colpo alla volta
                }
            }
        }
        
        
        // aggiorna timer invincibilità ----
        if(invincibile){
            invincibileTimer--;
            if(invincibileTimer <= 0){
                invincibile = false;
            }
        }
      
        
        // disegna i cuori ----
        disegnaVite();
        
        if(player.x>=1700){
            schema++;
            player.x=10;
        }
        
    } else if(schema==4){//livello 2
          background(backimg2); 
         // Disegna piattaforme livello 2 ----
    disegnaPiattaforme(piattaformeLv2);
    gestisciPiattaforme(player, piattaformeLv2);
      
        fill(255);
        textSize(30);
        text("Livello 2",300,40);
        player.discesa();
     
        for(let n of nemici2){
            n.moveDXSX();
            image(n.imgShow, n.x, n.y);
        }
        
        if(!invincibile || frameCount % 8 < 4){
            image(player.imgShow, player.x, player.y);
        }
        
        for(let i = nemici2.length - 1; i >= 0; i--){
            if(collisioneDallAlto(player, nemici2[i])){
                player.speedY = -player.jumpHeight / 1.5;
                nemici2.splice(i, 1);
            }
        }
        
        if(!invincibile){
            for(let i = 0; i < nemici2.length; i++){
                if(collisioneLaterale(player, nemici2[i])){
                    vite--;
                    invincibile = true;
                    invincibileTimer = INVINCIBILE_DURATA;
                    if(vite <= 0){
                        schema = 99; // Game Over
                    }
                    break;
                }
            }
        }
        if(invincibile){
            invincibileTimer--;
            if(invincibileTimer <= 0){
                invincibile = false;
            }
        }
        
        disegnaVite();
        
        if(player.x>=1700){
            schema++;
            player.x=10;
        }
        
    } else if (schema == 0){
        background(pause);
        
    // schermata Game Over 
    } else if(schema == 99){
        background(gameover);
      
    }else if (schema ==5){
         background(backimg3); 
          // Disegna piattaforme livello 2.1 ----
    disegnaPiattaforme(piattaformeLv2_2);
    gestisciPiattaforme(player, piattaformeLv2_2);
       
        fill(255);
        textSize(30);
        text("Livello 2",300,40);
        player.discesa();
     
        for(let n of nemici3){
            n.moveDXSX();
            image(n.imgShow, n.x, n.y);
        }
        
        if(!invincibile || frameCount % 8 < 4){
            image(player.imgShow, player.x, player.y);
        }
        
        for(let i = nemici3.length - 1; i >= 0; i--){
            if(collisioneDallAlto(player, nemici3[i])){
                player.speedY = -player.jumpHeight / 1.5;
                nemici3.splice(i, 1);
            }
        }
        
        if(!invincibile){
            for(let i = 0; i < nemici3.length; i++){
                if(collisioneLaterale(player, nemici3[i])){
                    vite--;
                    invincibile = true;
                    invincibileTimer = INVINCIBILE_DURATA;
                    if(vite <= 0){
                        schema = 99; // Game Over
                    }
                    break;
                }
            }
        }
        if(invincibile){
            invincibileTimer--;
            if(invincibileTimer <= 0){
                invincibile = false;
            }
        }
        
        disegnaVite();
        
        if(player.x>=1700){
            schema++;
            player.x=10;
        }
        
    }

}
//piattaforme 
function disegnaPiattaforme(piattaforme) {
  fill(139, 90, 43);
  stroke(80, 50, 10);
  strokeWeight(2);
  for (let p of piattaforme) {
    rect(p.x, p.y, p.w, p.h, 4);
  }
}
// Gestione collisione con piattaforme ---- 
// Il player si appoggia sopra la piattaforma se ci cade dall'alto
function gestisciPiattaforme(player, piattaforme) {
  let ph = player.imgShow.height;
  let pw = player.imgShow.width;
  player.sullaTerraPiattaforma = false;
  for (let p of piattaforme) {
    let playerBottom = player.y + ph;
    let prevBottom = playerBottom - player.speedY;
    // Il player deve arrivare dall'alto sulla piattaforma ----
    if (
      player.x + pw > p.x &&
      player.x < p.x + p.w &&
      prevBottom <= p.y &&
      playerBottom >= p.y &&
      player.speedY >= 0
    ) {
      player.y = p.y - ph;
      player.speedY = 0;
      player.sullaTerraPiattaforma = true;
    }
  }
}





