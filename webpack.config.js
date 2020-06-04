const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

const getFileName = (ext) => (isProd ? `bundle.[hash].${ext}` : `bundle.${ext}`);
const getJSLoaders = () => {
  let loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  ];

  if (isDev) {
    loaders = [...loaders, 'eslint-loader'];
  }

  return loaders;
};

module.exports = {
  devServer: {
    hot: true,
    port: 3000,
  },
  devtool: isDev ? 'eval-source-map' : null,
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: getFileName('js'),
  },
  context: path.resolve(__dirname, 'src'),
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: getJSLoaders(),
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { hmr: isDev, reloadAll: true } },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: { removeComments: isProd, collapseWhitespace: isProd },
    }),
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, 'src/favicon.ico'), to: path.resolve(__dirname, 'dist') }],
    }),
    new MiniCssExtractPlugin({
      filename: getFileName('css'),
    }),
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src'),
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
