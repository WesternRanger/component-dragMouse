#弹出层组件
**弹出层效果，可以拖动。**
##用法

页面结构请按照如下结构布局，id名字可以换，调用组件的脚本中的id名要跟页面中id一致。

	
	<div>
		<a id="log" href="#">弹出</a>
	</div>
	//触发弹出层的按钮
    <div id="mask"></div>
	//遮罩层，默认状态下隐藏
    <div id="dialogMove">
        <div id="dialogDrag">
            标题栏
            <a id="close" href="#">关闭按钮</a>
        </div>
        <div>
           你自定义的内容
        </div>
    </div>
然后需要初始化样式，因为mask遮罩层和dialogMove弹出层初始化的时候需要隐藏的。而且mask弹出后需要充满整个屏幕。所以为了能正常使用组件，要设计基本的样式：

		#dialogMove{
			width:380px;
	        height:auto;
	        position:absolute;
	        z-index:10;
	        background: #fff;
	        display: none;
		}
		#mask{
			background: #000;
	        position: absolute;
	        top: 0px;
	        left:0px;
	        opacity:0.4;
	        filter: Alpha(opacity=40);
	        display: none;
		}


调用组件之前先引入组件的链接。

	<script src="js/drag.js"></script>。

具体路径自己根据情况改写。
在页面的底部的script标签内写上如下脚本，来调用组件，这之中的id名字要跟上述页面中的id名字对应起来。


	var translate = {
            //以下传入的值均为id
            title : 'dialogDrag',//鼠标要拖拽的标题栏
            box:'dialogMove',//被拖动体
            mask:'mask',//半透明遮罩层
            open:'log',//调出浮层的触发按钮
            close:'close'//关闭浮层的按钮
        }
        drag(translate);

##总结
包含了好多小的知识点，比如说：
>（1）鼠标如何移动一个dom元素，mousedown，mousemove，mouseup的用法；

>（2）实现弹出层效果，其余部分半透明遮罩，点击半透明部分，弹出层消失；

>（3）onresize（）的用法，document.documentElement.clientWidth;的用法；

>（4）用脚本实现dom元素居中的函数。