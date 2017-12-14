// const path = require('path'); //path模块是modejs里的
module.exports = function(options) {
	var config = {
		watch: options.watch,
		output: {
			// filename: 'bundle.js'// 入口文件生成为bundle.js
			filename: '[name].js', //生产目标文件名，这里因为没有指定entry, 需要处理的文件就是app.js里通过require引入的文件，使用了CommonJs的require.ensure 语法
			// 将字符串'dist' 解析到一个绝对路径里
			// path属性是目标文件bundle.js所在的目录
			// path: path.resolve(__dirname, 'dist')
			// 打包输出的文件放到options.pdir.src + '/js' 目录下
			path: options.pdir.src + '/js',
			// 生成可读性文件名
			chunkFilename: '[name].js',
			// 资源实际引用路径写法
			publicPath: options.pdir.pubPath + '/js/'
		},
		resolve: {
			// '' 这个是必须的不然会出现Module not found: Error: Cannot resolve 'file' or 'directory'的错误。
			extensions: ['', '.js', '.vue', '.css', '.scss'],
			alias: {
				v: options.pdir.src + '/scripts/views'
			}
		},
		// 为了在js中import一个css文件，需要在module配置中安装添加style-loader和css-loader
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						'style-loader',
						'css-loader'
					]
				},
				// 处理图片  file-loader / url-loader 这两个包可以接收并加载任何文件
				{
					test: /\.(png|svg|jpg|gif)$/,
					use: [
						'file-loader'
					]
				},
				// 处理字体文件
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					use: [
						'file-loader'
					]
				},
				// 处理数据文件
				{
					test: /\.xml$/,
					use: [
						'xml-loader'
					]
				}
			]
		}
	}
	return config;
}