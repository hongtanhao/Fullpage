/**实现touch移动触屏滑动事件
 * 创建一个slider对象
 * 手机端的滑屏效果其实就是pc端的轮播图效果
**/
var slider = {
    //判断设备是否支持touch事件
	touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
	//self:function(){console.log(this)},
	//事件
	events:{
		index:0,//显示元素的索引
        slider: document.getElementById('container'),//this 为slider对象
        sections: document.getElementsByClassName('section'),
        height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,    
        setHeight:function(){
        	for (var i = 0;i<this.sections.length; i++) {
        		this.sections[i].style.height=this.height;
        	}
        },
        handleEvent:function (event) {
        	var self = this;//this为events对象
        	if (event.type=="touchstart") {
        		self.start(event);
        	}else if(event.type=="touchmove"){
        		self.move(event);
        	}else if(event.type=="touchend"){
        		self.end(event);
        	}
        },
        //滑动开始
        start:function(event){
        	var touch    = event.targetTouches[0];//touchs数组对象获得屏幕上的所有touch,取第一个touch
        	    startPos = {x:touch.pageX,y:touch.pageY,time:+new Date};//取得第一个touch的坐标值
        	    isScrolling = 0;//这个参数判断垂直滚动还是水平滚动
        	
        	    this.slider.addEventListener('touchmove',this,false);
        	    this.slider.addEventListener('touchend',this,false);
        },
        //移动
        move:function(event){
        	//var self = this;
        	//当屏幕有多个touch或者页面被缩放过，就不执行move操作
        	if(event.targetTouches.length>1||event.scale && event.scale!==1)return;
        	var touch    = event.targetTouches[0];
        	    endPos = {x:touch.pageX-startPos.x,y:touch.pageY-startPos.y};
        	    isScrolling = Math.abs(endPos.x)<Math.abs(endPos.y)?1:0;//1表示纵向滑动 0 表示横向滑动
        	    
        	    if(isScrolling===0){
        	    	 alert("sorry,please slide at vertical direction!");
        	    	return;
        	    }else if (isScrolling===1) {
        	    	//alert(isScrolling);
        	    	event.preventDefault();//阻止触摸事件的默认行为，即阻止滚屏
        	    	this.anmate(this.height);
        	    	console.log(this.height);
        	    	
        	    }
        },
        anmate:function(height){
        	var self=this;
            var intervalTime = 200,
                count=200,
                speed=Math.floor(height/(intervalTime/count)),
                intial=0;
            var timer=setInterval(function(){
                 intial +=speed;
                 console.log(speed);
                 self.slider.style.top =-self.index*intial +"px";
                 if(height <= intial){
                 	clearInterval(timer);
                 }
            },intervalTime/count);
        },
        end:function(event){
        	var duration = +new Date -startPos.time;//滑动持续的时间
        	if (isScrolling===1) {
        		if (endPos.y>10) {
        			if (this.index===0){ 
        				this.index =this.sections.length-1;
        			}else{
        					this.index -=1;
        				}
        		}else if (endPos.y<-10) {
        			if (this.index===this.sections.length-1){
        			 this.index =0;
        			}else{
        				this.index+=1;
        				console.log(this.index);
        			}
        		}
        	}
        	//解除绑定
        this.slider.removeEventListener('touchmove',this,false);
        this.slider.removeEventListener('touchend',this,false);
        }
    },
	init:function(){
		var self = this;
		if (!!self.touch) self.events.slider.addEventListener('touchstart',self.events,false);
	}
};
slider.init();







