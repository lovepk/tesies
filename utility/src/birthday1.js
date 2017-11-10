define(function(require, exports, module) {
	// 辅助函数
	function getDay(year, month) {
		var end = 31;
		month = parseInt(month, 10);
		switch(month) {
			case 4:
			case 6:
			case 9:
			case 11:
				end = 30;
				break;
			case 2:
				end = year % 4 == 0 ? 29 : 28;
				break;
			default:
				end = 31;
				break;
		}
		return end;
	}

	var Birthday = function(obj) {
		// 给使用者暴露的东西
		this.cfg = $.extend({
			range: [1993, 0],
			onChange: function() {

			},
			onErr: function() {

			}
		}, obj)
		this.init();
	}
	Birthday.prototype = {
		init: function() {
			var year, month, day, self = this;
			this.elYear = $(self.cfg.year);
			this.elMonth = $(self.cfg.month);
			this.elDay = $(self.cfg.day);

			year = this.elYear.data('value');
			month = this.elMonth.data('value');
			day = this.elDay.data('value');

			this.createYearList();
			if(year) {
				setTimeout(function() {
					self.elYear.val(year);
				},10)
			}
			this.createMonthList();
			if(month) {
				setTimeout(function() {
					self.elMonth.val(month);
				},10)
			}
			this.createDayList(year, month);
			if(day) {
				setTimeout(function() {
					self.elDay.val(day);
				},10)
			}
			this.bind();
		},
		bind: function() {
			var self = this;
			this.elYear.change(function() {
				var y = self.elYear.val(),
					m = self.elMonth.val(),
					d = self.elDay.val();
				if(y % 4 == 0&& m == 2) {
					self.createDayList(y, m);
				}
				self.cfg.onChange(y, m, d);
			})
			this.elMonth.change(function() {
				var y = self.elYear.val(),
					m = self.elMonth.val(),
					d = self.elDay.val();
				if(y && m) {
					self.createDayList(y, d);
					d = self.elDay.val();
				}else {
					self.onErr('请输入年和月');
				}
				self.cfg.onChange(y, m, d);
			})
			this.elDay.change(function() {
				var y = self.elYear.val(),
					m = self.elMonth.val(),
					d = self.elDay.val();
				self.cfg.onChange(y, m, d)
			})
		},
		createYearList: function() {
			var options = [],
				start = this.cfg.range[0],

				end = this.cfg.range[1];
				console.log(end)
			if(end<=0) {
				end = (new Date()).getFullYear() + end;
			} 
			for(;start <= end; start++) {
				options.push('<option value=' + start + '>' + start + '</option>');
			}
			this.elYear.html(this.elYear.html() + options.join(''));
		},
		createMonthList: function() {
			var options = [];
			for(var i=1; i<=12; i++) {
				options.push('<option value=' + i + '>' + i + '</option>')
			}
			this.elMonth.html(this.elMonth.html() + options.join(''));
		},
		createDayList: function(year, month) {
			var options = [],
				end = getDay(year, month);
			for(var i=1; i<=end; i++) {
				options.push('<option value=' + i + '>' + i + '</option>');
			}
			this.elDay.html(this.elDay.html() + options.join(''));
		}
	}
	// 返回的是一个匿名函数，我们只能往里传东西的好像，具体里面实现了啥，看不见
	return function(obj) {
		new Birthday(obj);
	}
})