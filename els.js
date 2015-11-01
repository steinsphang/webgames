var blockcolor="rgb(105, 105, 105)";//定义方块的颜色，易于调整配色
var gridcolor="rgb(220, 220, 220)";//定义网格的颜色，易于调整颜色
var d=30;//每个方块的像素长度
var canvas=document.getElementById("canvas");//获取canvas
//网格化canvas，变量名grid
var grid=new Array(10);
for(var i=0;i<10;i++){
	grid[i]=new Array(20);
	for(var j=0;j<20;j++){
		grid[i][j]=document.createElement("b");
		grid[i][j].style.left=i*d+"px";
		grid[i][j].style.top=j*d+"px";
		canvas.appendChild(grid[i][j]);
	}
}

s=new Array(4);//s为当前方向数组
var dx;//偏移量x
var dy;//偏移量y

var blockid;//方块的类型
var blockdir;//方块的方向
var blocknow=new Array(4);
for(var i=0;i<blocknow.length;i++){
	blocknow[i]=document.createElement("b");
	blocknow[i].style.backgroundColor=blockcolor;
	canvas.appendChild(blocknow[i]);
}

var point;
var p=document.getElementById("p");
var button=document.getElementById("restart");

var state;//当前状态，是否暂停，0为暂停
var v;//当前速度
var timer;//定时器，用以产生动画效果
init();

/*初始化函数*/
function init(){
	for(var i=0;i<10;i++){
		for(var j=0;j<20;j++){
			grid[i][j].style.backgroundColor=gridcolor;
		}
	}

	getblock();
	point=0;
	p.innerHTML="分数："+point;
	state=1;
	v=350;
	clearInterval(timer);
	timer=setInterval(next,v);
	document.onkeydown=keyDown;//键盘监听事件
	button.focus();
	button.blur();
	
}
function next(){
	if(isdown()==1){//是否触底
		//对变量进行记录，判断是否有消除或者游戏结束，并对blocknow重新赋值
		for(var i=0;i<blocknow.length;i++){
			if(blocknow[i].y>=0){
				grid[blocknow[i].x][blocknow[i].y].style.backgroundColor=blockcolor;
			}
		}
		disppear();
		die();
		getblock();
		return;
	}
	for(var i=0;i<blocknow.length;i++){//向下移动
		blocknow[i].y+=1;
	}
	setpx(blocknow);
}

/*设置方块具体的位置*/
function setpx(block){
	for(var i=0;i<block.length;i++){
		block[i].style.left=block[i].x*d+"px";
		block[i].style.top=block[i].y*d+"px";
	}
}

/*getblock函数随机获取方块的类型和方向以及定义初始位置*/
function getblock(){
	dx=4;//在画布上中部出现
	dy=0;
	blockid=Math.floor(Math.random()*7);//七种类型的方块
	blockdir=Math.floor(Math.random()*4);//四个方向
	switch(blockid){
		case 0:
		getb0();
		break;
		case 1:
		getb1();
		break;
		case 2:
		getb2();
		break;
		case 3:
		getb3();
		break;
		case 4:
		getb4();
		break;
		case 5:
		getb5();
		break;
		case 6:
		getb6();
		break;
	}
}

/*分别定义每种类型方块的四个方向的状态*/
function getb0(){
	switch(blockdir%4){
		case 0:
		case 2:
		s[0]=new Array(0,0);
		s[1]=new Array(0,-1);
		s[2]=new Array(0,-2);
		s[3]=new Array(0,-3);
		break;
		default:
		s[0]=new Array(0,0);
		s[1]=new Array(1,0);
		s[2]=new Array(2,0);
		s[3]=new Array(3,0);
	}

	for(var i=0;i<4;i++){
		blocknow[i].x=s[i][0]+dx;
		blocknow[i].y=s[i][1]+dy;
	}
	setpx(blocknow);
}

function getb1(){
	s[0]=new Array(0,0);
	s[1]=new Array(0,-1);
	s[2]=new Array(1,0);
	s[3]=new Array(1,-1);

	for(var i=0;i<4;i++){
		blocknow[i].x=s[i][0]+dx;
		blocknow[i].y=s[i][1]+dy;
	}
	setpx(blocknow);
}

function getb2(){
	switch(blockdir%4){
		case 0:
		s[0]=new Array(0,0);
		s[1]=new Array(1,0);
		s[2]=new Array(1,-1);
		s[3]=new Array(2,0);
		break;
		case 1:
		s[0]=new Array(1,0);
		s[1]=new Array(1,-1);
		s[2]=new Array(1,-2);
		s[3]=new Array(2,-1);
		break;
		case 2:
		s[0]=new Array(0,-1);
		s[1]=new Array(1,0);
		s[2]=new Array(1,-1);
		s[3]=new Array(2,-1);
		break;
		default:
		s[0]=new Array(0,-1);
		s[1]=new Array(1,0);
		s[2]=new Array(1,-1);
		s[3]=new Array(1,-2);
	}

	for(var i=0;i<4;i++){
		blocknow[i].x=s[i][0]+dx;
		blocknow[i].y=s[i][1]+dy;
	}
	setpx(blocknow);
}
function getb3(){
	switch(blockdir%4){
		case 0:
		case 2:
		s[0]=new Array(0,-1);
		s[1]=new Array(1,0);
		s[2]=new Array(1,-1);
		s[3]=new Array(2,0);
		break;
		default:
		s[0]=new Array(0,0);
		s[1]=new Array(0,-1);
		s[2]=new Array(1,-1);
		s[3]=new Array(1,-2);
	}

	for(var i=0;i<4;i++){
		blocknow[i].x=s[i][0]+dx;
		blocknow[i].y=s[i][1]+dy;
	}
	setpx(blocknow);
}
function getb4(){
	switch(blockdir%4){
		case 0:
		case 2:
		s[0]=new Array(0,0);
		s[1]=new Array(1,0);
		s[2]=new Array(1,-1);
		s[3]=new Array(2,-1);
		break;
		default:
		s[0]=new Array(1,-1);
		s[1]=new Array(1,-2);
		s[2]=new Array(2,0);
		s[3]=new Array(2,-1);
	}

	for(var i=0;i<4;i++){
		blocknow[i].x=s[i][0]+dx;
		blocknow[i].y=s[i][1]+dy;
	}
	setpx(blocknow);
}
function getb5(){
		switch(blockdir%4){
		case 0:
		s[0]=new Array(0,0);
		s[1]=new Array(0,-1);
		s[2]=new Array(1,0);
		s[3]=new Array(2,0);
		break;
		case 1:
		s[0]=new Array(0,0);
		s[1]=new Array(0,-1);
		s[2]=new Array(0,-2);
		s[3]=new Array(1,-2);
		break;
		case 2:
		s[0]=new Array(0,-1);
		s[1]=new Array(1,-1);
		s[2]=new Array(2,0);
		s[3]=new Array(2,-1);
		break;
		default:
		s[0]=new Array(1,0);
		s[1]=new Array(2,0);
		s[2]=new Array(2,-1);
		s[3]=new Array(2,-2);
	}

	for(var i=0;i<4;i++){
		blocknow[i].x=s[i][0]+dx;
		blocknow[i].y=s[i][1]+dy;
	}
	setpx(blocknow);
}
function getb6(){
	switch(blockdir%4){
		case 0:
		s[0]=new Array(0,0);
		s[1]=new Array(2,-1);
		s[2]=new Array(1,0);
		s[3]=new Array(2,0);
		break;
		case 1:
		s[0]=new Array(0,0);
		s[1]=new Array(0,-1);
		s[2]=new Array(0,-2);
		s[3]=new Array(1,0);
		break;
		case 2:
		s[0]=new Array(0,-1);
		s[1]=new Array(1,-1);
		s[2]=new Array(0,0);
		s[3]=new Array(2,-1);
		break;
		default:
		s[0]=new Array(1,-2);
		s[1]=new Array(2,0);
		s[2]=new Array(2,-1);
		s[3]=new Array(2,-2);
	}

	for(var i=0;i<4;i++){
		blocknow[i].x=s[i][0]+dx;
		blocknow[i].y=s[i][1]+dy;
	}
	setpx(blocknow);
}

/*键盘事件函数，监听上下左右键*/
function keyDown(){
	var value= event.keyCode;
	switch(value)
	{
		case 32://空格键，暂停
		if(state==1){
			clearInterval(timer);
			state=0;
		}
		else{
			timer=setInterval(next,v);
			state=1;
		}
		break;
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
		if(state!=0&&isleft()==0){//判断是否能向左移动
			left();
		}
}
function u(){
		if(state!=0){
		up();//变形函数
		}
}
function r(){
		if (state!=0&&isright()==0){//判断是否能向右移动
			right();
		}
}
function ddown(){
		if(state!=0){
		next();//触发动画，加快速度向下
		}
}

/*左右移动函数*/
function left(){
	for(var i=0;i<blocknow.length;i++){
		blocknow[i].x-=1;
	}
	setpx(blocknow);
}
function right(){
	for(var i=0;i<blocknow.length;i++){
		blocknow[i].x+=1;
	}
	setpx(blocknow);
}

/*变形函数，up键操作*/
function up(){
	blockdir+=1;//方块的方向+1，顺时针转动
	dx=blocknow[0].x-s[0][0];//相对初始的偏移
	dy=blocknow[0].y-s[0][1];
	/*判断变形后是否冲突*/
	var x;
	var y;
	var l=3;//在周边3*3范围内不超出边界以及不得有其他方块
	if(blockid==0){
		l=4;//长条方块
	}
	for(var i=0;i<l;i++){
		for(var j=0;j>-l;j--){
			x=i+dx;
			y=j+dy;
			if(x<0||x>9){//不超出边界
				blockdir-=1;
				return;
			}
			else if(y>=0&&grid[x][y].style.backgroundColor==blockcolor){
				blockdir-=1;
				return;
			}
		}
	}

	switch(blockid){
		case 0:
		getb0();
		break;
		case 1:
		getb1();
		break;
		case 2:
		getb2();
		break;
		case 3:
		getb3();
		break;
		case 4:
		getb4();
		break;
		case 5:
		getb5();
		break;
		case 6:
		getb6();
		break;
	}
}

/*判断是否能左移*/
function isleft(){
	var x;
	var y;
	for(var i=0;i<blocknow.length;i++){
		x=blocknow[i].x;
		y=blocknow[i].y;
		if(blocknow[i].x==0){
			return 1;
		}
		else if(y>=0&&grid[x-1][y].style.backgroundColor==blockcolor){
			return 1;
		}
	}
	return 0;
}

function isright(){
	var x;
	var y;
	for(var i=0;i<blocknow.length;i++){
		x=blocknow[i].x;
		y=blocknow[i].y;
		if(blocknow[i].x==9){
			return 1;
		}
		else if(y>=0&&grid[x+1][y].style.backgroundColor==blockcolor){
			return 1;
		}
	}
	return 0;
}

/*是否到底*/
function isdown(){
	var x;
	var y;
	for(var i=0;i<blocknow.length;i++){
		x=blocknow[i].x;
		y=blocknow[i].y;
		if(blocknow[i].y==19){
			return 1;
		}
		else if(y>=0&&grid[x][y+1].style.backgroundColor==blockcolor){
			return 1;
		}
		
	}
	return 0;
}

/*是否消除*/
function disppear(){
	for(var j=0;j<20;j++){//对每一层进行判断
		var flag=1;//1为该消去
		for(var i=0;i<10;i++){
			if(grid[i][j].style.backgroundColor!=blockcolor){
				flag=0;
			}
		}
		if(flag==1){
			for(var m=j;m>0;m--){
				for(var n=0;n<10;n++){
					grid[n][m].style.backgroundColor=grid[n][m-1].style.backgroundColor;
				}
			}
			for(var n=0;n<10;n++){
				grid[n][0].style.backgroundColor=gridcolor;
			}
			point+=10;
			p.innerHTML="分数："+point;
		}
	}
}

function die(){
	for(var i=0;i<10;i++){
		if(grid[i][0].style.backgroundColor==blockcolor){
			alert("game over!");
			clearInterval(timer);
			return;
		}
	}
}

function direction(){
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
if(Math.abs(x)<30&&Math.abs(y)<30){
return;}
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
						ddown();
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

window.addEventListener('load',direction,false);
