
;(function($){
  function Fullpage(){
    this.setting = {
     isStaticHerder:true,
     animateSpeed:600
    };
    this.wrapDiv = $('#container');
    this.showDiv();
    //创建一个公共的头
    //this.createStaticHeader();
    //创建华东按钮组
    this.createButtonGroups();
    //创建滑动动画效果
    this.wrapDivHeight = $('#container').height();
    //console.log( this.wrapDivHeight);
    this.sectionHeight = $('#container .section');
    this.button = $('.buttongroups li');
    this.mask = $('.mask');
    //console.log(this.button);
    this.slidAnimate();
    //创建按钮选中效果
    this.btnselecting = $('.buttongroups span');
    this.btnactive();
  }
  //Fullpage.extend();
  Fullpage.prototype = {
      btnactive:function(){
       this.btnselecting.each(function(){
         $(this).click(function(){
           $(this).addClass('active').parent().siblings().children().removeClass('active');
         });
       });
    },
    slidAnimate:function(){
      var that = this;
       that.wrapDiv.height(that.wrapDivHeight*that.button.length);
       
      that.sectionHeight.height(that.wrapDiv.height()/that.button.length);
      that.mask.height(that.sectionHeight.height());
      that.button.each(function(){
        //var that = that;
        $(this).click(function(){
          var index=that.button.index($(this));
          var topv = -that.sectionHeight.height()*index;
            that.wrapDiv.animate({top:topv},that.setting.animateSpeed);
        });
      });
    },
    createButtonGroups:function(){
      var buttons = [];
      //console.log(sectionLength)
      var buttonGroup = $('<div class="buttongroups"></div>');
      var buttonul = $('<ul></ul>');
      var sectionLength = $('#container .section').length;
          for (var i = 0; i < sectionLength; i++){
              var li = $('<li><span class="innercircle"></span></li>');
              buttonul.append(li);
            }
          //console.log(buttonul) ; 
         buttonGroup.append(buttonul);
         buttonGroup.append($('<div class="verticalLine"></div>'))
         this.wrapDiv.append(buttonGroup); 
         //console.log(this.wrapDiv);  
    },
    createStaticHeader:function(){
      if(this.setting.isStaticHerder) {
          var header = $('<div class="header"></div>');
          this.wrapDiv.append(header);
      }else{return}
    },
    showDiv:function(){
      //alert("jjajs");
    }
  };
  window.Fullpage = Fullpage;

})(jQuery);





















