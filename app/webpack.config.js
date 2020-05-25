const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const babelConfig = require('./.babelrc')

const resourceRegExp = /_(\w+)\.tsx/
const ignorePlugin = new webpack.WatchIgnorePlugin([resourceRegExp])

const common = merge([
	{
		plugins: [ignorePlugin],
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: ['babel-loader'],
				},
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					use: ['ts-loader'],
				},
			],
		},
		resolve: {
			symlinks: false,
			alias: {
				// deepmerge$: path.resolve(__dirname, 'node_modules/deepmerge/dist/umd.js'),
				Constants: path.resolve(__dirname, 'src', 'constants'),
				Components: path.resolve(__dirname, 'src', 'components'),
				Views: path.resolve(__dirname, 'src', 'views'),
				Utils: path.resolve(__dirname, 'src', 'utils'),
				Queries: path.resolve(__dirname, 'src', 'queries'),
				Types: path.resolve(__dirname, 'src', 'types'),
				Styles: path.resolve(__dirname, 'src', 'theme'),
				Test: path.resolve(__dirname, 'src', '__test__'),
				Jest: path.resolve(__dirname, 'jest'),
				mapp: path.resolve(__dirname, '../packages/mapp/dist'),
			},
			extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
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
			'./src/index.tsx',
		],
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: babelConfig.presets.map((preset) => preset),
								plugins: babelConfig.plugins.map((plugin) => {
									if (typeof plugin === 'string') return plugin
									return [...plugin]
								}),
							},
						},
					],
				},
			],
		},
		output: {
			path: path.resolve(__dirname, 'public', 'js'),
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
		resolve: {
			alias: {
				mapp: path.resolve(__dirname, '../packages/mapp/src'),
				'react-dom': '@hot-loader/react-dom',
			},
			extensions: ['.js'],
		},
		devServer: {
			contentBase: path.resolve(__dirname, 'public'),
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
		mode: 'development',
		entry: ['@babel/polyfill', './src/index.tsx'],
		output: {
			path: path.resolve(__dirname, 'public', 'js'),
			filename: 'app.js',
			sourceMapFilename: 'app.js.map',
		},
		devtool: 'source-map',
		optimization: {
			minimize: true,
		},
		plugins: [
			new webpack.NamedModulesPlugin(),
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
