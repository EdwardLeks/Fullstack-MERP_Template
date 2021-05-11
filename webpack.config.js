//#region Variables
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
// Dev vars
const isDev = process.env.NODE_ENV;
const isProd = !isDev;
//#endregion

//#region Functions
const pluginLoader = () =>{
	let base = [
		new CopyWebpackPlugin({
      patterns: [
        { from: "./src/views/", to: "views"}
      ]
    }),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		})
	]
	return base;
}

const styleLoader = extra => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				publicPath: ''
			}
		},
		'css-loader'
	]	

	if(extra){
		loaders.push(extra)
	}

	return loaders
}

const optimization = () => {
  const config = {
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config;
}
//#endregion

//#region Module
module.exports = {
	entry: {
		index: path.join(__dirname, "src/js", "index.js"),
		app: path.join(__dirname, "src/js", "app.js"),
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	target: 'web',
	devtool: 'source-map',
	plugins: pluginLoader(),
	optimization: optimization(),
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
        test: /\.pug$/,
        include: path.join(__dirname, 'src'),
        use: ["pug-loader"]
    	},
			{
				test: /\.css$/,
				use: styleLoader()
			},
			{
				test: /\.s[ac]ss$/,
				use: styleLoader('sass-loader')
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]'
						}
					},
					'img-loader',
				]
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]'
						}
					}
				]
			},
		]
	}
};
//#endregion