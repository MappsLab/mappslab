const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
// const fs = require('fs')

// const babelConfig = JSON.parse(fs.readFileSync('.babelrc'))
const projectRoot = path.resolve(__dirname, '..')

const common = merge([
	{
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: ['babel-loader'],
				},
			],
		},
		resolve: {
			alias: {
				Constants: path.resolve(__dirname, 'constants'),
				Components: path.resolve(__dirname, 'components'),
				Views: path.resolve(__dirname, 'views'),
				Utils: path.resolve(__dirname, 'utils'),
				Queries: path.resolve(__dirname, 'queries'),
				Types: path.resolve(__dirname, 'types'),
				Styles: path.resolve(__dirname, 'styles'),
				mapp: path.resolve(__dirname, '../packages/mapp/dist'),
			},
			extensions: ['.js'],
		},
	},
])

const development = merge([
	{
		mode: 'development',
		entry: [
			'@babel/polyfill',
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://localhost:8080',
			'webpack/hot/only-dev-server',
			'./index.dev.js',
		],
		output: {
			path: path.resolve(__dirname, '/js'),
			publicPath: '/js',
			filename: 'app.js',
			sourceMapFilename: 'app.js.map',
		},
		devtool: 'cheap-module-eval-source-map',
		plugins: [
			new webpack.NamedModulesPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('development'),
					PLATFORM_ENV: JSON.stringify('web'),
				},
			}),
		],
		devServer: {
			contentBase: path.resolve(projectRoot, 'public'),
			historyApiFallback: true,
			hot: true,
			host: '0.0.0.0',
			proxy: {
				'/api': {
					target: 'http://localhost:3000',
					pathRewrite: { '^/api': '' },
					secure: false,
				},
			},
		},
	},
])

const production = merge([
	{
		mode: 'production',
		entry: ['@babel/polyfill', './index.js'],
		output: {
			path: path.resolve(projectRoot, 'public/js/'),
			filename: 'app.js',
			sourceMapFilename: 'app.js.map',
		},
		devtool: 'source-map',
		optimization: {
			minimize: true,
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production'),
			}),
		],
	},
])

module.exports = (env) => {
	switch (env) {
		case 'production':
			return merge(common, production)
		case 'development':
		default:
			return merge(common, development)
	}
}