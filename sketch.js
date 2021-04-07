var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var Helicopter;
var HelicopterImage;

var cloudImage;
var ground;
var obstaclesGroup;
var gameOver;
var gameOverImage;
var restart,restartImage;

function preload(){
HelicopterImage = loadImage("helicopter.png");
 
  gameOverImage = loadImage("gameover.png");
  restartImage = loadImage("restart.png");
}

function setup() {
 createCanvas(windowWidth,windowHeight);
 ground = createSprite(200,180,2000000,20);
 ground.x = ground.width/2;
 
  gameOver = createSprite(300,50,20,20);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  
 
  
  restart = createSprite(300,130,20,20);
  restart.addImage(restartImage);
  restart.scale= 0.2
  Helicopter = createSprite(70,120,20,20);
  Helicopter.addImage(HelicopterImage);
  Helicopter.scale=0.2;
  
  Helicopter.setCollider("circle",10,10,1100);

  obstaclesGroup = createGroup();
}

function draw() {
background("#fafd0f"); 
  drawSprites();
  
   
  if(gameState == PLAY){
    gameOver.visible = false;
    restart.visible= false;   
    
    text("score: "+score,500,20);
    score = score + Math.round(frameCount/60);
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    ground.velocityX=-4;
  spawnObstacles();
  
  if(keyDown("space")&& Helicopter.y >= 120) {
    Helicopter.velocityY = -12;
    }
    if(obstaclesGroup.isTouching(Helicopter)){
    gameState =END;
    }
      
    if (ground.x< 0){
      ground.x = ground.width/2;
    }
      
   Helicopter.velocityY =Helicopter.velocityY + 0.8
   Helicopter.collide(ground);

  
    
  }else if(gameState == END){
   gameOver.visible=true; 
    restart.visible=true;
      ground.velocityX = 0;
      Helicopter.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
 obstaclesGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)) {
      reset();
    }
  }
 
} 
  function spawnObstacles(){
 if (frameCount % 60 === 0) {
   var obstacle = createSprite(500,160,10,40);
   obstacle.scale=0.1;
   obstacle.velocityX = -6;
   
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage();
              break;
      case 2: obstacle.addImage();
              break;
      case 3: obstacle.addImage();
              break;
      default: break;
      
      
     
    }
    obstaclesGroup.add(obstacle);    
 }
  }
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
 score = 0;
}

