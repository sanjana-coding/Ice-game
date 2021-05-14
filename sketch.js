var diamond,girl,robber1;
var robber2,robber3,hole,ground;

var diamondImg,girlAnimation,holeImg,bgImg;
var robber1Img,robber2Img,robber3Img,bg;
var robberGroup;

var gameState=1;

function preload(){
  diamondImg=loadImage("diamond.png")
  holeImg=loadImage("hole.png")
  bgImg=loadImage("bg.jpg")
  robber1Img=loadImage("robber1.png")
  girlAnimation=loadAnimation("girl1.jpg","girl2.jpg","girl3.jpg","girl4.jpg","girl5.jpg","girl6.jpg","girl7.jpg")
  girl_falling=loadAnimation("girl2.jpg")
}

function setup(){
  createCanvas(windowWidth,windowHeight)

  background=createSprite(width/2,height/2,windowWidth,windowHeight);
  background.addImage(bgImg);
  background.scale=2.3;
  background.x=background.width/2;

  hole=createSprite(width/2,height-50);
  hole.addImage(holeImg);
  hole.scale=0.35;

  girl=createSprite(1200,650,10,200);
  girl.addAnimation("Girl",girlAnimation);
  girl.addAnimation("Girl2",girl_falling);
  girl.scale=1.7;
 
 
 ground=createSprite(width/2,650,width,20)
 ground.visible=false
 
  girl.setCollider("rectangle",0,0,20,100)
  hole.setCollider("circle",0,0,60)

  robber=createSprite(Math.round(random(200,width/2)),550,10,200);
  robber.addImage(robber1Img);
  robber.scale=1.2;
robberGroup= new Group();
  

  

}

function draw(){
 

if(gameState===1){

if(keyIsDown(LEFT_ARROW)){
  girl.velocityX=-4;

}

  background.velocityX=2;

  console.log(width)


if(background.x>width/2+100){
  background.x=background.width/2
}

if(keyDown(UP_ARROW)&& girl.y >= 390){
  girl.velocityY=-10;
  
}

girl.velocityY=girl.velocityY+0.5;
girl.collide(ground);

  if(girl.isTouching(hole)){
    girl.lifetime=50;
    girl.velocityX=0;
    girl.changeAnimation("Girl2")
    gameState=0;
    background.velocityX=0;
    
  }

if(girl.isTouching(robberGroup)&&girl.x===robberGroup.x){
  robber.destroy();
  spawnRobber();
  robberGroup.destroy();
}

if(girl.isTouching(robberGroup)&&girl.x>robberGroup.x){
  girl.destroy();
}

if(girl.x<0){
  girl.x=1200;
}

spawnDiamond();

}

  drawSprites();
}

function spawnDiamond(){

  if(frameCount % 500 === 0){
    diamond=createSprite(Math.round(random(200,width-100)),450,10,200)
    diamond.addImage(diamondImg)
    diamond.scale=0.3
    diamond.lifetime=10;
  }
}

function spawnRobber(){
  if(frameCount % 500 ===0){
    robber=createSprite(Math.round(random(200,width-500)),650,10,200);
    robber.addImage(robber1Img);
    robber.scale=1.2;
    robberGroup.add(robber)
  }
 
}