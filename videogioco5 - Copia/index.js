let backimg;
let backimg2;
let backimg3;
let backimg4;
let backimg5;
let gameover;
let pause;
let imgDx;
let imgSx;
let imgF;
let ferm;
let player;
let schemaprec=1;
let schema;
let start;
let terra=680;
let nemico;
let nemico2;
let nemico3;
let nemico4;
let nemico5;
let nemico6;
let nemico7;
let nemico8;
let nemico9;
const nemici=[];
const nemici2=[];
const nemici3=[];
const nemici4=[];
let nemici5=[];

//  Vite e invincibilità 
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
  { x: 990, y: terra - 120, w: 500, h: 20 },  // piattaforma 1, raggiungibile da terra
  { x: 1200, y: terra - 300, w: 400, h: 20 }   // piattaforma 2, raggiungibile solo dalla 1
];
const piattaformeLv3=[
    {x:200,y:terra-120,w:300,h:20},
    {x:480,y:terra-300,w:400,h:20},
    {x:1200,y:terra-120,w:200,h:20}
]
const piattaformeLv3_2=[
    {x:600,y:terra-120,w:300,h:20},
    {x:900,y:terra-300,w:300,h:20},
    {x:1200,y:terra-120,w:200,h:20}
]
//pulsanti regole 
let btnRulesX, btnRulesY, btnRulesW, btnRulesH;
//monete 
let punteggio = 0;
let monete = [];
let moneta 
 
function preload(){
    backimg=loadImage('./img/sfondo1.png');
    backimg2=loadImage('./img/casa.png');
    backimg3=loadImage('./img/casa2.png');
    backimg4=loadImage('./img/cuccia.png');
    backimg5=loadImage('./img/cuccia2.png');
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
    moneta=loadImage('./img/moneta.png');
    
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
//funzione crea monete 
function creaMonete() {
    monete = [];
    // posizione monete nei vari livelli 
    let posizioniMonete = [
        {x: 300, y: terra - 50},
        {x: 600, y: terra - 50},
        {x: 1200, y: terra - 50},
        {x: 1500, y: terra - 50},
    ];
    for (let pos of posizioniMonete) {
        monete.push({ x: pos.x, y: pos.y, w: 25, h: 25, presa: false });
    }
}
function creaMoneteLv2() {
    monete = [];
    let posizioniMonete = [
        {x: 300, y: terra - 50},
        {x: 1200, y: terra - 50},
        {x: 450, y: terra - 150},  
        {x: 820, y: terra - 250},
    ];
    for (let pos of posizioniMonete) {
        monete.push({ x: pos.x, y: pos.y, w: 25, h: 25, presa: false });
    }
}
function creaMoneteLv2_2() {
    monete = [];
    let posizioniMonete = [
        {x: 300, y: terra - 50},
        {x:500,y:terra-50},
        {x: 890, y: terra - 50},
        {x: 1000, y: terra - 150}, 
        {x: 1500, y: terra - 350},
    ];
    for (let pos of posizioniMonete) {
        monete.push({ x: pos.x, y: pos.y, w: 25, h: 25, presa: false });
    }
}
function creaMoneteLv3() {
    monete = [];
    let posizioniMonete = [
        {x: 300, y: terra - 50},
        {x: 400, y: terra - 200},
        {x: 800, y: terra - 400},
        {x: 1000, y: terra - 50}, 
        {x: 1300, y: terra - 200},
    ];
    for (let pos of posizioniMonete) {
        monete.push({ x: pos.x, y: pos.y, w: 25, h: 25, presa: false });
    }
}
function creaMoneteLv3_2() {
    monete = [];
    let posizioniMonete = [
        {x: 300, y: terra - 50},
        {x: 900, y: terra - 400},
        {x: 1000, y: terra - 50}, 
    ];
    for (let pos of posizioniMonete) {
        monete.push({ x: pos.x, y: pos.y, w: 25, h: 25, presa: false });
    }
}
//funzione per disegnare e raccogliere le monete 
function gestisciMonete() {
    for (let m of monete) {
        if (m.presa) continue;
        
        // Disegna moneta
       image(moneta,m.x,m.y);
        
        // Collisione con player
        let pw = player.imgShow.width;
        let ph = player.imgShow.height;
        if (player.x < m.x + m.w/2 &&
            player.x + pw > m.x - m.w/2 &&
            player.y < m.y + m.h/2 &&
            player.y + ph > m.y - m.h/2) {
            m.presa = true;
            punteggio += 10;
        }
    }
}

//disegna il punteggio 
function disegnaPunteggio() {
    fill(255, 215, 0);
    stroke(150, 100, 0);
    strokeWeight(2);
    textSize(28);
    textAlign(RIGHT);
    text("punteggio " + punteggio, width - 60, 55);
}


function keyPressed(){
    // tasti globali sempre attivi
    if(key=="p" || key=="Escape"){
        schemaprec = schema;
        schema = 0;
    }
    if(key == "q"){
        schema = schemaprec;
    }
    if(schema == 1 && (key == "s" || key == " ")){
        schema = schema + 1;
    }
    if(key == "r" || key == "R"){
        if(schema == 99){
            nemici.length = 0;
            nemici2.length = 0;
            nemici3.length = 0;
            schema = 1;
        }
    }

    // movimento solo se il gioco è attivo e player esiste
    if(schema < 4 || !player) return;

    if(key == "w") player.jump();
    if(key == "a"){
        player.imgShow = (personaggioScelto == 1) ? pg1Sx : pg2Sx;
        player.moveSx();
    }
    if(key == "d"){
        player.imgShow = (personaggioScelto == 1) ? pg1Dx : pg2Dx;
        player.moveDx();
    }
}

function mouseClicked() {
     if (schema == 0) {
        // Continua
        if (mouseX >= 640 && mouseX <= 1100 && //controllare coordinate 
            mouseY >= 520 && mouseY <= 680){
            schema = schemaprec;
        }
        // Menu
        if (mouseX >= 640 && mouseX <= 1100 &&
            mouseY >= 700 && mouseY <= 870){
            schema = 1;
        }
    }else if(schema==1){
        schema++;
    }else if (schema == 2) {
    if (mouseX >= btnPersonaggio1.x && mouseX <= btnPersonaggio1.x + btnPersonaggio1.w &&
        mouseY >= btnPersonaggio1.y && mouseY <= btnPersonaggio1.y + btnPersonaggio1.h) {
        personaggioScelto = 1;
        scegliPersonaggio(pg1F, pg1Dx, pg1Sx); // va a schema 3
    }
    if (mouseX >= btnPersonaggio2.x && mouseX <= btnPersonaggio2.x + btnPersonaggio2.w &&
        mouseY >= btnPersonaggio2.y && mouseY <= btnPersonaggio2.y + btnPersonaggio2.h) {
        personaggioScelto = 2;
        scegliPersonaggio(pg2F, pg2Dx, pg2Sx); // va a schema 3
    }
} else if (schema == 3) {
    if (mouseX >= btnRulesX && mouseX <= btnRulesX + btnRulesW &&
        mouseY >= btnRulesY && mouseY <= btnRulesY + btnRulesH) {
        iniziaGioco(); //  va a schema 4
    }
}
}

//  solo scelta personaggio
function scegliPersonaggio(immaginePG, imgDxPG, imgSxPG) {
    imgF = immaginePG;
    imgDx = imgDxPG;
    imgSx = imgSxPG;
    schema = 3; // mostra le rules
}

function iniziaGioco() {
    // usa imgF/imgDx/imgSx salvati da scegliPersonaggio
    player = new Player(imgF, 100, terra);
    //monete 
    punteggio = 0;
    creaMonete();
  
    
    vite = 3;
    invincibile = false;
    invincibileTimer = 0;
    
    // svuota gli array prima di riempirli!
    nemici.length = 0;
    nemici2.length = 0;
    nemici3.length = 0;
    nemici4.length=0;
    nemici5.length=0;

    nemico = new Player(imgNdx, 900, terra-100);
    nemico.setupEnemy(700, 1400, imgNdx, imgNsx, 4);
    nemici.push(nemico);
    
    nemico2 = new Player(imgNsx, 1200, terra-100);
    nemico2.setupEnemy(1000, 1700, imgNdx, imgNsx, 2.5);
    nemici.push(nemico2);

    nemico3 = new Player(imgN2dx, 900, terra);
    nemico3.setupEnemy(600, 1100, imgN2dx, imgN2sx, 4);
    nemici2.push(nemico3);

    nemico4 = new Player(imgN2sx, 600, terra);
    nemico4.setupEnemy(600, 900, imgN2dx, imgN2sx, 2.5);
    nemici3.push(nemico4);

    nemico5 = new Player(imgN2dx, 1000, terra);
    nemico5.setupEnemy(1000, 1500, imgN2dx, imgN2sx, 5);
    nemici3.push(nemico5);
    
    nemico6 = new Player(imgN2dx, 1000, terra);
    nemico6.setupEnemy(1000, 1500, imgN2dx, imgN2sx, 5);
    nemici4.push(nemico6);

    nemico7 = new Player(imgN2dx, 1000, terra);
    nemico7.setupEnemy(1000, 1500, imgN2dx, imgN2sx, 5);
    nemici5.push(nemico7);

    nemico8 = new Player(imgN2dx, 1000, terra);
    nemico8.setupEnemy(1000, 1500, imgN2dx, imgN2sx, 5);
    nemici5.push(nemico8);

    nemico9 = new Player(imgN2dx, 910, terra-350);
    nemico9.setupEnemy(910, 1000, imgN2dx, imgN2sx, 5);
    nemici5.push(nemico5);
    

    schema = 4;
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

// Collisione laterale 
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

// Disegna i cuori delle vite 
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
        
    } else if (schema==4) {
        background(backimg); 
        fill(255);
        textSize(30);
        text("Livello 1",300,50);
        player.discesa();
     
        for(let n of nemici){
            n.moveDXSX();
            image(n.imgShow, n.x, n.y);
        }
        
        // effetto lampeggio quando invincibile 
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
        
        // Collisione laterale (perde vita) 
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
        
        
        // aggiorna timer invincibilità 
        if(invincibile){
            invincibileTimer--;
            if(invincibileTimer <= 0){
                invincibile = false;
            }
        }
      
        
        // disegna i cuori 
        disegnaVite();
        //monete 
        gestisciMonete();
        disegnaPunteggio();
        
        if(player.x>=1700){
            creaMoneteLv2();
            schema++;
            player.x=10;
        }
        
    } else if(schema==5){//livello 2
        background(backimg2); 
         // Disegna piattaforme livello 2 
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
        gestisciMonete();
        disegnaPunteggio();
        
        if(player.x>=1700){
            creaMoneteLv2_2();
            schema++;
            player.x=10;
        }
        
    } else if (schema == 0) {
    background(pause);   
    // schermata Game Over 
    } else if(schema == 99){
        background(gameover);
    //schermata regole
} else if (schema == 3) {
    background("pink");
    // TITOLO 
    fill(255);
    stroke(255, 100, 180);
    strokeWeight(5);
    textSize(70);
    textAlign(CENTER);
    text(" RULES ", width/2, height/2 - 280);
    // BOX SFONDO — allargato per contenere 3 livelli
    fill(255, 255, 255, 200);
    stroke(255, 100, 180);
    strokeWeight(4);
    rect(width/2 - 400, height/2 - 230, 800, 460, 20);
    noStroke();
    textAlign(LEFT);
    // Livello 1
    fill(200, 0, 100);
    textSize(25);
    text("Livello 1 - Foresta", width/2 - 360, height/2 - 170);
    fill(60);
    textSize(18);
    text("Affronta i nemici nel mondo aperto.\nSalta sulla loro testa per eliminarli!", width/2 - 360, height/2 - 145);
    // Livello 2
    fill(200, 0, 100);
    textSize(25);
    text("Livello 2 - Casa", width/2 - 360, height/2 - 60);
    fill(60);
    textSize(18);
    text("Salta tra le piattaforme e schiva i lupi.\nRaggiungere la fine del livello per avanzare!", width/2 - 360, height/2 - 35);
    // Livello 3
    fill(200, 0, 100);
    textSize(25);
    text("Livello 3 - Cuccia", width/2 - 360, height/2 + 50);
    fill(60);
    textSize(18);
    text("Salta tra le piattaforme e combatti i topi.\nRaggiungere la fine del livello per finire il gioco!", width/2 - 360, height/2 + 75);
    // Controlli
    fill(200, 0, 100);
    textSize(25);
    text("Controlli", width/2 - 360, height/2 + 160);
    fill(60);
    textSize(18);
    text("W = Salta   |   A = Sinistra   |   D = Destra   |   P / ESC = Pausa", width/2 - 360, height/2 + 185);
    
    // PULSANTE INIZIA 
    let bx = width/2 - 180;
    let by = height/2 + 240;
    let bw = 360;
    let bh = 65;
    
    if (mouseX >= bx && mouseX <= bx + bw &&
        mouseY >= by && mouseY <= by + bh) {
        fill(220, 0, 120);
        cursor(HAND);
    } else {
        fill(255, 80, 160);
        cursor(ARROW);
    }
    stroke(150, 0, 80);
    strokeWeight(4);
    rect(bx, by, bw, bh, 15);
    
    fill(255);
    noStroke();
    textSize(28);
    textAlign(CENTER);
    text("INIZIA GIOCO --->", width/2, by + 43);
    
    btnRulesX = bx;
    btnRulesY = by;
    btnRulesW = bw;
    btnRulesH = bh;
    

}else if (schema ==6){
    background(backimg3); 
    // Disegna piattaforme livello 2.1 
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
        gestisciMonete();
        disegnaPunteggio();
        
console.log("player.y:", player.y, "terra:", terra, "player.x:", player.x);
//fuoco 
if (player.y >= 440 && player.y <= 460 && player.x >= 1200) {
fill(255, 30, 0);
textAlign(CENTER);
textSize(40);
text("YOU ARE ON FIRE!!!", width/2, height/2);
    if (!invincibile) {
        vite--;
        invincibile = true;
        invincibileTimer = INVINCIBILE_DURATA;
        if (vite <= 0){
       schema = 99; 
        }
    }
 } if(player.x>=1700){
            creaMoneteLv3();
            schema++;
            player.x=10;
        }
}else if (schema==7) {
    background(backimg4); 
    disegnaPiattaforme(piattaformeLv3);
    gestisciPiattaforme(player, piattaformeLv3);
        fill(255);
        textSize(30);
        text("Livello 3",300,50);
        player.discesa();
     
        for(let n of nemici4){
            n.moveDXSX();
            image(n.imgShow, n.x, n.y);
        }
        // effetto lampeggio quando invincibile 
        if(!invincibile || frameCount % 8 < 4){
            image(player.imgShow, player.x, player.y);
        }
        for(let i = nemici4.length - 1; i >= 0; i--){
            if(collisioneDallAlto(player, nemici4[i])){
                player.speedY = -player.jumpHeight / 1.5;
                nemici4.splice(i, 1);
            }
        }
        if(!invincibile){
            for(let i = 0; i < nemici4.length; i++){
                if(collisioneLaterale(player, nemici4[i])){
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
        if(invincibile){
            invincibileTimer--;
            if(invincibileTimer <= 0){
                invincibile = false;
            }
        }
        disegnaVite();
        gestisciMonete();
        disegnaPunteggio();
        if(player.x>=1700){
            creaMoneteLv3_2();
            schema++;
            player.x=10;
        }
}else if (schema==8) {
    background(backimg5); 
    disegnaPiattaforme(piattaformeLv3_2);
    gestisciPiattaforme(player, piattaformeLv3_2);
        fill(255);
        textSize(30);
        text("Livello 3",300,50);
        player.discesa();
     
        for(let n of nemici5){
            n.moveDXSX();
            image(n.imgShow, n.x, n.y);
        }
        // effetto lampeggio quando invincibile 
        if(!invincibile || frameCount % 8 < 4){
            image(player.imgShow, player.x, player.y);
        }
        for(let i = nemici4.length - 1; i >= 0; i--){
            if(collisioneDallAlto(player, nemici5[i])){
                player.speedY = -player.jumpHeight / 1.5;
                nemici5.splice(i, 1);
            }
        }
        if(!invincibile){
            for(let i = 0; i < nemici5.length; i++){
                if(collisioneLaterale(player, nemici5[i])){
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
        if(invincibile){
            invincibileTimer--;
            if(invincibileTimer <= 0){
                invincibile = false;
            }
        }
        disegnaVite();
        gestisciMonete();
        disegnaPunteggio();
        if(player.x>=1700){
            schema++;
            player.x=10;
        }
}else if(schema ==9){
    background("pink");
    fill(255);
textAlign(CENTER);
textSize(70);
text("YOU WON!!!", width/2, height/2);
text("PUNTEGGIO :"+punteggio,width/2,height/2+90);

}}

//piattaforme 
function disegnaPiattaforme(piattaforme) {
  fill("pink");//imposta colore con colori rgb o colore 
  stroke(0);//imposta colore bordo 
  strokeWeight(4);//spessore del bordo 
  for (let p of piattaforme) {
    rect(p.x, p.y, p.w, p.h, 4);
  }
}
// Gestione collisione con piattaforme  
// Il player si appoggia sopra la piattaforma se ci cade dall'alto
function gestisciPiattaforme(player, piattaforme) {
  let ph = player.imgShow.height;
  let pw = player.imgShow.width;
  player.sullaTerraPiattaforma = false;
  for (let p of piattaforme) {
    let playerBottom = player.y + ph;
    let prevBottom = playerBottom - player.speedY;
    // Il player deve arrivare dall'alto sulla piattaforma 
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





