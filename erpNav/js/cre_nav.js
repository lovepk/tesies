$(function() {
	window.menu = {
		init: function(data) {
			this.data = data;
			this.createTpl();
			// this.initNav(this.data, 2);
			// this.initNavClick();
		},
		createTpl: function() {
			this.leftNavTpl = juicer([
				'{@each nav as sitem,sindex}',
				'{@if sindex == 0}',
				'<li class="second active" data-id=${sitem.Id} data-name=${sitem.Name} data-py=${"*"+sitem.py} id=${"nav"+sitem.Id}>',
				'{@else}',
				'<li class="second" data-id=${sitem.Id} data-name=${sitem.Name} data-py=${"*"+sitem.py} id=${"nav"+sitem.Id}>',
				'{@/if}',
				'	<a href="javascript:;" class="second-btn"><span>${sitem.Name}</span></a>',
				'	<ul class="third-nav">',
				'      {@each sitem.children as titem,tindex}',
				'      {@if tindex == 0}',
		 		'		<li class="third active" data-id=${titem.Id} data-name=${titem.Name} data-py=${"*"+titem.py} id=${"nav"+titem.Id}>',
		 		'      {@else}',
		 		'		<li class="third" data-id=${titem.Id} data-name=${titem.Name} data-py=${"*"+titem.py} id=${"nav"+titem.Id}>',
		 		'      {@/if}',
		 		'           {@if titem.children.length > 0}',
		 		'			<a href="javascript:;" class="third-btn"><i></i>${titem.Name}</a>',
		 		'			<ul class="forty-nav">',
		 		'              {@each titem.children as fitem,findex}',
		 		'              {@if findex == 0}',				
		 		'			   <li class="forty active" data-id=${fitem.Id} data-py=${"*"+fitem.py} id=${"nav"+fitem.Id}>',
		 		'              {@else}',
		 		'			   <li class="forty" data-id=${fitem.Id} data-py=${"*"+fitem.py} id=${"nav"+fitem.Id}>',
		 		'              {@/if}',
		 		'                  <a href="" class="forty-btn outer-btn">$${fitem.Name}</a>',
		 		'              </li>',
		 		'              {@/each}',
		 		'			</ul>',
		 		'           {@else}',
		 		'			<a href="javascript:;" class="third-btn outer-btn">${titem.Name}</a>',
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
				'<li class="active"><a href="javascript:;" data-id=${item.Id}>${item.Name}</a></li>',
				'{@else}',
				'<li><a href="javascript:;" data-id=${item.Id}>${item.Name}</a></li>',
				'{@/if}',
				'{@/each}'
			].join(""));
			this.resultTpl = juicer([
				'{@each nav as item}',
				'<li><a href="javascript:;" data-fd=${item.fortyId*1} data-td="${item.thirdId}" data-sd="${item.secondId}">$${item.fortyName}<span class="second">$${item.secondName}</span><span class="third">$${item.thirdName}</span></a></li>',
				'{@/each}'
			].join(""));
		},
		// 默认id
		initNav: function(data, id) {
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
			// this.setLeftHeight();
		},
		getSecondData: function(data, id) {
			var secondNavList = [], thirdNavList = [], fortyNavList = [];
			for(var i=0; i<data.nav.length; i++) {
				if(id === data.nav[i].Id) {
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
				if($(this).hasClass('outer-btn')) { 
					$('.forty').removeClass('active');
					$(this).closest('.third').addClass('active');
				}
				self.setLeftHeight();
			})
			$secondWrapper.on('click', '.forty-btn', function(ev) {
				ev = ev || window.event;
				ev.preventDefault();
				$('.forty').removeClass('active');
				$(this).closest('.forty').addClass('active');
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
			$firstnavbtn.on('click', 'a', function(ev) {
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
				$('.result-wrapper').css('display', 'none');
				$delinput.removeClass('active');
			})
		},
		setLeftHeight: function() {
			var minHeight = $(window).height() - 50;  //最小高度
			var leftHeight = $('.leftnav-wrapper').height();
			var rightHeight  = $('.third-nav').height();
			if(leftHeight < minHeight) {
				if(rightHeight > minHeight) {
					$('.leftnav-wrapper').height(rightHeight + 110);
				} else {
					$('.leftnav-wrapper').height(minHeight);
				}
			} else {
				if(leftHeight < rightHeight) {
					$('.leftnav-wrapper').height(rightHeight + 110);
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
					obj.fortyPy = $forty.data('py');
				}
				if($third.length > 0) {
					obj.thirdName = $third.data('name');
					obj.thirdId = $third.data('id');
					obj.thirdPy = $third.data('py');
				}
				if($second.length > 0) {
					obj.secondName = $second.data('name');
					obj.secondId = $second.data('id');
					obj.secondPy = $second.data('py');
				}
				arr.push(obj);
			})
			this.searchData = arr;
			console.log(this.searchData)
		},
		replaceKey: function(str, key) {
			if(!str);
			str= str.split(key);
			return str.join('<i>' + key +'</i>');
		},
		search: function(keywords) {
			var result = [[],[],[]];
			var search;
			console.log(this.searchData)
			if(!keywords) return;
			console.log()
			for(var i=0; i<this.searchData.length; i++) {
				search = {};
				if(this.searchData[i].fortyName.indexOf(keywords) >=0 || this.searchData[i].fortyPy.indexOf(keywords) >=0) {
					$.extend(true,search,this.searchData[i]);
					if(this.searchData[i].fortyName.indexOf(keywords) >=0){
						search.fortyName = this.replaceKey(search.fortyName, keywords);
					}
					result[0].push(search);
					continue;
				}
				if(this.searchData[i].thirdName.indexOf(keywords) >=0 || this.searchData[i].thirdPy.indexOf(keywords) >=0) {
					$.extend(true,search,this.searchData[i]);
					if(this.searchData[i].thirdName.indexOf(keywords) >=0){
						search.thirdName = this.replaceKey(search.thirdName, keywords);
					}
					result[1].push(search);
					continue;
				} 
				if(this.searchData[i].secondName.indexOf(keywords) >=0 || this.searchData[i].secondPy.indexOf(keywords) >=0) {
					$.extend(true,search,this.searchData[i]);
					if(this.searchData[i].secondName.indexOf(keywords) >=0){
						search.secondName = this.replaceKey(search.secondName, keywords);
					}
					result[2].push(search);
					continue;
				}
			}
			console.log(result)
			for(var i=1; i<result.length; i++) {
				$.merge(result[0], result[i]);
				result[i].length = 0;
			}
			this.renderSearch(result[0], keywords);
		},
		renderSearch: function(array, keywords) {
			var data = {
				nav: array
			}
			var $search = this.resultTpl.render(data);
			$('.result-list').html($search);
		}
 	}
})
