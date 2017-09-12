// eslint-disable-next-line import/no-commonjs
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [autoprefixer];
              },
            },
          },
        ],
      },
    ],
  },
  externals: {
    jsdom: 'window',
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react/addons': true,
    'react-dom/test-utils': true,
    'react-test-renderer/shallow': true,
  },
  node: {
    __dirname: true,
    __filename: true,
  },
};
