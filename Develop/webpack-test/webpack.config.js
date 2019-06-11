const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const webpackConfig = (env, argv) => {
  return {
    entry: ['./src/main.js'],
    output: {
      path: path.resolve(__dirname, `./${argv.mode === 'production' ? 'dist' : 'WebContent'}`),
      filename: '[name].js',
      chunkFilename: 'vendor.[chunkhash].js'
    },
    devServer: {
      contentBase: './WebContent',
      host: '0.0.0.0',
      disableHostCheck: true,
      historyApiFallback: true,
      inline: true
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {}
          }
        },
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
          test: /\.(ico|gif|png|jp(e*)g|svg|woff|woff2|ttf|eot)$/,
          loader: 'url-loader',
          options: {
            name: '[hash].[ext]',
            limit: 10000
          }
        },
        {
          test: /\.(s*)css$/,
          use: [
            argv.mode === 'development' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': path.resolve(__dirname, './src')
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
    optimization: {
      minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin({})],
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            enforce: true,
            chunks: 'all'
          }
        }
      },
      concatenateModules: true
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html'
      }),
      new CopyWebpackPlugin([
        {
          from: './src/assets/favicon.ico',
          to: './favicon.ico',
          toType: 'file'
        }
      ]),
      new MiniCssExtractPlugin({
        filename: './style.css'
      }),
      new ManifestPlugin({
        fileName: 'assets.json',
        basePath: '/'
      })
    ]
  }
}

module.exports = webpackConfig
