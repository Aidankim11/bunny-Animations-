const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
function preload(){
  bg=loadImage("images/background.png")
  fruit=loadImage("images/melon.png")
  bunnyImg=loadImage("images/Rabbit-01.png")
  blinks=loadAnimation("images/blink_1.png","images/blink_2.png","images/blink_3.png")
  eats=loadAnimation("images/eat_0.png","images/eat_1.png","images/eat_2.png","images/eat_3.png","images/eat_4.png")
  sad=loadAnimation("images/sad_1.png","images/sad_2.png","images/sad_3.png")
  eats.looping=false
  sad.looping=false
}

function setup() 
{
  createCanvas(500,600);
  
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,580,600,20);
  rope=new Rope(4,{x:250,y:20})
  food= Bodies.circle(250, 200, 20)
  Composite.add(rope.body,food)
  connect=new Link(rope,food)
  blinks.frameDelay=20
  sad.frameDelay=20
  eats.frameDelay=20
  bunny=createSprite(250,520,30,10)
  bunny.addAnimation("blinking",blinks)
  bunny.addAnimation("eating",eats)
  bunny.addAnimation("sadness",sad)
  bunny.scale=0.2
  button=createImg("images/cut_btn.png")
  button.position(230,20)
  button.size(50,50)
  button.mouseClicked(function(){
    rope.break()
    connect.break()
  })

}

function draw() 
{
  background(bg);
  ground.show();
  rope.show()
  Engine.update(engine);
  push()
  //null is nothing
  //!= is "not equal"
  if(food!=null){
  imageMode(CENTER);
  image(fruit,food.position.x, food.position.y,70,70)
  }
  pop()

  if(collides(food,bunny)){
    bunny.changeAnimation("eating",eats)
  }
  if(food!=null&& food.position.y>540){
    bunny.changeAnimation("sadness",sad)
    food = null
  }
  
 drawSprites()
   
}

//dist(x1,y1,x2,y2) it will give distance btw these x y pairs
function collides(body,sprite){
  if(body!==null){
  var distance=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
  if(distance<80){
    World.remove(world,food)
    food = null
    return true
  }else{
    return false
  }
}
}
