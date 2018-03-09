var webpack = require('webpack');

module.exports = {
	entry: './srcwzq/app.js',
	output: {
		path: __dirname + '/build-wzq',
		filename: 'bundle-wzq.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				plugins: ['transform-runtime'],
				presets: ['es2015', 'react']
			}
		},{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}]
	}
}