/* eslint-disable import/no-commonjs */
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style?insertAt=top', 'css'],
      },
    ],
  },
  postcss: [autoprefixer()],
  externals: {
   'jsdom': 'window',
   'cheerio': 'window',
   'react/lib/ExecutionEnvironment': true,
   'react/lib/ReactContext': 'window',
   'react/addons': true,
 }
};
/* eslint-enable import/no-commonjs */
