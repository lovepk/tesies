define(function(c,b,d){function a(g,h){var f=31;switch(h){case 4:case 6:case 9:case 11:f=30;break;case 2:f=g%4==0?29:28;break;default:f=31;break;}return f;}var e=function(f){this.cfg=$.extend({range:[1993,0],onChange:function(){},onErr:function(){}},f);this.init();};e.prototype={init:function(){var h,i,g,f=this;this.elYear=$(f.cfg.year);this.elMonth=$(f.cfg.month);this.elDay=$(f.cfg.day);h=this.elYear.data("value");i=this.elMonth.data("value");g=this.elDay.data("value");this.createYearList();if(h){setTimeout(function(){f.elYear.val(h);},10);}this.createMonthList();if(i){setTimeout(function(){f.elMonth.val(i);},10);}this.createDayList(h,i);if(g){setTimeout(function(){f.elDay.val(g);},10);}},createYearList:function(){var g=[],h=this.cfg.range[0],f=this.cfg.range[1];console.log(f);if(f<=0){f=(new Date()).getFullYear()+f;}for(;h<=f;h++){g.push("<option value="+h+">"+h+"</option>");}this.elYear.html(this.elYear.html()+g.join(""));},createMonthList:function(){var f=[];for(var g=1;g<=12;g++){f.push("<option value="+g+">"+g+"</option>");}this.elMonth.html(this.elMonth.html()+f.join(""));},createDayList:function(j,k){var g=[],f=a(j,k);for(var h=1;h<=f;h++){g.push("<option value="+h+">"+h+"</option>");}this.elDay.html(this.elDay.html()+g.join(""));}};return function(f){new e(f);};});