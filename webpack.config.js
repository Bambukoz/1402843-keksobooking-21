const path = require(`path`);

module.exports = {
  entry: [
    `./js/status-message.js`,
    `./js/backend.js`,
    `./js/debounce.js`,
    `./js/filter.js`,
    `./js/photos.js`,
    `./js/form.js`,
    `./js/pin.js`,
    `./js/drag-and-drop.js`,
    `./js/main.js`,
    `./js/card.js`,
    `./js/util.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devServer: {
    port: 8080,
    open: true,
    liveReload: true,
    contentBase: path.resolve(__dirname),
  },
  devtool: false
};
