// Select the canvas
const canvas = document.getElementById("myGame");
const context = canvas.getContext("2d");

// Draw rectangle funtion
function drawRect(x,y,w,h,color){
    context.fillStyle = color
    context.fillRect(x,y,w,h)
}

// computer paddle
const com = {
    x: canvas.width/2 - 100/2,
    y: 0,
    width: 100,
    height: 10,
    color: "white",
}


// User Paddle
const user = {
    x: canvas.width/2 - 100/2,
    y: canvas.height - 10,
    width: 100,
    height: 10,
    color: "white",
    score:0
}


// Center line
function centerLine(){
    context.beginPath()
    context.setLineDash([10])
    context.moveTo(0,canvas.height/2)
    context.lineTo(canvas.width,canvas.height/2)
    context.strokeStyle = "white"
    context.stroke()
}


// Draw a Circle
function drawCircle(x,y,r,color){
    context.fillStyle = color
    context.beginPath()
    context.arc(x,y,r,0,Math.PI*2,false)
    context.closePath()
    context.fill()
}

// Create a ball
const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    speed:1,
    velocityX : 5,
    velocityY : 5,
    color: "white"
}


// scores
function drawText(text,x,y,color){
    context.fillStyle = color
    context.font = "32px josefin sans"
    context.fillText(text,x,y)
}

// render the Game
function render(){

    // Make canvas
    drawRect(0,0,600,800,"black");

    // computer paddle
    drawRect(com.x,com.y,com.width,com.height,com.color)
    // user paddle
    drawRect(user.x,user.y,user.width,user.height,user.color)

    // Center line
    centerLine();

    //create a ball
    drawCircle(ball.x,ball.y,ball.radius,ball.color)

    //scores of user
    drawText(user.score,20,canvas.height/2  + 50)
}

// control the user paddle
canvas.addEventListener("mousemove", movepaddle);
function movepaddle(e){
    let rect = canvas.getBoundingClientRect();
    user.x=e.clientX- rect.left-user.width/2;
}

// collision detection
function collisionwithcom(b,p){ //b-ball , p -player
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return p.right > b.left && p.left < b.right &&  b.top < p.bottom;
}
function collisionwithuser(b,p){ //b-ball , p -player
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return p.right > b.left && p.left < b.right && b.bottom > p.top;
}


// Game over function
function ShowGameOver(){
    // Hide canvas
    canvas.style.display = "none";
    const can = document.getElementById("can");
    can.style.display = "none";
    // container
    const result = document.getElementById("result");
    result.style.display = "block";

    let parentElement=document.getElementById("result");
const headingElement = document.createElement('h3');
headingElement.textContent = `your score:${user.score}`;
parentElement.appendChild(headingElement);
}


// update 
function update(){
    ball.x += ball.velocityX*ball.speed;
    ball.y += ball.velocityY*ball.speed;

    
    // control the computer paddle
    com.x += (ball.x - (com.x + com.width/2));

    // reflect from wall
    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        ball.velocityX = -ball.velocityX;
    }
    
    // if colliosion happens

    let computer=com;
    let player=user;
    
    if(collisionwithcom(ball,computer)){
        ball.velocityY = -ball.velocityY;
    }
    if(collisionwithuser(ball,player)){
        ball.velocityY = -ball.velocityY;
        ball.speed += 0.1;
    }
    if(ball.bottom>canvas.height)
    {
        clearInterval(loop);
        ShowGameOver();
    }
    
    if(collisionwithuser(ball,player))
    {       
        user.score++;
    }

}

 

//  start the game
function start(){
    update();
    render()
}

// loop
const loop = setInterval(start, 1000/50);
