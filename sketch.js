var PLAY = 1;
var END = 0 ;
var gameState = 1;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var survivalTime = 0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600,400);
  monkey = createSprite(80,350,20,20);
monkey.addAnimation("moving", monkey_running);
monkey.scale = 0.1;

ground = createSprite(400,385,2000,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  obstacleGroup = createGroup();
  foodGroup = createGroup();

}


function draw() {
background (220);
  if (gameState === PLAY){
    if (ground.x < 0){
    ground.x = ground.width/2;
 }
  spawnObstacles();
  spawnFood();

    if(keyDown("space")&& monkey.y >= 330) {
        monkey.velocityY = -13;
    }
    monkey.velocityY = monkey.velocityY + 0.8
    
    if (foodGroup.isTouching(monkey)){
     foodGroup.destroyEach();
     score = score + 2;
     monkey.scale = monkey.scale + 0.003;
   }
   if(obstacleGroup.isTouching(monkey)){
     gameState = END;
   }
    ground.velocityX = 0;
    
    survivalTime=Math.ceil(frameCount/frameRate())
      }

    console.log(gameState)

  
      
    
    //add gravity
    
  
    monkey.collide(ground);
  
   stroke("white");
   textSize(20);
   fill("white");
   text("Score : "+score,500,50)
  
   stroke("black");
   textSize(17);
   fill("black");

   text("Survival Time : "+survivalTime,30,50)  
    
     
  drawSprites();
}
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,355,10,40);
   obstacle.addImage("obstacle",obstaceImage)
   obstacle.velocityX = -6;
   obstacleGroup.add(obstacle);
   obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    obstacle.debug=true;
  obstacle.setCollider("circle",0,0,6);
 }
}
function spawnFood(){
 if (frameCount % 80 === 0){
   var food = createSprite(600,250,10,40);
   foodGroup.add(food);
   food.y = Math.round(random(300,250));
   food.addImage("food",bananaImage)
   food.velocityX = -6;
    //assign scale and lifetime to the obstacle           
    food.scale = 0.1;
    food.lifetime = 300;
} 
}





