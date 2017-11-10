define(function(require, exports, module) {
    function getDay(year, month) {
        var ret = 31;

        month = parseInt(month, 10);
        switch (month) {
            case 4:
            case 6:
            case 9:
            case 11:
                ret = 30;
                break;
            case 2:
                ret = year % 4 == 0 ? 29 : 28;
                break;
            default:
                ret = 31;
                break;
        }
        return ret;
    }

    function Birthday(cfg) {
        this.cfg =$.extend({
            range:[1950, 0],
            onChange: function () {
            },
            onError: function (msg) {
            }
        }, cfg);

        this.init();
    }
    Birthday.prototype = {
        init: function () {
            var year, month, day, self = this;
            this.elYear = $(this.cfg.year);
            this.elMonth = $(this.cfg.month);
            this.elDay = $(this.cfg.day);
            year = this.elYear.data('value');
            month = this.elMonth.data('value');
            day = this.elDay.data('value');
            
            this.createYearList();
            //设置默认值
            if (year) {
                setTimeout(function () {
                    self.elYear.val(year);
                }, 10);
            }
            this.createMonthList();
            if (month) {
                setTimeout(function () {
                    self.elMonth.val(month);
                }, 10);
            }
            this._dayhtml = this.elDay.html();
            this.createDayList(year, month);
            if (day) {
                setTimeout(function () {
                    self.elDay.val(day);
                }, 10);
            }

            if (month && day) {
                this.cfg.onChange.call(this, year, month, day);
            }

            this.bind();
        },
        bind: function () {
            var self = this;
            this.elDay.change(function () {
                var y = self.elYear.val(),
                    m = self.elMonth.val(),
                    d = self.elDay.val();
                

                self.cfg.onChange.call(self, y, m, d);
            });
            this.elMonth.change(function () {
                var y = self.elYear.val(),
                    m = self.elMonth.val(),
                    d = self.elDay.val();
                
                if (y && m) {
                    self.createDayList(y, m);
                    d = self.elDay.val();
                } else {
                    self.cfg.onError('请选择年和月');
                }
                self.cfg.onChange.call(self, y, m, d);
            });
            this.elYear.change(function () {
                 var y = self.elYear.val(),
                    m = self.elMonth.val(),
                    d = self.elDay.val();
                
                if (y % 4 == 0 && m == 2) {
                    self.createDayList(y, m);
                    d = self.elDay.val();
                }
                self.cfg.onChange.call(self, y, m, d);
            });
        },
        createYearList: function () {
            var options = [];
                start = this.cfg.range[0],
                end = parseInt(this.cfg.range[1] || 0, 10);  // 转换为十进制

            if (end <= 0) {
                end = (new Date()).getFullYear() + end;
            }

            for (; start <= end; start++) {
                options.push('<option value="' + start + '">' + start + '</option>');
            }
            this.elYear.html(this.elYear.html() + options.join(''));
        },
        createMonthList: function () {
            var options = [];
            for (var i = 1; i <= 12; i++) {
                options.push('<option value="' + i + '">' + i + '</option>');
            }
            this.elMonth.html(this.elMonth.html() + options.join(''));
        },
        createDayList: function (year, month) {
            var end = getDay(year, month), options = [];
            
            for (var i = 1; i <= end; i++) {
                options.push('<option value="' + i + '">' + i + '</option>');
            }
            this.elDay.html(this._dayhtml + options.join(''));
        }
    };

    return function(obj) {
        new Birthday(obj);
    };
});
