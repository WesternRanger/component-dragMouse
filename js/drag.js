/**
 * Created by 陈奇 on 14-10-9.
 */

function Drag(p){
	var self = this;
	this.title = p.title;//鼠标要拖拽的标题栏
	this.box = p.box;//被拖动体
	this.mask = p.mask;//半透明遮罩层
	this.open = p.open;//调出浮层的触发按钮
	this.close = p.close;//关闭浮层的按钮

	this.mouseOffsetX = 0;
	this.mouseOffsetY = 0;
	this.isDraging = false;
	//获取dom元素
	this.g = function(id){
		return document.getElementById(id);
	}
	//自动居中
	this.autoCenter = function( el ){
		var bodyW = document.documentElement.clientWidth;
		var bodyH = document.documentElement.clientHeight;

		var elW = el.offsetWidth;
		var elH = el.offsetHeight;

		el.style.left = (bodyW-elW)/2 + 'px';
		el.style.top = (bodyH-elH)/2 + 'px';
	}
//遮罩层充满屏幕
	this.fillToBody = function( el ){
		el.style.width = '100%';
		el.style.height ='100%';
	}
	//打开浮层
	this.showDialog = function(){
		self.g(self.box).style.display = 'block';
		self.g(self.mask).style.display = 'block';
		self.fillToBody(self.g(self.mask));
		self.autoCenter(self.g(self.box));
	}
	//关闭浮层
	this.hideDialog = function(){
		self.g(self.box).style.display = 'none';
		self.g(self.mask).style.display = 'none';
	}
//鼠标事件一，在标题栏按下，（要计算鼠标相对于拖拽元素的左上角的坐标，并且标记元素为可拖动）
	self.g(self.title).onmousedown = function(e){
		self.mouseDown(e);
	}
//鼠标事件二，鼠标移动（要检测鼠标是否标记为移动，如果是，则更新元素的位置到当前鼠标的位置，即，要减去第一步中获得的偏移）
	document.onmousemove = function(e){
		self.mouseMove(e);
	}
//鼠标事件三，鼠标松开的时候（标记元素为不可拖动即可）
	document.onmouseup = function(){
		self.isDraging = false;
	}
	self.g(p.open).onclick = function(){
		self.showDialog();
	}
	self.g(p.close).onclick = function(){
		self.hideDialog();
	}

	//窗口大小变化，dialog始终居中
	window.onresize = function(){
		self.resize();
	}
}
Drag.prototype.mouseDown = function(e){
	var e = e || window.event;
	var self = this;

	this.mouseOffsetX = e.pageX - self.g(self.box).offsetLeft;
	this.mouseOffsetY = e.pageY - self.g(self.box).offsetTop;
	this.isDraging = true;
}
Drag.prototype.mouseMove = function(e){
	var e = e || window.event;
	var self = this;

	var mouseX = e.pageX,mouseY = e.pageY,moveX = 0,moveY = 0;
	if(this.isDraging){
		moveX = mouseX - this.mouseOffsetX;
		moveY = mouseY - this.mouseOffsetY;

		//范围限定
		var pageWidth = document.documentElement.clientWidth;
		var pageHeight = document.documentElement.clientHeight;

		var dialogWidth = self.g(self.box).offsetWidth;
		var dialogHeight = self.g(self.box).offsetHeight;

		var maxX = pageWidth - dialogWidth;
		var maxY = pageHeight - dialogHeight;

		moveX = Math.min( maxX,Math.max(0,moveX));
		moveY = Math.min( maxY,Math.max(0,moveY));

		self.g(self.box).style.left = moveX + 'px';
		self.g(self.box).style.top = moveY + 'px';
	}
}
Drag.prototype.resize = function(){
	var self = this;

	self.fillToBody(self.g(self.mask));
	self.autoCenter(self.g(self.box));
}