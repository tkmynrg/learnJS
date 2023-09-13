const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const browsersList = [
  "edge >= 16",
  "safari >= 10",
  "firefox >= 57",
  "ios >= 10",
  "chrome >= 50"
]

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: true
    });
  });
}
//if u dont need clear cache set random to 0
const random = Math.round(0 - 0.5 + Math.random() * (100 + 1))

const htmlPlugins = generateHtmlPlugins('./src/html/views');

const config = {
  target: ['web'],
  entry: {
   app: path.resolve(path.resolve(__dirname, './src/'), 'js', 'index.js'),
  },
  output: {
    filename: 'js/[name].js?v='+ random,
    path: path.resolve(__dirname, './dist/'),
  },
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        extractComments: true
      }),
      new CssMinimizerPlugin(),
    ],
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, "node_modules/swiper"),
          path.resolve(__dirname, "src/"),
        ],
        use: [{
          loader: 'babel-loader',
        }]
      },
      {
        test: /.s?css$/,
        include: path.resolve(__dirname, 'src/scss'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      overrideBrowserslist: browsersList
                    }
                  ]
                ]
              }
            },
          },
        ]
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/html/includes'),
        use: ['raw-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.svg$/,
        use: [
          'svg-sprite-loader',
          'svgo-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      $: path.resolve('node_modules', 'jquery/src/jquery'),
      jquery: path.resolve('node_modules', 'jquery/src/jquery'),
    }
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
    new MiniCssExtractPlugin({
      filename: './css/style.bundle.css?v='+ random
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: './src/fonts',
    //       to: './fonts'
    //     },
    //     {
    //       from: './src/favicon',
    //       to: './favicon'
    //     },
    //     {
    //       from: './src/img',
    //       to: './img'
    //     }
    //   ]
    // }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ].concat(htmlPlugins),
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    port: 8000
  }
};

const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.plugins.push(new CleanWebpackPlugin());
  } else {
    config.plugins.push(new LiveReloadPlugin({
      appendScriptTag: true
    }))
  }
  return config;
};
