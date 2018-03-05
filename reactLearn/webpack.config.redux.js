var webpack = require('webpack');

module.exports = {
	entry: './srcredux/app.js',
	output: {
		path: __dirname + '/build-redux',
		filename: 'bundle-redux.js'
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