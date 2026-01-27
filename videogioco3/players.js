class Player {
    constructor(immagineIniziale,x,y) {
        this.x = x;
        this.y = y;
        this.vx=20;
        this.imgShow = immagineIniziale;

        this.speedY = 0;        
        this.gravity = 3;    
        this.jumpHeight = 35;  
        this.ground = true;
    }

    moveDx() {
        this.x =this.x+this.vx;
    }

    moveSx() {
        this.x = this.x-this.vx;
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
        if (this.y >= 600) {
            this.y = 600;
            this.speedY = 0;
            this.ground = true;
        }
    }
}