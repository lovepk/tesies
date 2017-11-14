define(function(require, exports, module) {
    require('../lib/webuploader.js');
	var defOptions = {
		$showImglist: '#imglist',
		$uploaded: '#uploaded'
	}
	function uploadImage(options) {
		this.opt = $.extend({}, defOptions, options);
		this.init();
	}
	uploadImage.prototype = {
		init: function() {
			var self = this;
			this.elShowList = $(self.opt.$showImglist);
			this.elUped = $(self.opt.$uploaded);
			this.elUpbtn = $(self.opt.$upbtn);
			this.memoryImgs = $(self.opt.$memoryImgs);
			this.selbtn = $(self.opt.$selbtn);
			this.bind();
			this.css();
			this.initImgList();
			this.countShowNum();
		},
		// 修改时初始化渲染
		initImgList: function() {
			var self = this;
			var strjson = this.memoryImgs.val(),
				images = JSON.parse(strjson);
			if(images.length == 0) {
				console.log('no info!')
				return;
			};
			var newImages = new Array();
			$.each(images, function (index, value) {
		        if (typeof value.url === "undefined" || value.url === '') {
		            return;
		        }
		        var $li = $([
		            '<div id="' + value.fid + '" class="img-item thumbnail">',
		            '<img src="' + value.url + '" /><a href="javascript:;" class="del"></a>',
		            '</div>'
		        ].join(''));
		        $li.insertBefore(self.selbtn);
		        newImages.push(value);
			});
			images = newImages;
			self.memoryImgs.val(JSON.stringify(images));
			$('#upednum').text('已上传' + images.length + '/3');
		},
		// 计算预览图片的数量
		countShowNum: function() {
			var self = this;
			var num = $('.img-item').length;
			// 条件显示选择按钮，超过三张按钮消失，否则显示
			if(num == 3) {
				self.selbtn.hide();
			}
			if(num < 3) {
				self.selbtn.show();
			}
		},
		bind: function() {
			var self = this;
			// 点击上传按钮
			self.elUpbtn.click(function(event) {
				if(self.uploader.getFiles().length == 0) {
					$('#errmsg .errmsg').text('没有可上传的图片!').show().delay(1000).fadeOut();
				} else {
					self.uploader.upload();
				}
			})
			self.elShowList.on('mouseover', '.webuploader-pick', function() {
			    self.uploader.refresh();
			})
			self.elShowList.off('click', '.del').on('click', '.del', function(event) {
				event.preventDefault();
				self.delmemoryImg($(this));
			})
			// 上传配置
			self.uploader = WebUploader.create({
				// swf文件路径
    			//swf: '',
    			// 文件接收服务端。
    			server: self.opt.server,
    			// 选择文件的按钮。可选。
    			// 内部根据当前运行时创建，可能是input元素，也可能是flash.
    			pick: self.opt.$selbtn,
    			// 文件大小
    			fileSingleSizeLimit: 512 * 1024,
    			fileNumLimit: 3,
    			accept: self.opt.accept,
    			compress: false,
    			// auto: true
			})
			// 监听 当有文件添加进来的时候
			self.uploader.on( 'fileQueued', function( file ) {
				// console.log(file)
				if(self.elShowList.find('.img-item').length >= 3) {
					$('#errmsg .errmsg').text('最多上传三张图片').show().delay(1000).fadeOut();
					self.uploader.removeFile(file, true);
					return;
				}
			    var $li = $(
		            '<div id="' + file.id + '" class="img-item thumbnail">' +
		                '<img><a href="javascript:;" class="del"></a>' +
		            '</div>'
		        ),
		        $img = $li.find('img');
			    // 将选择的图片添加到按钮前
			    $li.insertBefore(self.selbtn);
			    // 为每个添加到队列中的图片添加删除监听
		    	$li.off('click', '.del').on('click', '.del', function() {
		            self.uploader.removeFile(file, true);
		            self.delmemoryImg($(this), file.id);
		        }) 
			    // 创建缩略图 如果为非图片文件，可以不用调用此方法。thumbnailWidth x thumbnailHeight 为 100 x 100
			    self.uploader.makeThumb( file, function( error, src ) {
			        if ( error ) {
			            $img.replaceWith('<span>不能预览</span>');
			            return;
			        }
			        $img.attr('src', src);
			    }, self.opt.width, self.opt.height);

			    //加入列队在隐藏域添加json对象占位
			    var strjson = self.memoryImgs.val(),
					images = JSON.parse(strjson);
				var obj = {
					"fid":file.id
				}
				images.push(obj);
				self.memoryImgs.val(JSON.stringify(images));
				self.countShowNum();
			});

			self.uploader.on('fileDequeued', function() {
				// console.log('队列删除')
			})

			// 文件上传成功，给item添加成功class, 用样式标记上传成功。
			self.uploader.on( 'uploadSuccess', function( file, res ) {
				// 此处要回调自定义挂载一些后台返回的变量
			    if (!res.success) {
					var strjson = self.memoryImgs.val(),
						images = JSON.parse(strjson);
			        var newImage = new Array();
					for(var i=0; i<images.length; i++) {
						if (file.id === images[i].fid) {
						    self.uploader.removeFile(file, true);
						    $('#' + file.id).remove();
						} else {
						    newImage.push(images[i]);
						}
					}
			        images = newImage;
					self.memoryImgs.val(JSON.stringify(images));
					// $('#errmsg .errmsg').text(err_msg).show().delay(1000).fadeOut();
				} else {
					self.opt.addCallback(file, res);
				}
			});
			self.uploader.on('error', function(handler) {
				switch(handler){
					case 'Q_TYPE_DENIED':
					err_msg = "图片类型不正确";
					break;
					case 'Q_EXCEED_NUM_LIMIT':
					err_msg = "最多3张图片";
					break;
					case 'Q_EXCEED_SIZE_LIMIT':
					case 'F_EXCEED_SIZE':
					err_msg = "图片大小不得超过512k";
					break;
					case 'F_DUPLICATE':
					err_msg = "请勿上传重复图片";
					break;
					default:
					err_msg = handler;
					break;
				}
				$('#errmsg .errmsg').text(err_msg).show().delay(1000).fadeOut();
			});
			// 文件上传失败，显示上传出错。
			self.uploader.on( 'uploadError', function( file, res ) {
				console.log('错误信息')
			    // var $li = $( '#'+file.id ),
			    //     $error = $li.find('div.error');

			    // // 避免重复创建
			    // if ( !$error.length ) {
			    //     $error = $('<div class="error"></div>').appendTo( $li );
			    // }

			    // $error.text('上传失败');
			});
			// 不管成功或失败 文件上传完成时触发
			self.uploader.on('uploadComplete', function() {
				console.log('complete')
				// self.uploader.reset();
			})
			self.uploader.on('uploadFinished', function() {
				console.log('finshed')
				self.uploader.reset();
			})
		},
		// 删除图片（并未真正删除，只是从预览区清除，从url存储处剔除，真正提交时就没有删除的图片地址了）
		// 修改时根据url来删，选择过程中根据fid占位符来删
		delmemoryImg: function($ele, fid) {
			var self 	= this,
				strjson = self.memoryImgs.val() || [],
				images 	= JSON.parse(strjson),
				url		= $ele.closest('.img-item').find('img').attr('src');
			$ele.closest('.img-item').remove();
			self.countShowNum();
			for(var i=0; i<images.length; i++) {
				if(url && url == images[i].url) {
					images.splice(i, 1);
					$('#upednum').text('已上传' + images.length + '/3');
					self.memoryImgs.val(JSON.stringify(images));
					return;
				}
				if(images[i].fid == fid) {
					images.splice(i, 1);
					$('#upednum').text('已上传' + images.length + '/3');
					self.memoryImgs.val(JSON.stringify(images));
					return;
				}
			}
		},
		// 添加插件样式
		css:function () {
			var cssText = ""+"@charset \"utf-8\";.webuploader-element-invisible{clip:rect(1px,1px,1px,1px);position:absolute !important;}";

			var styleEl = document.createElement("style");
			document.getElementsByTagName("head")[0].appendChild(styleEl);
			if (styleEl.styleSheet) {
				if (!styleEl.styleSheet.disabled) {
					styleEl.styleSheet.cssText = cssText;
				}
			} else {
				try {
					styleEl.innerHTML = cssText
				} catch(e) {
					styleEl.innerText = cssText;
				}
			}
		}
	}
	return function(obj) {
		new uploadImage(obj)
	}
})