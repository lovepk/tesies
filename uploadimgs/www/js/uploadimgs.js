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
			console.log(this.opt)
			this.elShowList = $(self.opt.$showImglist);
			this.elUped = $(self.opt.$uploaded);
			this.elUpbtn = $(self.opt.$upbtn);
			this.memoryImgs = $(self.opt.$memoryImgs);
			this.selbtn = $(self.opt.$selbtn);
			this.thumbnailWidth = parseInt((this.elShowList.width() - 10) / 3);
			this.bind();
			this.css();
			this.initImgList();
			console.log(this.selbtn.length)
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
			$.each(images, function(index, value) {
				var $li = $([
					'<div id="imgId' + index + '" class="img-item thumbnail">',
						'<img src=">' + value.imgurl + '" />',
					'</div>'
				].join(''));
				self.elShowList.append($li);
			})
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
				self.uploader.upload();
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
    			accept: self.opt.accept
			})
			// 监听 当有文件添加进来的时候
			self.uploader.on( 'fileQueued', function( file ) {
				// console.log(file)
			    var $li = $(
		            '<div id="imgId' + file.id + '" class="img-item thumbnail">' +
		                '<img><a href="javascript:;" id="del' + file.id + '"></a>' +
		            '</div>'
		        ),
		        $img = $li.find('img');
			    // 将选择的图片添加到按钮前
			    $li.insertBefore(self.selbtn);
			    // 为每个添加到队列中的图片添加删除监听
		    	self.elShowList.on('click', '#del' + file.id, function() {
		            $("#imgId"+file.id).remove();
		            self.uploader.removeFile(file);
		        }) 
			    // 创建缩略图 如果为非图片文件，可以不用调用此方法。thumbnailWidth x thumbnailHeight 为 100 x 100
			    self.uploader.makeThumb( file, function( error, src ) {
			        if ( error ) {
			            $img.replaceWith('<span>不能预览</span>');
			            return;
			        }
			        $img.attr( 'src', src );
			    }, self.thumbnailWidth, 200 );

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
				self.countShowNum();
			})

			// 文件上传成功，给item添加成功class, 用样式标记上传成功。
			self.uploader.on( 'uploadSuccess', function( file, res ) {
				console.log(file)
				var strjson = self.memoryImgs.val() || [],
					images = JSON.parse(strjson);
				// 此处要回调自定义挂载一些后台返回的变量
					self.opt.addCallback(file, res);
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
					err_msg = "文件过大";
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
			self.uploader.on( 'uploadError', function( file ) {
				console.log(file)
			    // var $li = $( '#'+file.id ),
			    //     $error = $li.find('div.error');

			    // // 避免重复创建
			    // if ( !$error.length ) {
			    //     $error = $('<div class="error"></div>').appendTo( $li );
			    // }

			    // $error.text('上传失败');
			});
		},
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