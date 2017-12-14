'use strict';
// 开发环境的目录结构：
//src
// 	css
// 	html
// 	images
// 	js
// 	sass
// 	scripts
// 		components
// 		boot
// 		utils
// 		views

// 生产环境的目录结构：
// dist
// 	1.0.0
// 		css
// 		images
// 		js
// 		rev
	
	// 使用gulp所必须的
var gulp = require('gulp'),
	//gulp里的监听插件
	watch = require('gulp-watch'),
	//浏览器同步插件
	Browsersync = require('browser-sync').create(),
	// 使用gulp编译scss文件
	compass = require('gulp-compass'),
	// gulp里使用webpack
  	webpack = require('gulp-webpack'),
  	// gulp的图片压缩插件
  	imagemin = require('gulp-imagemin'),
  	// vinyl-named插件 该插件保证webpack生成的文件名能够和原文件对上
  	named = require('vinyl-named');

var webpackConfig = require("./gulp.webpack.config.js"),
	projectConfig = require("./gulp.project.config.js");

// 多个项目使用同一套构建方案

projectConfig.forEach(function(item) {
	// 构建每个项目时需要使用的路径名
	var pdir = {};
	// 项目根目录
	pdir.base = __dirname + '/project/' + item.name;
	// 开发环境
	pdir.src = pdir.base + '/src';
	// 生产环境
	pdir.dest = pdir.base + '/dist';
	// 监听哪些文件
	pdir.watch = [pdir.src + '/css/**/*.css', pdir.src + '/js/*.js', pdir.src + '/images/**/*.{png,jpg,svg,gif}'];
	// proxy
	pdir.proxy = 'vue.gulp.webpack/project/' + item.name + '/src/html';
	// 静态资源实际引入路径
	pdir.pubPath = "//vue.gulp.webpack/project/" + item.name + "/src";

// 每个项目做哪些处理
	var task = {
		// 开发环境scss编译
		compassdev: item.name + ':compassdev',
		// 预发布打包时scss编译
		compassrel: item.name + ':compassrel',
		// webpack打包，根据参数进行开发环境和生产环境区分
		webpack: item.name + ':webpack',
		// 热更新
		sync: item.name + ':sync',
		dev: item.name + ':dev'
	}
	task.devs = [task.compassdev, task.webpack, task.sync];
	function fncompass(watch) {
		return gulp.src(pdir.src + '/sass/**/*.scss')
					.pipe(compass({
						style: 'compressed',
						// task值为watch时会监听并根据改动自动编译
						task: watch,
						time: true,
						images: pdir.src + '/images',
						sass: pdir.src + '/sass',
						css: pdir.src + '/css'
					}))
	}
	function fnwebpack(env, watch) {
		var options = {};
		options.env = env;
		options.watch = watch;
		options.pdir = pdir;
		return gulp.src([pdir.src + '/scripts/app.js'],{ base: pdir.src + "/scripts"})
				.pipe(named())
				.pipe(webpack(webpackConfig(options)))
				.pipe(gulp.dest((env == 'production'?pdir.src:pdir.dest) + '/js'));
	}
	// 开发环境会需要自动编译,生产环境的打包不需要自动编译
	gulp.task(task.compassdev, function() {
		fncompass('watch');
	})
	gulp.task(task.webpack, function() {
		fnwebpack('production', true);
	})
	gulp.task(task.sync, function() {
		Browsersync.init({
			notify: false,
			// 此处是根据目录结构，也可以是其他方式
			proxy: pdir.proxy
		})
		watch(pdir.watch, {events: ['add', 'change']}, Browsersync.reload);
	})
	// 开发环境要做的事：把scss编译成css，放到开发环境的css目录下；webpack打包放到开发环境的js目录下；热更新；
	// 敲的任务命令是task.dev,正真完成所有任务是task.devs任务
	gulp.task(task.dev, task.devs, function() {

	})
	
})
