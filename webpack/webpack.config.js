const path = require('path'); //path模块是modejs里的
module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: 'bundle.js',
		// 将字符串'dist' 解析到一个绝对路径里
		// path属性是目标文件bundle.js所在的目录
		path: path.resolve(__dirname, 'dist')
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