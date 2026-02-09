class Player {
    constructor(immagineIniziale,x,y) {
        this.x = x;
        this.y = y;
        this.vx=30;
        this.imgShow = immagineIniziale;

        this.speedY = 0;        
        this.gravity = 3;    
        this.jumpHeight = 40;  
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
        if (this.y >= 680) {
            this.y = 680;
            this.speedY = 0;
            this.ground = true;
        }
    }
   moveDXSX(leftLimit, imgDx, imgSx, rightLimit){
    this.x += this.vx * this.dir;
    if(this.x + this.imgShow.width >= rightLimit){
        this.dir = -1;
        this.imgShow = imgSx;
    }
    if(this.x <= leftLimit){
        this.dir = 1;
        this.imgShow = imgDx;
    }
}

}