const path = require(`path`);

module.exports = {
  entry: [
    `./js/status-message.js`,
    `./js/backend.js`,
    `./js/debounce.js`,
    `./js/filter.js`,
    `./js/form.js`,
    `./js/main.js`,
    `./js/card.js`,
    `./js/pin.js`,
    `./js/drag-and-drop.js`,
    `./js/util.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};