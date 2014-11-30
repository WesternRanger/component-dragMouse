/**
 * Created by 陈奇 on 14-10-9.
 */
function drag(p){
	var mouseOffsetX = 0;
	var mouseOffsetY = 0;
	var isDraging = false;
	//获取dom元素
	function g(id){
		return document.getElementById(id);
	}
//鼠标事件一，在标题栏按下，（要计算鼠标相对于拖拽元素的左上角的坐标，并且标记元素为可拖动）
	g(p.title).addEventListener('mousedown',function(e){
		var e = e || window.event;
		mouseOffsetX = e.pageX - g(p.box).offsetLeft;
		mouseOffsetY = e.pageY - g(p.box).offsetTop;
		isDraging = true;
	},false);
//鼠标事件二，鼠标移动（要检测鼠标是否标记为移动，如果是，则更新元素的位置到当前鼠标的位置，即，要减去第一步中获得的偏移）
	document.onmousemove = function(e){
		var e = e || window.event;
		var mouseX = e.pageX,mouseY = e.pageY,moveX = 0,moveY = 0;
		if(isDraging){
			moveX = mouseX - mouseOffsetX;
			moveY = mouseY - mouseOffsetY;

			//范围限定
			var pageWidth = document.documentElement.clientWidth;
			var pageHeight = document.documentElement.clientHeight;

			var dialogWidth = g(p.box).offsetWidth;
			var dialogHeight = g(p.box).offsetHeight;

			var maxX = pageWidth - dialogWidth;
			var maxY = pageHeight - dialogHeight;

			moveX = Math.min( maxX,Math.max(0,moveX));
			moveY = Math.min( maxY,Math.max(0,moveY));

			g(p.box).style.left = moveX + 'px';
			g(p.box).style.top = moveY + 'px';
		}
	}
//鼠标事件三，鼠标松开的时候（标记元素为不可拖动即可）
	document.onmouseup = function(){
		isDraging = false;
	}



	//打开浮层
	function showDialog(){
		g(p.box).style.display = 'block';
		g(p.mask).style.display = 'block';
		fillToBody(g(p.mask));
		autoCenter(g(p.box));
	}
	//关闭浮层
	function hideDialog(){
		g(p.box).style.display = 'none';
		g(p.mask).style.display = 'none';
	}
	g(p.open).addEventListener('click',showDialog,false);
	g(p.close).addEventListener('click',hideDialog,false);

	//窗口大小变化，dialog始终居中
	window.onresize = function(){
		fillToBody(g(p.mask));
		autoCenter(g(p.box));
	}
	//自动居中
	function autoCenter( el ){
		var bodyW = document.documentElement.clientWidth;
		var bodyH = document.documentElement.clientHeight;

		var elW = el.offsetWidth;
		var elH = el.offsetHeight;

		el.style.left = (bodyW-elW)/2 + 'px';
		el.style.top = (bodyH-elH)/2 + 'px';
	}
//遮罩层充满屏幕
	function fillToBody( el ){
		el.style.width = '100%';
		el.style.height ='100%';
	}
}