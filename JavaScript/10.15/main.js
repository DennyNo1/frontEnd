// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const p=document.querySelector('p');

let ballsCount=0;


// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}
function randomColor() {
  return (
    "rgb(" +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ")"
  );
}

function Shape(x, y, velX, velY,exists)
{
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists=exists;
}
//这实际上是一个构造器,虽然统称为函数


// 构造函数 Ball()，从 Shape() 继承属性
function Ball(x, y, velX, velY, exists,color, size) {
  // 使用 call 方法调用父类构造函数，继承 x, y, velX, velY, exists 属性
  Shape.call(this, x, y, velX, velY,exists);

  this.color = color;
  this.size = size;
}

// 设置 Ball 的原型，继承 Shape 的原型
Ball.prototype = Object.create(Shape.prototype);

// 修复 Ball 的构造器属性
Ball.prototype.constructor = Ball;



// function Ball(x, y, velX, velY, color, size) 
// {
//   this.x = x;
//   this.y = y;
//   this.velX = velX;
//   this.velY = velY;
//   this.color = color;
//   this.size = size;
//   /*this.draw = () => {
//     ctx.beginPath();
//     ctx.fillStyle = this.color;
//     ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
//     ctx.fill();
//   };*/
// }
//这个function是相当于Java中的类了

Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};
//这个相当于给Ball的父类添加一个函数，每个Ball一样的子类都会继承这个函数、。效果是，把函数的小球表现在画布上。

Ball.prototype.update = function () {
  if (this.x + this.size >= width) {
    this.velX = -this.velX;
  }

  if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  }

  if (this.y + this.size >= height) {
    this.velY = -this.velY;
  }

  if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};
//更新小球的位置信息

Ball.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    if (this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
};

function EvilCircle(x, y, exists) {
  
  Shape.call(this, x, y, 20, 20,exists);

  this.color = 'white';
  this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);


EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function () {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};

EvilCircle.prototype.update = function () {
  if (this.x + this.size >= width) {
    this.x=width-10;
  }
  if (this.x - this.size <= 0) {
    this.x=10;
  }

  if (this.y + this.size >= height) {
    this.y=height-10;
  }

  if (this.y - this.size <= 0) {
    this.y=10;
  }


};

EvilCircle.prototype.setControls = function () 
{
  window.onkeydown = (e) => {
    switch (e.key) {
      case "a":
        this.x -= this.velX;
        break;
      case "d":
        this.x += this.velX;
        break;
      case "w":
        this.y -= this.velY;
        break;
      case "s":
        this.y += this.velY;
        break;
    }
  };
  
}

EvilCircle.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    if (balls[j].exists) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists=false;
        p.textContent='现在的屏幕存在'+--ballsCount+'个球';
      }
    }
  }
};





let balls = [];
let evilcircle=new EvilCircle(100,100,true);
evilcircle.setControls();


while (balls.length < 25) {
  let size = random(10, 20);
  let ball = new Ball(
    // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    true,
    randomColor(),
    size,
    
  );
  balls.push(ball);
  ballsCount++;
  p.textContent='现在的屏幕存在'+ballsCount+'个球';
}
//创建25个小球


function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) 
  {
    if(balls[i].exists)
    {
      balls[i].draw();
      balls[i].update();
     balls[i].collisionDetect();
    }
    evilcircle.draw();
    evilcircle.update();
    evilcircle.collisionDetect();

  }

  requestAnimationFrame(loop);
}
loop();


//小球之间的碰撞检测函数，实际上是错的