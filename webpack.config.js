var webpack = require('webpack');
var path = require('path');
var ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
var config = {
  'feature-detects': [
    'input',
    'canvas',
    'css/resize'
  ]
}

module.exports = {
	devtool: 'inline-source-map',
	entry: [
			'webpack-dev-server/client?http://127.0.0.1:8000/',
			'webpack/hot/only-dev-server',
			'bootstrap-loader',
			'./src'
	],
	output: {
				path: path.join(__dirname, '/public/javascripts'),		
    			publicPath: '/public/javascripts/',
    			hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
    			hotUpdateMainFilename: 'hot/[hash].hot-update.json',
				filename: 'main.js',
				pathinfo: true
	},
	resolve: {
			    modules: ['node_modules', path.resolve(__dirname, "src")],
			    extensions: ['.ts', '.tsx', '.js'],
	},
	module: {
		loaders: [
			// Handles all Javascript files
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			// Handles the HTML File Formats
			{
				test: /\.html$/,
				loader: 'raw-loader'
			},
			//  Loads Sass
			{
				test:/\.scss$/,
				include: path.resolve(__dirname, './public/'),
				loaders: ['style-loader','css-loader','resolve-url-loader','autoprefixer-loader?browsers=last 3 versions', 'sass-loader?outputStyle=expanded' ],
			}, 
				// loads bootstrap's css.
		    { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url-loader?limit=10000&mimetype=application/font-woff" },
		    { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
		    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
		    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file-loader" },
		    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
			{ test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
			{ test: /\.jpe?g$|\.gif$|\.png$/i, include: path.resolve(__dirname, './public/images/'), loader: "file-loader?name=images/[name].[ext]"}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new ModernizrWebpackPlugin(config)
	],
	devServer: {
		hot: true,
		inline: true,
		quiet: false,
		serverSideRender: true,
		proxy: {
			'*': 'http://localhost:3000'
		}
	}
}