class Player {
    constructor(immagineIniziale, x, y) {
        this.x = x;
        this.y = y;
        this.vx = 40;
        this.imgShow = immagineIniziale;

        this.speedY = 0;        
        this.gravity = 3;    
        this.jumpHeight = 40;  
        this.ground = true;
        
        // Aggiungi questa proprietà per il movimento dei nemici
        this.dir = 1; // 1 = destra, -1 = sinistra
        
        // Parametri per il pattugliamento (opzionali)
        this.leftLimit = 0;
        this.rightLimit = 0;
        this.imgDx = null;
        this.imgSx = null;
        this.isEnemy = false; // Per distinguere nemici dal player
    }

    moveDx() {
        this.x = this.x + this.vx;
    }

    moveSx() {
        this.x = this.x - this.vx;
    }

    jump() {
        if (this.ground) { 
            this.speedY = -this.jumpHeight;
            this.ground = false;
        }
    }

    discesa() {
        this.speedY += this.gravity;
        this.y += this.speedY;
        if (this.y >= 680) {
            this.y = 680;
            this.speedY = 0;
            this.ground = true;
        }
    }
    
    // Metodo per configurare un nemico
    setupEnemy(leftLimit, rightLimit, imgDx, imgSx, velocita) {
        this.isEnemy = true;
        this.leftLimit = leftLimit;
        this.rightLimit = rightLimit;
        this.imgDx = imgDx;
        this.imgSx = imgSx;
        this.vx = velocita; // Velocità del nemico
        this.imgShow = imgDx; // Inizia guardando a destra
    }
   
    moveDXSX() {
        if (!this.isEnemy) return; // Solo i nemici si muovono automaticamente
        
        this.x += this.vx * this.dir;
        
        if (this.x + this.imgShow.width >= this.rightLimit) {
            this.dir = -1;
            this.imgShow = this.imgSx;
        }
        if (this.x <= this.leftLimit) {
            this.dir = 1;
            this.imgShow = this.imgDx;
        }
    }
}