'use strict';

var scripts = document.scripts,
    boot;
boot = scripts[scripts.length - 1].getAttribute('data-init');
// 分割写法,webpack通过本入口文件，按照switch中的require生成多个chunk文件，实际引入的时候是按需加载的
require(['./lib'],function(require){
    switch (boot) {
		case 'index-page': 
		// 这样引入却没执行
			require(["v/index-page"]);
			break;
		case 'second-page':
			require(['v/second-page']);
			break;
		default:
			break;
	}
});

// 通过require.ensure()生成一个大的chunk文件,包含了switch里所有的require的文件
// require.ensure([],function(require) {
// 	switch (boot) {
// 		case 'index-page': 
// 		// 这样引入却没执行
// 			require(["v/index-page"]);
// 			break;
// 		case 'second-page':
// 			require(['v/second-page']);
// 			break;
// 		default:
// 			break;
// 	}
// })
