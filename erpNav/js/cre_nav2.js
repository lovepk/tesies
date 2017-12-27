$(function() {
	window.menu = {
		init: function (jsonData) {
			this.jsonData = jsonData;
			var data = {
				nav:[]
			};
			data.nav.push({ PowerID: 0, PowerName: "首页", open: true });
			var list = this.getNode(0);
			for (var i = 0; i < list.length; i++) {
				data.nav.push(list[i]);
			}
			window.console.log(data);
			this.data = data;
			this.createTpl();
			this.initNav(this.data, 1);
			this.initNavClick();
			this.onClick();
		},
		createTpl: function() {
			this.leftNavTpl = juicer([
				'{@each nav as sitem,index}',
				'{@if  index==0}',
				'<li class="second active" data-id=${sitem.PowerID} data-name=${sitem.PowerName} data-pingyin=${sitem.PowerPinYinName} id=${"nav"+sitem.PowerID}>',
				'{@else}',
				'<li class="second" data-id=${sitem.PowerID} data-name=${sitem.PowerName} data-pingyin=${sitem.PowerPinYinName} id=${"nav"+sitem.PowerID}>',
				'{@/if}',
				'	<a href="javascript:;" class="second-btn"><span>${sitem.PowerName}</span></a>',
				'	<ul class="third-nav js-third-nav">',
				'      {@each sitem.children as titem,tindex}',
				'      {@if tindex==0}',
		 		'		<li class="third active" data-id=${titem.PowerID} data-name=${titem.PowerName} data-pingyin=${titem.PowerPinYinName} id=${"nav"+titem.PowerID}>',
		 		'      {@else}',
		 		'		<li class="third" data-id=${titem.PowerID} data-name=${titem.PowerName} data-pingyin=${titem.PowerPinYinName} id=${"nav"+titem.PowerID}>',
				'      {@/if}',
				'           {@if titem.children.length > 0}',
				'			<a href="javascript:;" class="third-btn"><i></i>${titem.PowerName}</a>',
				'			<ul class="forty-nav">',
		 		'              {@each titem.children as fitem}',
		 		'              {@if fitem.open}',				
		 		'				<li class="forty active" data-link="${fitem.PowerLink}"  data-id=${fitem.PowerID} data-pingyin=${fitem.PowerPinYinName} id=${"nav"+fitem.PowerID}>',
		 		'              {@else}',
		 		'				<li class="forty" data-link="${fitem.PowerLink}" data-id=${fitem.PowerID} data-pingyin=${fitem.PowerPinYinName} id=${"nav"+fitem.PowerID}>',
		 		'              {@/if}',
		 		'				<a href="javascript:void(0);" data-method="0" data-link="${fitem.PowerLink}" class="forty-btn js-menu-click outer-btn">$${fitem.PowerName}</a>',
		 		'				</li>',
		 		'              {@/each}',
		 		'			</ul>',
		 		'           {@else}',
		 		'			<a href="javascript:;" data-method="0" data-link="${titem.PowerLink}"  class="third-btn js-menu-click outer-btn">${titem.PowerName}</a>',
		 		'           {@/if}',
		 		'		</li>',
		 		'       {@/each}',
		 		'	</ul>',
				'</li>',
				'{@/each}'
			].join(""));
			this.topNavTpl = juicer([
				'{@each nav as item}',
				'{@if item.open}',
				'<li class="active"><a href="javascript:;" data-id=${item.PowerID}>${item.PowerName}</a></li>',
				'{@else}',
				'<li><a href="javascript:;" data-id=${item.PowerID}>${item.PowerName}</a></li>',
				'{@/if}',
				'{@/each}'
			].join(""));
			this.resultTpl = juicer([
				'{@each nav as item}',
				'<li><a href="javascript:;" data-fd=${item.fortyId *1} data-td="${item.thirdId}" data-sd="${item.secondId}" data-method="0" data-link="${item.link}" class="forty-btn js-menu-click">$${item.fortyName}<span class="second">$${item.secondName}</span><span class="third">$${item.thirdName}</span></a></li>',
				'{@/each}'
			].join(""));
		},
		// 默认id
		initNav: function (data, id) {
			// 默认渲染一级菜单
			$('.firstnav').html(this.topNavTpl.render(this.data));
			// 默认获取二级菜单数据
			this.renderSecond(id);
		},
		renderSecond: function(id) {
			this.getSecondData(this.data, id);
			var $leftnav = this.leftNavTpl.render(this.secondNavData);
			$('.second-nav').html($leftnav);
			this.getFortyList();
			this.onClick();
			this.setLeftHeight();
			this.setHeight();
		},
		getSecondData: function(data, id) {
			var secondNavList = [], thirdNavList = [], fortyNavList = [];
			for (var i = 0; i < data.nav.length; i++) {
				if (id === data.nav[i].PowerID) {
					secondNavList = data.nav[i].children;
				}
			}
			this.secondNavData = { nav: secondNavList};
		},
		initNavClick: function() {
			var self = this;
			var $secondWrapper = $('.second-nav'),
				$delinput = $('.search-wrapper .del'),
				$searchinput = $('.search-wrapper input'),
				$resultWrapper = $('.result-list'),
				$firstnavbtn = $('.firstnav');
			$secondWrapper.on('click', '.second-btn', function() {
				$(this).closest('.second').addClass('active').siblings().removeClass('active');
				self.setLeftHeight();
			})
			$secondWrapper.on('click', '.third-btn', function() {
				$(this).closest('.third').toggleClass('active').siblings().removeClass('active');
				self.setLeftHeight();
			})
			$secondWrapper.on('click', '.forty-btn', function(ev) {
				ev = ev || window.event;
				ev.preventDefault();
				$(this).closest('.forty').addClass('active').siblings().removeClass('active');
			})
			$('#searchnav').bind('input propertychange',function(ev) {
				ev = ev || window.event;
				var keywords = ev.target.value;
				if(!keywords){
					$('.result-wrapper').css('display', 'none');
					$delinput.removeClass('active');
				}else {
					$('.result-wrapper').css('display', 'block');
					$delinput.addClass('active');
				}
				self.search(keywords);
			})
			$delinput.on('click', function() {
				 $searchinput.val('');
				 $('.result-wrapper').css('display', 'none');
				 $delinput.removeClass('active');
			})
			$firstnavbtn.on('click', 'a', function (ev) {
				ev = ev || window.event;
				ev.preventDefault();
				$(this).parent().addClass('active').siblings().removeClass('active');
				self.renderSecond($(this).data('id'));
				$searchinput.val('');
				$('.result-wrapper').css('display', 'none');
				$delinput.removeClass('active');
			})
			$resultWrapper.on('click', 'a', function(ev) {
				ev = ev || window.event;
				ev.preventDefault();
				var $this = $(this);
				var openSecond = '#nav' + $this.data('sd'),
					openThird = '#nav' + $this.data('td'),
					openForty = '#nav' + $this.data('fd');
				$(openSecond).addClass('active').siblings().removeClass('active')
				$(openThird).addClass('active').siblings().removeClass('active')
				$(openForty).addClass('active').siblings().removeClass('active')
				$searchinput.val('');
				self.setLeftHeight();
				$('.result-wrapper').css('display', 'none');
				$delinput.removeClass('active');

			})
		},
		setLeftHeight: function () {
			var rightHeight = $(".second-nav .active .js-third-nav").height()+67;//右边实际高度
			var leftMinHeight = $(window).height() - (112);//左边最小高度
			var leftHeight = $(".js-leftnav-wrapper ul").height();//左边实际高度
			if (rightHeight > leftMinHeight) {
				if (rightHeight >= leftHeight) {
					$(".js-leftnav-wrapper").height(rightHeight);
				} else {
					$(".js-leftnav-wrapper").css("height", "auto");
				}
			} else {
				if (leftHeight <= leftMinHeight) {
					$(".js-leftnav-wrapper").css("height", "100%");
				} else {
					$(".js-leftnav-wrapper").css("height", "auto");
				}
			}
		},
		getFortyList: function() {
			var $outerbtn = $('.outer-btn');
			var arr = [], obj, $forty, $third, $second;
			$outerbtn.each(function(index, outer) {
				obj = {
					fortyId: '',
					fortyName: '',
					fortyPy: '',
					thirdId: '',
					thirdName: '',
					thirdPy: '',
					secondId: '',
					secondName: '',
					secondPy: ''
				};
				$outer 	= $(outer);
				$forty  = $outer.closest('.forty');
				$third 	= $outer.closest('.third');
				$second = $outer.closest('.second');
				if($forty.length > 0) {
					obj.fortyId = $forty.data('id');
					obj.fortyName = $forty.text();
					obj.fortyPy = $forty.data('pingyin')
				}
				if($third.length > 0) {
					obj.thirdName = $third.data('name');
					obj.thirdId = $third.data('id');
					obj.thirdPy = $third.data('pingyin')
				}
				if($second.length > 0) {
					obj.secondName = $second.data('name');
					obj.secondId = $second.data('id');
					obj.secondPy = $second.data('pingyin')
				}
				obj.link = $outer.data('link')
				arr.push(obj);
			})
			this.searchData = arr;
		},
		replaceKey: function (str, key) {
			if (!str) return;
			str = str.split(key);
			return str.join('<i>' + key + '</i>');
		},
		search: function(keywords) {
			var result = [[],[],[]];
			var search;
			if (!keywords) return;
			for (var i = 0; i < this.searchData.length; i++) {
				search = {};
				if (this.searchData[i].fortyName.indexOf(keywords) >= 0 || this.searchData[i].fortyPy.toLowerCase().indexOf(keywords.toLowerCase()) >= 0) {
					$.extend(true, search, this.searchData[i]);
					if (this.searchData[i].fortyName.indexOf(keywords) >= 0) {
						search.fortyName = this.replaceKey(search.fortyName, keywords);
					}
					result[0].push(search);
					continue;
				}
				if (this.searchData[i].thirdName.indexOf(keywords) >= 0 || this.searchData[i].thirdPy.toLowerCase().indexOf(keywords.toLowerCase()) >= 0) {
					$.extend(true, search, this.searchData[i]);
					if (this.searchData[i].thirdName.indexOf(keywords) >= 0) {
						search.thirdName = this.replaceKey(search.thirdName, keywords);
					}
					result[1].push(search);
					continue;
				} 
				if (this.searchData[i].secondName.indexOf(keywords) >= 0 || this.searchData[i].secondPy.toLowerCase().indexOf(keywords.toLowerCase()) >= 0) {
					$.extend(true, search, this.searchData[i]);
					if (this.searchData[i].secondName.indexOf(keywords) >= 0) {
						search.secondName = this.replaceKey(search.secondName, keywords);
					}
					result[2].push(search);
					continue;
				}
			}
			for(var i=1; i<result.length; i++) {
				$.merge(result[0], result[i]);
				result[i].length = 0;
			}
			this.renderSearch(result[0]);
		},
		renderSearch: function(array) {
			var data = {
				nav: array
			}
			var $search = this.resultTpl.render(data);
			$('.result-list').html($search);
			this.onClick();
		},
		getNode: function (parentID) {//这里试用递归查找节点，组合成Node
			var settings = this;
			var menuArr = new Array();
			if (settings.jsonData && settings.jsonData.length > 0) {
				for (var i = 0; i < settings.jsonData.length; i++) {
					if (parentID > 0) {/*子节点*/
						if (settings.jsonData[i].ParentID == parentID) {
							menuArr.push(settings.jsonData[i]);
						}
					} else { /*根节点*/
						var num = 0;
						for (var j = 0; j < settings.jsonData.length; j++) {
							if (settings.jsonData[i].ParentID == settings.jsonData[j].PowerID) {
								num = 1; break;
							}
						}
						if (num == 0) {
							var node = settings.jsonData[i];
							menuArr.push(settings.jsonData[i]);
						}
					}
				}
			}
			if (menuArr.length > 0) {
				menuArr.sort(function (a, b) { return a.PowerOrder > b.PowerOrder ? 1 : -1; })
			}
			for (var i = 0; i < menuArr.length; i++) {
				var child = settings.getNode(menuArr[i].PowerID)
				if (child.length > 0) {
					for (var j = 0; j < child.length; j++) {
						child[j].parent = menuArr[i];
					}
					menuArr[i].children = child;
				}
			}
			return menuArr;
		},
		onClick: function () {
			var self = this;
			var obj = $(".js-menu-click").each(function () {
				$(this).click(function () {
					var openMethod;
					if (!self.openMethod)
						openMethod = 0;
					if ($(this).attr("data-method").length > 0)
						openMethod = $(this).attr("data-method");
					if ($(this).attr("data-link") == '') {
						alert("该菜单不是有效的链接");
					} else {
						//alert($(this).attr("data-link"));
						openMenu($(this).text(), $(this).attr("data-link"), openMethod);
					}
				})
			})
		},
		setHeight: function () {
			var minHeight = $(window).height() - (110);
			//var height = $(".js-leftnav-wrapper").height();
			$(".js-leftnav-wrapper").css("min-height", minHeight);
			//$(".js-leftnav-wrapper").attr("data-height", height)
		}
		
 	}
})
$(document).ready(function () {
	$.ajax({
		url: "/api/default/getmenu",
		type: 'get',
		dataType: 'json',
		success: function (json) {
			if (json.success) {
				if ($.trim(json.rows).length > 0) {
					menu.init(json.rows);
				}
			}
		}
	});
});