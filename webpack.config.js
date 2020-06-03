const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		hot: true,
		port: 9000,
	},
	mode: "development",
	entry: "./index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.[hash].js",
	},

	context: path.resolve(__dirname, "src"),
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({ template: "index.html" }),
		new CopyPlugin({
			patterns: [{ from: path.resolve(__dirname, "src/favicon.ico"), to: path.resolve(__dirname, "dist") }],
		}),
		new MiniCssExtractPlugin({
			filename: "bundle.[hash].css",
		}),
	],
	resolve: {
		extensions: [".js"],
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@core": path.resolve(__dirname, "src"),
		},
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				test: /\.js(\?.*)?$/i,
			}),
		],
	},
};
