//获取canvas对象
var canvas = document.getElementById("canvas");
//规定2d绘图
var ctx = canvas.getContext("2d");

// var W = window.innerWidth;   //获取屏幕的宽高
// var H = window.innerHeight;
// canvas.style.width = W;
// canvas.style.height = H;

var circleArr = [];

//Circle function
function Circle(x,y,r,color){
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;

    this.dx = Math.random()*12-7;
    this.dy = Math.random()*12-7;

    circleArr.push(this);
}

//The renderer
Circle.prototype.render = function (){
    ctx.beginPath();
    ctx.arc(this.x,this.y,30,0,Math.PI*2,true);
    ctx.fillStyle = this.color;
    ctx.fill();
}

Circle.prototype.update = function (){
    this.x += this.dx;
    this.y += this.dy;
    this.r--;

    if(this.r<0){
        for (var i=0;i<circleArr.length;i++){
            if (circleArr[i] === this){
                circleArr.slice(i,1);
            }
        }
        return false;
    }
    return true;
}

//鼠标移动事件
canvas.onmousemove = function (event){
    // ctx.beginPath();
    // ctx.arc(event.clientX,event.clientY,30,0,Math.PI*2,true);
    // ctx.fillStyle = "green";
    // ctx.fill();
    var color = "rgb(" + (parseInt(Math.random() * 250)+4) +","+ (parseInt(Math.random() * 250)+4)+","+ (parseInt(Math.random() * 250)+4)+")"
    new Circle(event.clientX,event.clientY,30,color);
}

//鼠标点击事件
canvas.onmousedown = function (event){
    var color = "rgb(" + (parseInt(Math.random() * 250)+4) +","+ (parseInt(Math.random() * 250)+4)+","+ (parseInt(Math.random() * 250)+4)+")"
    new Circle(event.clientX,event.clientY,30,color);
}


//timeer 三十毫秒刷新一次
setInterval(function (){
    //擦掉整个屏幕
    ctx.clearRect(0,0,1536,680);
    for (var i=0;i<circleArr.length;i++){
        circleArr[i].update() && circleArr[i].render();
    }
},20)