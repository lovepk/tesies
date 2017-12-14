'use strict';

var scripts = document.scripts,
    boot;
boot = scripts[scripts.length - 1].getAttribute('data-init');
// 1.0的webpack 支持这种代码分割写法。
// 通过这个app.js来按需加载。
// require('./lib', function(require) {
// 	switch (boot) {
// 		case 'index-page': 
// 			require(["v/index-page.js"]);
// 			break;
// 	}
// })

// 3.0的webpack 要使用require.ensure() 来实现代码分割。
require.ensure([], function(require){
    require('./lib');
    switch (boot) {
		case 'index-page': 
		// 这样引入却没执行
			require("v/index-page.js");
			break;
	}
});