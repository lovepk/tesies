
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('postcss-cssnext');
gulp.task('css', function() {
	var plugins = [
		cssnext,
		autoprefixer({browsers: ['> 1%'], cascade: false})
	];
	return gulp.src('src/css/*.css')
	.pipe(postcss(plugins))
	.pipe(gulp.dest('dist/css'));
})