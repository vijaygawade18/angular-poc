const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');

var CopyWebpackPlugin = (CopyWebpackPlugin = require('copy-webpack-plugin'), CopyWebpackPlugin.default || CopyWebpackPlugin);

const chalk = require('chalk');
const autoprefixer = require('autoprefixer');

const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const helpers = require('./helpers');

const METADATA = {
  title: 'AppOrbit',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer(),
  moduleName: process.env.APP_NAME || 'appOrbit'
};

if (METADATA.isDevServer) {
  METADATA.apiServer = process.env.API_END_POINT || 'http://localhost:8080';
} else {
  METADATA.apiServer = '';
}

module.exports = {
  metadata: METADATA,
  postcss: [ autoprefixer ],
  entry: {
    'polyfills': './src/polyfills.js',
    'vendor': './src/vendor.js',
    'app': './src/main.js'
  },

  resolve: {
    extensions: [ '', '.js' ],
    modules: [ helpers.root('src'), helpers.root('node_modules') ]
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        // Skip any files outside of your project's `src` directory
        include: [
          helpers.root("src")
        ],
        loader: "babel-loader"
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: [ helpers.root('src/index.html') ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]'
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [ 'raw-loader', 'sass-loader?sourceMap' ]
      },
      { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'file-loader' },

      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: [ 'polyfills', 'vendor' ].reverse()
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),

    new CopyWebpackPlugin([
      {
        from: helpers.root('node_modules', 'bootstrap/dist/css/bootstrap.min.css'),
        to: helpers.root('build', 'css/bootstrap.min.css')
      },
      {
        from: helpers.root('src', 'styles/template.css'),
        to: helpers.root('build', 'css/template.css')
      },
      {
        from: helpers.root('src', 'resources'),
        to: helpers.root('build', 'resources')
      }
    ]),

    new ProgressBarPlugin({
      format: '  build ' + chalk.blue.bold(':bar') + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'VERSION': JSON.stringify(process.env.WB_VERSION) || JSON.stringify("1.0.0")
      }
    })
  ],
  node: { global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false }
};