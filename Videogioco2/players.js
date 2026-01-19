class Player{
    //costruttore
    constructor(imgInit){ 
        this.x=5;
        this.y=550;
        this.vx=20;//spostamento orizzontale
        this.vy=20;//spostamento verticale 
        this.imgShow=imgInit;
        this.ground=550;
        this.jumpReady=true;
    }
    jump(){ 
        this.y=this.y-this.vy;
  
  // If we are on the ground, then we should be able to jump and we should stop moving vertically
  if(this.y >= ground){
    this.jumpReady = true;
    this.vy= 0;
  }
  // if we are not on the ground, then we are not ready to jump
  else{
    jumpReady = false;
    vy += 2;
  }

    }
    moveDx(){
        this.x=this.x+this.vx; 
    }
    moveSx(){
        this.x=this.x-this.vx; 
    }

}