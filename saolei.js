﻿var height=10;//尺寸长度
var width=15;//尺寸宽度
var cellwidth=25;//方块的宽度
var rand=0.1//地雷出现的概率
var bombnum=0;//地雷的数量
var nullnum;//空白数量
var ocolor="#0066ff";//初始颜色
var acolor="#dddddd";//后来的颜色

var button=document.getElementById("button");//按键
button.onclick=init;
var p=document.getElementById("p");//剩余数量
var canvas=document.getElementById("canvas");//画布

canvas.style.width=cellwidth*width+"px";
canvas.style.height=cellwidth*height+"px";
var cells=new Array(width);//网格化
for(var i=0;i<width;i++){
	cells[i]=new Array(height);
	for(var j=0;j<height;j++){
		cells[i][j]=document.createElement("b");
		cells[i][j].x=i;//坐标
		cells[i][j].y=j;//坐标
		cells[i][j].style.height=cellwidth-2+"px";
		cells[i][j].style.width=cellwidth-2+"px";
		cells[i][j].style.left=i*cellwidth+"px";
		cells[i][j].style.top=j*cellwidth+"px";
		cells[i][j].addEventListener('click',opencell,false);//左键打开函数
		cells[i][j].onmousedown=rightclick;//右键标记函数
		canvas.appendChild(cells[i][j]);
	}
}
init();
document.oncontextmenu = function(e){//禁止右键菜单
	e.preventDefault();
};

/*初始化，随机分配地雷*/
function init(){
bombnum=0;
for(var i=0;i<width;i++){
	for(var j=0;j<height;j++){
		cells[i][j].isopended=0;//状态，记录是否被打开
		cells[i][j].style.backgroundColor=ocolor;
		cells[i][j].innerHTML='';
		var x=Math.random();
		if(x<=rand){
			cells[i][j].bomb=1;
			bombnum++;
		}
		else{
			cells[i][j].bomb=0;
		}
		
	}
}
p.innerHTML="剩余数量："+bombnum;
nullnum=width*height-bombnum;
}
/*opencell打开方块*/
function opencell(){
	if(this.innerHTML=="F"||this.isopended==1)return;
	this.isopended=1;
	if(this.bomb==1){
		this.style.backgroundColor="red";
		alert("game over");
	}
	else{
		var num=getnum(this);
		if(num!=0){
			this.innerHTML=num;
			this.style.backgroundColor=acolor;
		}
		else{
			this.style.backgroundColor=acolor;
			area(this);
		}
	}
	bingo();
}

function getnum(cellinput){//计算方块周围地雷的个数
	var num=0;
	for(var m=-1;m<=1;m++){
		for(var n=-1;n<=1;n++){
			if(cellinput.x+m>=0&&cellinput.x+m<width&&cellinput.y+n>=0&&cellinput.y+n<height&&cells[cellinput.x+m][cellinput.y+n].bomb){
				num++;
			}
		}
	}
	return num;
}

function area(cellinput){//自动点开相连的空白区块
	for(var m=-1;m<=1;m++){
		for(var n=-1;n<=1;n++){
			if(cellinput.x+m>=0&&cellinput.x+m<width&&cellinput.y+n>=0&&cellinput.y+n<height&&cells[cellinput.x+m][cellinput.y+n].isopended==0&&cells[cellinput.x+m][cellinput.y+n].innerHTML!='F'){
				cells[cellinput.x+m][cellinput.y+n].isopended=1;
				var num=getnum(cells[cellinput.x+m][cellinput.y+n]);
				if(num!=0){
					cells[cellinput.x+m][cellinput.y+n].innerHTML=num;
					cells[cellinput.x+m][cellinput.y+n].style.backgroundColor=acolor;
				}
				else{
					cells[cellinput.x+m][cellinput.y+n].style.backgroundColor=acolor;
					area(cells[cellinput.x+m][cellinput.y+n]);
				}		
			}
		}
	}
	
}

function bingo(){
	var num=0;
	for(var i=0;i<width;i++){
		for(var j=0;j<height;j++){
			if(cells[i][j].bomb==0&&cells[i][j].isopended==1)
				num++;
		}
	}
	if(num==nullnum){
		alert("bingo");
	}
}

function rightclick(e){
	if(this.isopended==1)return;
	if(e.button==2){
		if(this.innerHTML==''){
		this.innerHTML="F";
		bombnum--;
		p.innerHTML="剩余数量："+bombnum;
		}
		else{
		this.innerHTML='';
		bombnum++;
		p.innerHTML="剩余数量："+bombnum;
		}
	}
}



