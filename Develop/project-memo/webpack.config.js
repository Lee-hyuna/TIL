const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const webpackConfig = (env, argv) => {
  return {
    entry: ['./src/main.js'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      chunkFilename: 'vendor.[chunkhash].js'
    },
    devServer: {
      contentBase: './dist',
      host: '0.0.0.0',
      disableHostCheck: true,
      historyApiFallback: true,
      inline: true
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'eslint-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(ico|gif|png|jp(e*)g|svg|woff|woff2|ttf|eot)$/,
          loader: 'url-loader',
          options: {
            name: '[hash].[ext]',
            limit: 10000
          }
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        filename: 'index.html',
        template: 'index.html'
      }),
  
      new MiniCssExtractPlugin({
        filename: './style.css'
      })
    ]
  }
}

module.exports = webpackConfig