const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  resolve: {
    modules: [path.resolve('src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.scss', '.css'],
    alias: {
      Components: path.resolve(__dirname, 'src/components/'),
      Containers: path.resolve(__dirname, 'src/containers/'),
      Actions: path.resolve(__dirname, 'src/actions/'),
      Constants: path.resolve(__dirname, 'src/constants/'),
      Selectors: path.resolve(__dirname, 'src/selectors/'),
      Utils: path.resolve(__dirname, 'src/utils/'),
    },
  },
  entry: {
    app: path.resolve(__dirname, 'src/index'),
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'prop-types',
      'redux',
      'redux-saga',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{ loader: 'babel-loader' }],
        exclude: /node_modules/,
      },
      {
        test: /\.scss|\.css$/,
        use: [
          process.env.NODE_ENV === 'development'
            ? {
              loader: 'style-loader',
              query: {
                sourceMap: true,
              },
            }
            : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            query: {
              modules: true,
              sourceMap: true,
              localIdentName: '[local]',
            },
          },
          {
            loader: 'postcss-loader',
            query: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            query: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true,
        },
      },
    },
    runtimeChunk: true,
  },
};
