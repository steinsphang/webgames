﻿var d=20;//格子宽度
var button=document.getElementById("init");
var p=document.getElementById("p");
var canvas=document.getElementById("canvas");//画布
var apple=document.createElement("b");//创建苹果变量
apple.style.backgroundColor="red";
canvas.appendChild(apple);

var length=3;
var body=new Array(length);//蛇身
for(var i=0;i<body.length;i++){
	body[i]=document.createElement("b");
	canvas.appendChild(body[i]);
}


var v=350;
var timer;//定时器
var direction;//初始方向
init();

/*初始化函数，对蛇的身体进行初始化*/
function init(){
	for(var i=body.length-1;i>2;i--){
		canvas.removeChild(body[i]);
		body.pop();
	}
	
	length=3;
	body[0].x=14;
	body[0].y=16;
	body[0].style.left=body[0].x*d+"px";
	body[0].style.top=body[0].y*d+"px";
	for(var i=1;i<body.length;i++){
		body[i].style.backgroundColor="#0000ff";
		body[i].x=body[i-1].x+1;
		body[i].y=body[0].y;
		body[i].style.left=body[i-1].offsetLeft+d+"px";
		body[i].style.top=body[0].offsetTop+"px";
	}
	getapple();
	p.innerHTML="长度："+length;
	clearInterval(timer);
	timer=setInterval(move,v);
	direction="left";
	document.onkeydown=keyDown;//监听键盘
	
	button.focus();
	button.blur();
}

/*键盘监听函数，对键盘的方向键进行监听，获取最新的方向*/
function keyDown() { 
   var value= event.keyCode;
   switch(value)
   {
   case 37:
	l();
   break;
   case 38:
	u();
   break;
   case 39:
	r();
   break;
   case 40:
	ddown();
   break;
   }
}

function l(){
   if(direction!="right"){
	   direction="left";
	   move();
	   }
}
function u(){
   if(direction!="down"){
	   direction="up";
	   move();
	   }
}
function r(){
   if(direction!="left"){
	   direction="right";
	   move();
	   }
}
function ddown(){
   if(direction!="up"){
	   direction="down";
	   move();
	   }
}
  
/*移动函数，根据蛇的行进方向，以及是否吃到苹果，计算得到蛇下一步的状态*/
function move(){
	var tmp=document.createElement("b");//tmp用以保存body[body.length]的状态
	tmp.style.backgroundColor="#0000ff";
	tmp.style.left=body[body.length-1].offsetLeft+"px";
	tmp.style.top=body[body.length-1].offsetTop+"px";
	tmp.x=body[body.length-1].x;
	tmp.y=body[body.length-1].y;
	if(isdie()==0){
		return;
	}
	
	switch(direction){
		case "up":
		for(var i=body.length-1;i>0;i--)
		{
			body[i].style.left=body[i-1].offsetLeft+"px";
			body[i].style.top=body[i-1].offsetTop+"px";
			body[i].x=body[i-1].x;
			body[i].y=body[i-1].y;
		}
		body[0].style.top=body[0].offsetTop-d+"px";
		body[0].y-=1;
		break;
		
		case "down":
		for(var i=body.length-1;i>0;i--)
		{
			body[i].style.left=body[i-1].offsetLeft+"px";
			body[i].style.top=body[i-1].offsetTop+"px";
			body[i].x=body[i-1].x;
			body[i].y=body[i-1].y;
		}
		body[0].style.top=body[0].offsetTop+d+"px";
		body[0].y+=1;
		break;
		
		case "left":
		for(var i=body.length-1;i>0;i--)
		{
			body[i].style.left=body[i-1].offsetLeft+"px";
			body[i].style.top=body[i-1].offsetTop+"px";
			body[i].x=body[i-1].x;
			body[i].y=body[i-1].y;
		}
		body[0].style.left=body[0].offsetLeft-d+"px";
		body[0].x-=1;
		break;
		
		case "right":
		for(var i=body.length-1;i>0;i--)
		{
			body[i].style.left=body[i-1].offsetLeft+"px";
			body[i].style.top=body[i-1].offsetTop+"px";
			body[i].x=body[i-1].x;
			body[i].y=body[i-1].y;
		}
		body[0].style.left=body[0].offsetLeft+d+"px";
		body[0].x+=1;
		break;
	}
	
	if(eatapple()==1){
		length+=1;
		p.innerHTML="长度："+length;
		getapple();
		body.push(tmp);
		canvas.appendChild(tmp);
	}
	clearInterval(timer);
	timer=setInterval(move,v);
		
}

/*随机获取苹果的下一个位置，不能与蛇的身体重叠*/
function getapple(){
	var x;
	var y;
	while(true){
		var flag=1;
		x=Math.floor(Math.random()*25);
		y=Math.floor(Math.random()*25);
		for(var i=0;i<body.length;i++){
			if(x==body[i].x&&y==body[i].y){
				flag=0;
				break;
			}
		}
		if(flag==1){
			break;
		}
	}
	apple.x=x;
	apple.y=y;
	apple.style.left=apple.x*d+"px";
	apple.style.top=apple.y*d+"px";
}

function eatapple(){
	if(body[0].x==apple.x&&body[0].y==apple.y){
		return 1;
	}
	return 0;
}

function isdie(){
	var x=body[0].x;
	var y=body[0].y;
	if(x<0||x>24||y<0||y>24){
		alert("game over!");
		clearInterval(timer);
		button.innerHTML="重新开始";
		return 0;
	}
	for(var i=1;i<body.length;i++){
		if(x==body[i].x&&y==body[i].y){
			alert("game over!");
			clearInterval(timer);
			button.innerHTML="重新开始";
			return 0;
		}
	}
	return 1;
}

function directiontouch(){
	var startx;
	var starty;
	var endx;
	var endy;
	var dir;
	var x;
	var y;
	document.addEventListener('touchstart',touch,false);
	document.addEventListener('touchend',touch,false);
	function touch(event){
		var event=event||window.event;
		switch(event.type){
			case "touchstart":
				startx=Number(event.touches[0].clientX);
				starty=Number(event.touches[0].clientY);
				break;
			case "touchend":
				endx=Number(event.changedTouches[0].clientX);
				endy=Number(event.changedTouches[0].clientY);
				x=endx-startx;
				y=endy-starty;
if(x==0&&y==0){return;}
				if(Math.abs(x)>=Math.abs(y)){
					if(x>=0){
						r();
					}
					else {
						l();
					}
				}
				else {
					if(y>=0){
						ddown();
					}
					else {
						u();
					}
				}
				break;
		}
	}
}
document.addEventListener('touchmove',function (event){
event.preventDefault();},false);

window.addEventListener('load',directiontouch,false);








