const webpack = require('webpack')
const merge = require('webpack-merge')
const fs = require('fs')
const path = require('path')
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

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
				Components: path.resolve(__dirname, 'app/components'),
				Views: path.resolve(__dirname, 'app/views'),
				Styles: path.resolve(__dirname, 'app/styles'),
				Actions: path.resolve(__dirname, 'app/reapp/actions'),
				API: path.resolve(__dirname, 'app/api'),
				Stubs: path.resolve(__dirname, 'app/japp/stubs'),
				Types: path.resolve(__dirname, 'app/types'),
				Utils: path.resolve(__dirname, 'app/utils'),
				Queries: path.resolve(__dirname, 'app/queries'),
				Constants: path.resolve(__dirname, 'app/constants'),
				Storybook: path.resolve(__dirname, '.storybook'),
			},
			extensions: ['.js', '.jsx', '.web.js', '.svg.js'],
		},
	},
])
const development = (staging = false) =>
	merge([
		{
			mode: 'development',
			entry: [
				'babel-polyfill',
				'react-hot-loader/patch',
				'webpack-dev-server/client?https://localhost:8080',
				'webpack/hot/only-dev-server',
				'./app/index.web.dev.js',
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
				contentBase: path.resolve('public'),
				historyApiFallback: true,
				hot: true,
				https: {
					hostname: 'localhost',
					key: fs.readFileSync('./.aw-localhost.key'),
					cert: fs.readFileSync('./.aw-localhost.cert'),
				},
				host: '0.0.0.0',
				proxy: {
					'/api': {
						target: staging ? 'https://development.availableworks.net' : 'https://localhost:3000',
						pathRewrite: staging ? null : { '^/api': '' },
						changeOrigin: staging,
						secure: false,
					},
				},
			},
		},
	])

const staging = merge([
	{
		mode: 'development',
		entry: ['babel-polyfill', './app/index.web.dev.js'],
		output: {
			path: path.resolve(__dirname, 'public/js/'),
			filename: 'app.js',
			sourceMapFilename: 'app.js.map',
		},
		devtool: 'source-map',
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('staging'),
			}),
			// new LodashModuleReplacementPlugin({
			// 	currying: true,
			// }),
		],
	},
])

const production = merge([
	{
		mode: 'production',
		entry: ['babel-polyfill', './app/index.web.js'],
		output: {
			path: path.resolve(__dirname, 'public/js/'),
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
			// new LodashModuleReplacementPlugin({
			// 	currying: true,
			// }),
		],
	},
])

module.exports = (env) => {
	switch (env) {
		case 'production':
			return merge(common, production)
		case 'development-staging':
			return merge(common, development(true))
		case 'staging':
			return merge(common, staging)
		default:
			return merge(common, development())
	}
}
