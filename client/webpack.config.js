const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const APP_FOLDER = path.resolve(__dirname, './src');
const SCSS_FOLDER = path.resolve(__dirname, './scss');

// const FONTS_FOLDER = path.resolve(__dirname, './scss/fonts');
const ICONS_FOLDER = path.resolve(__dirname, './icons');
const ASSETS_FOLDER = path.resolve(__dirname, './src/assets');

const DIST_FOLDER = path.resolve(__dirname, './dist');
const DIST_FOLDER_STYLE = path.resolve(DIST_FOLDER, './css');

const INCLUDE_SCSS_FOLDER = path.resolve(__dirname, './src/components');

const extractSCSSBundle = new ExtractTextPlugin({
	filename: '[name].bundle.css',
	allChunks: true
});

require('dotenv').config(); // load from .env file

console.log('webpack; node-env ', process.env.NODE_ENV);

const PRODUCTION_MODE = process.env.NODE_ENV === 'production';
console.log('webpack; PRODUCTION_MODE ', PRODUCTION_MODE);

const config = {
	// entry: ['./src/index.jsx', './src/scss/index.scss', './src/components/main.scss'],
	entry: ['./src/index.jsx', './scss/styles.scss'],
	output: {
		path: DIST_FOLDER,
		filename: 'bundle.js'
	},

	devtool: PRODUCTION_MODE ? 'inline-source-map' : 'inline-source-map',
	// devtool: 'inline-source-map', // development
	// devtool: 'eval-source-map',		// development
	//	devtool: 'source-map',	// production
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: false, // true
		// inline: true,
		port: 8021,
		clientLogLevel: 'info',
		proxy: {
			'/api/**': { target: 'http://localhost:3001', changeOrigin: true, secure: false }
		}
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			// {
			// 	test: /\.css$/,
			// 	loader: ExtractTextPlugin.extract({
			// 		fallback: 'style-loader/url!file-loader',
			// 		use: ['css-loader'],
			// 		publicPath: DIST_FOLDER_STYLE
			// 	})
			// },

			{
				test: /\.(sass|scss)$/,
				include: INCLUDE_SCSS_FOLDER,
				exclude: [SCSS_FOLDER, /node_modules/],
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.(sass|scss)$/,
				include: SCSS_FOLDER,
				exclude: [INCLUDE_SCSS_FOLDER, /node_modules/],
				loader: extractSCSSBundle.extract(['css-loader', 'sass-loader'])
			},
			{
				test: /\.(png|jpg|jpeg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				// include: [FONTS_FOLDER, ICONS_FOLDER],
				include: [ICONS_FOLDER],
				loader: 'file-loader?name=assets/[name].[ext]'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	plugins: [
		new webpack.EnvironmentPlugin(['NODE_ENV']),
		extractSCSSBundle,
		new CopyWebpackPlugin([{ from: 'index.html', to: '.' }], { debug: 'info' }),
		// new CopyWebpackPlugin([{ from: 'src/assets/images', to: 'images' }], { debug: 'info' }),
		// new CopyWebpackPlugin([{ from: 'src/assets/fonts', to: 'assets/fonts' }], { debug: 'info' })
		new CopyWebpackPlugin([{ from: 'static/favicon_package', to: '.' }], { debug: 'info' })
	]
};

module.exports = config;
